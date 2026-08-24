import React, { useState } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export function DeleteModal({ item, onClose, onConfirm }) {
  const [deleting, setDeleting] = useState(false);

  if (!item) return null;

  const handleConfirm = async () => {
    setDeleting(true);
    await onConfirm(item.id);
    setDeleting(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title text-danger">
            <AlertTriangle size={18} /> Xác Nhận Xóa
          </h3>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p>
            Bạn có chắc chắn muốn xóa từ vựng <strong className="text-highlight">"{item.word}"</strong> khỏi cơ sở dữ liệu MySQL không?
          </p>
          <p className="text-muted text-sm" style={{ marginTop: 8, fontSize: '0.8rem' }}>
            Hành động này sẽ xóa vĩnh viễn bản ghi khỏi database.
          </p>
        </div>

        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>
            Hủy bỏ
          </button>
          <button className="btn btn-danger" onClick={handleConfirm} disabled={deleting}>
            <Trash2 size={16} />
            {deleting ? 'Đang xóa...' : 'Xóa Vĩnh Viễn'}
          </button>
        </div>
      </div>
    </div>
  );
}
