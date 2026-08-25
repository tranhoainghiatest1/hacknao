import React, { useState, useEffect } from 'react';
import { X, Volume2, RotateCw, CheckCheck, ArrowLeft, ArrowRight, Lightbulb } from 'lucide-react';

export function FlashcardModal({ isOpen, items, onClose, onSpeak, speakingWord, onMasterWord }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setIndex(0);
    setFlipped(false);
  }, [isOpen]);

  const handlePrev = () => {
    if (index > 0) {
      setIndex((i) => i - 1);
      setFlipped(false);
    }
  };

  const handleNext = () => {
    if (index < items.length - 1) {
      setIndex((i) => i + 1);
      setFlipped(false);
    }
  };

  const handleMaster = async () => {
    if (!items || !items[index]) return;
    await onMasterWord(items[index].id);
    handleNext();
  };

  // Keyboard navigation, ESC & Lock Body Scroll
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setFlipped((f) => !f);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, index, items, onClose]);

  if (!isOpen || !items || items.length === 0) return null;

  const current = items[index];
  const isSpeaking = speakingWord === current.word;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card modal-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h3 className="modal-title">Chế Độ Flashcard 3D</h3>
            <span className="badge badge-unit">
              Thẻ {index + 1} / {items.length}
            </span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Đóng cửa sổ">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div 
            className="flashcard-container" 
            onClick={() => setFlipped(!flipped)}
          >
            {!flipped ? (
              /* Mặt Trước (Front) */
              <div className="flashcard-face">
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <span className="badge badge-unit">Unit {current.unit || 1}</span>
                  <span className={`badge badge-${current.word_type || 'noun'}`}>{current.word_type || 'noun'}</span>
                </div>

                <div>
                  <h2 className="fc-word">{current.word}</h2>
                  <p className="fc-phonetic">{current.phonetic}</p>
                  <button 
                    className={`btn-speak-lg ${isSpeaking ? 'btn-speaking' : ''}`} 
                    onClick={(e) => { e.stopPropagation(); onSpeak(current.word); }}
                    title="Nghe phát âm"
                    aria-label={`Phát âm từ ${current.word}`}
                  >
                    <Volume2 size={24} />
                  </button>
                </div>

                <div className="fc-flip-hint">
                  <RotateCw size={14} /> Bấm vào thẻ (hoặc phím Space) để xem nghĩa & mẹo nhớ
                </div>
              </div>
            ) : (
              /* Mặt Sau (Back) */
              <div className="flashcard-face">
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <span className="fc-meaning-label">Nghĩa tiếng Việt:</span>
                  <span className="badge badge-category">{current.category || 'General'}</span>
                </div>

                <div>
                  <h2 className="fc-meaning-title">{current.meaning_vi}</h2>
                  
                  {current.sound_bridge && (
                    <div className="fc-bridge-box">
                      <div className="card-bridge-label" style={{ justifyContent: 'center' }}>
                        <Lightbulb size={13} /> Mẹo âm thanh tương tự:
                      </div>
                      <p className="fc-bridge-text">{current.sound_bridge}</p>
                    </div>
                  )}

                  {current.example_en && (
                    <div className="fc-example-box" style={{ marginTop: 10 }}>
                      <p style={{ fontWeight: 600 }}>"{current.example_en}"</p>
                      <p style={{ color: 'var(--text-muted)' }}>{current.example_vi}</p>
                    </div>
                  )}
                </div>

                <div className="fc-flip-hint">
                  <RotateCw size={14} /> Bấm để lật lại từ vựng
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer flashcard-footer">
          <button className="btn btn-outline" onClick={handlePrev} disabled={index <= 0}>
            <ArrowLeft size={16} /> Từ trước
          </button>

          <div className="fc-action-middle">
            <button className="btn btn-secondary" onClick={() => setFlipped(!flipped)}>
              <RotateCw size={16} /> Lật thẻ (Space)
            </button>
            <button className="btn btn-success" onClick={handleMaster}>
              <CheckCheck size={16} /> Đã thuộc
            </button>
          </div>

          <button className="btn btn-outline" onClick={handleNext} disabled={index >= items.length - 1}>
            Từ kế <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
