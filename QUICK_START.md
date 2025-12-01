# 🎃 Digital Purgatory - Quick Start Guide

## Prerequisites

Before running the application, make sure you have:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (running locally or MongoDB Atlas) - [Download here](https://www.mongodb.com/try/download/community)

## Step-by-Step Setup

### 1. Install Dependencies

First, install all the required packages for both frontend and backend:

```bash
# Install all dependencies at once
npm run install:all
```

Or install them separately:

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Start MongoDB

**Option A: Local MongoDB**
```bash
# Start MongoDB service (if installed locally)
mongod
```

**Option B: MongoDB Atlas**
- Use the connection string in `backend/.env`
- No need to start anything locally

### 3. Start the Backend Server

Open a new terminal window and run:

```bash
cd backend
npm run dev
```

You should see:
```
🎃 Digital Purgatory server running on port 5000
👻 Environment: development
💀 MongoDB Connected: localhost
📚 Database: digital-purgatory
```

### 4. Start the Frontend

Open another terminal window and run:

```bash
cd frontend
npm run dev
```

You should see:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### 5. Open Your Browser

Navigate to: **http://localhost:3000**

You should see the haunted Digital Purgatory interface! 👻

## Testing the Application

### Test 1: Scan a Dead Link
1. Enter this URL: `https://httpstat.us/404`
2. Click "🔍 SCAN FOR DEAD LINKS"
3. Watch the tombstone appear! ⚰️

### Test 2: Scan an Alive Link
1. Enter this URL: `https://httpstat.us/200`
2. Click scan
3. See the pulsing green heart! 💚

### Test 3: Summon a Spirit (Séance)
1. Scan a dead link first
2. Click "🔮 SUMMON SPIRIT 🔮"
3. Type: "Hello?"
4. Watch the ghost type back character by character!
5. Try asking:
   - "Why did you die?"
   - "What content did you have?"
   - "Are you angry?"

## Troubleshooting

### Backend won't start?

**Problem:** MongoDB connection error
```
Solution: Make sure MongoDB is running
- Check if mongod is running
- Or update MONGODB_URI in backend/.env
```

**Problem:** Port 5000 already in use
```
Solution: Change the port in backend/.env
PORT=5001
```

### Frontend won't start?

**Problem:** Port 3000 already in use
```
Solution: Vite will automatically suggest another port
Just press 'y' to use it
```

**Problem:** Can't connect to backend
```
Solution: Update frontend/.env
VITE_API_URL=http://localhost:5000/api
```

### Dependencies not installing?

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf frontend/node_modules backend/node_modules
npm run install:all
```

## Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/digital-purgatory
LLM_API_KEY=your_llm_api_key_here
LLM_API_URL=https://api.openai.com/v1/chat/completions
WAYBACK_API_URL=https://archive.org/wayback/available
SCAN_TIMEOUT=30000
MAX_LINKS_TO_CHECK=100
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## Available Scripts

### Root Directory
```bash
npm run install:all    # Install all dependencies
npm run dev:frontend   # Start frontend only
npm run dev:backend    # Start backend only
npm run test:frontend  # Run frontend tests
npm run test:backend   # Run backend tests
```

### Backend Directory
```bash
npm run dev      # Start with auto-reload
npm start        # Start production mode
npm test         # Run tests
```

### Frontend Directory
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm test         # Run tests
```

## API Endpoints

Once running, you can test the API directly:

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Scan a URL
```bash
curl -X POST http://localhost:5000/api/scan \
  -H "Content-Type: application/json" \
  -d '{"url":"https://httpstat.us/404"}'
```

### Get Scan History
```bash
curl http://localhost:5000/api/history?limit=10
```

## Features to Try

1. **URL Scanner** ✅
   - Scan dead links (404)
   - Scan alive links (200)
   - See tombstones and pulse animations

2. **Séance Chat** ✅
   - Summon spirits of dead links
   - Chat with ghosts
   - Watch typing effects
   - Try different questions

3. **Haunted OS Theme** ✅
   - CRT scanline effects
   - Glowing green text
   - Flickering animations
   - Spooky status messages

4. **Spooky Responses** ✅
   - Every API response has a `spooky_status`
   - Gravedigger-themed error messages
   - Ghost responses with glitches

## Default Ports

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **MongoDB:** mongodb://localhost:27017

## Need Help?

Check these files:
- `README.md` - Project overview
- `SETUP_COMPLETE.md` - Detailed setup info
- `TASK4_COMPLETE.md` - Scanner documentation
- `TASK5_COMPLETE.md` - Séance documentation
- `OUIJA_ENGINE_COMPLETE.md` - Ghost AI details

## Quick Commands Cheat Sheet

```bash
# Full setup from scratch
npm run install:all

# Start everything (use 3 terminals)
# Terminal 1: MongoDB
mongod

# Terminal 2: Backend
cd backend && npm run dev

# Terminal 3: Frontend
cd frontend && npm run dev

# Open browser
# http://localhost:3000
```

---

**The graveyard awaits... 👻⚰️💀**
