# Hack Não 1500 Từ Vựng Tiếng Anh - Full-Stack CRUD & Flashcard Web App

Ứng dụng Web Quản lý & Học Từ Vựng Hack Não 1500 Tiếng Anh với giao diện hiện đại, tính năng CRUD đầy đủ, âm thanh phát âm, Flashcard 3D, Quiz luyện tập và thống kê học tập.

## 🚀 Công nghệ sử dụng
- **Backend**: Node.js, Express.js
- **Database**: MySQL (XAMPP / Standalone) với thư viện `mysql2/promise`
- **Frontend**: HTML5, CSS3 (Glassmorphism & Neumorphism, Responsive), Vanilla JavaScript
- **API**: RESTful API CRUD + Phát âm Web Speech API / Từ điển

## 📦 Cài đặt và Chạy dự án

1. **Cài đặt dependencies**:
   ```bash
   npm install
   ```

2. **Cấu hình cơ sở dữ liệu (`.env`)**:
   Tạo file `.env` từ `.env.example`:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=
   DB_NAME=hacknao_db
   ```

3. **Khởi tạo Database & Dữ liệu mẫu**:
   ```bash
   # Khởi tạo bảng dữ liệu
   npm run db:init

   # Nạp dữ liệu 50 Unit từ vựng mẫu
   npm run db:seed
   ```

4. **Chạy ứng dụng**:
   ```bash
   npm start
   # Hoặc chế độ dev watcher:
   npm run dev
   ```

5. **Truy cập**:
   Mở trình duyệt tại `http://localhost:3000`
