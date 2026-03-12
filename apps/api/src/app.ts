import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { healthRouter } from './routes/health';

const app = express();

// Security
app.use(helmet());
app.use(
  cors({
    origin: process.env['CORS_ORIGIN'] ?? 'http://localhost:5173',
    credentials: true,
  })
);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', healthRouter);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, data: null, error: { code: 'NOT_FOUND', message: 'Route not found' } });
});

export default app;
