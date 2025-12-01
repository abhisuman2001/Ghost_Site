# 🎃 Digital Purgatory - Deployment Guide

## Deploying to Vercel

Digital Purgatory can be deployed to Vercel, but requires separate deployments for frontend and backend.

### Architecture

```
Frontend (Vercel) → Backend (Vercel) → MongoDB Atlas
```

## Option 1: Deploy Backend + Frontend Separately (Recommended)

### Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist all IPs (0.0.0.0/0) for Vercel
5. Get your connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/digital-purgatory
   ```

### Step 2: Deploy Backend to Vercel

1. **Create a separate repo for backend** (or use a monorepo)

2. **Add `vercel.json` in backend folder:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server.js"
    },
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

3. **Update `server.js` for Vercel:**
```javascript
// At the end of server.js, change from:
app.listen(PORT, () => {...});

// To:
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🎃 Digital Purgatory server running on port ${PORT}`);
  });
}

export default app; // Keep this for Vercel
```

4. **Deploy to Vercel:**
```bash
cd backend
vercel
```

5. **Set Environment Variables in Vercel Dashboard:**
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `NODE_ENV` - `production`
   - `FRONTEND_URL` - Your frontend URL (will get this in step 3)
   - `LLM_API_KEY` - (optional) Your OpenAI key
   - `LLM_API_URL` - (optional) OpenAI endpoint

6. **Note your backend URL:** `https://your-backend.vercel.app`

### Step 3: Deploy Frontend to Vercel

1. **Update frontend environment:**

Create `frontend/.env.production`:
```env
VITE_API_URL=https://your-backend.vercel.app/api
```

2. **Deploy to Vercel:**
```bash
cd frontend
vercel
```

3. **Your frontend URL:** `https://your-frontend.vercel.app`

4. **Update backend CORS:**
   - Go to backend Vercel dashboard
   - Update `FRONTEND_URL` environment variable to your frontend URL
   - Redeploy backend

### Step 4: Test Deployment

Visit your frontend URL and test:
- URL scanning
- Tombstone display
- Séance chat

## Option 2: Deploy as Monorepo (Advanced)

### Project Structure
```
digital-purgatory/
├── frontend/
├── backend/
└── vercel.json (root)
```

### Root `vercel.json`
```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "frontend/dist"
      }
    },
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "frontend/dist/$1"
    }
  ]
}
```

### Deploy
```bash
vercel
```

## Alternative: Deploy Backend Elsewhere

If Vercel backend doesn't work well, deploy backend to:

### Railway.app
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
cd backend
railway init
railway up
```

### Render.com
1. Connect your GitHub repo
2. Create a new Web Service
3. Set build command: `cd backend && npm install`
4. Set start command: `cd backend && npm start`
5. Add environment variables

### Heroku
```bash
# Install Heroku CLI
# Login
heroku login

# Create app
cd backend
heroku create digital-purgatory-api

# Add MongoDB addon or use Atlas
heroku addons:create mongolab

# Deploy
git push heroku main
```

## Environment Variables Checklist

### Backend
- ✅ `MONGODB_URI` - MongoDB connection string
- ✅ `NODE_ENV` - `production`
- ✅ `FRONTEND_URL` - Your frontend URL
- ✅ `PORT` - (Vercel sets automatically)
- ⚠️ `LLM_API_KEY` - Optional, works without it
- ⚠️ `LLM_API_URL` - Optional

### Frontend
- ✅ `VITE_API_URL` - Your backend API URL

## Troubleshooting

### CORS Errors
```javascript
// backend/server.js
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend.vercel.app',
    process.env.FRONTEND_URL
  ],
  credentials: true
}));
```

### MongoDB Connection Issues
- Whitelist all IPs (0.0.0.0/0) in MongoDB Atlas
- Check connection string format
- Ensure database user has correct permissions

### Vercel Serverless Function Timeout
- Vercel free tier has 10s timeout
- Scanning many URLs might timeout
- Consider reducing `MAX_LINKS_TO_CHECK` in production

### Build Errors
```bash
# Clear Vercel cache
vercel --force

# Check build logs
vercel logs
```

## Production Optimizations

### 1. Add Rate Limiting
```javascript
// backend/server.js
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### 2. Enable Caching
```javascript
// Cache Wayback responses
// Cache scan results
```

### 3. Optimize Frontend Build
```javascript
// vite.config.js
export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true
      }
    }
  }
});
```

## Quick Deploy Commands

### Backend
```bash
cd backend
vercel --prod
```

### Frontend
```bash
cd frontend
vercel --prod
```

### Both (if monorepo)
```bash
vercel --prod
```

## Post-Deployment

1. ✅ Test URL scanning
2. ✅ Test séance chat
3. ✅ Check MongoDB connections
4. ✅ Verify CORS settings
5. ✅ Test on mobile devices
6. ✅ Check Vercel logs for errors

## Custom Domain (Optional)

1. Buy domain (Namecheap, Google Domains, etc.)
2. Add to Vercel project
3. Update DNS records
4. Update environment variables with new domain

## Monitoring

- Check Vercel Analytics
- Monitor MongoDB Atlas metrics
- Set up error tracking (Sentry, etc.)

---

**The graveyard is now accessible from anywhere in the world! 👻🌍**
