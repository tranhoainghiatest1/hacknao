import React, { useState, useRef } from 'react';
import { X, CloudUpload, FileCode, Upload } from 'lucide-react';

export function ImportExportModal({ isOpen, onClose, onImportSubmit }) {
  const [fileData, setFileData] = useState(null);
  const [fileName, setFileName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFile = (file) => {
    if (!file || !file.name.endsWith('.json')) {
      alert('Vui lòng chọn file định dạng .json');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!Array.isArray(data)) {
          alert('File JSON phải chứa một mảng danh sách từ vựng.');
          return;
        }
        setFileData(data);
        setFileName(file.name);
      } catch (err) {
        alert('File JSON không hợp lệ.');
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!fileData) return;
    setSubmitting(true);
    await onImportSubmit(fileData);
    setSubmitting(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title"><Upload size={20} /> Nhập Dữ Liệu Từ Vựng JSON</h3>
          <button className="modal-close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="modal-body">
          <div 
            className="import-dropzone" 
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <CloudUpload size={40} style={{ color: 'var(--primary)', marginBottom: 12 }} />
            <h4>Kéo thả file .json vào đây</h4>
            <p className="text-muted" style={{ fontSize: '0.85rem' }}>hoặc nhấn để chọn file từ máy tính</p>
            <input 
              ref={fileInputRef}
              type="file" 
              accept=".json" 
              style={{ display: 'none' }}
              onChange={(e) => e.target.files.length > 0 && handleFile(e.target.files[0])}
            />
          </div>

          {fileData && (
            <div style={{ marginTop: 16, padding: 12, background: 'var(--bg-surface-elevated)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FileCode size={18} style={{ color: 'var(--primary)' }} />
                <span>{fileName}</span>
              </div>
              <span className="badge badge-unit">{fileData.length} từ vựng</span>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Hủy</button>
          <button 
            className="btn btn-primary" 
            disabled={!fileData || submitting} 
            onClick={handleSubmit}
          >
            <Upload size={16} />
            {submitting ? 'Đang import...' : 'Tiến Hành Import Vào MySQL'}
          </button>
        </div>
      </div>
    </div>
  );
}
