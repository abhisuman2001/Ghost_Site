# Design Document: Digital Purgatory

## Overview

Digital Purgatory is a MERN stack application that creates an immersive "haunted" experience for exploring dead web links. The system architecture follows a three-tier pattern: React frontend with Tailwind CSS for the Haunted OS aesthetic, Express.js backend for business logic and orchestration, and MongoDB for persistent storage. The application integrates external services including HTTP link checking, the Wayback Machine API for historical content retrieval, and an LLM API for conversational AI.

The user workflow is: submit URL → scan for dead links → visualize as tombstones → click tombstone → retrieve historical content → chat with AI impersonating the deleted content.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  React + Tailwind CSS (Haunted OS Theme)                    │
│  - URL Submission Form                                       │
│  - Graveyard View (Tombstones)                              │
│  - Séance Chat Interface                                     │
└────────────────────┬────────────────────────────────────────┘
                     │ REST API (JSON)
┌────────────────────▼────────────────────────────────────────┐
│                    Backend (Express.js)                      │
│  - API Routes                                                │
│  - URL Scanner Service                                       │
│  - Wayback Machine Integration                              │
│  - LLM Integration                                           │
│  - Business Logic                                            │
└────────┬───────────────────────┬────────────────────────────┘
         │                       │
         │                       │ External APIs
    ┌────▼─────┐          ┌─────▼──────────────┐
    │ MongoDB  │          │ - Wayback Machine  │
    │ Database │          │ - LLM API          │
    └──────────┘          └────────────────────┘
