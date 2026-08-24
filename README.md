# 🧠 HACK NÃO 1500 - FULLSTACK CRUD (REACT 19 + EXPRESS + MYSQL XAMPP)

Hệ thống quản lý và học từ vựng tiếng Anh theo phương pháp **Hack Não 1500** (Âm thanh tương tự, Flashcard 3D, Trắc nghiệm Quiz, Sách PDF, Phát âm Web Speech API bản xứ).

---

## 📁 Cấu Trúc Dự Án

```
f:\hacknao\
├── backend/                  # REST API Express + MySQL (XAMPP)
│   ├── .env                  # Cấu hình MySQL & Port 5000
│   ├── config/               # MySQL Connection Pool & Auto-seed
│   ├── controllers/          # CRUD, Live Search, Stats, Import/Export
│   ├── routes/               # API endpoints
│   ├── data/                 # File dữ liệu từ vựng gốc hacknao_vocab.json
│   ├── scripts/              # Script khởi tạo DB & trích xuất sách PDF
│   ├── public/pages/         # Ảnh các trang sách PDF
│   ├── server.js             # Server Express
│   └── package.json
│
├── frontend/                 # Giao diện React 19 + Vite
│   ├── src/
│   │   ├── components/       # Các React components (Navbar, Cards, Modals...)
│   │   ├── hooks/            # Custom Hook useSpeech phát âm
│   │   ├── App.jsx           # State Orchestrator
│   │   ├── index.css         # Glassmorphism Design System & Theme
│   │   └── main.jsx          # Entry point React 19
│   ├── vite.config.js        # Cấu hình Vite & Proxy tới backend
│   ├── index.html
│   └── package.json
│
└── package.json              # Điều phối chạy song song backend & frontend
```

---

## 🚀 Hướng Dẫn Khởi Chạy

### 1. Bật MySQL trong XAMPP
- Mở **XAMPP Control Panel** ➔ Bấm **Start** ở dòng **MySQL**.

### 2. Khởi chạy toàn bộ dự án
Mở Terminal tại thư mục `f:\hacknao\` và chạy lệnh duy nhất:
```bash
npm run dev
```
*(Hoặc `npm start`)*

Hệ thống sẽ tự động:
- Khởi chạy **Express Backend** tại: `http://localhost:5000`
- Khởi chạy **React 19 Frontend** tại: `http://localhost:3000`

---

## 🛠️ Các Lệnh Khác

| Lệnh | Mô Tả |
| :--- | :--- |
| `npm run dev` | Chạy song song cả Backend và Frontend |
| `npm run dev:backend` | Chỉ chạy Backend (Express) |
| `npm run dev:frontend` | Chỉ chạy Frontend (React 19 Vite) |
| `npm run build` | Build bản tối ưu cho Frontend |
| `npm run db:init` | Khởi tạo lại database MySQL và bảng dữ liệu |
| `npm run db:seed` | Nạp lại dữ liệu từ vựng mẫu từ file JSON vào MySQL |
