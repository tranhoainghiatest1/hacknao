import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seedAiven() {
  console.log('🚀 Đang kết nối tới Aiven Cloud MySQL...');
  
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'hacknao-hacknao.b.aivencloud.com',
    port: parseInt(process.env.DB_PORT || '27276', 10),
    user: process.env.DB_USER || 'avnadmin',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'defaultdb',
    ssl: { rejectUnauthorized: false },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: 'utf8mb4'
  });

  try {
    console.log('🛠️  Đang tạo bảng "vocabularies" trên Aiven...');
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

    console.log('📖 Đang đọc dữ liệu 1,422 từ vựng từ hacknao_vocab.json...');
    const jsonPath = path.join(__dirname, '../data/hacknao_vocab.json');
    const raw = fs.readFileSync(jsonPath, 'utf-8');
    const vocabList = JSON.parse(raw);

    console.log('🧹 Làm sạch dữ liệu cũ trên bảng...');
    await pool.query('TRUNCATE TABLE vocabularies;');

    console.log(`📥 Đang nạp ${vocabList.length} từ vựng lên Aiven Cloud MySQL...`);
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

    const [countRes] = await pool.query('SELECT COUNT(*) AS total FROM vocabularies;');
    console.log(`🎉 NẠP THÀNH CÔNG ${countRes[0].total} TỪ VỰNG LÊN CLOUD AIVEN!`);

    await pool.end();
  } catch (err) {
    console.error('❌ Lỗi nạp dữ liệu:', err);
    await pool.end();
  }
}

seedAiven();