```

### Technology Stack

**Frontend:**
- React.js 18+ for UI components
- Tailwind CSS for styling with custom Haunted OS theme
- Axios for HTTP requests
- React Router for navigation

**Backend:**
- Node.js with Express.js framework
- Axios for external API calls and link checking
- Mongoose ODM for MongoDB interaction
- dotenv for environment configuration

**Database:**
- MongoDB for storing graveyards and scan results

**External Services:**
- Wayback Machine API (archive.org)
- LLM API (OpenAI, Anthropic, or similar)

## Components and Interfaces

### Frontend Components

#### 1. URLSubmissionForm
- Input field for URL entry
- Submit button with loading state
- Validation feedback
- Haunted OS styling with glowing effects

#### 2. GraveyardView
- Grid/list of Tombstone components
- Loading skeleton during scan
- Empty state when no dead links found
- Flickering animations

#### 3. Tombstone
- Displays dead URL
- Click handler to open Séance
- Hover effects with glow
- Engraved text styling

#### 4. SeanceModal
- Chat interface overlay
- Message history display
- Input field for user messages
- Close button
- Streaming LLM responses
- Loading indicators

#### 5. GraveyardList
- Shows previously scanned URLs
- Click to view saved graveyard
- Timestamp display
- Delete option

### Backend Services

#### 1. ScanService
```javascript
class ScanService {
  async scanURL(url)
  async extractLinks(html)
  async checkLinkStatus(url)
  async identifyDeadLinks(links)
}
```

#### 2. WaybackService
```javascript
class WaybackService {
  async getSnapshot(url)
  async getSnapshotContent(url, timestamp)
  async findClosestSnapshot(url)
}
```

#### 3. LLMService
```javascript
class LLMService {
  async generateResponse(messages, context)
  async createSeancePrompt(deadURL, historicalContent)
}
```

#### 4. GraveyardService
```javascript
class GraveyardService {
  async createGraveyard(scanData)
  async getGraveyard(id)
  async listGraveyards(limit)
  async deleteGraveyard(id)
}
```

### API Endpoints

#### POST /api/scan
Request:
```json
{
  "url": "https://example.com"
}
```
Response:
```json
{
  "graveyardId": "507f1f77bcf86cd799439011",
  "originalUrl": "https://example.com",
  "scannedAt": "2025-12-01T10:30:00Z",
  "deadLinks": [
    {
      "url": "https://example.com/dead-page",
      "statusCode": 404
    }
  ],
  "totalLinks": 45,
  "deadLinkCount": 3
}
```

#### GET /api/graveyards
Response:
```json
{
  "graveyards": [
    {
      "id": "507f1f77bcf86cd799439011",
      "originalUrl": "https://example.com",
      "scannedAt": "2025-12-01T10:30:00Z",
      "deadLinkCount": 3
    }
  ]
}
```

#### GET /api/graveyards/:id
Response:
```json
{
  "id": "507f1f77bcf86cd799439011",
  "originalUrl": "https://example.com",
  "scannedAt": "2025-12-01T10:30:00Z",
  "deadLinks": [
    {
      "url": "https://example.com/dead-page",
      "statusCode": 404,
      "lastChecked": "2025-12-01T10:30:00Z"
    }
  ]
}
```

#### POST /api/seance
Request:
```json
{
  "deadUrl": "https://example.com/dead-page",
  "message": "What content did you have?",
  "conversationHistory": []
}
```
Response:
```json
{
  "response": "I was a blog post about...",
  "hasHistoricalContent": true,
  "waybackSnapshot": "2020-05-15T12:00:00Z"
}
```

## Data Models

### Graveyard Schema (MongoDB)

```javascript
{
  _id: ObjectId,
  originalUrl: String (required, indexed),
  scannedAt: Date (required, default: Date.now),
  deadLinks: [
    {
      url: String (required),
      statusCode: Number (required),
      lastChecked: Date (required),
      waybackAvailable: Boolean (default: false),
      waybackSnapshot: String (optional)
    }
  ],
  totalLinksScanned: Number (required),
  scanDuration: Number (milliseconds),
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

### Indexes
- `originalUrl`: For quick lookup of previously scanned URLs
- `scannedAt`: For sorting by recency
- `deadLinks.url`: For finding specific dead links



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Valid URL submission triggers scan
*For any* valid URL string, when submitted through the form, the scan service should be invoked with that exact URL as a parameter.
**Validates: Requirements 1.1**

### Property 2: Link extraction completeness
*For any* HTML document, when the URL Scanner extracts links, the resulting collection should contain all href attributes from anchor tags in the document, and when filtered for dead links (404 status), should contain only those links that returned 404.
**Validates: Requirements 1.2, 2.1, 2.4**

### Property 3: Invalid URL rejection
*For any* malformed URL string (missing protocol, invalid characters, etc.), when submitted, the system should reject it and return an error message without initiating a scan.
**Validates: Requirements 1.3**

### Property 4: 404 classification exclusivity
*For any* link that returns a non-404 HTTP error status (500, 503, etc.), that link should not appear in the dead links collection.
**Validates: Requirements 2.3**

### Property 5: Tombstone rendering correspondence
*For any* array of dead links, the number of rendered tombstone components should equal the array length, and each tombstone should display its corresponding dead URL.
**Validates: Requirements 3.1, 3.2**

### Property 6: Tombstone interactivity
*For any* rendered tombstone component, it should have a click handler attached that opens the séance modal with the correct dead URL.
**Validates: Requirements 3.5, 4.1**

### Property 7: Wayback API invocation
*For any* dead URL, when a séance is initiated, the system should query the Wayback Machine API with that URL to retrieve historical snapshots.
**Validates: Requirements 4.2**

### Property 8: Historical content as LLM context
*For any* historical content retrieved from Wayback, when passed to the LLM service, it should appear in the context parameter of the LLM API call.
**Validates: Requirements 4.3**

### Property 9: LLM impersonation prompt
*For any* séance session, the system prompt sent to the LLM should contain instructions to impersonate the deleted content from the dead URL.
**Validates: Requirements 4.4**

### Property 10: Message transmission to LLM
*For any* user message sent in the séance chat, the LLM service should be invoked with that message included in the conversation history.
**Validates: Requirements 5.1**

### Property 11: LLM response display
*For any* response generated by the LLM, it should be appended to the chat message history and displayed in the chat interface.
**Validates: Requirements 5.2**

### Property 12: Conversation history preservation
*For any* séance session, sending multiple messages should result in the conversation history array growing with each user-LLM exchange, and closing then reopening the modal should preserve the existing history.
**Validates: Requirements 5.3, 5.4**

### Property 13: Graveyard persistence with required fields
*For any* completed URL scan, the resulting graveyard document stored in MongoDB should contain the original URL, scan timestamp, and complete array of dead links with their status codes.
**Validates: Requirements 6.1, 6.2**

### Property 14: Graveyard retrieval and display
*For any* saved graveyard in the database, when retrieved, it should be rendered with tombstone components identical to a fresh scan result.
**Validates: Requirements 6.3, 6.5**

### Property 15: Chronological graveyard ordering
*For any* list of graveyards retrieved from the database, they should be sorted by scannedAt timestamp in descending order (most recent first).
**Validates: Requirements 6.4**

### Property 16: JSON response format
*For any* API endpoint response, the Content-Type header should be application/json and the response body should be valid JSON.
**Validates: Requirements 7.4**

### Property 17: Error response structure
*For any* error condition in API endpoints, the response should include an appropriate HTTP status code (4xx or 5xx) and a JSON body containing an error message.
**Validates: Requirements 7.5, 8.5**

### Property 18: Network error handling
*For any* network error during URL scanning, the system should catch the error, log it, and return a user-friendly error response without crashing.
**Validates: Requirements 2.5, 8.1**

### Property 19: LLM failure error display
*For any* LLM API failure during a séance, an error message should be displayed in the chat interface informing the user of the issue.
**Validates: Requirements 8.3**

### Property 20: Database error handling
*For any* MongoDB connection failure, the system should catch the error, prevent data loss, and return an error response to the user.
**Validates: Requirements 8.4**

## Error Handling

### Frontend Error Handling
- **Network Errors**: Display toast notifications for failed API calls
- **Validation Errors**: Show inline error messages on form inputs
- **Loading States**: Prevent duplicate submissions during async operations
- **Graceful Degradation**: Show cached data when API is unavailable

### Backend Error Handling
- **Input Validation**: Use express-validator middleware for request validation
- **Try-Catch Blocks**: Wrap async operations in try-catch for error capture
- **Error Middleware**: Centralized error handler for consistent error responses
- **Logging**: Use Winston or similar for structured error logging
- **Timeout Handling**: Set reasonable timeouts for external API calls (Wayback, LLM)

### Error Response Format
```json
{
  "error": {
    "message": "User-friendly error message",
    "code": "ERROR_CODE",
    "details": {} // Optional additional context
  }
}
```

### Specific Error Scenarios

1. **Invalid URL Submission**
   - Status: 400 Bad Request
   - Message: "Please provide a valid URL with http:// or https://"

2. **Scan Timeout**
   - Status: 504 Gateway Timeout
   - Message: "The scan took too long. Please try a smaller page."

3. **Wayback API Unavailable**
   - Status: 200 OK (non-blocking)
   - Behavior: Continue séance without historical content, inform user

4. **LLM API Failure**
   - Status: 503 Service Unavailable
   - Message: "The AI is temporarily unavailable. Please try again."

5. **Database Connection Error**
   - Status: 500 Internal Server Error
   - Message: "Unable to save results. Please try again later."

## Testing Strategy

### Unit Testing

**Frontend (Jest + React Testing Library):**
- Component rendering tests for Tombstone, SeanceModal, URLSubmissionForm
- User interaction tests (form submission, button clicks)
- State management tests
- API integration tests with mocked responses

**Backend (Jest + Supertest):**
- API endpoint tests for all routes
- Service layer tests (ScanService, WaybackService, LLMService)
- Database operation tests with MongoDB Memory Server
- Error handling tests for various failure scenarios

### Property-Based Testing

We will use **fast-check** (JavaScript/TypeScript property-based testing library) to verify universal properties across randomized inputs.

**Configuration:**
- Each property-based test should run a minimum of 100 iterations
- Each test must include a comment tag referencing the design document property
- Tag format: `// Feature: digital-purgatory, Property {number}: {property_text}`

**Key Properties to Test:**
- Link extraction and filtering (Property 2)
- URL validation (Property 3)
- Tombstone rendering correspondence (Property 5)
- Graveyard persistence with required fields (Property 13)
- Chronological ordering (Property 15)
- Error response structure (Property 17)

**Example Property Test Structure:**
```javascript
// Feature: digital-purgatory, Property 2: Link extraction completeness
test('extracted dead links contain only 404 status links', () => {
  fc.assert(
    fc.property(
      fc.array(fc.record({
        url: fc.webUrl(),
        statusCode: fc.integer({ min: 200, max: 599 })
      })),
      (links) => {
        const deadLinks = filterDeadLinks(links);
        return deadLinks.every(link => link.statusCode === 404);
      }
    ),
    { numRuns: 100 }
  );
});
```

### Integration Testing

- End-to-end user flows using Playwright or Cypress
- Test complete workflow: submit URL → view tombstones → open séance → chat
- Test with real MongoDB instance (not memory server)
- Mock external APIs (Wayback, LLM) for consistent test results

### Manual Testing Checklist

- Visual verification of Haunted OS aesthetic (dark mode, glowing green, flickering)
- Responsive design across different screen sizes
- Performance with large numbers of dead links (100+)
- Real Wayback Machine API integration
- Real LLM API integration with various prompts

## Implementation Notes

### Haunted OS Theme Configuration

Create a custom Tailwind configuration with the following theme extensions:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'purgatory-dark': '#0a0a0a',
        'purgatory-darker': '#050505',
        'ghost-green': '#00ff41',
        'ghost-green-dim': '#00cc33',
        'tombstone-gray': '#2a2a2a',
      },
      animation: {
        'flicker': 'flicker 3s infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
        glow: {
          '0%, 100%': { textShadow: '0 0 10px #00ff41' },
          '50%': { textShadow: '0 0 20px #00ff41' },
        },
      },
    },
  },
};
```

### Environment Variables

```
# Backend
PORT=5000
MONGODB_URI=mongodb://localhost:27017/digital-purgatory
LLM_API_KEY=your_llm_api_key
LLM_API_URL=https://api.openai.com/v1/chat/completions
WAYBACK_API_URL=https://archive.org/wayback/available
SCAN_TIMEOUT=30000
MAX_LINKS_TO_CHECK=100

