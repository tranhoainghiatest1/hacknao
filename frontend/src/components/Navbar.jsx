import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain, 
  Search, 
  X, 
  Layers, 
  HelpCircle, 
  PenTool,
  BookOpen, 
  Plus, 
  MoreVertical, 
  Sun, 
  Moon, 
  FileDown, 
  FileUp, 
  RotateCcw 
} from 'lucide-react';

export function Navbar({
  searchQuery,
  onSearchChange,
  onClearSearch,
  theme,
  onToggleTheme,
  onOpenCreate,
  onOpenFlashcard,
  onOpenQuiz,
  onOpenWriting,
  onOpenPdf,
  onExportJson,
  onOpenImport,
  onResetData
}) {
  const [showTools, setShowTools] = useState(false);
  const searchInputRef = useRef(null);
  const toolsRef = useRef(null);

  // Global shortcut Ctrl+K or / to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && document.activeElement !== searchInputRef.current && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA')) {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close tools dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target)) {
        setShowTools(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="app-header">
      <div className="header-container">
        {/* Brand */}
        <div className="brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="brand-logo">
            <Brain size={24} />
          </div>
          <div>
            <h1 className="brand-title">
              HACK NÃO <span>1500</span>
              <span className="brand-badge">React 19</span>
            </h1>
            <p className="brand-subtitle">Hệ Thống Quản Lý & Học Từ Vựng Thông Minh</p>
          </div>
        </div>

        {/* Global Actions */}
        <div className="header-actions">
          {/* Quick Search */}
          <div className="quick-search-wrapper">
            <Search className="search-icon" size={16} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Tìm từ vựng tiếng Anh, nghĩa của từ... (Ctrl + K)"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchQuery ? (
              <button className="btn-icon-clear" onClick={onClearSearch} title="Xóa tìm kiếm">
                <X size={16} />
              </button>
            ) : (
              <kbd className="search-kbd">/</kbd>
            )}
          </div>

          {/* Mode Buttons */}
          <button className="btn btn-outline" onClick={onOpenFlashcard} title="Chế độ Flashcard 3D">
            <Layers size={16} />
            <span>Flashcard</span>
          </button>

          <button className="btn btn-outline" onClick={onOpenQuiz} title="Trắc nghiệm ôn tập (3 Chế độ)">
            <HelpCircle size={16} />
            <span>Trắc nghiệm</span>
          </button>

          <button className="btn btn-outline" onClick={onOpenWriting} title="Luyện viết & Chính tả tiếng Anh">
            <PenTool size={16} />
            <span>Luyện viết</span>
          </button>

          <button className="btn btn-outline" onClick={onOpenPdf} title="Xem sách PDF gốc">
            <BookOpen size={16} />
            <span>Sách PDF</span>
          </button>

          {/* Add Word Button */}
          <button className="btn btn-primary" onClick={onOpenCreate}>
            <Plus size={16} />
            <span>Thêm Từ Mới</span>
          </button>

          {/* Tools Menu */}
          <div className="dropdown-wrapper" ref={toolsRef}>
            <button 
              className="btn btn-icon" 
              onClick={(e) => { e.stopPropagation(); setShowTools(!showTools); }}
              title="Công cụ dữ liệu"
            >
              <MoreVertical size={18} />
            </button>
            {showTools && (
              <div className="dropdown-menu">
                <button className="dropdown-item" onClick={() => { setShowTools(false); onExportJson(); }}>
                  <FileDown size={16} /> Xuất dữ liệu JSON
                </button>
                <button className="dropdown-item" onClick={() => { setShowTools(false); onOpenImport(); }}>
                  <FileUp size={16} /> Nhập dữ liệu JSON
                </button>
                <div className="dropdown-divider" />
                <button className="dropdown-item text-danger" onClick={() => { setShowTools(false); onResetData(); }}>
                  <RotateCcw size={16} /> Khôi phục dữ liệu gốc
                </button>
              </div>
            )}
          </div>

          {/* Theme Switcher */}
          <button className="btn btn-icon" onClick={onToggleTheme} title="Chuyển chế độ Sáng / Tối">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
