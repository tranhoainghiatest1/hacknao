import React from 'react';
import { Volume2, Eye, Edit, Trash2, Lightbulb } from 'lucide-react';

export function VocabCard({ item, onSpeak, onDetail, onEdit, onDelete }) {
  const statusLabel = item.status === 'mastered' ? 'Đã thuộc' : (item.status === 'learning' ? 'Đang học' : 'Mới');
  const wordTypeClass = `badge-${item.word_type || 'noun'}`;

  return (
    <div className="vocab-card">
      <div>
        <div className="card-top">
          <span className="card-number">#{item.word_number || item.id}</span>
          <div className="card-badges">
            <span className={`badge ${wordTypeClass}`}>{item.word_type || 'noun'}</span>
            <span className={`status-pill status-${item.status}`}>{statusLabel}</span>
          </div>
        </div>

        <div className="card-word-row">
          <h3 className="card-word">{item.word}</h3>
          <span className="card-phonetic">{item.phonetic}</span>
        </div>

        <div className="card-meaning-box">
          {item.meaning_vi}
        </div>

        {item.sound_bridge && (
          <div className="card-bridge-box">
            <div className="card-bridge-label">
              <Lightbulb size={12} /> Mẹo âm thanh tương tự:
            </div>
            <p className="card-bridge-text">{item.sound_bridge}</p>
          </div>
        )}

        {item.example_en && (
          <div className="card-example-row">
            "{item.example_en}"
          </div>
        )}
      </div>

      <div className="card-footer">
        <div className="card-footer-info">
          <span className="badge badge-unit">Unit {item.unit || 1}</span>
          {item.page_number && (
            <span className="badge" style={{ background: 'var(--border-color)', color: 'var(--text-muted)' }}>
              Trang {item.page_number}
            </span>
          )}
        </div>

        <div className="card-footer-actions">
          <button 
            className="card-btn-action btn-action-speak" 
            onClick={(e) => { e.stopPropagation(); onSpeak(item.word); }}
            title="Phát âm tiếng Anh chuẩn"
          >
            <Volume2 size={15} />
          </button>
          <button 
            className="card-btn-action" 
            onClick={(e) => { e.stopPropagation(); onDetail(item); }}
            title="Xem chi tiết"
          >
            <Eye size={15} />
          </button>
          <button 
            className="card-btn-action" 
            onClick={(e) => { e.stopPropagation(); onEdit(item); }}
            title="Chỉnh sửa"
          >
            <Edit size={15} />
          </button>
          <button 
            className="card-btn-action btn-action-delete" 
            onClick={(e) => { e.stopPropagation(); onDelete(item); }}
            title="Xóa từ vựng"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
