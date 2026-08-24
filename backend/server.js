import express from 'express';
import cors from 'cors';
import path from 'path';
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

app.listen(PORT, async () => {
  console.log('====================================================');
  console.log(`🚀 Backend Express API đang chạy tại: http://localhost:${PORT}`);
  console.log(`🗄️  Cơ sở dữ liệu: MySQL [${process.env.DB_NAME || 'hacknao_db'}] trên ${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 3306}`);
  console.log('====================================================');
  
  await initDatabase();
});
