# 🚀 Quick Vercel Deployment Guide

## TL;DR - Fast Deploy

### 1. MongoDB Atlas Setup (5 minutes)
```
1. Go to mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Whitelist all IPs: 0.0.0.0/0
5. Copy connection string
```

### 2. Deploy Backend (2 minutes)
```bash
cd backend
vercel

# When prompted:
# - Link to existing project? No
# - Project name: digital-purgatory-api
# - Directory: ./
```

**Set environment variables in Vercel dashboard:**
- `MONGODB_URI` = your MongoDB Atlas connection string
- `NODE_ENV` = production
- `FRONTEND_URL` = (will add after frontend deploy)

### 3. Deploy Frontend (2 minutes)
```bash
cd frontend

# Create production env file
echo "VITE_API_URL=https://your-backend-url.vercel.app/api" > .env.production

vercel

# When prompted:
# - Link to existing project? No
# - Project name: digital-purgatory
# - Directory: ./
```

### 4. Update Backend CORS (1 minute)
Go to backend Vercel dashboard → Settings → Environment Variables
- Update `FRONTEND_URL` = your frontend URL
- Redeploy

### 5. Test! 🎃
Visit your frontend URL and test scanning!

---

## Detailed Steps

### Prerequisites
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login
```

### Backend Deployment

1. **Prepare Backend**
```bash
cd backend
```

2. **Deploy**
```bash
vercel
```

3. **Configure Environment Variables**

Go to: https://vercel.com/dashboard → Your Project → Settings → Environment Variables

Add these:
```
MONGODB_URI = mongodb+srv://user:pass@cluster.mongodb.net/digital-purgatory
NODE_ENV = production
FRONTEND_URL = https://your-frontend.vercel.app
LLM_API_KEY = (optional - leave empty for mock AI)
```

4. **Redeploy with env vars**
```bash
vercel --prod
```

5. **Note your backend URL**: `https://digital-purgatory-api.vercel.app`

### Frontend Deployment

1. **Update API URL**
```bash
cd frontend

# Create production environment file
cat > .env.production << EOF
VITE_API_URL=https://digital-purgatory-api.vercel.app/api
EOF
```

2. **Deploy**
```bash
vercel
```

3. **Deploy to production**
```bash
vercel --prod
```

4. **Note your frontend URL**: `https://digital-purgatory.vercel.app`

### Final Step: Update CORS

1. Go to backend Vercel dashboard
2. Settings → Environment Variables
3. Update `FRONTEND_URL` to your actual frontend URL
4. Redeploy backend:
```bash
cd backend
vercel --prod
```

---

## Testing Deployment

### 1. Health Check
```bash
curl https://your-backend.vercel.app/api/health
```

Should return:
```json
{
  "spooky_status": "The graveyard keeper is awake...",
  "data": {
    "status": "ok",
    "message": "Digital Purgatory API is running"
  }
}
```

### 2. Test Frontend
Visit: `https://your-frontend.vercel.app`

Try scanning:
- `https://httpstat.us/404` (dead link)
- `https://httpstat.us/200` (alive link)

### 3. Test Séance
1. Scan a dead link
2. Click "Summon Spirit"
3. Type "Hello?"
4. Ghost should respond!

---

## Troubleshooting

### "CORS Error"
**Fix:** Update `FRONTEND_URL` in backend environment variables

### "Cannot connect to database"
**Fix:** 
1. Check MongoDB Atlas connection string
2. Whitelist all IPs (0.0.0.0/0)
3. Check database user permissions

### "API not found"
**Fix:** Check `VITE_API_URL` in frontend `.env.production`

### "Function timeout"
**Fix:** Vercel free tier has 10s timeout. Reduce `MAX_LINKS_TO_CHECK` in backend env

---

## Environment Variables Reference

### Backend (Vercel Dashboard)
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/digital-purgatory
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
PORT=5000
LLM_API_KEY=optional
LLM_API_URL=https://api.openai.com/v1/chat/completions
WAYBACK_API_URL=https://archive.org/wayback/available
SCAN_TIMEOUT=30000
MAX_LINKS_TO_CHECK=50
```

### Frontend (.env.production)
```
VITE_API_URL=https://your-backend.vercel.app/api
```

---

## Commands Cheat Sheet

```bash
# Deploy backend
cd backend && vercel --prod

# Deploy frontend
cd frontend && vercel --prod

# View logs
vercel logs

# List deployments
vercel ls

# Remove deployment
vercel rm deployment-url
```

---

## Alternative: One-Click Deploy

### Using Vercel Button

Add to your GitHub README:

```markdown
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/digital-purgatory)
```

---

**Your haunted graveyard is now live on the internet! 👻🌍**
