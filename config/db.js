const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'hacknao_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
};

let pool = null;
let isConnected = false;
let connectionError = null;

// In-memory / file fallback store when MySQL is offline
let memoryStore = [];

function loadMemoryData() {
  try {
    const dataPath = path.join(__dirname, '../data/hacknao_vocab.json');
    if (fs.existsSync(dataPath)) {
      const raw = fs.readFileSync(dataPath, 'utf-8');
      memoryStore = JSON.parse(raw).map((item, idx) => ({
        id: idx + 1,
        ...item,
        created_at: new Date().toISOString()
      }));
    }
  } catch (err) {
    console.error('[Memory Store] Lỗi tải dữ liệu fallback:', err);
  }
}

// Initial load for fallback
loadMemoryData();

/**
 * Khởi tạo cơ sở dữ liệu và bảng vocabularies
 */
async function initDatabase() {
  try {
    // 1. Kết nối tới MySQL Server
    const serverConnection = await mysql.createConnection({
      host: DB_CONFIG.host,
      port: DB_CONFIG.port,
      user: DB_CONFIG.user,
      password: DB_CONFIG.password
    });

    console.log(`[MySQL] Đang kết nối tới MySQL Server (${DB_CONFIG.host}:${DB_CONFIG.port})...`);

    // 2. Tạo Database nếu chưa tồn tại
    await serverConnection.query(
      `CREATE DATABASE IF NOT EXISTS \`${DB_CONFIG.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
    );
    console.log(`[MySQL] Database "${DB_CONFIG.database}" đã sẵn sàng.`);
    await serverConnection.end();

    // 3. Khởi tạo Connection Pool với Database
    pool = mysql.createPool(DB_CONFIG);

    // 4. Tạo bảng vocabularies nếu chưa tồn tại
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS \`vocabularies\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`word_number\` INT NULL,
        \`word\` VARCHAR(100) NOT NULL,
        \`phonetic\` VARCHAR(100) NULL,
        \`word_type\` VARCHAR(50) DEFAULT 'noun',
        \`meaning_vi\` VARCHAR(255) NOT NULL,
        \`sound_bridge\` TEXT NULL,
        \`definition_en\` TEXT NULL,
        \`example_en\` TEXT NULL,
        \`example_vi\` TEXT NULL,
        \`unit\` INT DEFAULT 1,
        \`unit_title\` VARCHAR(150) NULL,
        \`category\` VARCHAR(100) DEFAULT 'General',
        \`page_number\` INT NULL,
        \`image_url\` VARCHAR(255) NULL,
        \`status\` ENUM('new', 'learning', 'mastered') DEFAULT 'new',
        \`note\` TEXT NULL,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_word (\`word\`),
        INDEX idx_unit (\`unit\`),
        INDEX idx_status (\`status\`),
        INDEX idx_category (\`category\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    await pool.query(createTableQuery);
    console.log(`[MySQL] Bảng "vocabularies" đã sẵn sàng.`);

    // 5. Kiểm tra dữ liệu khởi tạo (Seed if empty)
    const [rows] = await pool.query('SELECT COUNT(*) as count FROM vocabularies');
    if (rows[0].count === 0) {
      console.log('[MySQL] Bảng chưa có dữ liệu. Đang nạp dữ liệu Hack Não 1500 ban đầu...');
      await seedDefaultData();
    } else {
      console.log(`[MySQL] Hiện có ${rows[0].count} từ vựng trong cơ sở dữ liệu MySQL.`);
    }

    isConnected = true;
    connectionError = null;
    return pool;
  } catch (error) {
    isConnected = false;
    connectionError = error.message;
    console.log('[MySQL Info] Hiện chưa kết nối tới MySQL XAMPP.');
    console.log('👉 Khi bạn mở XAMPP và nhấn "Start" MySQL, hệ thống sẽ tự động đồng bộ sang MySQL.');
    return null;
  }
}

/**
 * Nạp dữ liệu mặc định từ file data/hacknao_vocab.json
 */
async function seedDefaultData() {
  try {
    const dataPath = path.join(__dirname, '../data/hacknao_vocab.json');
    if (!fs.existsSync(dataPath)) {
      console.warn('[Seed] Không tìm thấy file dữ liệu data/hacknao_vocab.json');
      return;
    }

    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const vocabList = JSON.parse(rawData);

    if (!Array.isArray(vocabList) || vocabList.length === 0) {
      console.warn('[Seed] File dữ liệu rỗng.');
      return;
    }

    if (!pool) return;

    const insertQuery = `
      INSERT INTO vocabularies 
      (word_number, word, phonetic, word_type, meaning_vi, sound_bridge, definition_en, example_en, example_vi, unit, unit_title, category, page_number, image_url, status)
      VALUES ?
    `;

    const values = vocabList.map(v => [
      v.word_number || null,
      v.word,
      v.phonetic || '',
      v.word_type || 'noun',
      v.meaning_vi,
      v.sound_bridge || '',
      v.definition_en || '',
      v.example_en || '',
      v.example_vi || '',
      v.unit || 1,
      v.unit_title || `Unit ${v.unit || 1}`,
      v.category || 'General',
      v.page_number || null,
      v.image_url || null,
      v.status || 'new'
    ]);

    await pool.query(insertQuery, [values]);
    console.log(`[Seed] Đã nạp thành công ${vocabList.length} từ vựng vào MySQL!`);
  } catch (err) {
    console.error('[Seed Error] Lỗi khi nạp dữ liệu ban đầu:', err);
  }
}

/**
 * Lấy Pool kết nối hoặc thử kết nối lại
 */
async function getPool() {
  if (!pool || !isConnected) {
    await initDatabase();
  }
  return pool;
}

/**
 * Kiểm tra trạng thái kết nối MySQL
 */
function getStatus() {
  return {
    connected: isConnected,
    database: DB_CONFIG.database,
    host: DB_CONFIG.host,
    port: DB_CONFIG.port,
    user: DB_CONFIG.user,
    error: connectionError
  };
}

function getMemoryStore() {
  return memoryStore;
}

function saveMemoryStore(data) {
  memoryStore = data;
}

module.exports = {
  initDatabase,
  getPool,
  getStatus,
  seedDefaultData,
  getMemoryStore,
  saveMemoryStore,
  loadMemoryData,
  DB_CONFIG
};
