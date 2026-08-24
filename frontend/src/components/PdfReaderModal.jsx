import React, { useState } from 'react';
import { X, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

const PAGE_OPTIONS = [
  { value: 1, label: 'Trang 1 - Bìa sách Hack Não 1500' },
  { value: 8, label: 'Trang 8 - Phương pháp 3 trong 1' },
  { value: 11, label: 'Trang 11 - Unit 1: Truyện chêm' },
  { value: 14, label: 'Trang 14 - Unit 1: Từ vựng 01-04' },
  { value: 15, label: 'Trang 15 - Unit 1: Từ vựng 05-10' },
  { value: 26, label: 'Trang 26 - Unit 2: Từ vựng 11-16' },
  { value: 34, label: 'Trang 34 - Unit 3: Từ vựng 17-20' },
  { value: 48, label: 'Trang 48 - Unit 4: Từ vựng 21-25' },
  { value: 62, label: 'Trang 62 - Unit 5: Từ vựng 26-30' },
  { value: 75, label: 'Trang 75 - Unit 6: Từ vựng 31-34' }
];

export function PdfReaderModal({ isOpen, pageNumber = 14, onClose }) {
  const [currentPage, setCurrentPage] = useState(pageNumber);

  if (!isOpen) return null;

  const handlePrev = () => {
    const pages = PAGE_OPTIONS.map((p) => p.value);
    const idx = pages.indexOf(currentPage);
    if (idx > 0) setCurrentPage(pages[idx - 1]);
  };

  const handleNext = () => {
    const pages = PAGE_OPTIONS.map((p) => p.value);
    const idx = pages.indexOf(currentPage);
    if (idx < pages.length - 1) setCurrentPage(pages[idx + 1]);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h3 className="modal-title"><BookOpen size={20} /> Sách Hack Não 1500 Từ Tiếng Anh</h3>
            <span className="badge badge-unit">Trang {currentPage}</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
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
          <div className="select-wrapper">
            <label>Chọn trang:</label>
            <select
              value={currentPage}
              onChange={(e) => setCurrentPage(parseInt(e.target.value, 10))}
            >
              {PAGE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-outline" onClick={handlePrev}>
              <ChevronLeft size={16} /> Trang trước
            </button>
            <button className="btn btn-outline" onClick={handleNext}>
              Trang kế <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
