# Requirements Document

## Introduction

Digital Purgatory is a MERN stack web application that scans URLs for dead (404) links, visualizes them as tombstones in a haunted interface, and allows users to interact with an AI that impersonates the deleted content through a "Séance" chat feature. The application combines web scraping, historical web data retrieval, and LLM-powered conversation to create an immersive experience for exploring lost web content.

## Glossary

- **Digital Purgatory System**: The complete MERN stack application including frontend, backend, database, and AI integration
- **URL Scanner**: The backend component that crawls a submitted URL and identifies broken (404) links
- **Tombstone**: A visual UI element representing a dead link in the graveyard interface
- **Séance**: An AI-powered chat session where the LLM impersonates content that previously existed at a dead URL
- **Graveyard**: A collection of dead links associated with a scanned URL, stored in MongoDB
- **Wayback Machine**: Internet Archive's API used to retrieve historical snapshots of dead URLs
- **Haunted OS**: The dark mode aesthetic with glowing green text and flickering effects

## Requirements

### Requirement 1

**User Story:** As a user, I want to submit a URL for scanning, so that I can discover dead links on that webpage.

#### Acceptance Criteria

1. WHEN a user enters a valid URL in the input field and submits it, THEN the Digital Purgatory System SHALL initiate a scan of that URL
2. WHEN the URL Scanner processes a submitted URL, THEN the Digital Purgatory System SHALL extract all hyperlinks from the page content
3. WHEN the URL Scanner encounters an invalid URL format, THEN the Digital Purgatory System SHALL reject the submission and display an error message to the user
4. WHEN a scan is in progress, THEN the Digital Purgatory System SHALL display a loading indicator to the user
5. WHEN a scan completes, THEN the Digital Purgatory System SHALL store the graveyard results in MongoDB and display the tombstones to the user

### Requirement 2

**User Story:** As a user, I want the system to identify which links are dead (404), so that I can see what content has been lost.

#### Acceptance Criteria

1. WHEN the URL Scanner extracts hyperlinks from a page, THEN the Digital Purgatory System SHALL check the HTTP status code of each link
2. WHEN a link returns a 404 status code, THEN the Digital Purgatory System SHALL classify it as a dead link
3. WHEN a link returns a non-404 error status (500, 503, etc.), THEN the Digital Purgatory System SHALL classify it separately from dead links
4. WHEN all links have been checked, THEN the Digital Purgatory System SHALL return a collection containing only the dead links
5. WHEN checking links, THEN the Digital Purgatory System SHALL handle timeouts and network errors gracefully

### Requirement 3

**User Story:** As a user, I want to see dead links visualized as tombstones in a haunted interface, so that I can experience the lost content in an engaging way.

#### Acceptance Criteria

1. WHEN dead links are detected, THEN the Digital Purgatory System SHALL render each dead link as a tombstone UI component
2. WHEN displaying tombstones, THEN the Digital Purgatory System SHALL show the dead URL on each tombstone
3. WHEN rendering the interface, THEN the Digital Purgatory System SHALL apply the Haunted OS aesthetic with dark backgrounds and glowing green text
4. WHEN the graveyard view is displayed, THEN the Digital Purgatory System SHALL include flickering visual effects on tombstone elements
5. WHEN tombstones are rendered, THEN the Digital Purgatory System SHALL make them interactive and clickable

### Requirement 4

**User Story:** As a user, I want to click on a tombstone to start a Séance, so that I can chat with an AI about the deleted content.

#### Acceptance Criteria

1. WHEN a user clicks on a tombstone, THEN the Digital Purgatory System SHALL open a chat interface for that dead link
2. WHEN a Séance chat opens, THEN the Digital Purgatory System SHALL query the Wayback Machine API for historical snapshots of the dead URL
3. WHEN historical content is retrieved, THEN the Digital Purgatory System SHALL provide it as context to the LLM
4. WHEN the LLM receives context, THEN the Digital Purgatory System SHALL instruct the LLM to impersonate the deleted content
5. WHEN no historical content is available, THEN the Digital Purgatory System SHALL inform the user and allow the LLM to respond based on the URL alone

### Requirement 5

**User Story:** As a user, I want to have a conversation with the AI about the dead content, so that I can learn what was lost and explore its history.

#### Acceptance Criteria

1. WHEN a user sends a message in the Séance chat, THEN the Digital Purgatory System SHALL transmit the message to the LLM
2. WHEN the LLM generates a response, THEN the Digital Purgatory System SHALL display it in the chat interface in character as the deleted content
3. WHEN the chat is active, THEN the Digital Purgatory System SHALL maintain conversation context across multiple messages
4. WHEN the user closes the Séance, THEN the Digital Purgatory System SHALL preserve the chat history in the session
5. WHEN the LLM responds, THEN the Digital Purgatory System SHALL format responses to maintain the Haunted OS aesthetic

### Requirement 6

**User Story:** As a user, I want my scanned graveyards to be saved, so that I can return to them later without rescanning.

#### Acceptance Criteria

1. WHEN a URL scan completes, THEN the Digital Purgatory System SHALL store the graveyard data in MongoDB
2. WHEN storing a graveyard, THEN the Digital Purgatory System SHALL include the original URL, scan timestamp, and all dead links
3. WHEN a user returns to the application, THEN the Digital Purgatory System SHALL retrieve and display previously scanned graveyards
4. WHEN displaying saved graveyards, THEN the Digital Purgatory System SHALL show the most recent scans first
5. WHEN a graveyard is retrieved from MongoDB, THEN the Digital Purgatory System SHALL render it with the same tombstone visualization

### Requirement 7

**User Story:** As a developer, I want a RESTful API architecture, so that the frontend and backend are properly separated and maintainable.

#### Acceptance Criteria

1. WHEN the backend receives a scan request, THEN the Digital Purgatory System SHALL expose a POST endpoint that accepts a URL
2. WHEN the frontend requests graveyard data, THEN the Digital Purgatory System SHALL expose a GET endpoint that returns saved graveyards
3. WHEN the frontend initiates a Séance, THEN the Digital Purgatory System SHALL expose a POST endpoint for chat messages
4. WHEN API endpoints are called, THEN the Digital Purgatory System SHALL return responses in JSON format
5. WHEN API errors occur, THEN the Digital Purgatory System SHALL return appropriate HTTP status codes and error messages

### Requirement 8

**User Story:** As a developer, I want proper error handling throughout the application, so that users receive helpful feedback when things go wrong.

#### Acceptance Criteria

1. WHEN the URL Scanner encounters a network error, THEN the Digital Purgatory System SHALL log the error and return a user-friendly message
2. WHEN the Wayback Machine API is unavailable, THEN the Digital Purgatory System SHALL handle the failure gracefully and allow the Séance to continue
3. WHEN the LLM API fails, THEN the Digital Purgatory System SHALL display an error message in the chat interface
4. WHEN MongoDB connection fails, THEN the Digital Purgatory System SHALL prevent data loss and notify the user
5. WHEN invalid data is submitted to any API endpoint, THEN the Digital Purgatory System SHALL validate input and return specific error messages
