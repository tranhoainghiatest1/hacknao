# DESIGN SYSTEM: HACK NÃO 1500 (IMPECCABLE STANDARD)

Hệ thống thiết kế chuẩn hóa được xây dựng theo triết lý **Impeccable UI/UX** cho ứng dụng Fullstack Hack Não 1500.

---

## 🎨 1. Bảng Màu (Color Palette Tokens)

### Dark Theme (Mặc định)
| Token | Giá trị HSL / Hex | Mục đích sử dụng |
| :--- | :--- | :--- |
| `--bg-primary` | `#0b0f19` | Nền canvas chính |
| `--bg-secondary` | `#111827` | Nền modal và sidebar |
| `--bg-card` | `rgba(30, 41, 59, 0.65)` | Nền thẻ có hiệu ứng kính làm mờ (Glassmorphism) |
| `--primary` | `#6366f1` (Indigo) | Màu nhấn thương hiệu, nút chính, active tab |
| `--secondary` | `#06b6d4` (Cyan) | Màu bổ trợ, từ vựng mới |
| `--accent-green`| `#10b981` (Emerald) | Trạng thái Đã thuộc (Mastered), thông báo thành công |
| `--accent-amber`| `#f59e0b` (Amber) | Trạng thái Đang học (Learning), Mẹo âm thanh tương tự |
| `--accent-rose` | `#f43f5e` (Rose) | Trạng thái Xóa, Cảnh báo lỗi nguy hiểm |

### Phân Loại Từ Loại (Word Type Badges)
- **Động từ (Verb):** `#fb923c` (Cam ấm) trên nền `rgba(249, 115, 22, 0.12)`
- **Danh từ (Noun):** `#60a5fa` (Xanh biển) trên nền `rgba(59, 130, 246, 0.12)`
- **Tính từ (Adjective):** `#34d399` (Xanh ngọc) trên nền `rgba(16, 185, 129, 0.12)`
- **Trạng từ (Adverb):** `#c084fc` (Tím nhạt) trên nền `rgba(168, 85, 247, 0.12)`

---

## ✍️ 2. Typography & Hierarchy
- **Primary Font:** `'Plus Jakarta Sans', -apple-system, sans-serif` — Mang lại cảm giác hiện đại, thanh thoát và dễ đọc ở mọi kích cỡ màn hình.
- **Monospace Font:** `'JetBrains Mono', monospace` — Dành cho số thứ tự từ vựng `#01`, phiên âm quốc tế IPA `/əˈdɪʃ.ən.əl/`, phím tắt bàn phím `<kbd>`.

---

## ⚡ 3. Micro-Interactions & Hardening
1. **Focus Rings:** Mọi phần tử tương tác đều có `focus-visible: 0 0 0 3px rgba(99, 102, 241, 0.4)` giúp người dùng di chuyển hoàn toàn bằng phím Tab.
2. **Keyboard Esc:** Nhấn phím `ESC` đóng mọi cửa sổ Modal đang mở.
3. **Soundwave Indicator:** Hiển thị hiệu ứng sóng âm khi hệ thống đang phát âm tiếng Anh.
4. **Copy-to-Clipboard:** Bấm 1 chạm để sao chép từ vựng hoặc câu ví dụ với thông báo Toast phản hồi tức thời.
5. **Quiz Shortcuts:** Hỗ trợ phím số `1`, `2`, `3`, `4` để chọn nhanh 4 đáp án trắc nghiệm.
