import React from 'react';
import { Volume2, Eye, Edit, Trash2 } from 'lucide-react';

export function VocabTable({ items, onSpeak, onDetail, onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="data-table">
        <thead>
          <tr>
            <th width="60">#</th>
            <th>Từ Vựng</th>
            <th>Phiên Âm</th>
            <th>Loại Từ</th>
            <th>Nghĩa Tiếng Việt</th>
            <th>Mẹo Âm Thanh Tương Tự (Hack Não)</th>
            <th width="90">Unit</th>
            <th width="120">Trạng Thái</th>
            <th width="140" style={{ textAlign: 'center' }}>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const statusLabel = item.status === 'mastered' ? 'Đã thuộc' : (item.status === 'learning' ? 'Đang học' : 'Mới');
            const wordTypeClass = `badge-${item.word_type || 'noun'}`;

            return (
              <tr key={item.id}>
                <td className="text-muted font-mono">#{item.word_number || item.id}</td>
                <td className="table-word-cell">
                  <strong>{item.word}</strong>
                  <button 
                    className="btn-speak-sm" 
                    style={{ marginLeft: 6 }}
                    onClick={() => onSpeak(item.word)}
                    title="Phát âm"
                  >
                    <Volume2 size={13} />
                  </button>
                </td>
                <td className="font-mono text-muted">{item.phonetic || '-'}</td>
                <td><span className={`badge ${wordTypeClass}`}>{item.word_type || 'noun'}</span></td>
                <td><strong>{item.meaning_vi}</strong></td>
                <td className="table-sound-cell">{item.sound_bridge || '-'}</td>
                <td><span className="badge badge-unit">Unit {item.unit || 1}</span></td>
                <td><span className={`status-pill status-${item.status}`}>{statusLabel}</span></td>
                <td>
                  <div className="table-actions">
                    <button 
                      className="card-btn-action" 
                      onClick={() => onDetail(item)}
                      title="Chi tiết"
                    >
                      <Eye size={14} />
                    </button>
                    <button 
                      className="card-btn-action" 
                      onClick={() => onEdit(item)}
                      title="Sửa"
                    >
                      <Edit size={14} />
                    </button>
                    <button 
                      className="card-btn-action btn-action-delete" 
                      onClick={() => onDelete(item)}
                      title="Xóa"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
