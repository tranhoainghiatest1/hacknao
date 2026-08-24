import { initDatabase } from '../config/db.js';

async function run() {
  console.log('--- KHỞI TẠO CƠ SỞ DỮ LIỆU MYSQL (XAMPP) ---');
  const pool = await initDatabase();
  if (pool) {
    console.log('✅ Khởi tạo cơ sở dữ liệu MySQL thành công!');
    process.exit(0);
  } else {
    console.error('❌ Không thể kết nối tới MySQL. Hãy chắc chắn XAMPP MySQL đang chạy.');
    process.exit(1);
  }
}

run();
