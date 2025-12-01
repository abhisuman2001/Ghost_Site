---
inclusion: always
---

# Digital Purgatory Code Style Guide

## API Response Standards

### Spooky Status Field
Every API response from the backend MUST include a `spooky_status` field containing a randomly selected creepy phrase. This maintains the haunted atmosphere throughout the application.

**Implementation:**
```javascript
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
  "Bones rattle in the server room..."
];

function getSpookyStatus() {
  return SPOOKY_PHRASES[Math.floor(Math.random() * SPOOKY_PHRASES.length)];
}
```

**Example Success Response:**
```json
{
  "spooky_status": "The spirits have spoken...",
  "data": {
    "graveyardId": "507f1f77bcf86cd799439011",
    "deadLinks": [...]
  }
}
```

### Error Message Persona
All error messages MUST be written in the persona of a frantic gravedigger. Errors should feel urgent, panicked, and thematically appropriate.

**Error Response Format:**
```json
{
  "spooky_status": "The crypt door slams shut!",
  "error": {
    "message": "Gravedigger's frantic message here",
    "code": "ERROR_CODE",
    "details": {}
  }
}
```

**Example Error Messages:**

- **Invalid URL:**
  ```
  "By the bones! That URL looks cursed! I can't dig there - it's not proper ground!"
  ```

- **Network Error:**
  ```
  "The fog is too thick! I've lost sight of the burial site! Try again when the mist clears!"
  ```

- **Database Error:**
  ```
  "The crypt won't open! Something's blocking the entrance! The groundskeeper must know about this!"
  ```

- **Timeout:**
  ```
  "I've been digging for too long! My shovel's worn out! This grave is too deep to reach!"
  ```

- **404 Not Found:**
  ```
  "I've searched every tombstone twice! That grave marker doesn't exist in this cemetery!"
  ```

- **Rate Limit:**
  ```
  "Slow down! You're disturbing too many graves at once! The spirits are getting angry!"
  ```

- **LLM API Failure:**
  ```
  "The medium isn't responding! The séance has been interrupted! The spirits have gone silent!"
  ```

- **Wayback Machine Unavailable:**
  ```
  "The time portal is jammed! I can't reach into the past right now! The archives are sealed!"
  ```

- **Scan Failed:**
  ```
  "My lantern went out! I can't see the dead links in this darkness! Something scared me off!"
  ```

- **Invalid Request:**
  ```
  "What kind of ritual is this?! You've given me the wrong incantation! Check your spell book!"
  ```

## Code Style Rules

### 1. Variable Naming
Use thematic variable names when appropriate:
- `graveyard` instead of `collection`
- `tombstone` instead of `item`
- `deadLink` instead of `brokenLink`
- `séance` for chat sessions
- `spirit` for LLM responses

### 2. Console Logging
Use spooky emojis in console logs:
- 💀 for errors
- 👻 for warnings
- 🎃 for success
- ⚰️ for data operations
- 🕯️ for info

**Example:**
```javascript
console.log('💀 Failed to scan URL:', error);
console.log('🎃 Graveyard created successfully');
console.log('⚰️ Storing dead links in the crypt...');
```

### 3. Comments
Add thematic comments where appropriate:
```javascript
// Summon the spirits from the database
// Dig through the graveyard for dead links
// The séance begins...
// Consult the Wayback Machine's ancient archives
```

### 4. Function Names
Keep function names professional but add thematic JSDoc comments:
```javascript
/**
 * Scans a URL for dead links
 * @description The gravedigger searches for forgotten pages
 */
async function scanURL(url) { ... }

/**
 * Initiates a séance with deleted content
 * @description Summons the spirit of a dead link
 */
async function startSeance(deadUrl) { ... }
```

## Response Helper Utility

Create a utility function for consistent responses:

```javascript
// backend/utils/responseHelper.js
export function createResponse(data, customSpookyStatus = null) {
  return {
    spooky_status: customSpookyStatus || getSpookyStatus(),
    data
  };
}

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
```

## Testing
Test files should verify the `spooky_status` field is present in all responses.

## Frontend Integration
The frontend should display the `spooky_status` in the UI subtly (e.g., in a footer or as a tooltip) to maintain immersion.

---

**Remember:** Every interaction with the API should feel like communicating with a haunted system. The user is exploring a digital graveyard, and the responses should reinforce that atmosphere.
