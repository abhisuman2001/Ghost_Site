import axios from 'axios';

/**
 * Service for scanning URLs and checking their status
 * @description The gravedigger's toolkit for examining burial sites
 */
class ScanService {
  constructor() {
    this.timeout = parseInt(process.env.SCAN_TIMEOUT) || 30000;
    this.maxLinks = parseInt(process.env.MAX_LINKS_TO_CHECK) || 100;
  }

  /**
   * Scans a single URL to check if it's dead (404) or alive
   * @description The gravedigger examines a single grave marker
   * @param {string} url - The URL to scan
   * @returns {Promise<object>} Scan result with status and details
   */
  async scanURL(url) {
    console.log(`⚰️ Examining burial site: ${url}`);
    
    try {
      const startTime = Date.now();
      
      // Attempt to fetch the URL
      const response = await axios.get(url, {
        timeout: this.timeout,
        validateStatus: (status) => true, // Don't throw on any status
        maxRedirects: 5,
        headers: {
          'User-Agent': 'Digital-Purgatory-Bot/1.0 (Graveyard Scanner)'
        }
      });

      const duration = Date.now() - startTime;
      const statusCode = response.status;

      console.log(`🕯️ Site responded with status: ${statusCode}`);

      // Check if the link is dead (404)
      if (statusCode === 404) {
        return {
          url,
          status: 'DEAD',
          statusCode,
          causeOfDeath: `Page not found - The spirits have taken this page (HTTP ${statusCode})`,
          checkedAt: new Date(),
          duration
        };
      }

      // Check for other error statuses
      if (statusCode >= 400) {
        return {
          url,
          status: 'DEAD',
          statusCode,
          causeOfDeath: `Server error - The page perished in darkness (HTTP ${statusCode})`,
          checkedAt: new Date(),
          duration
        };
      }

      // Link is alive
      return {
        url,
        status: 'ALIVE',
        statusCode,
        message: 'The page still breathes... for now.',
        checkedAt: new Date(),
        duration
      };

    } catch (error) {
      console.log(`💀 Error examining site: ${error.message}`);

      // Handle different types of errors
      let causeOfDeath = 'Unknown cause - The spirits are silent';

      if (error.code === 'ENOTFOUND') {
        causeOfDeath = 'Domain not found - Lost in the digital void';
      } else if (error.code === 'ECONNREFUSED') {
        causeOfDeath = 'Connection refused - The gates are sealed';
      } else if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
        causeOfDeath = 'Timeout - The fog was too thick to reach';
      } else if (error.code === 'ERR_BAD_REQUEST') {
        causeOfDeath = 'Bad request - The ritual was performed incorrectly';
      } else {
        causeOfDeath = `Network error - ${error.message}`;
      }

      return {
        url,
        status: 'DEAD',
        statusCode: 0,
        causeOfDeath,
        checkedAt: new Date(),
        duration: 0,
        error: error.code
      };
    }
  }

  /**
   * Validates if a URL is properly formatted
   * @description Checks if the burial coordinates are valid
   * @param {string} url - The URL to validate
   * @returns {boolean} True if valid, false otherwise
   */
  isValidURL(url) {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch (error) {
      return false;
    }
  }

  /**
   * Extracts links from HTML content (for future full page scanning)
   * @description Searches the graveyard for all markers
   * @param {string} html - HTML content to parse
   * @returns {Array<string>} Array of found URLs
   */
  extractLinks(html) {
    const linkRegex = /href=["'](https?:\/\/[^"']+)["']/gi;
    const links = [];
    let match;

    while ((match = linkRegex.exec(html)) !== null && links.length < this.maxLinks) {
      links.push(match[1]);
    }

    console.log(`⚰️ Found ${links.length} burial sites to examine`);
    return links;
  }
}

export default new ScanService();
