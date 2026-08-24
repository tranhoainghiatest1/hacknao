---
name: impeccable
description: Bộ quy chuẩn và kỹ năng thẩm mỹ thiết kế giao diện (Impeccable Design Skill) cho AI coding. Sử dụng khi cần polish, audit, layout, harden và nâng tầm trải nghiệm UI/UX của ứng dụng.
---

# Impeccable Design Skill & Rules

Quy chuẩn thiết kế giao diện chất lượng cao, loại bỏ các anti-pattern "giao diện mùi AI" và nâng cao trải nghiệm người dùng thực tế.

## 1. Triết Lý Cốt Lõi (Core Principles)
1. **Purpose over Decoration:** Mọi hiệu ứng, màu sắc, animation đều phải phục vụ mục đích truyền tải thông tin, không thêm thắt vô nghĩa.
2. **Visual Hierarchy & Rhythm:** Phân cấp thông tin rõ ràng bằng kích thước font chữ, độ đậm (font-weight), và khoảng cách (spacing), không dựa dẫm vào quá nhiều khung viền/cards.
3. **Accessibility First (WCAG AA/AAA):** Độ tương phản văn bản luôn đạt chuẩn tối thiểu 4.5:1. Mọi phần tử tương tác đều phải hỗ trợ bàn phím (`:focus-visible`), `aria-*` tags.
4. **Resilience & Hardening:** Xử lý triệt để các trạng thái biên: văn bản quá dài (ellipsis/wrapping), dữ liệu rỗng (empty state), đang tải (loading state), lỗi kết nối (error state), và ngăn chặn submit đúp (`disabled={loading}`).

## 2. Các Quy Chuẩn Thiết Kế Cụ Thể

### A. Typography
- Tránh dùng font mặc định đơn điệu; ưu tiên các font hiện đại như **Plus Jakarta Sans**, **Outfit**, **Inter**, kết hợp cùng **JetBrains Mono** cho dữ liệu mã số / phiên âm.
- Thiết lập tỉ lệ phân cấp rõ rệt: Heading 1 (2rem - 2.5rem), Heading 2 (1.5rem - 1.75rem), Body (0.95rem - 1rem), Meta/Caption (0.75rem - 0.85rem).

### B. Màu Sắc & Độ Tương Phản (Color & Contrast)
- Tránh lạm dụng gradient tím-xanh ngẫu nhiên. Sử dụng bảng màu có ý đồ:
  - **Primary:** Màu thương hiệu chủ đạo (ví dụ Indigo / Cyan)
  - **Success / Mastered:** Xanh lá ngọc (Emerald / Mint)
  - **Warning / Learning:** Vàng hổ phách (Amber / Honey)
  - **Danger / Reset:** Đỏ hoa hồng (Rose / Crimson)
- Giữ nền tối (Dark mode) sâu và dễ chịu (Slate/Navy đậm), nền sáng (Light mode) sạch sẽ, tránh nền trắng bệch chói mắt.

### C. Bố Cục & Khoảng Cách (Spatial & Spacing)
- Tuân theo hệ thống lưới 4px / 8px (4, 8, 12, 16, 20, 24, 32, 48px).
- Tránh bọc card lồng trong card ("Cardception"). Dùng divider tinh tế hoặc khoảng trắng (whitespace) để phân tách nội dung.

### D. Tương Tác & Phản Hồi (Interaction & Feedback)
- Tất cả các nút bấm khi click hoặc hover phải có micro-transition mượt mà (0.15s - 0.2s cubic-bezier).
- Bấm phím **ESC** để đóng bất kỳ modal nào.
- Thao tác xóa / nguy hiểm luôn có bước xác nhận an toàn.
- Cung cấp Toast Notification tức thời sau mỗi thao tác thành công hoặc thất bại.

## 3. Các Lệnh Điều Khiển Thẩm Mỹ (Design Commands)
- `/impeccable polish`: Rà soát và tinh chỉnh viền, padding, font-weight, màu sắc trước khi xuất bản.
- `/impeccable quieter`: Giảm bớt các hiệu ứng dư thừa, làm dịu mắt và tăng tính thanh lịch.
- `/impeccable bolder`: Tăng cường điểm nhấn thị giác cho các thành phần quan trọng (CTA, Title).
- `/impeccable harden`: Xử lý triệt để loading, disabled states, error boundaries và accessibility.
- `/impeccable audit`: Kiểm tra độ tương phản, responsive mobile, touch targets.
