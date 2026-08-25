import React, { useState, useEffect, useCallback } from 'react';
import { X, HelpCircle, Lightbulb, CheckCircle2, XCircle, RotateCcw, ArrowRight } from 'lucide-react';

export function QuizModal({ isOpen, items, onClose, onSpeak }) {
  const [quizPool, setQuizPool] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);

  const loadQuestion = useCallback((pool, idx) => {
    if (idx >= pool.length) return;
    const target = pool[idx];
    const distractors = items
      .filter((i) => i.id !== target.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const mixed = [target, ...distractors].sort(() => 0.5 - Math.random());
    setOptions(mixed);
    setSelectedOption(null);
    setShowHint(false);
  }, [items]);

  const initQuiz = useCallback(() => {
    const shuffled = [...items].sort(() => 0.5 - Math.random()).slice(0, 10);
    setQuizPool(shuffled);
    setCurrentIndex(0);
    setScore(0);
    loadQuestion(shuffled, 0);
  }, [items, loadQuestion]);

  useEffect(() => {
    if (isOpen && items && items.length >= 4) {
      initQuiz();
    }
  }, [isOpen, items, initQuiz]);

  const handleSelectOption = useCallback((opt) => {
    if (selectedOption) return;
    setSelectedOption(opt);
    const target = quizPool[currentIndex];
    if (opt.id === target.id) {
      setScore((s) => s + 10);
      onSpeak(target.word);
    }
  }, [selectedOption, quizPool, currentIndex, onSpeak]);

  const handleNext = useCallback(() => {
    const nextIdx = currentIndex + 1;
    setCurrentIndex(nextIdx);
    if (nextIdx < quizPool.length) {
      loadQuestion(quizPool, nextIdx);
    }
  }, [currentIndex, quizPool, loadQuestion]);

  // Keyboard Shortcuts: ESC, 1, 2, 3, 4, Enter & Lock Body Scroll
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (['1', '2', '3', '4'].includes(e.key) && !selectedOption && options.length >= parseInt(e.key, 10)) {
        const idx = parseInt(e.key, 10) - 1;
        handleSelectOption(options[idx]);
      } else if (e.key === 'Enter' && selectedOption) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, selectedOption, options, handleSelectOption, handleNext]);

  if (!isOpen) return null;

  if (!items || items.length < 4) {
    return (
      <div className="modal-overlay" onClick={onClose} role="dialog">
        <div className="modal-card modal-md" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title"><HelpCircle size={20} /> Trắc Nghiệm Ôn Tập</h3>
            <button className="modal-close-btn" onClick={onClose} aria-label="Đóng"><X size={20} /></button>
          </div>
          <div className="modal-body text-center">
            <p>Cần ít nhất 4 từ vựng trong cơ sở dữ liệu để tạo bài trắc nghiệm.</p>
          </div>
        </div>
      </div>
    );
  }

  const isFinished = currentIndex >= quizPool.length;
  const current = quizPool[currentIndex];

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card modal-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h3 className="modal-title"><HelpCircle size={20} /> Thử Thách Trắc Nghiệm</h3>
            <span className="badge badge-category">Điểm: {score}</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Đóng cửa sổ">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {!isFinished ? (
            <>
              <div className="quiz-question-box">
                <span className="quiz-q-num">Câu {currentIndex + 1} / {quizPool.length}</span>
                <p className="quiz-q-prompt">Từ vựng tiếng Anh nào mang ý nghĩa dưới đây?</p>
                <h2 className="quiz-target-text">"{current?.meaning_vi}"</h2>

                {showHint && (
                  <div className="quiz-hint-box" style={{ marginTop: 12, padding: 10, background: 'rgba(245, 158, 11, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
                    <Lightbulb size={14} style={{ display: 'inline', marginRight: 4, color: 'var(--accent-amber)' }} />
                    <strong style={{ color: 'var(--accent-amber)' }}>Gợi ý âm thanh:</strong> {current?.sound_bridge || 'Không có gợi ý'}
                  </div>
                )}
              </div>

              <div className="quiz-options-grid">
                {options.map((opt, idx) => {
                  let btnClass = 'quiz-option-btn';
                  if (selectedOption) {
                    if (opt.id === current.id) btnClass += ' correct';
                    else if (selectedOption.id === opt.id) btnClass += ' wrong';
                  }

                  return (
                    <button
                      key={opt.id}
                      className={btnClass}
                      disabled={Boolean(selectedOption)}
                      onClick={() => handleSelectOption(opt)}
                    >
                      <div>
                        <strong style={{ marginRight: 6 }}>{opt.word}</strong>
                        <span className="text-muted" style={{ fontSize: '0.8rem' }}>({opt.phonetic})</span>
                      </div>
                      <kbd className="search-kbd" style={{ marginLeft: 8, position: 'static' }}>{idx + 1}</kbd>
                    </button>
                  );
                })}
              </div>

              {selectedOption && (
                <div className={`quiz-feedback ${selectedOption.id === current.id ? 'correct' : 'wrong'}`}>
                  {selectedOption.id === current.id ? (
                    <><CheckCircle2 size={18} style={{ display: 'inline', marginRight: 6 }} /> Chính xác! Tuyệt vời!</>
                  ) : (
                    <><XCircle size={18} style={{ display: 'inline', marginRight: 6 }} /> Chưa đúng! Đáp án đúng là: <strong>{current.word}</strong></>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="state-container">
              <h3>🎉 Hoàn thành bài trắc nghiệm!</h3>
              <p style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)', margin: '12px 0' }}>
                Tổng điểm: {score} / {quizPool.length * 10}
              </p>
              <p>{score >= 70 ? 'Xuất sắc! Bạn ghi nhớ từ rất tốt.' : 'Hãy tiếp tục ôn tập thêm để thuộc làu nhé!'}</p>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {!isFinished ? (
            <>
              <button 
                className="btn btn-ghost" 
                onClick={() => setShowHint(true)} 
                disabled={showHint}
              >
                <Lightbulb size={16} /> Xem Gợi Ý
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleNext} 
                disabled={!selectedOption}
              >
                Câu Tiếp Theo (Enter) <ArrowRight size={16} />
              </button>
            </>
          ) : (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <button className="btn btn-primary" onClick={initQuiz}>
                <RotateCcw size={16} /> Làm Lại Bài Mới
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
