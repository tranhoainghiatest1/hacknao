import React from 'react';
import { X } from 'lucide-react';

export function ActiveFilters({ filters, onRemoveFilter }) {
  const tags = [];
  if (filters.q) {
    tags.push({ key: 'q', label: `Tìm kiếm: "${filters.q}"` });
  }
  if (filters.unit !== 'all') {
    tags.push({ key: 'unit', label: `Unit: ${filters.unit}` });
  }
  if (filters.category !== 'all') {
    tags.push({ key: 'category', label: `Chủ đề: ${filters.category}` });
  }
  if (filters.word_type !== 'all') {
    tags.push({ key: 'word_type', label: `Loại từ: ${filters.word_type}` });
  }
  if (filters.status !== 'all') {
    const sMap = { new: 'Mới', learning: 'Đang học', mastered: 'Đã thuộc' };
    tags.push({ key: 'status', label: `Trạng thái: ${sMap[filters.status] || filters.status}` });
  }

  if (tags.length === 0) return null;

  return (
    <div className="active-filters-bar">
      <span className="active-filters-title">Đang lọc theo:</span>
      <div className="filter-tags-container">
        {tags.map((t) => (
          <span key={t.key} className="filter-tag">
            {t.label}
            <button onClick={() => onRemoveFilter(t.key)}>
              <X size={12} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
