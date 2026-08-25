import React, { useState, useEffect } from 'react';
import { AlertTriangle, Trash2, X, Loader2 } from 'lucide-react';

export function DeleteModal({ item, onClose, onConfirm }) {
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!item) return;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !deleting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, deleting, onClose]);

  if (!item) return null;

  const handleConfirm = async () => {
    if (deleting) return;
    setDeleting(true);
    await onConfirm(item.id);
    setDeleting(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card modal-sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title text-danger">
            <AlertTriangle size={18} /> Xác Nhận Xóa
          </h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Đóng cửa sổ">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p>
            Bạn có chắc chắn muốn xóa từ vựng <strong className="text-highlight">"{item.word}"</strong> khỏi cơ sở dữ liệu MySQL không?
          </p>
          <p className="text-muted text-sm" style={{ marginTop: 8, fontSize: '0.8rem' }}>
            Hành động này sẽ xóa vĩnh viễn bản ghi khỏi database và không thể hoàn tác.
          </p>
        </div>

        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose} disabled={deleting}>
            Hủy bỏ (Esc)
          </button>
          <button className="btn btn-danger" onClick={handleConfirm} disabled={deleting}>
            {deleting ? <Loader2 size={16} className="spinner" style={{ width: 16, height: 16, margin: 0 }} /> : <Trash2 size={16} />}
            {deleting ? 'Đang xóa...' : 'Xóa Vĩnh Viễn'}
          </button>
        </div>
      </div>
    </div>
  );
}
