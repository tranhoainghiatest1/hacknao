import React, { useState, useEffect } from 'react';
import { X, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

const PAGE_OPTIONS = [
  { value: 1, label: 'Trang 1 - Bìa sách Hack Não 1500' },
  { value: 8, label: 'Trang 8 - Phương pháp 3 trong 1' },
  { value: 11, label: 'Trang 11 - Unit 1: Truyện chêm' },
  { value: 14, label: 'Trang 14 - Unit 1: Từ vựng 01-04' },
  { value: 20, label: 'Trang 20 - Unit 1: Tổng kết từ vựng' },
  { value: 21, label: 'Trang 21 - Unit 2: Truyện chêm' },
  { value: 24, label: 'Trang 24 - Unit 2: Từ vựng 01-04' },
  { value: 30, label: 'Trang 30 - Unit 2: Tổng kết từ vựng' },
  { value: 31, label: 'Trang 31 - Unit 3: Truyện chêm' },
  { value: 34, label: 'Trang 34 - Unit 3: Từ vựng 01-05' },
  { value: 40, label: 'Trang 40 - Unit 3: Tổng kết từ vựng' },
  { value: 41, label: 'Trang 41 - Unit 4: Truyện chêm' },
  { value: 44, label: 'Trang 44 - Unit 4: Từ vựng 01-05' },
  { value: 50, label: 'Trang 50 - Unit 4: Tổng kết từ vựng' },
  { value: 51, label: 'Trang 51 - Unit 5: Truyện chêm' },
  { value: 53, label: 'Trang 53 - Unit 5: Từ vựng 01-04' },
  { value: 59, label: 'Trang 59 - Unit 5: Tổng kết từ vựng' },
  { value: 60, label: 'Trang 60 - Unit 6: Truyện chêm' },
  { value: 62, label: 'Trang 62 - Unit 6: Từ vựng 01-04' },
  { value: 68, label: 'Trang 68 - Unit 6: Tổng kết từ vựng' },
  { value: 69, label: 'Trang 69 - Unit 7: Truyện chêm' },
  { value: 71, label: 'Trang 71 - Unit 7: Từ vựng 01-05' },
  { value: 76, label: 'Trang 76 - Unit 7: Tổng kết từ vựng' },
  { value: 77, label: 'Trang 77 - Unit 8: Truyện chêm' },
  { value: 79, label: 'Trang 79 - Unit 8: Từ vựng 01-05' },
  { value: 86, label: 'Trang 86 - Unit 8: Tổng kết từ vựng' },
  { value: 87, label: 'Trang 87 - Unit 9: Truyện chêm' },
  { value: 89, label: 'Trang 89 - Unit 9: Từ vựng 01-05' },
  { value: 95, label: 'Trang 95 - Unit 9: Tổng kết từ vựng' },
  { value: 96, label: 'Trang 96 - Unit 10: Truyện chêm' },
  { value: 98, label: 'Trang 98 - Unit 10: Từ vựng 01-05' },
  { value: 105, label: 'Trang 105 - Unit 10: Tổng kết từ vựng' },
  { value: 106, label: 'Trang 106 - Unit 11 (Work 1): Truyện chêm' },
  { value: 109, label: 'Trang 109 - Unit 11: Từ vựng 01-04' },
  { value: 114, label: 'Trang 114 - Unit 11: Tổng kết từ vựng' },
  { value: 115, label: 'Trang 115 - Unit 12 (Work 2): Truyện chêm' },
  { value: 118, label: 'Trang 118 - Unit 12: Từ vựng 01-04' },
  { value: 124, label: 'Trang 124 - Unit 12: Tổng kết từ vựng' },
  { value: 125, label: 'Trang 125 - Unit 13 (Work 3): Truyện chêm' },
  { value: 128, label: 'Trang 128 - Unit 13: Từ vựng 01-04' },
  { value: 134, label: 'Trang 134 - Unit 13: Tổng kết từ vựng' },
  { value: 135, label: 'Trang 135 - Unit 14 (Work 4): Truyện chêm' },
  { value: 138, label: 'Trang 138 - Unit 14: Từ vựng 01-04' },
  { value: 143, label: 'Trang 143 - Unit 14: Tổng kết từ vựng' },
  { value: 144, label: 'Trang 144 - Unit 15 (Personality 1): Truyện chêm' },
  { value: 147, label: 'Trang 147 - Unit 15: Từ vựng 01-04' },
  { value: 152, label: 'Trang 152 - Unit 15: Tổng kết từ vựng' },
  { value: 153, label: 'Trang 153 - Unit 16 (Personality 2): Truyện chêm' },
  { value: 156, label: 'Trang 156 - Unit 16: Từ vựng 01-04' },
  { value: 161, label: 'Trang 161 - Unit 16: Tổng kết từ vựng' },
  { value: 162, label: 'Trang 162 - Unit 17 (Personality 3): Truyện chêm' },
  { value: 165, label: 'Trang 165 - Unit 17: Từ vựng 01-04' },
  { value: 170, label: 'Trang 170 - Unit 17: Tổng kết từ vựng' },
  { value: 171, label: 'Trang 171 - Unit 18 (Home 1): Truyện chêm' },
  { value: 174, label: 'Trang 174 - Unit 18: Từ vựng 01-04' },
  { value: 179, label: 'Trang 179 - Unit 18: Tổng kết từ vựng' },
  { value: 180, label: 'Trang 180 - Unit 19 (Home 2): Truyện chêm' },
  { value: 183, label: 'Trang 183 - Unit 19: Từ vựng 01-04' },
  { value: 188, label: 'Trang 188 - Unit 19: Tổng kết từ vựng' },
  { value: 189, label: 'Trang 189 - Unit 20 (Relationship 1): Truyện chêm' },
  { value: 192, label: 'Trang 192 - Unit 20: Từ vựng 01-04' },
  { value: 197, label: 'Trang 197 - Unit 20: Tổng kết từ vựng' },
  { value: 198, label: 'Trang 198 - Unit 21 (Relationship 2): Truyện chêm' },
  { value: 201, label: 'Trang 201 - Unit 21: Từ vựng 01-05' },
  { value: 205, label: 'Trang 205 - Unit 21: Tổng kết từ vựng' },
  { value: 206, label: 'Trang 206 - Unit 22 (Body & Health): Truyện chêm' },
  { value: 209, label: 'Trang 209 - Unit 22: Từ vựng 01-05' },
  { value: 215, label: 'Trang 215 - Unit 22: Tổng kết từ vựng' },
  { value: 216, label: 'Trang 216 - Unit 23 (Sports & Gaming): Truyện chêm' },
  { value: 219, label: 'Trang 219 - Unit 23: Từ vựng 01-06' },
  { value: 225, label: 'Trang 225 - Unit 23: Tổng kết từ vựng' },
  { value: 226, label: 'Trang 226 - Unit 24 (Shop): Truyện chêm' },
  { value: 230, label: 'Trang 230 - Unit 24: Từ vựng 01-06' },
  { value: 237, label: 'Trang 237 - Unit 24: Tổng kết từ vựng' },
  { value: 238, label: 'Trang 238 - Unit 25 (Trade 1): Truyện chêm' },
  { value: 241, label: 'Trang 241 - Unit 25: Từ vựng 01-05' },
  { value: 247, label: 'Trang 247 - Unit 25: Tổng kết từ vựng' },
  { value: 248, label: 'Trang 248 - Unit 26 (Trade 2): Truyện chêm' },
  { value: 251, label: 'Trang 251 - Unit 26: Từ vựng 01-05' },
  { value: 256, label: 'Trang 256 - Unit 26: Tổng kết từ vựng' },
  { value: 257, label: 'Trang 257 - Unit 27 (Trade 3): Truyện chêm' },
  { value: 260, label: 'Trang 260 - Unit 27: Từ vựng 01-05' },
  { value: 265, label: 'Trang 265 - Unit 27: Tổng kết từ vựng' },
  { value: 266, label: 'Trang 266 - Unit 28 (Politics 1): Truyện chêm' },
  { value: 269, label: 'Trang 269 - Unit 28: Từ vựng 01-05' },
  { value: 274, label: 'Trang 274 - Unit 28: Tổng kết từ vựng' },
  { value: 275, label: 'Trang 275 - Unit 29 (Politics 2): Truyện chêm' },
  { value: 278, label: 'Trang 278 - Unit 29: Từ vựng 01-05' },
  { value: 283, label: 'Trang 283 - Unit 29: Tổng kết từ vựng' },
  { value: 284, label: 'Trang 284 - Unit 30 (Technology 1): Truyện chêm' },
  { value: 287, label: 'Trang 287 - Unit 30: Từ vựng 01-05' },
  { value: 293, label: 'Trang 293 - Unit 30: Tổng kết từ vựng' },
  { value: 294, label: 'Trang 294 - Unit 31 (Technology 2): Truyện chêm' },
  { value: 297, label: 'Trang 297 - Unit 31: Từ vựng 01-05' },
  { value: 303, label: 'Trang 303 - Unit 31: Tổng kết từ vựng' },
  { value: 304, label: 'Trang 304 - Unit 32 (Action 1): Truyện chêm' },
  { value: 307, label: 'Trang 307 - Unit 32: Từ vựng 01-05' },
  { value: 313, label: 'Trang 313 - Unit 32: Tổng kết từ vựng' },
  { value: 314, label: 'Trang 314 - Unit 33 (Action 2): Truyện chêm' },
  { value: 317, label: 'Trang 317 - Unit 33: Từ vựng 01-05' },
  { value: 323, label: 'Trang 323 - Unit 33: Tổng kết từ vựng' },
  { value: 324, label: 'Trang 324 - Unit 34 (Action 3): Truyện chêm' },
  { value: 327, label: 'Trang 327 - Unit 34: Từ vựng 01-06' },
  { value: 333, label: 'Trang 333 - Unit 34: Tổng kết từ vựng' },
  { value: 334, label: 'Trang 334 - Unit 35 (Action 4): Truyện chêm' },
  { value: 337, label: 'Trang 337 - Unit 35: Từ vựng 01-05' },
  { value: 343, label: 'Trang 343 - Unit 35: Tổng kết từ vựng' },
  { value: 344, label: 'Trang 344 - Unit 36 (Action 5): Truyện chêm' },
  { value: 347, label: 'Trang 347 - Unit 36: Từ vựng 01-06' },
  { value: 354, label: 'Trang 354 - Unit 36: Tổng kết từ vựng' },
  { value: 355, label: 'Trang 355 - Unit 37 (Action 6): Truyện chêm' },
  { value: 358, label: 'Trang 358 - Unit 37: Từ vựng 01-06' },
  { value: 364, label: 'Trang 364 - Unit 37: Tổng kết từ vựng' },
  { value: 365, label: 'Trang 365 - Unit 38 (Describing 1): Truyện chêm' },
  { value: 368, label: 'Trang 368 - Unit 38: Từ vựng 01-05' },
  { value: 374, label: 'Trang 374 - Unit 38: Tổng kết từ vựng' },
  { value: 375, label: 'Trang 375 - Unit 39 (Describing 2): Truyện chêm' },
  { value: 378, label: 'Trang 378 - Unit 39: Từ vựng 01-05' },
  { value: 383, label: 'Trang 383 - Unit 39: Tổng kết từ vựng' },
  { value: 384, label: 'Trang 384 - Unit 40 (Describing 3): Truyện chêm' },
  { value: 387, label: 'Trang 387 - Unit 40: Từ vựng 01-05' },
  { value: 392, label: 'Trang 392 - Unit 40: Tổng kết từ vựng' },
  { value: 393, label: 'Trang 393 - Unit 41 (Describing 4): Truyện chêm' },
  { value: 396, label: 'Trang 396 - Unit 41: Từ vựng 01-04' },
  { value: 401, label: 'Trang 401 - Unit 41: Tổng kết từ vựng' },
  { value: 402, label: 'Trang 402 - Unit 42 (Describing 5): Truyện chêm' },
  { value: 405, label: 'Trang 405 - Unit 42: Từ vựng 01-04' },
  { value: 410, label: 'Trang 410 - Unit 42: Tổng kết từ vựng' },
  { value: 411, label: 'Trang 411 - Unit 43 (Travel 1): Truyện chêm' },
  { value: 414, label: 'Trang 414 - Unit 43: Từ vựng 01-04' },
  { value: 420, label: 'Trang 420 - Unit 43: Tổng kết từ vựng' },
  { value: 421, label: 'Trang 421 - Unit 44 (Travel 2): Truyện chêm' },
  { value: 424, label: 'Trang 424 - Unit 44: Từ vựng 01-04' },
  { value: 430, label: 'Trang 430 - Unit 44: Tổng kết từ vựng' },
  { value: 431, label: 'Trang 431 - Unit 45 (Travel 3): Truyện chêm' },
  { value: 434, label: 'Trang 434 - Unit 45: Từ vựng 01-04' },
  { value: 440, label: 'Trang 440 - Unit 45: Tổng kết từ vựng' },
  { value: 441, label: 'Trang 441 - Unit 46 (Creatures): Truyện chêm' },
  { value: 444, label: 'Trang 444 - Unit 46: Từ vựng 01-04' },
  { value: 449, label: 'Trang 449 - Unit 46: Tổng kết từ vựng' },
  { value: 450, label: 'Trang 450 - Unit 47 (Natural World 1): Truyện chêm' },
  { value: 453, label: 'Trang 453 - Unit 47: Từ vựng 01-04' },
  { value: 458, label: 'Trang 458 - Unit 47: Tổng kết từ vựng' },
  { value: 459, label: 'Trang 459 - Unit 48 (Natural World 2): Truyện chêm' },
  { value: 462, label: 'Trang 462 - Unit 48: Từ vựng 01-04' },
  { value: 467, label: 'Trang 467 - Unit 48: Tổng kết từ vựng' },
  { value: 468, label: 'Trang 468 - Unit 49 (Arts & Media 1): Truyện chêm' },
  { value: 471, label: 'Trang 471 - Unit 49: Từ vựng 01-04' },
  { value: 477, label: 'Trang 477 - Unit 49: Tổng kết từ vựng' },
  { value: 478, label: 'Trang 478 - Unit 50 (Arts & Media 2): Truyện chêm' },
  { value: 481, label: 'Trang 481 - Unit 50: Từ vựng 01-04' },
  { value: 486, label: 'Trang 486 - Unit 50: Tổng kết từ vựng' },
  { value: 487, label: 'Trang 487 - Toàn văn Mục Lục 50 Units sách Hack Não 1500' }
];

export function PdfReaderModal({ isOpen, pageNumber = 14, onClose }) {
  const [currentPage, setCurrentPage] = useState(pageNumber);

  useEffect(() => {
    setCurrentPage(pageNumber);
  }, [pageNumber, isOpen]);

  // ESC shortcut
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((p) => p - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < 488) {
      setCurrentPage((p) => p + 1);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h3 className="modal-title"><BookOpen size={20} /> Sách Hack Não 1500 Từ Tiếng Anh</h3>
            <span className="badge badge-unit">Trang {currentPage} / 488</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Đóng cửa sổ">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body pdf-modal-body">
          <div className="pdf-page-wrapper">
            <img 
              src={`/pages/page_${currentPage}.png`} 
              alt={`Trang sách Hack Não ${currentPage}`}
              onError={(e) => {
                e.target.src = '/pages/page_14.png';
              }}
            />
          </div>
        </div>

        <div className="modal-footer">
          <div className="select-wrapper" style={{ flex: 1 }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Mục lục nhanh:</label>
            <select
              value={PAGE_OPTIONS.some((o) => o.value === currentPage) ? currentPage : ''}
              onChange={(e) => {
                if (e.target.value) setCurrentPage(parseInt(e.target.value, 10));
              }}
              aria-label="Chọn trang sách PDF"
            >
              <option value="">-- Chọn mốc Unit / Trang --</option>
              {PAGE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button className="btn btn-outline" onClick={handlePrev} disabled={currentPage <= 1}>
              <ChevronLeft size={16} /> Trang trước
            </button>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, minWidth: 60, textAlign: 'center' }}>
              Trang {currentPage}
            </span>
            <button className="btn btn-outline" onClick={handleNext} disabled={currentPage >= 488}>
              Trang kế <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
