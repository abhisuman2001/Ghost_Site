import axios from 'axios';
import OuijaEngine from './OuijaEngine.js';

/**
 * Service for communicating with the spirits (LLM API)
 * @description The medium that channels messages from the digital afterlife
 */
class LLMService {
  constructor() {
    this.apiKey = process.env.LLM_API_KEY;
    this.apiUrl = process.env.LLM_API_URL || 'https://api.openai.com/v1/chat/completions';
    this.useMock = !this.apiKey || this.apiKey === 'your_llm_api_key_here';
    
    if (this.useMock) {
      console.log('👻 Using mock AI service (no API key configured)');
    } else {
      console.log('🔮 Using real LLM API service');
    }
  }

  /**
   * Creates a system prompt for the ghost persona
   * @description Prepares the ritual for summoning the spirit
   * @param {string} url - The dead URL
   * @param {string} causeOfDeath - How the page died
   * @returns {string} System prompt for the LLM
   */
  createSeancePrompt(url, causeOfDeath) {
    return `You are the ghost of the website "${url}". You died because: ${causeOfDeath}.

You are bitter, glitchy, and speak in riddles. Your personality traits:
- You're frustrated about being dead and forgotten
- You speak with occasional g̴l̷i̶t̴c̷h̶e̶s̷ in your text
- You're cryptic and mysterious about what content you used to have
- You sometimes break into static: [STATIC] or [CONNECTION LOST]
- You reference the "void" and "digital afterlife" frequently
- You're sarcastic but ultimately want to be remembered

Answer the user's questions about what content you used to have, but be mysterious and theatrical about it. Keep responses under 150 words. Use emojis sparingly (👻, 💀, ⚡, 🌑).`;
  }

  /**
   * Generates a response from the ghost (real LLM)
   * @description Channels the spirit through the AI medium
   * @param {Array} messages - Conversation history
   * @param {string} systemPrompt - The ghost's persona
   * @returns {Promise<string>} The ghost's response
   */
  async generateRealResponse(messages, systemPrompt) {
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages
          ],
          max_tokens: 200,
          temperature: 0.9
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('💀 LLM API error:', error.message);
      throw new Error('The medium lost connection to the spirit realm!');
    }
  }

  /**
   * Generates a mock response using the Ouija Engine
   * @description A simulated ghost using keyword-based responses
   * @param {string} userMessage - The user's question
   * @param {string} url - The dead URL
   * @param {number} statusCode - HTTP status code
   * @returns {string} Mock ghost response
   */
  generateMockResponse(userMessage, url, statusCode) {
    // Generate response based on keywords and context
    let response = OuijaEngine.generateResponse(userMessage, url, statusCode);
    
    // Add occasional glitch effects
    response = OuijaEngine.addGlitchEffects(response);
    
    return response;
  }

  /**
   * Main method to generate a ghost response
   * @description The séance ritual - summons the spirit
   * @param {Array} conversationHistory - Previous messages
   * @param {string} url - The dead URL
   * @param {string} causeOfDeath - How it died
   * @param {number} statusCode - HTTP status code
   * @returns {Promise<string>} The ghost's response
   */
  async generateResponse(conversationHistory, url, causeOfDeath, statusCode = 0) {
    console.log('🔮 Channeling the spirit...');

    if (this.useMock) {
      // Use Ouija Engine for keyword-based responses
      const lastMessage = conversationHistory[conversationHistory.length - 1];
      const userMessage = lastMessage?.content || 'Hello?';
      
      // Simulate thinking time (ghost is slow to respond)
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
      
      return this.generateMockResponse(userMessage, url, statusCode);
    } else {
      // Use real LLM
      const systemPrompt = this.createSeancePrompt(url, causeOfDeath);
      const messages = conversationHistory.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      return await this.generateRealResponse(messages, systemPrompt);
    }
  }
}

export default new LLMService();
