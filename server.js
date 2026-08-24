const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const { initDatabase, getStatus } = require('./config/db');
const vocabRoutes = require('./routes/vocabRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static frontend
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

// Single Page Application Fallback
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return next();
  }
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server & Auto-init MySQL
app.listen(PORT, async () => {
  console.log('====================================================');
  console.log(`🚀 Web CRUD Hack Não 1500 đang chạy tại: http://localhost:${PORT}`);
  console.log(`⚙️  Môi trường: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🗄️  Cơ sở dữ liệu: MySQL [${process.env.DB_NAME || 'hacknao_db'}] trên ${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 3306}`);
  console.log('====================================================');
  
  // Tự động kiểm tra và khởi tạo Database
  await initDatabase();
});
