# 🎃 Digital Purgatory

A MERN stack application for the Kiroween Hackathon (Frankenstein Category)

## Overview

Digital Purgatory scans URLs for dead (404) links, visualizes them as tombstones in a haunted interface, and lets you chat with an AI that impersonates the deleted content through a "Séance" feature.

## Tech Stack

- **Frontend**: React.js + Vite + Tailwind CSS (Haunted OS theme)
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **AI**: LLM API integration
- **External APIs**: Wayback Machine

## Project Structure

```
digital-purgatory/
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── main.jsx
│   └── package.json
├── backend/           # Express backend
│   ├── models/
│   ├── services/
│   ├── routes/
│   ├── config/
│   └── server.js
└── .kiro/specs/       # Project specifications
```

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB
- LLM API key (OpenAI, Anthropic, etc.)

### Installation

1. Install frontend dependencies:
```bash
cd frontend
npm install
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Configure environment variables:
```bash
cd backend
cp .env.example .env
# Edit .env with your API keys and MongoDB URI
```

### Running the Application

1. Start MongoDB (if running locally)

2. Start the backend server:
```bash
cd backend
npm run dev
```

3. Start the frontend dev server:
```bash
cd frontend
npm run dev
```

4. Open http://localhost:3000 in your browser

## Features

- 🔍 URL scanning for dead links
- 💀 Tombstone visualization with Haunted OS aesthetic
- 👻 AI-powered Séance chat with deleted content
- 📚 Wayback Machine integration for historical content
- 💾 MongoDB persistence for graveyards

## Development Status

Currently in development. See `.kiro/specs/digital-purgatory/tasks.md` for implementation progress.

## License

MIT
