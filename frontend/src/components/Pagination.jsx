import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({ pagination, onPageChange, onLimitChange }) {
  const { total = 0, page = 1, limit = 12, totalPages = 1 } = pagination || {};

  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  // Generate Page Numbers
  const maxButtons = 5;
  let startPage = Math.max(1, page - Math.floor(maxButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);
  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-wrapper">
      <div className="pagination-info">
        Hiển thị <span>{start}-{end}</span> trong tổng số <strong>{total}</strong> từ vựng
      </div>

      <div className="pagination-controls">
        <button
          className="btn-page"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          title="Trang trước"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="page-numbers">
          {pageNumbers.map((num) => (
            <button
              key={num}
              className={`btn-page ${num === page ? 'active' : ''}`}
              onClick={() => onPageChange(num)}
            >
              {num}
            </button>
          ))}
        </div>

        <button
          className="btn-page"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          title="Trang kế"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="pagination-limit">
        <label htmlFor="select-limit">Số từ / trang:</label>
        <select
          id="select-limit"
          value={limit}
          onChange={(e) => onLimitChange(parseInt(e.target.value, 10))}
        >
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="48">48</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>
  );
}
