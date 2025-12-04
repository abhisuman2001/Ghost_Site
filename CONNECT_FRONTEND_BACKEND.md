# 🔗 Connecting Frontend & Backend on Vercel

## Step-by-Step Connection Guide

### Overview
```
Frontend (Vercel) --API calls--> Backend (Vercel) --queries--> MongoDB Atlas
```

---

## Step 1: Deploy Backend First

### 1.1 Deploy Backend to Vercel
```bash
cd backend
vercel
```

When prompted:
- Project name: `digital-purgatory-api` (or any name)
- Directory: `./`

### 1.2 Note Your Backend URL
After deployment, you'll get a URL like:
```
https://digital-purgatory-api.vercel.app
```

**Save this URL!** You'll need it for the frontend.

### 1.3 Set Backend Environment Variables

Go to: **Vercel Dashboard → Your Backend Project → Settings → Environment Variables**

Add these variables:

| Variable | Value | Example |
|----------|-------|---------|
| `MONGODB_URI` | Your MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/digital-purgatory` |
| `NODE_ENV` | `production` | `production` |
| `FRONTEND_URL` | Leave empty for now | (will add in Step 3) |
| `PORT` | `5000` | `5000` |
| `SCAN_TIMEOUT` | `30000` | `30000` |
| `MAX_LINKS_TO_CHECK` | `50` | `50` |

### 1.4 Redeploy Backend
```bash
vercel --prod
```

### 1.5 Test Backend
```bash
curl https://your-backend-url.vercel.app/api/health
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

✅ **Backend is ready!**

---

## Step 2: Configure Frontend

### 2.1 Update Frontend Environment

Create `frontend/.env.production` file:

```bash
cd frontend

# Create production environment file
cat > .env.production << EOF
VITE_API_URL=https://your-backend-url.vercel.app/api
EOF
```

**Replace `your-backend-url` with your actual backend URL from Step 1.2!**

Example:
```env
VITE_API_URL=https://digital-purgatory-api.vercel.app/api
```

### 2.2 Verify the File
```bash
cat .env.production
```

Should show:
```
VITE_API_URL=https://digital-purgatory-api.vercel.app/api
```

---

## Step 3: Deploy Frontend

### 3.1 Deploy Frontend to Vercel
```bash
cd frontend
vercel
```

When prompted:
- Project name: `digital-purgatory` (or any name)
- Directory: `./`

### 3.2 Note Your Frontend URL
After deployment, you'll get a URL like:
```
https://digital-purgatory.vercel.app
```

### 3.3 Deploy to Production
```bash
vercel --prod
```

✅ **Frontend is deployed!**

---

## Step 4: Update Backend CORS

Now that you have your frontend URL, update the backend to allow requests from it.

### 4.1 Add Frontend URL to Backend

Go to: **Vercel Dashboard → Backend Project → Settings → Environment Variables**

Update or add:
```
FRONTEND_URL = https://your-frontend-url.vercel.app
```

Example:
```
FRONTEND_URL = https://digital-purgatory.vercel.app
```

### 4.2 Redeploy Backend
```bash
cd backend
vercel --prod
```

✅ **Connection complete!**

---

## Step 5: Test the Connection

### 5.1 Open Your Frontend
Visit: `https://your-frontend-url.vercel.app`

### 5.2 Test URL Scanner
1. Enter: `https://httpstat.us/404`
2. Click "SCAN FOR DEAD LINKS"
3. Should see a tombstone appear! ⚰️

### 5.3 Test Séance
1. Click "SUMMON SPIRIT" on the tombstone
2. Type: "Hello?"
3. Ghost should respond! 👻

### 5.4 Check Browser Console
Press F12 → Console tab

Should see:
```
🎃 Initiating scan...
👻 Scan complete: {data: {...}}
```

No CORS errors!

---

## Troubleshooting

### Problem: CORS Error in Browser Console

**Error:**
```
Access to XMLHttpRequest at 'https://backend.vercel.app/api/scan' 
from origin 'https://frontend.vercel.app' has been blocked by CORS policy
```

**Solution:**

1. **Check Backend Environment Variables**
   - Go to Backend Vercel Dashboard
   - Settings → Environment Variables
   - Verify `FRONTEND_URL` is set correctly
   - Should be: `https://your-frontend-url.vercel.app`

