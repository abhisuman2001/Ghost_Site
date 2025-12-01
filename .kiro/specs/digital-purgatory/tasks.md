# Implementation Plan: Digital Purgatory

- [ ] 1. Initialize project structure and dependencies
  - Create root directory with frontend and backend folders
  - Initialize React app with Vite in `/frontend` directory
  - Initialize Node.js/Express project in `/backend` directory
  - Install frontend dependencies: react, react-router-dom, axios, tailwindcss
  - Install backend dependencies: express, mongoose, axios, dotenv, cors
  - Install dev dependencies: jest, supertest, fast-check, @testing-library/react
  - Set up basic folder structure for both frontend and backend
  - _Requirements: 7.1, 7.2, 7.3_

- [ ] 2. Configure Haunted OS theme and styling
  - Create custom Tailwind configuration with Haunted OS color palette
  - Define custom animations (flicker, glow) in Tailwind config
  - Create base CSS file with global Haunted OS styles
  - Set up dark mode as default theme
  - _Requirements: 3.3_

- [ ] 3. Set up backend infrastructure
  - [ ] 3.1 Create Express server with basic configuration
    - Set up Express app with middleware (cors, json parser)
    - Configure environment variables with dotenv
    - Create server entry point that listens on configured port
    - _Requirements: 7.1, 7.2, 7.3_
  
  - [ ] 3.2 Set up MongoDB connection
    - Create database connection utility using Mongoose
    - Define connection error handling
    - Export database connection function
    - _Requirements: 6.1, 8.4_
  
  - [ ] 3.3 Create Graveyard data model
    - Define Mongoose schema for Graveyard with all required fields
    - Add indexes for originalUrl and scannedAt
    - Create and export Graveyard model
    - _Requirements: 6.2_
  
  - [ ]* 3.4 Write property test for graveyard persistence
    - **Property 13: Graveyard persistence with required fields**
    - **Validates: Requirements 6.1, 6.2**

- [ ] 4. Implement URL scanning functionality
  - [ ] 4.1 Create ScanService class
    - Implement scanURL method that fetches HTML content
    - Implement extractLinks method that parses HTML for anchor tags
    - Implement checkLinkStatus method that checks HTTP status codes
    - Implement identifyDeadLinks method that filters for 404 status
    - Add timeout handling and error catching
    - _Requirements: 1.1, 1.2, 2.1, 2.2, 2.4, 2.5_
  
  - [ ]* 4.2 Write property test for link extraction
    - **Property 2: Link extraction completeness**
    - **Validates: Requirements 1.2, 2.1, 2.4**
  
  - [ ]* 4.3 Write property test for 404 classification
    - **Property 4: 404 classification exclusivity**
    - **Validates: Requirements 2.3**
  
  - [ ]* 4.4 Write property test for network error handling
    - **Property 18: Network error handling**
    - **Validates: Requirements 2.5, 8.1**

- [ ] 5. Implement Wayback Machine integration
  - [ ] 5.1 Create WaybackService class
    - Implement getSnapshot method that queries Wayback API
    - Implement getSnapshotContent method that retrieves archived content
    - Add error handling for API unavailability
    - Add response caching to avoid redundant calls
    - _Requirements: 4.2, 8.2_
  
  - [ ]* 5.2 Write property test for Wayback API invocation
    - **Property 7: Wayback API invocation**
    - **Validates: Requirements 4.2**

- [ ] 6. Implement LLM integration
  - [ ] 6.1 Create LLMService class
    - Implement generateResponse method that calls LLM API
    - Implement createSeancePrompt method that builds impersonation prompt
    - Add historical content to LLM context when available
    - Add error handling for API failures
    - _Requirements: 4.3, 4.4, 5.1, 5.2, 8.3_
  
  - [ ]* 6.2 Write property test for LLM context inclusion
    - **Property 8: Historical content as LLM context**
    - **Validates: Requirements 4.3**
  
  - [ ]* 6.3 Write property test for impersonation prompt
    - **Property 9: LLM impersonation prompt**
    - **Validates: Requirements 4.4**

