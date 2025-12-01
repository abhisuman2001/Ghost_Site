import express from 'express';
import Graveyard from '../models/Graveyard.js';
import LLMService from '../services/LLMService.js';
import { sendSuccess, sendError } from '../utils/responseHelper.js';

const router = express.Router();

/**
 * POST /api/seance
 * Initiates or continues a séance with a dead link's ghost
 * @description The ritual to communicate with the departed
 */
router.post('/seance', async (req, res) => {
  try {
    const { graveyardId, userMessage, conversationHistory = [] } = req.body;

    // Validate required fields
    if (!graveyardId) {
      return sendError(res, 'INVALID_REQUEST', 400, { 
        field: 'graveyardId',
        message: 'Graveyard ID is required to summon the spirit' 
      });
    }

    if (!userMessage) {
      return sendError(res, 'INVALID_REQUEST', 400, { 
        field: 'userMessage',
        message: 'You must speak to summon the ghost' 
      });
    }

    console.log(`🕯️ Initiating séance for graveyard: ${graveyardId}`);

    // Retrieve the graveyard from the crypt
    const graveyard = await Graveyard.findById(graveyardId);

    if (!graveyard) {
      return sendError(res, 'NOT_FOUND', 404, { 
        graveyardId,
        message: 'This grave does not exist in our cemetery' 
      });
    }

    // Get the dead link info
    const deadLink = graveyard.deadLinks[0]; // For now, use the first dead link
    const url = deadLink?.url || graveyard.originalUrl;
    
    // Determine cause of death
    let causeOfDeath = 'Unknown - Lost to the void';
    if (deadLink?.statusCode === 404) {
      causeOfDeath = 'Page not found (HTTP 404) - Abandoned by its creators';
    } else if (deadLink?.statusCode >= 500) {
      causeOfDeath = `Server error (HTTP ${deadLink.statusCode}) - The server collapsed`;
    } else if (deadLink?.statusCode >= 400) {
      causeOfDeath = `Client error (HTTP ${deadLink.statusCode}) - Rejected by the server`;
    } else if (deadLink?.statusCode === 0) {
      causeOfDeath = 'Network failure - Lost in the digital fog';
    }

    console.log(`👻 Summoning ghost of: ${url}`);
    console.log(`⚰️ Cause of death: ${causeOfDeath}`);

    // Build conversation history
    const messages = [
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ];

    // Channel the spirit through the LLM (or Ouija Engine)
    const ghostResponse = await LLMService.generateResponse(
      messages,
      url,
      causeOfDeath,
      deadLink?.statusCode || 0
    );

    console.log(`🔮 Spirit responded: ${ghostResponse.substring(0, 50)}...`);

    // Return the ghost's message
    return sendSuccess(res, {
      ghostResponse,
      url,
      causeOfDeath,
      conversationHistory: [
        ...messages,
        { role: 'assistant', content: ghostResponse }
      ],
      timestamp: new Date()
    }, 200, 'The séance continues...');

  } catch (error) {
    console.error('💀 Séance failed:', error);
    
    if (error.message.includes('medium lost connection')) {
      return sendError(res, 'LLM_FAILURE', 503, { 
        error: error.message 
      });
    }
    
    return sendError(res, 'INTERNAL_ERROR', 500, { 
      error: error.message 
    });
  }
});

/**
 * POST /api/seance/start
 * Starts a new séance session
 * @description Opens the portal to the spirit realm
 */
router.post('/seance/start', async (req, res) => {
  try {
    const { graveyardId } = req.body;

    if (!graveyardId) {
      return sendError(res, 'INVALID_REQUEST', 400, { 
        field: 'graveyardId',
        message: 'Graveyard ID is required' 
      });
    }

    // Retrieve the graveyard
    const graveyard = await Graveyard.findById(graveyardId);

    if (!graveyard) {
      return sendError(res, 'NOT_FOUND', 404, { graveyardId });
    }

    const deadLink = graveyard.deadLinks[0];
    const url = deadLink?.url || graveyard.originalUrl;

    console.log(`🕯️ Opening séance portal for: ${url}`);

    return sendSuccess(res, {
      graveyardId,
      url,
      statusCode: deadLink?.statusCode || 0,
      scannedAt: graveyard.scannedAt,
      message: 'The portal is open. Speak to summon the spirit...',
      welcomeMessage: `*The candles flicker... A presence materializes...*\n\n👻 You have summoned the ghost of ${url}\n\n*The spirit awaits your questions...*`
    }, 200, 'The séance begins...');

  } catch (error) {
    console.error('💀 Failed to start séance:', error);
    return sendError(res, 'INTERNAL_ERROR', 500, { 
      error: error.message 
    });
  }
});

export default router;