# Frontend
REACT_APP_API_URL=http://localhost:5000/api
```

### Performance Considerations

1. **Link Scanning**: Implement concurrent checking with a limit (e.g., 10 concurrent requests) to avoid overwhelming the system
2. **Caching**: Cache Wayback API responses to avoid redundant calls for the same dead URL
3. **Pagination**: Implement pagination for graveyard lists if users scan many URLs
4. **Rate Limiting**: Add rate limiting to API endpoints to prevent abuse
5. **Lazy Loading**: Load tombstones progressively if there are many dead links

### Security Considerations

1. **Input Sanitization**: Sanitize all user inputs to prevent XSS attacks
2. **URL Validation**: Strictly validate URLs to prevent SSRF attacks
3. **API Key Protection**: Never expose LLM API keys in frontend code
4. **CORS Configuration**: Configure CORS properly for production deployment
5. **Rate Limiting**: Implement rate limiting on scan endpoint to prevent abuse
6. **Content Security Policy**: Set appropriate CSP headers

### Deployment Architecture

**Development:**
- Frontend: React dev server (port 3000)
- Backend: Express server (port 5000)
- Database: Local MongoDB instance

**Production:**
- Frontend: Static build deployed to Vercel/Netlify
- Backend: Node.js server on Railway/Render/Heroku
- Database: MongoDB Atlas
- Environment: Separate production environment variables
