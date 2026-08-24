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
  { value: 189, label: 'Trang 189 - Unit 20 (Relationship & Places): Truyện chêm' },
  { value: 192, label: 'Trang 192 - Unit 20: Từ vựng 01-04' },
  { value: 197, label: 'Trang 197 - Unit 20: Tổng kết từ vựng' }
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
    if (currentPage < 198) {
      setCurrentPage((p) => p + 1);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h3 className="modal-title"><BookOpen size={20} /> Sách Hack Não 1500 Từ Tiếng Anh</h3>
            <span className="badge badge-unit">Trang {currentPage} / 198</span>
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
            <button className="btn btn-outline" onClick={handleNext} disabled={currentPage >= 198}>
              Trang kế <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
