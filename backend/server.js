import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import { sendSuccess, sendError, getSpookyStatus } from './utils/responseHelper.js';
import scanRoutes from './routes/scanRoutes.js';
import seanceRoutes from './routes/seanceRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware with spooky emojis
app.use((req, res, next) => {
  console.log(`🕯️ ${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Basic health check route with spooky status
app.get('/api/health', (req, res) => {
  sendSuccess(res, {
    status: 'ok',
    message: 'Digital Purgatory API is running',
    timestamp: new Date().toISOString()
  }, 200, 'The graveyard keeper is awake...');
});

// API Routes
app.use('/api', scanRoutes);
app.use('/api', seanceRoutes);

// 404 handler with gravedigger persona
app.use((req, res) => {
  sendError(res, 'NOT_FOUND', 404, { path: req.path });
});

// Global error handler with spooky responses
app.use((err, req, res, next) => {
  console.error('💀 Error:', err);
  
  const statusCode = err.statusCode || 500;
  
  res.status(statusCode).json({
    spooky_status: getSpookyStatus(),
    error: {
      message: err.message || "Something unholy happened in the graveyard! I need to consult the elder spirits about this!",
      code: err.code || 'INTERNAL_ERROR',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
});

// Connect to database and start server
const startServer = async () => {
  try {
    await connectDB();
    
    // Only start server if not in Vercel serverless environment
    if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
      app.listen(PORT, () => {
        console.log(`🎃 Digital Purgatory server running on port ${PORT}`);
        console.log(`👻 Environment: ${process.env.NODE_ENV || 'development'}`);
      });
    } else {
      console.log('🎃 Digital Purgatory API ready for Vercel serverless');
    }
  } catch (error) {
    console.error('Failed to start server:', error);
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
};

startServer();

// Export for Vercel serverless
export default app;
