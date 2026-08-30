import React, { useState, useEffect, useCallback } from 'react';
import { 
  X, 
  HelpCircle, 
  Lightbulb, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  Volume2, 
  Layers,
  Award
} from 'lucide-react';

export function QuizModal({ isOpen, unitsList = [], currentUnit, onClose, onSpeak }) {
  const [quizPool, setQuizPool] = useState([]);
  const [distractorPool, setDistractorPool] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // 2 Chế độ cốt lõi: 'vi_en' (Việt -> Anh), 'en_vi' (Anh -> Việt)
  const [quizMode, setQuizMode] = useState('vi_en');
  const [selectedUnit, setSelectedUnit] = useState(currentUnit || 'all');
  const [streak, setStreak] = useState(0);
  const [history, setHistory] = useState([]);

  // Tải danh sách từ vựng đầy đủ theo Unit đã chọn
  const loadUnitWords = useCallback(async (unitToFetch, modeToUse) => {
    setIsLoading(true);
    try {
      const activeUnit = unitToFetch !== undefined ? unitToFetch : selectedUnit;
      const activeMode = modeToUse || quizMode;

      const unitParam = (activeUnit && activeUnit !== 'all') ? `unit=${activeUnit}&limit=200` : `limit=1500`;
      const res = await fetch(`/api/vocabularies?${unitParam}`);
      const json = await res.json();

      if (json.success && json.data && json.data.length > 0) {
        const words = json.data;
        // Trộn ngẫu nhiên TOÀN BỘ từ vựng của Unit (làm đủ số từ của Unit đó)
        const shuffled = [...words].sort(() => 0.5 - Math.random());
        
        setQuizPool(shuffled);
        setDistractorPool(words);
        setCurrentIndex(0);
        setScore(0);
        setStreak(0);
        setHistory([]);

        // Tạo câu hỏi đầu tiên
        if (shuffled.length > 0) {
          generateQuestion(shuffled, words, 0, activeMode);
        }
      }
    } catch (err) {
      console.error('Error loading quiz words:', err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedUnit, quizMode]);

  // Tạo các lựa chọn trắc nghiệm
  const generateQuestion = useCallback((pool, allWords, idx, mode) => {
    if (idx >= pool.length) return;
    const target = pool[idx];
    
    // Lấy 3 đáp án nhiễu khác với target
    let availableDistractors = allWords.filter(i => i.id !== target.id);
    if (availableDistractors.length < 3) {
      availableDistractors = pool.filter(i => i.id !== target.id);
    }

    const distractors = availableDistractors
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const mixed = [target, ...distractors].sort(() => 0.5 - Math.random());
    setOptions(mixed);
    setSelectedOption(null);
    setShowHint(false);

    // Tự động phát âm nếu câu hỏi là tiếng Anh (chế độ Anh - Việt)
    if (mode === 'en_vi') {
      setTimeout(() => {
        onSpeak(target.word);
      }, 150);
    }
  }, [onSpeak]);

  // Khởi chạy lại khi mở modal hoặc thay đổi unit
  useEffect(() => {
    if (isOpen) {
      const initialUnit = (currentUnit && currentUnit !== 'all') ? currentUnit : 'all';
      setSelectedUnit(initialUnit);
      loadUnitWords(initialUnit, quizMode);
    }
  }, [isOpen, currentUnit]);

  // Xử lý khi người dùng đổi Unit
  const handleUnitChange = (newUnit) => {
    setSelectedUnit(newUnit);
    loadUnitWords(newUnit, quizMode);
  };

  // Xử lý khi người dùng đổi Chế độ
  const handleModeChange = (newMode) => {
    setQuizMode(newMode);
    loadUnitWords(selectedUnit, newMode);
  };

  // Xử lý khi người dùng chọn đáp án
  const handleSelectOption = useCallback((opt) => {
    if (selectedOption) return;
    setSelectedOption(opt);
    const target = quizPool[currentIndex];

    // Phát âm từ tiếng Anh của câu hỏi để người học nghe lại
    onSpeak(target.word);

    const isCorrect = opt.id === target.id;
    if (isCorrect) {
      setScore((s) => s + 10);
      setStreak((st) => st + 1);
    } else {
      setStreak(0);
    }

    setHistory((prev) => [
      ...prev,
      { item: target, selected: opt, isCorrect }
    ]);
  }, [selectedOption, quizPool, currentIndex, onSpeak]);

  const handleNext = useCallback(() => {
    const nextIdx = currentIndex + 1;
    setCurrentIndex(nextIdx);
    if (nextIdx < quizPool.length) {
      generateQuestion(quizPool, distractorPool, nextIdx, quizMode);
    }
  }, [currentIndex, quizPool, distractorPool, quizMode, generateQuestion]);

  // Keyboard Shortcuts: ESC, 1, 2, 3, 4, Enter, Space (nghe lại)
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
      } else if (e.key === ' ' && quizPool[currentIndex]) {
        e.preventDefault();
        onSpeak(quizPool[currentIndex].word);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, selectedOption, options, handleSelectOption, handleNext, quizPool, currentIndex, onSpeak]);

  if (!isOpen) return null;

  const isFinished = currentIndex >= quizPool.length && quizPool.length > 0;
  const current = quizPool[currentIndex];

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card modal-lg quiz-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="quiz-header-badge">
              <HelpCircle size={20} />
            </div>
            <div>
              <h3 className="modal-title">Thử Thách Trắc Nghiệm</h3>
              <p className="modal-subtitle">Tự động phát âm chuẩn xác cho từng câu hỏi & đáp án</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="badge badge-category" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>
              Điểm: <strong>{score}</strong>
            </span>
            <button className="modal-close-btn" onClick={onClose} aria-label="Đóng cửa sổ">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Chế độ trắc nghiệm & Bộ lọc đầy đủ 50 Unit */}
        <div className="quiz-toolbar">
          <div className="quiz-mode-selector">
            <button 
              className={`quiz-tab-btn ${quizMode === 'vi_en' ? 'active' : ''}`}
              onClick={() => handleModeChange('vi_en')}
              title="Nhìn nghĩa Tiếng Việt, chọn Từ Tiếng Anh"
            >
              🇻🇳 → 🇬🇧 Việt - Anh
            </button>
            <button 
              className={`quiz-tab-btn ${quizMode === 'en_vi' ? 'active' : ''}`}
              onClick={() => handleModeChange('en_vi')}
              title="Nhìn từ Tiếng Anh, chọn Nghĩa Tiếng Việt"
            >
              🇬🇧 → 🇻🇳 Anh - Việt
            </button>
          </div>

          <div className="quiz-unit-filter">
            <label htmlFor="quiz-unit-select"><Layers size={14} /> Unit:</label>
            <select 
              id="quiz-unit-select"
              value={selectedUnit}
              onChange={(e) => handleUnitChange(e.target.value)}
            >
              <option value="all">Tất cả Unit (Toàn bộ từ vựng)</option>
              {unitsList && unitsList.length > 0 ? (
                unitsList.map(u => (
                  <option key={u.unit} value={u.unit}>
                    Unit {u.unit} - {u.title}
                  </option>
                ))
              ) : (
                Array.from({ length: 50 }, (_, i) => i + 1).map(u => (
                  <option key={u} value={u}>Unit {u}</option>
                ))
              )}
            </select>
            <button 
              className="btn btn-sm btn-ghost" 
              onClick={() => loadUnitWords(selectedUnit, quizMode)} 
              title="Trộn lại bài thi"
            >
              <RotateCcw size={14} /> Trộn lại
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body quiz-modal-body">
          {isLoading ? (
            <div className="state-container">
              <div className="spinner" />
              <p>Đang nạp từ vựng cho bài trắc nghiệm...</p>
            </div>
          ) : !isFinished && current ? (
            <>
              {/* Question Header Info */}
              <div className="quiz-question-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span className="quiz-q-num">Câu {currentIndex + 1} / {quizPool.length}</span>
                  {streak >= 3 && <span className="streak-badge">🔥 Streak: {streak}</span>}
                </div>

                {/* Question Prompt by Mode */}
                {quizMode === 'vi_en' && (
                  <>
                    <p className="quiz-q-prompt">Từ vựng tiếng Anh nào mang ý nghĩa dưới đây?</p>
                    <h2 className="quiz-target-text">"{current.meaning_vi}"</h2>
                    <span className="badge badge-unit" style={{ marginTop: 8 }}>{current.word_type}</span>
                  </>
                )}

                {quizMode === 'en_vi' && (
                  <>
                    <p className="quiz-q-prompt">Nghĩa tiếng Việt của từ vựng tiếng Anh dưới đây là gì?</p>
                    <div className="quiz-en-target-wrapper">
                      <h2 className="quiz-target-text">{current.word}</h2>
                      <button 
                        className="btn-icon-speaker"
                        onClick={() => onSpeak(current.word)}
                        title="Nghe phát âm (Phím Space)"
                      >
                        <Volume2 size={22} />
                      </button>
                    </div>
                    <p className="font-mono text-muted" style={{ fontSize: '1rem', marginTop: 4 }}>
                      {current.phonetic} • <span className="badge badge-unit">{current.word_type}</span>
                    </p>
                  </>
                )}

                {/* Hint Box */}
                {showHint && (
                  <div className="quiz-hint-box animate-fadeIn">
                    <Lightbulb size={16} style={{ color: 'var(--accent-amber)', flexShrink: 0 }} />
                    <div style={{ textAlign: 'left' }}>
                      <strong style={{ color: 'var(--accent-amber)' }}>Gợi ý âm thanh tương tự:</strong>
                      <p style={{ margin: 0, marginTop: 2 }}>{current.sound_bridge || 'Chưa có gợi ý âm thanh cho từ này.'}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Options Grid */}
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
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span className="opt-index-badge">{idx + 1}</span>
                        <div>
                          {quizMode === 'vi_en' && (
                            <>
                              <strong style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>{opt.word}</strong>
                              <span className="font-mono text-muted" style={{ marginLeft: 6, fontSize: '0.82rem' }}>
                                ({opt.phonetic})
                              </span>
                            </>
                          )}

                          {quizMode === 'en_vi' && (
                            <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                              {opt.meaning_vi}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Loa phát âm cạnh đáp án */}
                      <button 
                        type="button"
                        className="opt-speaker-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSpeak(opt.word);
                        }}
                        title={`Nghe phát âm: ${opt.word}`}
                      >
                        <Volume2 size={16} />
                      </button>
                    </button>
                  );
                })}
              </div>

              {/* Result Feedback Banner */}
              {selectedOption && (
                <div className={`quiz-feedback ${selectedOption.id === current.id ? 'correct' : 'wrong'} animate-fadeIn`}>
                  {selectedOption.id === current.id ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                      <CheckCircle2 size={20} />
                      <span>Chính xác! (+10 điểm) • <strong>{current.word}</strong>: {current.meaning_vi}</span>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                      <XCircle size={20} />
                      <span>Chưa đúng! Đáp án đúng: <strong>{current.word}</strong> <span className="font-mono">({current.phonetic})</span>: {current.meaning_vi}</span>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            /* Finished View */
            <div className="quiz-finished-container animate-fadeIn">
              <div className="finished-badge">
                <Award size={48} />
              </div>
              <h3>🎉 Hoàn thành bài trắc nghiệm!</h3>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', margin: '14px 0' }}>
                Tổng điểm: {score} / {quizPool.length * 10}
              </p>
              <p className="text-muted">
                {score >= quizPool.length * 8 ? '🌟 Xuất sắc! Bạn có khả năng phản xạ từ vựng rất nhạy bén.' : 
                 score >= quizPool.length * 5 ? '👍 Khá tốt! Hãy ôn lại các từ chưa đúng để nhớ lâu hơn nhé.' : 
                 '💪 Hãy tiếp tục luyện tập thêm để cải thiện trí nhớ từ vựng!'}
              </p>

              {/* Review History */}
              <div className="quiz-review-history">
                <h4>Tổng kết các câu hỏi ({history.length} câu):</h4>
                <div className="history-list">
                  {history.map((h, i) => (
                    <div key={i} className={`history-item ${h.isCorrect ? 'correct' : 'wrong'}`}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {h.isCorrect ? <CheckCircle2 size={16} className="text-success" /> : <XCircle size={16} className="text-danger" />}
                        <strong>{h.item.word}</strong>
                        <span className="text-muted">({h.item.phonetic})</span>
                        <span>- {h.item.meaning_vi}</span>
                      </div>
                      <button className="btn-icon-sm" onClick={() => onSpeak(h.item.word)} title="Nghe phát âm">
                        <Volume2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          {!isFinished && current ? (
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <button 
                  className="btn btn-ghost" 
                  onClick={() => setShowHint(true)} 
                  disabled={showHint}
                >
                  <Lightbulb size={16} /> Gợi ý âm thanh
                </button>
                <button 
                  className="btn btn-ghost"
                  onClick={() => current && onSpeak(current.word)}
                  title="Nghe phát âm từ này (Space)"
                >
                  <Volume2 size={16} /> Nghe phát âm (Space)
                </button>
              </div>

              <button 
                className="btn btn-primary" 
                onClick={handleNext} 
                disabled={!selectedOption}
              >
                Câu Tiếp Theo (Enter) <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: 12 }}>
              <button className="btn btn-outline" onClick={onClose}>
                Đóng
              </button>
              <button className="btn btn-primary" onClick={() => loadUnitWords(selectedUnit, quizMode)}>
                <RotateCcw size={16} /> Làm Lại Bài Mới
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
