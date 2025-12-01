import express from 'express';
import ScanService from '../services/ScanService.js';
import Graveyard from '../models/Graveyard.js';
import { sendSuccess, sendError } from '../utils/responseHelper.js';

const router = express.Router();

/**
 * POST /api/scan
 * Scans a URL to check if it's dead or alive
 * @description The gravedigger examines a burial site
 */
router.post('/scan', async (req, res) => {
  try {
    const { url } = req.body;

    // Validate URL is provided
    if (!url) {
      return sendError(res, 'INVALID_REQUEST', 400, { 
        field: 'url',
        message: 'URL is required' 
      });
    }

    // Validate URL format
    if (!ScanService.isValidURL(url)) {
      return sendError(res, 'INVALID_URL', 400, { url });
    }

    console.log(`🎃 Starting scan for: ${url}`);

    // Scan the URL
    const scanResult = await ScanService.scanURL(url);

    // If the link is DEAD, save it to the graveyard
    if (scanResult.status === 'DEAD') {
      console.log(`⚰️ Storing dead link in the crypt...`);

      const graveyard = new Graveyard({
        originalUrl: url,
        scannedAt: scanResult.checkedAt,
        deadLinks: [{
          url: scanResult.url,
          statusCode: scanResult.statusCode,
          lastChecked: scanResult.checkedAt,
          waybackAvailable: false
        }],
        totalLinksScanned: 1,
        scanDuration: scanResult.duration
      });

      await graveyard.save();

      console.log(`🎃 Dead link buried successfully`);

      return sendSuccess(res, {
        status: 'DEAD',
        url: scanResult.url,
        statusCode: scanResult.statusCode,
        causeOfDeath: scanResult.causeOfDeath,
        graveyardId: graveyard._id,
        checkedAt: scanResult.checkedAt,
        message: '💀 This link has passed into the digital afterlife...'
      }, 200, 'A new soul joins the graveyard...');
    }

    // Link is ALIVE
    console.log(`👻 Link is still among the living`);

    return sendSuccess(res, {
      status: 'ALIVE',
      url: scanResult.url,
      statusCode: scanResult.statusCode,
      message: scanResult.message,
      checkedAt: scanResult.checkedAt,
      warning: '⚠️ But all things must eventually rest...'
    }, 200, 'The page still breathes...');

  } catch (error) {
    console.error('💀 Scan failed:', error);
    return sendError(res, 'SCAN_FAILED', 500, { 
      error: error.message 
    });
  }
});

/**
 * GET /api/scan/history
 * Retrieves recent scan history
 * @description View the graveyard records
 */
router.get('/history', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    console.log(`📚 Retrieving ${limit} graveyard records...`);

    const graveyards = await Graveyard.findRecent(limit);

    return sendSuccess(res, {
      graveyards,
      count: graveyards.length
    }, 200, 'The records have been unearthed...');

  } catch (error) {
    console.error('💀 Failed to retrieve history:', error);
    return sendError(res, 'DATABASE_ERROR', 500, { 
      error: error.message 
    });
  }
});

export default router;