- [ ] 7. Create backend API routes
  - [ ] 7.1 Implement POST /api/scan endpoint
    - Create route handler that accepts URL in request body
    - Validate URL format and reject invalid URLs
    - Call ScanService to perform scan
    - Save results to MongoDB using Graveyard model
    - Return graveyard data with dead links
    - Add error handling and appropriate status codes
    - _Requirements: 1.1, 1.3, 1.5, 7.1, 8.5_
  
  - [ ]* 7.2 Write property test for URL validation
    - **Property 3: Invalid URL rejection**
    - **Validates: Requirements 1.3**
  
  - [ ] 7.3 Implement GET /api/graveyards endpoint
    - Create route handler that retrieves all graveyards
    - Sort results by scannedAt in descending order
    - Return array of graveyard summaries
    - _Requirements: 6.3, 6.4, 7.2_
  
  - [ ]* 7.4 Write property test for chronological ordering
    - **Property 15: Chronological graveyard ordering**
    - **Validates: Requirements 6.4**
  
  - [ ] 7.5 Implement GET /api/graveyards/:id endpoint
    - Create route handler that retrieves specific graveyard by ID
    - Return full graveyard data including all dead links
    - Handle not found errors
    - _Requirements: 6.3, 7.2_
  
  - [ ] 7.6 Implement POST /api/seance endpoint
    - Create route handler that accepts dead URL and message
    - Call WaybackService to get historical content
    - Call LLMService to generate response
    - Return LLM response with metadata
    - Handle conversation history in request
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 5.1, 7.3_
  
  - [ ]* 7.7 Write property test for message transmission
    - **Property 10: Message transmission to LLM**
    - **Validates: Requirements 5.1**
  
  - [ ] 7.8 Add centralized error handling middleware
    - Create error handler middleware for Express
    - Format all errors as JSON with consistent structure
    - Set appropriate HTTP status codes
    - Log errors for debugging
    - _Requirements: 7.4, 7.5, 8.1, 8.4, 8.5_
  
  - [ ]* 7.9 Write property test for error response structure
    - **Property 17: Error response structure**
    - **Validates: Requirements 7.5, 8.5**
  
  - [ ]* 7.10 Write property test for JSON response format
    - **Property 16: JSON response format**
    - **Validates: Requirements 7.4**

- [ ] 8. Checkpoint - Ensure backend tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Build frontend components
  - [ ] 9.1 Create URLSubmissionForm component
    - Build form with URL input field and submit button
    - Add client-side URL validation
    - Implement loading state during scan
    - Display validation errors inline
    - Call POST /api/scan on submission
    - Apply Haunted OS styling with glowing effects
    - _Requirements: 1.1, 1.3, 1.4, 3.3_
  
  - [ ]* 9.2 Write property test for valid URL submission
    - **Property 1: Valid URL submission triggers scan**
    - **Validates: Requirements 1.1**
  
  - [ ] 9.3 Create Tombstone component
    - Build tombstone UI with dead URL display
    - Add click handler to open séance modal
    - Apply Haunted OS styling with engraved text effect
    - Add hover effects with glow animation
    - _Requirements: 3.2, 3.5, 4.1_
  
  - [ ]* 9.4 Write property test for tombstone interactivity
    - **Property 6: Tombstone interactivity**
    - **Validates: Requirements 3.5, 4.1**
  
  - [ ] 9.5 Create GraveyardView component
    - Build grid layout for displaying tombstones
    - Map dead links array to Tombstone components
    - Add loading skeleton during scan
    - Add empty state when no dead links found
    - Apply flickering animation to tombstones
    - _Requirements: 1.5, 3.1, 3.4_
  
  - [ ]* 9.6 Write property test for tombstone rendering
    - **Property 5: Tombstone rendering correspondence**
    - **Validates: Requirements 3.1, 3.2**
  
  - [ ] 9.7 Create SeanceModal component
    - Build modal overlay with chat interface
    - Display message history with user and AI messages
    - Add input field for user messages
    - Add close button
    - Show loading indicator while LLM responds
    - Apply Haunted OS styling to chat messages
    - _Requirements: 4.1, 5.2, 5.5_
  
  - [ ] 9.8 Create GraveyardList component
    - Build list of previously scanned URLs
    - Display scan timestamp for each graveyard
    - Add click handler to load saved graveyard
    - Show dead link count for each graveyard
    - _Requirements: 6.3_
  
  - [ ]* 9.9 Write unit tests for all components
    - Test URLSubmissionForm rendering and submission
    - Test Tombstone rendering and click handling
    - Test GraveyardView with various data states
    - Test SeanceModal message display and input
    - Test GraveyardList rendering and interactions
    - _Requirements: All UI requirements_

