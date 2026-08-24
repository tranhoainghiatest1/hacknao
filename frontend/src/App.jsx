import React, { useState, useEffect, useCallback } from 'react';
import { 
  Navbar, 
  StatsBanner, 
  FilterToolbar, 
  ActiveFilters, 
  VocabCard, 
  VocabTable, 
  Pagination, 
  DetailModal, 
  VocabFormModal, 
  DeleteModal, 
  FlashcardModal, 
  QuizModal, 
  PdfReaderModal, 
  ImportExportModal, 
  ToastContainer 
} from './components/index.js';
import { useSpeech } from './hooks/useSpeech.js';
import { AlertTriangle, RotateCw, SearchX } from 'lucide-react';

export default function App() {
  // State
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 12, totalPages: 1 });
  const [stats, setStats] = useState(null);
  const [filterOptions, setFilterOptions] = useState({ units: [], categories: [] });
  const [filters, setFilters] = useState({
    q: '',
    unit: 'all',
    category: 'all',
    word_type: 'all',
    status: 'all',
    sort_by: 'id',
    order: 'ASC'
  });
  const [viewMode, setViewMode] = useState(localStorage.getItem('hacknao_view_mode') || 'grid');
  const [theme, setTheme] = useState(localStorage.getItem('hacknao_theme') || 'dark');
  const [loading, setLoading] = useState(true);
  const [dbConnected, setDbConnected] = useState(true);
  const [toasts, setToasts] = useState([]);

  // Modals state
  const [selectedDetailItem, setSelectedDetailItem] = useState(null);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [flashcardOpen, setFlashcardOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [pdfTargetPage, setPdfTargetPage] = useState(14);
  const [importModalOpen, setImportModalOpen] = useState(false);

  // Hook Speech
  const { speak } = useSpeech();

  // Toast helper
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  // Theme Sync
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('hacknao_theme', theme);
  }, [theme]);

  // View Mode Sync
  useEffect(() => {
    localStorage.setItem('hacknao_view_mode', viewMode);
  }, [viewMode]);

  // Fetch Vocabularies
  const fetchVocabularies = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        q: filters.q,
        unit: filters.unit,
        category: filters.category,
        word_type: filters.word_type,
        status: filters.status,
        page: pagination.page,
        limit: pagination.limit,
        sort_by: filters.sort_by,
        order: filters.order
      });

      const res = await fetch(`/api/vocabularies?${params.toString()}`);
      const result = await res.json();

      if (result.success) {
        setItems(result.data || []);
        setPagination(result.pagination || { total: 0, page: 1, limit: 12, totalPages: 1 });
        setDbConnected(true);
      } else {
        showToast(result.message || 'Lỗi khi tải dữ liệu', 'error');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setDbConnected(false);
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page, pagination.limit, showToast]);

  // Fetch Stats & Filter Options
  const fetchStatsAndFilters = useCallback(async () => {
    try {
      const [statsRes, filtersRes] = await Promise.all([
        fetch('/api/vocabularies/stats'),
        fetch('/api/vocabularies/filters')
      ]);
      const statsJson = await statsRes.json();
      const filtersJson = await filtersRes.json();

      if (statsJson.success) setStats(statsJson.data);
      if (filtersJson.success) setFilterOptions(filtersJson.data);
    } catch (err) {
      console.error('Error fetching stats & filters:', err);
    }
  }, []);

  // Check DB status
  const checkDbStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/vocabularies/status');
      const data = await res.json();
      setDbConnected(Boolean(data.status?.connected));
    } catch (err) {
      setDbConnected(false);
    }
  }, []);

  // Initial Load
  useEffect(() => {
    fetchVocabularies();
    fetchStatsAndFilters();
    checkDbStatus();
  }, [fetchVocabularies, fetchStatsAndFilters, checkDbStatus]);

  // Filter change handler
  const handleFilterChange = (key, value) => {
    if (key === 'sort') {
      setFilters((prev) => ({ ...prev, sort_by: value.sort_by, order: value.order }));
    } else {
      setFilters((prev) => ({ ...prev, [key]: value }));
    }
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleResetFilters = () => {
    setFilters({
      q: '',
      unit: 'all',
      category: 'all',
      word_type: 'all',
      status: 'all',
      sort_by: 'id',
      order: 'ASC'
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleRemoveActiveFilter = (key) => {
    handleFilterChange(key, key === 'q' ? '' : 'all');
  };

  // CRUD Actions
  const handleSaveVocab = async (formData) => {
    try {
      const isEditing = Boolean(formData.id);
      const url = isEditing ? `/api/vocabularies/${formData.id}` : '/api/vocabularies';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await res.json();

      if (result.success) {
        showToast(result.message || 'Lưu thành công!', 'success');
        setFormModalOpen(false);
        setEditingItem(null);
        fetchVocabularies();
        fetchStatsAndFilters();
      } else {
        showToast(result.message || 'Lỗi lưu từ vựng', 'error');
      }
    } catch (err) {
      showToast('Lỗi kết nối máy chủ', 'error');
    }
  };

  const handleDeleteVocab = async (id) => {
    try {
      const res = await fetch(`/api/vocabularies/${id}`, { method: 'DELETE' });
      const result = await res.json();
      if (result.success) {
        showToast(result.message || 'Đã xóa từ vựng', 'success');
        setDeleteItem(null);
        setSelectedDetailItem(null);
        fetchVocabularies();
        fetchStatsAndFilters();
      } else {
        showToast(result.message || 'Lỗi khi xóa', 'error');
      }
    } catch (err) {
      showToast('Lỗi kết nối khi xóa', 'error');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const res = await fetch(`/api/vocabularies/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const result = await res.json();
      if (result.success) {
        showToast('Cập nhật trạng thái thành công!', 'success');
        if (selectedDetailItem?.id === id) {
          setSelectedDetailItem((prev) => ({ ...prev, status }));
        }
        fetchVocabularies();
        fetchStatsAndFilters();
      }
    } catch (err) {
      showToast('Lỗi cập nhật trạng thái', 'error');
    }
  };

  // Tools Actions
  const handleExportJson = () => {
    window.open('/api/vocabularies/export', '_blank');
    showToast('Đang tải xuống dữ liệu JSON...', 'info');
  };

  const handleResetData = async () => {
    if (!window.confirm('Khôi phục lại toàn bộ dữ liệu gốc từ sách Hack Não 1500?')) return;
    try {
      const res = await fetch('/api/vocabularies/reset-default', { method: 'POST' });
      const result = await res.json();
      if (result.success) {
        showToast(result.message, 'success');
        fetchVocabularies();
        fetchStatsAndFilters();
      }
    } catch (err) {
      showToast('Lỗi khi khôi phục dữ liệu', 'error');
    }
  };

  const handleImportSubmit = async (data) => {
    try {
      const res = await fetch('/api/vocabularies/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (result.success) {
        showToast(result.message, 'success');
        fetchVocabularies();
        fetchStatsAndFilters();
      }
    } catch (err) {
      showToast('Lỗi khi import dữ liệu', 'error');
    }
  };

  return (
    <div className="app-wrapper">
      {/* Database Warning Banner */}
      {!dbConnected && (
        <div className="db-banner">
          <div className="db-banner-content">
            <div className="db-banner-info">
              <AlertTriangle size={18} style={{ color: '#fef08a' }} />
              <span>
                <strong>Chưa kết nối MySQL XAMPP:</strong> Vui lòng mở <strong>XAMPP Control Panel</strong> và bấm <strong>Start MySQL</strong>.
              </span>
            </div>
            <button className="btn btn-sm btn-primary" onClick={checkDbStatus}>
              <RotateCw size={14} /> Thử kết nối lại
            </button>
          </div>
        </div>
      )}

      {/* App Navbar */}
      <Navbar
        searchQuery={filters.q}
        onSearchChange={(q) => handleFilterChange('q', q)}
        onClearSearch={() => handleFilterChange('q', '')}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        onOpenCreate={() => { setEditingItem(null); setFormModalOpen(true); }}
        onOpenFlashcard={() => setFlashcardOpen(true)}
        onOpenQuiz={() => setQuizOpen(true)}
        onOpenPdf={() => { setPdfTargetPage(14); setPdfModalOpen(true); }}
        onExportJson={handleExportJson}
        onOpenImport={() => setImportModalOpen(true)}
        onResetData={handleResetData}
      />

      {/* Main Content Layout */}
      <main className="main-container">
        {/* Stats */}
        <StatsBanner
          stats={stats}
          onFilterStatus={(s) => handleFilterChange('status', s)}
        />

        {/* Filters */}
        <FilterToolbar
          filters={filters}
          filterOptions={filterOptions}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Active Filter Tags */}
        <ActiveFilters
          filters={filters}
          onRemoveFilter={handleRemoveActiveFilter}
        />

        {/* Data Results Section */}
        {loading ? (
          <div className="state-container">
            <div className="spinner" />
            <p>Đang tải dữ liệu từ vựng React 19...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="state-container">
            <SearchX size={48} style={{ color: 'var(--text-muted)', marginBottom: 12 }} />
            <h3>Không tìm thấy từ vựng nào</h3>
            <p>Thử điều chỉnh từ khóa tìm kiếm hoặc bỏ bớt các bộ lọc đang chọn.</p>
            <button className="btn btn-primary" onClick={handleResetFilters}>
              <RotateCw size={16} /> Xóa tất cả bộ lọc
            </button>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="vocab-grid">
                {items.map((item) => (
                  <VocabCard
                    key={item.id}
                    item={item}
                    onSpeak={speak}
                    onDetail={(itm) => setSelectedDetailItem(itm)}
                    onEdit={(itm) => { setEditingItem(itm); setFormModalOpen(true); }}
                    onDelete={(itm) => setDeleteItem(itm)}
                  />
                ))}
              </div>
            ) : (
              <VocabTable
                items={items}
                onSpeak={speak}
                onDetail={(itm) => setSelectedDetailItem(itm)}
                onEdit={(itm) => { setEditingItem(itm); setFormModalOpen(true); }}
                onDelete={(itm) => setDeleteItem(itm)}
              />
            )}

            {/* Pagination */}
            <Pagination
              pagination={pagination}
              onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
              onLimitChange={(limit) => setPagination((prev) => ({ ...prev, limit, page: 1 }))}
            />
          </>
        )}
      </main>

      {/* Modals */}
      <DetailModal
        item={selectedDetailItem}
        onClose={() => setSelectedDetailItem(null)}
        onSpeak={speak}
        onStatusChange={handleStatusChange}
        onEdit={(item) => { setSelectedDetailItem(null); setEditingItem(item); setFormModalOpen(true); }}
        onDelete={(item) => { setSelectedDetailItem(null); setDeleteItem(item); }}
        onOpenPdf={(page) => { setSelectedDetailItem(null); setPdfTargetPage(page); setPdfModalOpen(true); }}
      />

      <VocabFormModal
        isOpen={formModalOpen}
        initialData={editingItem}
        onClose={() => { setFormModalOpen(false); setEditingItem(null); }}
        onSave={handleSaveVocab}
      />

      <DeleteModal
        item={deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDeleteVocab}
      />

      <FlashcardModal
        isOpen={flashcardOpen}
        items={items}
        onClose={() => setFlashcardOpen(false)}
        onSpeak={speak}
        onMasterWord={(id) => handleStatusChange(id, 'mastered')}
      />

      <QuizModal
        isOpen={quizOpen}
        items={items}
        onClose={() => setQuizOpen(false)}
        onSpeak={speak}
      />

      <PdfReaderModal
        isOpen={pdfModalOpen}
        pageNumber={pdfTargetPage}
        onClose={() => setPdfModalOpen(false)}
      />

      <ImportExportModal
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        onImportSubmit={handleImportSubmit}
      />

      {/* Toasts */}
      <ToastContainer toasts={toasts} />
    </div>
  );
}
