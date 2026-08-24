import React, { useState, useEffect } from 'react';
import { X, PlusCircle, Edit3, Save } from 'lucide-react';

export function VocabFormModal({ isOpen, initialData, onClose, onSave }) {
  const [formData, setFormData] = useState({
    word: '',
    phonetic: '',
    word_type: 'noun',
    meaning_vi: '',
    sound_bridge: '',
    definition_en: '',
    example_en: '',
    example_vi: '',
    unit: 1,
    unit_title: '',
    category: 'Communication',
    page_number: '',
    status: 'new',
    note: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        word: initialData.word || '',
        phonetic: initialData.phonetic || '',
        word_type: initialData.word_type || 'noun',
        meaning_vi: initialData.meaning_vi || '',
        sound_bridge: initialData.sound_bridge || '',
        definition_en: initialData.definition_en || '',
        example_en: initialData.example_en || '',
        example_vi: initialData.example_vi || '',
        unit: initialData.unit || 1,
        unit_title: initialData.unit_title || '',
        category: initialData.category || 'General',
        page_number: initialData.page_number || '',
        status: initialData.status || 'new',
        note: initialData.note || ''
      });
    } else {
      setFormData({
        word: '',
        phonetic: '',
        word_type: 'noun',
        meaning_vi: '',
        sound_bridge: '',
        definition_en: '',
        example_en: '',
        example_vi: '',
        unit: 1,
        unit_title: '',
        category: 'Communication',
        page_number: '',
        status: 'new',
        note: ''
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const isEditing = Boolean(initialData?.id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await onSave({
      ...formData,
      id: initialData?.id,
      unit: parseInt(formData.unit, 10) || 1,
      page_number: formData.page_number ? parseInt(formData.page_number, 10) : null
    });
    setSubmitting(false);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {isEditing ? <Edit3 size={20} /> : <PlusCircle size={20} />}
            {isEditing ? 'Chỉnh Sửa Từ Vựng' : 'Thêm Từ Vựng Mới'}
          </h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid">
              {/* Word */}
              <div className="form-group col-6">
                <label>Từ Vựng Tiếng Anh <span className="text-danger">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Additional, Persuade, Issue..."
                  value={formData.word}
                  onChange={(e) => handleChange('word', e.target.value)}
                />
              </div>

              {/* Phonetic */}
              <div className="form-group col-6">
                <label>Phiên Âm IPA</label>
                <input
                  type="text"
                  placeholder="Ví dụ: /əˈdɪʃ.ən.əl/"
                  value={formData.phonetic}
                  onChange={(e) => handleChange('phonetic', e.target.value)}
                />
              </div>

              {/* Word Type */}
              <div className="form-group col-4">
                <label>Loại Từ <span className="text-danger">*</span></label>
                <select
                  required
                  value={formData.word_type}
                  onChange={(e) => handleChange('word_type', e.target.value)}
                >
                  <option value="noun">Danh từ (Noun)</option>
                  <option value="verb">Động từ (Verb)</option>
                  <option value="adjective">Tính từ (Adjective)</option>
                  <option value="adverb">Trạng từ (Adverb)</option>
                  <option value="phrase">Cụm từ (Phrase / Idiom)</option>
                </select>
              </div>

              {/* Meaning VI */}
              <div className="form-group col-8">
                <label>Nghĩa Tiếng Việt <span className="text-danger">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Bổ sung, thêm vào, khăng khăng..."
                  value={formData.meaning_vi}
                  onChange={(e) => handleChange('meaning_vi', e.target.value)}
                />
              </div>

              {/* Sound Bridge Story */}
              <div className="form-group col-12">
                <label>Mẹo Âm Thanh Tương Tự (Hack Não Story)</label>
                <textarea
                  rows={2}
                  placeholder="Ví dụ: Ăn mít không hết thì thừa nhận đi! Hỏng hết rồi lẽ ra phải cho vào tủ lạnh!"
                  value={formData.sound_bridge}
                  onChange={(e) => handleChange('sound_bridge', e.target.value)}
                />
                <small className="form-hint">Mẹo nhớ từ theo phương pháp âm thanh tương tự độc quyền sách Hack Não 1500.</small>
              </div>

              {/* Definition EN */}
              <div className="form-group col-12">
                <label>Định Nghĩa Tiếng Anh (English Definition)</label>
                <input
                  type="text"
                  placeholder="Ví dụ: More than was first mentioned or is usual; extra."
                  value={formData.definition_en}
                  onChange={(e) => handleChange('definition_en', e.target.value)}
                />
              </div>

              {/* Example EN */}
              <div className="form-group col-6">
                <label>Câu Ví Dụ (English)</label>
                <textarea
                  rows={2}
                  placeholder="Ví dụ: Your application still needs additional information."
                  value={formData.example_en}
                  onChange={(e) => handleChange('example_en', e.target.value)}
                />
              </div>

              {/* Example VI */}
              <div className="form-group col-6">
                <label>Dịch Nghĩa Câu Ví Dụ (Vietnamese)</label>
                <textarea
                  rows={2}
                  placeholder="Ví dụ: Hồ sơ của bạn vẫn cần thêm thông tin bổ sung."
                  value={formData.example_vi}
                  onChange={(e) => handleChange('example_vi', e.target.value)}
                />
              </div>

              {/* Unit */}
              <div className="form-group col-4">
                <label>Unit Số</label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={formData.unit}
                  onChange={(e) => handleChange('unit', e.target.value)}
                />
              </div>

              {/* Unit Title */}
              <div className="form-group col-4">
                <label>Tên Unit / Chủ đề</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Communication 1"
                  value={formData.unit_title}
                  onChange={(e) => handleChange('unit_title', e.target.value)}
                />
              </div>

              {/* Category */}
              <div className="form-group col-4">
                <label>Danh Mục Phân Loại</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Communication, Work, Travel..."
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                />
              </div>

              {/* Page Number */}
              <div className="form-group col-4">
                <label>Trang Sách PDF</label>
                <input
                  type="number"
                  min={1}
                  max={500}
                  placeholder="Ví dụ: 14"
                  value={formData.page_number}
                  onChange={(e) => handleChange('page_number', e.target.value)}
                />
              </div>

              {/* Status */}
              <div className="form-group col-4">
                <label>Trạng Thái Học</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                >
                  <option value="new">🆕 Mới (New)</option>
                  <option value="learning">⏳ Đang học (Learning)</option>
                  <option value="mastered">✅ Đã thuộc (Mastered)</option>
                </select>
              </div>

              {/* Note */}
              <div className="form-group col-4">
                <label>Ghi Chú Cá Nhân</label>
                <input
                  type="text"
                  placeholder="Ghi chú thêm..."
                  value={formData.note}
                  onChange={(e) => handleChange('note', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              <Save size={16} />
              {submitting ? 'Đang lưu...' : (isEditing ? 'Lưu Cập Nhật' : 'Thêm Mới')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