- [ ] 10. Implement frontend state management and API integration
  - [ ] 10.1 Create API service module
    - Create axios instance with base URL configuration
    - Implement scanURL function for POST /api/scan
    - Implement getGraveyards function for GET /api/graveyards
    - Implement getGraveyard function for GET /api/graveyards/:id
    - Implement sendSeanceMessage function for POST /api/seance
    - Add error handling for all API calls
    - _Requirements: 7.1, 7.2, 7.3_
  
  - [ ] 10.2 Implement main App component with routing
    - Set up React Router with routes for home and graveyard views
    - Create state for current graveyard data
    - Create state for séance modal (open/closed, current dead URL)
    - Implement scan submission handler
    - Implement tombstone click handler to open séance
    - Implement graveyard selection handler
    - _Requirements: 1.1, 1.5, 4.1, 6.3_
  
  - [ ] 10.3 Implement séance chat functionality
    - Create state for conversation history
    - Implement message send handler
    - Append user messages to history immediately
    - Call API and append LLM responses to history
    - Preserve history when modal is closed
    - Display error messages for LLM failures
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 8.3_
  
  - [ ]* 10.4 Write property test for conversation history
    - **Property 12: Conversation history preservation**
    - **Validates: Requirements 5.3, 5.4**
  
  - [ ]* 10.5 Write property test for LLM response display
    - **Property 11: LLM response display**
    - **Validates: Requirements 5.2**
  
  - [ ]* 10.6 Write property test for LLM failure handling
    - **Property 19: LLM failure error display**
    - **Validates: Requirements 8.3**

- [ ] 11. Implement graveyard persistence and retrieval
  - [ ] 11.1 Connect scan results to database storage
    - After successful scan, save graveyard to MongoDB
    - Display success message to user
    - Update UI with saved graveyard data
    - _Requirements: 1.5, 6.1_
  
  - [ ] 11.2 Implement graveyard list loading
    - Fetch graveyards on app load
    - Display in GraveyardList component
    - Handle loading and error states
    - _Requirements: 6.3_
  
  - [ ] 11.3 Implement saved graveyard viewing
    - Load specific graveyard when selected from list
    - Render tombstones from saved data
    - Ensure rendering matches fresh scan results
    - _Requirements: 6.5_
  
  - [ ]* 11.4 Write property test for graveyard retrieval
    - **Property 14: Graveyard retrieval and display**
    - **Validates: Requirements 6.3, 6.5**
  
  - [ ]* 11.5 Write property test for database error handling
    - **Property 20: Database error handling**
    - **Validates: Requirements 8.4**

- [ ] 12. Add polish and error handling
  - [ ] 12.1 Implement toast notifications
    - Add toast library (react-hot-toast or similar)
    - Show success toasts for completed scans
    - Show error toasts for API failures
    - Apply Haunted OS styling to toasts
    - _Requirements: 8.1, 8.3, 8.4_
  
  - [ ] 12.2 Add loading states throughout UI
    - Show skeleton loaders during data fetching
    - Disable buttons during async operations
    - Add spinner animations with Haunted OS theme
    - _Requirements: 1.4_
  
  - [ ] 12.3 Implement responsive design
    - Test layout on mobile, tablet, and desktop
    - Adjust tombstone grid for different screen sizes
    - Make séance modal responsive
    - Ensure touch interactions work on mobile
    - _Requirements: 3.3_
  
  - [ ] 12.4 Add performance optimizations
    - Implement concurrent link checking with limit
    - Add pagination for large graveyard lists
    - Lazy load tombstones if many dead links
    - Cache Wayback API responses
    - _Requirements: 2.1, 6.3_

- [ ] 13. Create environment configuration
  - Create .env.example files for frontend and backend
  - Document all required environment variables
  - Set up different configs for development and production
  - Add .env to .gitignore
  - _Requirements: All requirements (infrastructure)_

- [ ] 14. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 15. Create README and documentation
  - Write project overview and features
  - Document installation and setup instructions
  - Document API endpoints
  - Add screenshots of Haunted OS interface
  - Include hackathon category and theme information
  - _Requirements: All requirements (documentation)_
