import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { initDatabase, getStatus } from './config/db.js';
import vocabRoutes from './routes/vocabRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static assets like extracted page images
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/vocabularies', vocabRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: getStatus()
  });
});

// Serve frontend dist when deployed (Production Single Service)
const frontendDist = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendDist));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/pages')) {
    return next();
  }
  const indexPath = path.join(frontendDist, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Backend API is running. Build frontend with `npm run build` to view the UI.');
  }
});

app.listen(PORT, async () => {
  console.log('====================================================');
  console.log(`🚀 Backend Express API đang chạy tại: http://localhost:${PORT}`);
  console.log(`🗄️  Cơ sở dữ liệu: MySQL [${process.env.DB_NAME || 'hacknao_db'}] trên ${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 3306}`);
  console.log('====================================================');
  
  await initDatabase();
});