2. **Redeploy Backend**
   ```bash
   cd backend
   vercel --prod
   ```

3. **Alternative: Allow Multiple Origins**
   
   Edit `backend/server.js`:
   ```javascript
   app.use(cors({
     origin: [
       'http://localhost:3000',
       'https://your-frontend.vercel.app',
       process.env.FRONTEND_URL
     ],
     credentials: true
   }));
   ```

### Problem: API Not Found (404)

**Error:**
```
GET https://backend.vercel.app/api/scan 404 (Not Found)
```

**Solution:**

1. **Check Frontend .env.production**
   ```bash
   cd frontend
   cat .env.production
   ```
   
   Should have:
   ```
   VITE_API_URL=https://your-backend.vercel.app/api
   ```

2. **Rebuild Frontend**
   ```bash
   vercel --prod
   ```

3. **Test Backend Directly**
   ```bash
   curl https://your-backend.vercel.app/api/health
   ```

### Problem: MongoDB Connection Error

**Error in Vercel Logs:**
```
MongoDB connection error: MongoServerError
```

**Solution:**

1. **Check MongoDB Atlas**
   - Go to MongoDB Atlas Dashboard
   - Network Access → Add IP Address
   - Allow access from anywhere: `0.0.0.0/0`

2. **Check Connection String**
   - Database → Connect → Connect your application
   - Copy connection string
   - Replace `<password>` with actual password
   - Update `MONGODB_URI` in Vercel

3. **Verify Database User**
   - Database Access → Database Users
   - Ensure user has read/write permissions

### Problem: Environment Variables Not Working

**Solution:**

1. **Check Variable Names**
   - Backend: `MONGODB_URI`, `FRONTEND_URL`, `NODE_ENV`
   - Frontend: `VITE_API_URL` (must start with `VITE_`)

2. **Redeploy After Adding Variables**
   ```bash
   vercel --prod
   ```

3. **Check Vercel Logs**
   ```bash
   vercel logs
   ```

---

## Quick Reference

### Backend Environment Variables
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/digital-purgatory
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
PORT=5000
SCAN_TIMEOUT=30000
MAX_LINKS_TO_CHECK=50
```

### Frontend Environment Variables
```
VITE_API_URL=https://your-backend.vercel.app/api
```

### Test Commands
```bash
# Test backend health
curl https://your-backend.vercel.app/api/health

# Test backend scan
curl -X POST https://your-backend.vercel.app/api/scan \
  -H "Content-Type: application/json" \
  -d '{"url":"https://httpstat.us/404"}'

# View backend logs
cd backend && vercel logs

# View frontend logs
cd frontend && vercel logs
```

---

## Complete Checklist

- [ ] Backend deployed to Vercel
- [ ] Backend URL noted
- [ ] MongoDB Atlas connection string added to backend
- [ ] Backend environment variables set
- [ ] Backend health check works
- [ ] Frontend `.env.production` created with backend URL
- [ ] Frontend deployed to Vercel
- [ ] Frontend URL noted
- [ ] Frontend URL added to backend `FRONTEND_URL`
- [ ] Backend redeployed with CORS update
- [ ] Frontend can scan URLs
- [ ] Séance chat works
- [ ] No CORS errors in browser console

---

## Visual Connection Flow

```
┌─────────────────────────────────────────────────────────────┐
│  1. User visits Frontend                                     │
│     https://digital-purgatory.vercel.app                    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ Reads VITE_API_URL from .env.production
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  2. Frontend makes API call                                  │
│     POST https://digital-purgatory-api.vercel.app/api/scan  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ CORS check: Is origin allowed?
                     │ (checks FRONTEND_URL env var)
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  3. Backend processes request                                │
│     - Validates URL                                          │
│     - Scans for dead links                                   │
│     - Queries MongoDB                                        │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ Returns JSON response
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  4. Frontend displays result                                 │
│     - Shows tombstone or pulse                               │
│     - Enables séance button                                  │
└─────────────────────────────────────────────────────────────┘
```

---

**Your frontend and backend are now connected! The graveyard is fully operational! 👻⚰️**
