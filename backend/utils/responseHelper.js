const SPOOKY_PHRASES = [
  "The void stares back...",
  "Silence from the other side...",
  "Whispers echo through the digital graveyard...",
  "The dead links are restless tonight...",
  "Something stirs in the darkness...",
  "The spirits have spoken...",
  "Ashes to ashes, links to dust...",
  "The tombstones remember...",
  "Echoes of forgotten pages...",
  "The graveyard keeper watches...",
  "Shadows dance on ancient servers...",
  "The departed URLs linger...",
  "Spectral data haunts these halls...",
  "The crypt door creaks open...",
  "Phantom packets drift by...",
  "The séance begins...",
  "Lost souls wander the web...",
  "Digital ghosts await...",
  "The void acknowledges your request...",
  "Bones rattle in the server room...",
  "Ancient protocols awaken...",
  "The digital cemetery expands...",
  "Forgotten bytes resurface...",
  "The haunting continues...",
  "Ethereal connections established..."
];

/**
 * Get a random spooky status phrase
 * @returns {string} A creepy phrase for API responses
 */
export function getSpookyStatus() {
  return SPOOKY_PHRASES[Math.floor(Math.random() * SPOOKY_PHRASES.length)];
}

/**
 * Create a successful API response with spooky status
 * @param {*} data - The response data
 * @param {string} customSpookyStatus - Optional custom spooky phrase
 * @returns {object} Formatted response object
 */
export function createResponse(data, customSpookyStatus = null) {
  return {
    spooky_status: customSpookyStatus || getSpookyStatus(),
    data
  };
}

/**
 * Create an error response in the persona of a frantic gravedigger
 * @param {string} message - The gravedigger's frantic message
 * @param {string} code - Error code
 * @param {number} statusCode - HTTP status code
 * @param {object} details - Additional error details
 * @returns {object} Formatted error object
 */
export function createError(message, code, statusCode = 500, details = {}) {
  return {
    spooky_status: getSpookyStatus(),
    error: {
      message,
      code,
      details
    },
    statusCode
  };
}

/**
 * Gravedigger error messages for common scenarios
 */
export const GRAVEDIGGER_ERRORS = {
  INVALID_URL: {
    message: "By the bones! That URL looks cursed! I can't dig there - it's not proper ground!",
    code: "INVALID_URL"
  },
  NETWORK_ERROR: {
    message: "The fog is too thick! I've lost sight of the burial site! Try again when the mist clears!",
    code: "NETWORK_ERROR"
  },
  DATABASE_ERROR: {
    message: "The crypt won't open! Something's blocking the entrance! The groundskeeper must know about this!",
    code: "DATABASE_ERROR"
  },
  TIMEOUT: {
    message: "I've been digging for too long! My shovel's worn out! This grave is too deep to reach!",
    code: "TIMEOUT"
  },
  NOT_FOUND: {
    message: "I've searched every tombstone twice! That grave marker doesn't exist in this cemetery!",
    code: "NOT_FOUND"
  },
  RATE_LIMIT: {
    message: "Slow down! You're disturbing too many graves at once! The spirits are getting angry!",
    code: "RATE_LIMIT"
  },
  LLM_FAILURE: {
    message: "The medium isn't responding! The séance has been interrupted! The spirits have gone silent!",
    code: "LLM_FAILURE"
  },
  WAYBACK_UNAVAILABLE: {
    message: "The time portal is jammed! I can't reach into the past right now! The archives are sealed!",
    code: "WAYBACK_UNAVAILABLE"
  },
  SCAN_FAILED: {
    message: "My lantern went out! I can't see the dead links in this darkness! Something scared me off!",
    code: "SCAN_FAILED"
  },
  INVALID_REQUEST: {
    message: "What kind of ritual is this?! You've given me the wrong incantation! Check your spell book!",
    code: "INVALID_REQUEST"
  },
  INTERNAL_ERROR: {
    message: "Something unholy happened in the graveyard! I need to consult the elder spirits about this!",
    code: "INTERNAL_ERROR"
  }
};

/**
 * Send a successful response with spooky status
 * @param {object} res - Express response object
 * @param {*} data - Response data
 * @param {number} statusCode - HTTP status code (default 200)
 * @param {string} customSpookyStatus - Optional custom spooky phrase
 */
export function sendSuccess(res, data, statusCode = 200, customSpookyStatus = null) {
  res.status(statusCode).json(createResponse(data, customSpookyStatus));
}

/**
 * Send an error response with gravedigger persona
 * @param {object} res - Express response object
 * @param {string} errorType - Key from GRAVEDIGGER_ERRORS
 * @param {number} statusCode - HTTP status code
 * @param {object} details - Additional error details
 */
export function sendError(res, errorType, statusCode = 500, details = {}) {
  const error = GRAVEDIGGER_ERRORS[errorType] || GRAVEDIGGER_ERRORS.INTERNAL_ERROR;
  const errorResponse = createError(error.message, error.code, statusCode, details);
  
  res.status(statusCode).json({
    spooky_status: errorResponse.spooky_status,
    error: errorResponse.error
  });
}
