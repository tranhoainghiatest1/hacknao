import React from 'react';
import { 
  X, 
  Volume2, 
  Languages, 
  Lightbulb, 
  Book, 
  Quote, 
  FileText, 
  StickyNote, 
  FileCode, 
  Edit, 
  Trash2, 
  ChevronRight 
} from 'lucide-react';

export function DetailModal({
  item,
  onClose,
  onSpeak,
  onStatusChange,
  onEdit,
  onDelete,
  onOpenPdf
}) {
  if (!item) return null;

  const wordTypeClass = `badge-${item.word_type || 'noun'}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-lg" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span className="badge badge-unit">Unit {item.unit || 1} - {item.unit_title || 'General'}</span>
            <span className="badge badge-category">{item.category || 'General'}</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="detail-header-hero">
            <div className="detail-word-main">
              <h2 className="detail-word-title">{item.word}</h2>
              <span className="detail-phonetic">{item.phonetic}</span>
              <span className={`badge ${wordTypeClass}`}>{item.word_type || 'noun'}</span>
              <button 
                className="btn-speak" 
                onClick={() => onSpeak(item.word)}
                title="Phát âm từ vựng"
              >
                <Volume2 size={18} />
              </button>
            </div>

            <div>
              <select
                className="form-group select"
                style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '6px 12px', borderRadius: 'var(--radius-md)' }}
                value={item.status || 'new'}
                onChange={(e) => onStatusChange(item.id, e.target.value)}
              >
                <option value="new">🆕 Mới (New)</option>
                <option value="learning">⏳ Đang học (Learning)</option>
                <option value="mastered">✅ Đã thuộc (Mastered)</option>
              </select>
            </div>
          </div>

          <div className="detail-content-grid">
            {/* Cột Trái */}
            <div>
              <div className="section-badge">
                <Languages size={13} /> NGHĨA TIẾNG VIỆT
              </div>
              <div className="detail-meaning-text">{item.meaning_vi}</div>

              <div className="section-badge mt-3">
                <Lightbulb size={13} /> MẸO ÂM THANH TƯƠNG TỰ (HACK NÃO)
              </div>
              <div className="sound-bridge-box">
                <p className="sound-bridge-text">{item.sound_bridge || 'Chưa có mẹo nhớ.'}</p>
              </div>

              <div className="section-badge mt-3">
                <Book size={13} /> ĐỊNH NGHĨA TIẾNG ANH
              </div>
              <p className="detail-definition-text">{item.definition_en || 'No English definition provided.'}</p>
            </div>

            {/* Cột Phải */}
            <div>
              <div className="section-badge">
                <Quote size={13} /> CÂU VÍ DỤ MINH HỌA
              </div>
              <div className="example-box">
                <div className="example-en-line">
                  <ChevronRight size={15} />
                  <span>{item.example_en || 'No example sentence.'}</span>
                  {item.example_en && (
                    <button 
                      className="btn-speak-sm" 
                      onClick={() => onSpeak(item.example_en)}
                      title="Phát âm câu ví dụ"
                    >
                      <Volume2 size={13} />
                    </button>
                  )}
                </div>
                <div className="example-vi-line">{item.example_vi}</div>
              </div>

              <div className="section-badge mt-3">
                <FileText size={13} /> THÔNG TIN TRANG SÁCH & GHI CHÚ
              </div>
              <div className="info-badges-list">
                <div className="info-pill">Số thứ tự: <strong>#{item.word_number || item.id}</strong></div>
                <div className="info-pill">Trang sách: <strong>Trang {item.page_number || '14'}</strong></div>
              </div>

              <div className="note-box mt-2">
                <label><StickyNote size={13} style={{ display: 'inline', marginRight: 4 }} /> Ghi chú cá nhân:</label>
                <p className="note-text">{item.note || 'Chưa có ghi chú nào.'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={() => onOpenPdf(item.page_number || 14)}>
            <FileCode size={16} /> Xem Trang Sách Gốc
          </button>
          <div className="modal-footer-right">
            <button className="btn btn-secondary" onClick={() => onEdit(item)}>
              <Edit size={16} /> Chỉnh Sửa
            </button>
            <button className="btn btn-danger-outline" onClick={() => onDelete(item)}>
              <Trash2 size={16} /> Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
