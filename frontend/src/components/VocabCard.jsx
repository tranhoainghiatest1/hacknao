import React from 'react';
import { Volume2, Eye, Edit, Trash2, Lightbulb, Copy } from 'lucide-react';

export function VocabCard({ 
  item, 
  onSpeak, 
  speakingWord, 
  onDetail, 
  onEdit, 
  onDelete, 
  onCopy 
}) {
  const statusLabel = item.status === 'mastered' ? 'Đã thuộc' : (item.status === 'learning' ? 'Đang học' : 'Mới');
  const wordTypeClass = `badge-${item.word_type || 'noun'}`;
  const isSpeaking = speakingWord === item.word;

  return (
    <div className="vocab-card" tabIndex={0}>
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
          <div className="card-example-row" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {item.example_en.split('\n').filter(Boolean).map((ex, idx) => (
              <div key={idx} style={{ fontStyle: 'italic', fontSize: '0.8rem', lineHeight: 1.4 }}>
                • "{ex}"
              </div>
            ))}
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
            className={`card-btn-action btn-action-speak ${isSpeaking ? 'btn-speaking' : ''}`}
            onClick={(e) => { e.stopPropagation(); onSpeak(item.word); }}
            title={isSpeaking ? 'Đang phát âm...' : 'Nghe phát âm'}
            aria-label={`Phát âm từ ${item.word}`}
          >
            <Volume2 size={15} />
          </button>
          {onCopy && (
            <button
              className="card-btn-action"
              onClick={(e) => { e.stopPropagation(); onCopy(item.word); }}
              title="Sao chép từ vựng"
              aria-label={`Sao chép từ ${item.word}`}
            >
              <Copy size={14} />
            </button>
          )}
          <button 
            className="card-btn-action" 
            onClick={(e) => { e.stopPropagation(); onDetail(item); }}
            title="Xem chi tiết"
            aria-label={`Xem chi tiết từ ${item.word}`}
          >
            <Eye size={15} />
          </button>
          <button 
            className="card-btn-action" 
            onClick={(e) => { e.stopPropagation(); onEdit(item); }}
            title="Chỉnh sửa"
            aria-label={`Sửa từ ${item.word}`}
          >
            <Edit size={15} />
          </button>
          <button 
            className="card-btn-action btn-action-delete" 
            onClick={(e) => { e.stopPropagation(); onDelete(item); }}
            title="Xóa từ vựng"
            aria-label={`Xóa từ ${item.word}`}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
