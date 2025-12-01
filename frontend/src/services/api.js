import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Scan a URL to check if it's dead or alive
 * @param {string} url - The URL to scan
 * @returns {Promise} API response
 */
export const scanURL = async (url) => {
  try {
    const response = await api.post('/scan', { url });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw {
      spooky_status: 'The connection to the graveyard was severed...',
      error: {
        message: 'Failed to connect to the server. Is the graveyard keeper awake?',
        code: 'CONNECTION_ERROR'
      }
    };
  }
};

/**
 * Get scan history
 * @param {number} limit - Number of records to retrieve
 * @returns {Promise} API response
 */
export const getScanHistory = async (limit = 10) => {
  try {
    const response = await api.get(`/history?limit=${limit}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw {
      spooky_status: 'The records are lost in the mist...',
      error: {
        message: 'Failed to retrieve history',
        code: 'CONNECTION_ERROR'
      }
    };
  }
};

/**
 * Start a séance session
 * @param {string} graveyardId - The graveyard ID
 * @returns {Promise} API response
 */
export const startSeance = async (graveyardId) => {
  try {
    const response = await api.post('/seance/start', { graveyardId });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw {
      spooky_status: 'The portal refuses to open...',
      error: {
        message: 'Failed to start séance',
        code: 'CONNECTION_ERROR'
      }
    };
  }
};

/**
 * Send a message in a séance
 * @param {string} graveyardId - The graveyard ID
 * @param {string} userMessage - The user's message
 * @param {Array} conversationHistory - Previous messages
 * @returns {Promise} API response
 */
export const sendSeanceMessage = async (graveyardId, userMessage, conversationHistory = []) => {
  try {
    const response = await api.post('/seance', {
      graveyardId,
      userMessage,
      conversationHistory
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw {
      spooky_status: 'The spirit has vanished...',
      error: {
        message: 'Failed to communicate with the ghost',
        code: 'CONNECTION_ERROR'
      }
    };
  }
};

export default api;
