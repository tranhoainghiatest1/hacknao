import React from 'react';
import { 
  FolderOpen, 
  Tag, 
  Type, 
  Activity, 
  FilterX, 
  ArrowUpDown, 
  LayoutGrid, 
  List 
} from 'lucide-react';

export function FilterToolbar({
  filters,
  filterOptions,
  onFilterChange,
  onResetFilters,
  viewMode,
  onViewModeChange
}) {
  const { units = [], categories = [] } = filterOptions || {};

  return (
    <section className="filter-toolbar">
      <div className="filter-group">
        {/* Unit */}
        <div className="select-wrapper">
          <label htmlFor="filter-unit"><FolderOpen size={14} /> Unit:</label>
          <select
            id="filter-unit"
            value={filters.unit}
            onChange={(e) => onFilterChange('unit', e.target.value)}
          >
            <option value="all">Tất cả Unit</option>
            {units.map((u) => (
              <option key={u.unit} value={u.unit}>
                Unit {u.unit} - {u.title}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div className="select-wrapper">
          <label htmlFor="filter-category"><Tag size={14} /> Chủ đề:</label>
          <select
            id="filter-category"
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
          >
            <option value="all">Tất cả Chủ đề</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Word Type */}
        <div className="select-wrapper">
          <label htmlFor="filter-word-type"><Type size={14} /> Loại từ:</label>
          <select
            id="filter-word-type"
            value={filters.word_type}
            onChange={(e) => onFilterChange('word_type', e.target.value)}
          >
            <option value="all">Tất cả Loại từ</option>
            <option value="verb">Động từ (Verb)</option>
            <option value="noun">Danh từ (Noun)</option>
            <option value="adjective">Tính từ (Adj)</option>
            <option value="adverb">Trạng từ (Adv)</option>
            <option value="phrase">Cụm từ (Phrase)</option>
          </select>
        </div>

        {/* Status */}
        <div className="select-wrapper">
          <label htmlFor="filter-status"><Activity size={14} /> Trạng thái:</label>
          <select
            id="filter-status"
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="new">Mới (New)</option>
            <option value="learning">Đang học (Learning)</option>
            <option value="mastered">Đã thuộc (Mastered)</option>
          </select>
        </div>

        {/* Reset Button */}
        <button className="btn btn-sm btn-ghost" onClick={onResetFilters} title="Xóa bộ lọc">
          <FilterX size={14} /> Đặt lại
        </button>
      </div>

      <div className="view-and-sort-group">
        {/* Sort By */}
        <div className="select-wrapper">
          <label htmlFor="sort-by"><ArrowUpDown size={14} /> Sắp xếp:</label>
          <select
            id="sort-by"
            value={`${filters.sort_by}-${filters.order}`}
            onChange={(e) => {
              const [col, dir] = e.target.value.split('-');
              onFilterChange('sort', { sort_by: col, order: dir });
            }}
          >
            <option value="id-ASC">Mặc định (Số thứ tự)</option>
            <option value="word-ASC">Từ vựng (A → Z)</option>
            <option value="word-DESC">Từ vựng (Z → A)</option>
            <option value="unit-ASC">Theo Unit (Tăng dần)</option>
            <option value="created_at-DESC">Mới thêm gần đây</option>
          </select>
        </div>

        {/* View Switch */}
        <div className="view-switch-btns">
          <button
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => onViewModeChange('grid')}
            title="Dạng Thẻ (Card View)"
          >
            <LayoutGrid size={16} />
          </button>
          <button
            className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => onViewModeChange('table')}
            title="Dạng Bảng (Table View)"
          >
            <List size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
