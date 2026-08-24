import { getPool, seedDefaultData } from '../config/db.js';

async function run() {
  console.log('--- NẠP DỮ LIỆU TỪ VỰNG HACK NÃO 1500 VÀO MYSQL ---');
  const pool = await getPool();
  if (pool) {
    await seedDefaultData();
    console.log('✅ Hoàn tất nạp dữ liệu vào MySQL!');
    process.exit(0);
  } else {
    console.error('❌ Không thể kết nối tới MySQL. Hãy chắc chắn XAMPP MySQL đang chạy.');
    process.exit(1);
  }
}

run();
