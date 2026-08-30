import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  X, 
  PenTool, 
  Volume2, 
  Lightbulb, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  Eye, 
  EyeOff, 
  HelpCircle,
  Award,
  Layers,
  RefreshCw,
  SkipForward
} from 'lucide-react';

export function WritingModal({ isOpen, unitsList = [], currentUnit, onClose, onSpeak }) {
  const [writingPool, setWritingPool] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'correct', 'wrong', 'revealed'
  const [attempts, setAttempts] = useState(0);
  const [revealedLetters, setRevealedLetters] = useState(0);
  const [showSoundBridge, setShowSoundBridge] = useState(false);
  const [showPhonetic, setShowPhonetic] = useState(false);
  const [mode, setMode] = useState('vi_to_en'); // 'vi_to_en' (Nghĩa -> Gõ từ), 'dictation' (Nghe -> Gõ từ)
  const [selectedUnit, setSelectedUnit] = useState(currentUnit || 'all');
  const [stats, setStats] = useState({ correct: 0, wrong: 0, streak: 0, maxStreak: 0 });
  const [resultsHistory, setResultsHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef(null);

  // Tải danh sách từ vựng đầy đủ theo Unit đã chọn
  const loadUnitWords = useCallback(async (unitToFetch, modeToUse) => {
    setIsLoading(true);
    try {
      const activeUnit = unitToFetch !== undefined ? unitToFetch : selectedUnit;
      const activeMode = modeToUse || mode;

      const unitParam = (activeUnit && activeUnit !== 'all') ? `unit=${activeUnit}&limit=200` : `limit=1500`;
      const res = await fetch(`/api/vocabularies?${unitParam}`);
      const json = await res.json();

      if (json.success && json.data && json.data.length > 0) {
        const words = json.data;
        // Trộn ngẫu nhiên TOÀN BỘ từ vựng của Unit (làm đủ số từ của Unit đó)
        const shuffled = [...words].sort(() => 0.5 - Math.random());
        
        setWritingPool(shuffled);
        setCurrentIndex(0);
        setUserInput('');
        setStatus('idle');
        setAttempts(0);
        setRevealedLetters(0);
        setShowSoundBridge(false);
        setStats({ correct: 0, wrong: 0, streak: 0, maxStreak: 0 });
        setResultsHistory([]);

        // Nếu ở chế độ Dictation (Nghe chép chính tả), tự động phát âm từ đầu tiên
        if (activeMode === 'dictation' && shuffled[0]) {
          setTimeout(() => {
            onSpeak(shuffled[0].word);
          }, 300);
        }
      }
    } catch (err) {
      console.error('Error loading writing words:', err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedUnit, mode, onSpeak]);

  // Khởi chạy khi mở modal
  useEffect(() => {
    if (isOpen) {
      const initialUnit = (currentUnit && currentUnit !== 'all') ? currentUnit : 'all';
      setSelectedUnit(initialUnit);
      loadUnitWords(initialUnit, mode);
    }
  }, [isOpen, currentUnit]);

  // Focus input mỗi khi chuyển câu hoặc khi thử lại
  useEffect(() => {
    if (isOpen && status !== 'correct' && !isLoading) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, currentIndex, status, isLoading]);

  const current = writingPool[currentIndex];

  // Xử lý đổi Unit
  const handleUnitChange = (newUnit) => {
    setSelectedUnit(newUnit);
    loadUnitWords(newUnit, mode);
  };

  // Xử lý đổi Chế độ
  const handleModeChange = (newMode) => {
    setMode(newMode);
    loadUnitWords(selectedUnit, newMode);
  };

  // Kiểm tra đáp án
  const handleCheckAnswer = useCallback((e) => {
    if (e) e.preventDefault();
    if (!current || status === 'correct') return;

    const cleanInput = userInput.trim().toLowerCase();
    const cleanTarget = current.word.trim().toLowerCase();

    if (!cleanInput) return;

    if (cleanInput === cleanTarget) {
      // ✅ ĐÚNG: TỰ ĐỘNG PHÁT ÂM NGAY LẬP TỨC
      setStatus('correct');
      onSpeak(current.word);

      setStats(prev => {
        const newStreak = prev.streak + 1;
        return {
          ...prev,
          correct: prev.correct + 1,
          streak: newStreak,
          maxStreak: Math.max(prev.maxStreak, newStreak)
        };
      });

      setResultsHistory(prev => [
        ...prev,
        { item: current, isCorrect: attempts === 0 && status !== 'revealed', userTyped: userInput }
      ]);
    } else {
      // ❌ SAI: Cho phép gõ lại
      setStatus('wrong');
      setAttempts(a => a + 1);

      if (attempts === 0 && status !== 'revealed') {
        setStats(prev => ({
          ...prev,
          wrong: prev.wrong + 1,
          streak: 0
        }));
      }

      // Tự động focus lại input để người dùng sửa lại
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
    }
  }, [current, status, userInput, attempts, onSpeak]);

  // Chuyển sang câu tiếp theo
  const handleNextWord = useCallback(() => {
    const nextIdx = currentIndex + 1;
    setCurrentIndex(nextIdx);
    setUserInput('');
    setStatus('idle');
    setAttempts(0);
    setRevealedLetters(0);
    setShowSoundBridge(false);

    if (nextIdx < writingPool.length) {
      if (mode === 'dictation') {
        setTimeout(() => {
          onSpeak(writingPool[nextIdx].word);
        }, 200);
      }
    }
  }, [currentIndex, writingPool, mode, onSpeak]);

  // Xóa gõ lại từ đầu cho từ này
  const handleResetInput = () => {
    setUserInput('');
    if (status === 'wrong') setStatus('idle');
    inputRef.current?.focus();
  };

  // Gợi ý 1 ký tự tiếp theo
  const handleHintLetter = () => {
    if (!current || status === 'correct') return;
    const target = current.word;
    const nextLetterCount = Math.min(revealedLetters + 1, target.length);
    setRevealedLetters(nextLetterCount);
    setUserInput(target.slice(0, nextLetterCount));
    inputRef.current?.focus();
  };

  // Xem toàn bộ đáp án (vẫn cho phép người dùng gõ lại từ đó sau khi xem)
  const handleRevealAnswer = () => {
    if (!current) return;
    setStatus('revealed');
    onSpeak(current.word);

    if (attempts === 0) {
      setStats(prev => ({
        ...prev,
        wrong: prev.wrong + 1,
        streak: 0
      }));
    }

    // Tự động focus để người dùng nhìn đáp án và gõ lại
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  // Keyboard Shortcuts: Enter để nộp/tiếp tục, Escape đóng
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Enter') {
        if (status !== 'correct') {
          handleCheckAnswer();
        } else {
          handleNextWord();
        }
      } else if (e.ctrlKey && e.key.toLowerCase() === 'h') {
        e.preventDefault();
        handleHintLetter();
      } else if (e.ctrlKey && e.key === ' ') {
        e.preventDefault();
        if (current) onSpeak(current.word);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, status, handleCheckAnswer, handleNextWord, current, onSpeak]);

  if (!isOpen) return null;

  const isFinished = currentIndex >= writingPool.length && writingPool.length > 0;
  const progressPercent = writingPool.length > 0 ? Math.round(((currentIndex) / writingPool.length) * 100) : 0;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card modal-lg writing-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="writing-icon-badge">
              <PenTool size={20} />
            </div>
            <div>
              <h3 className="modal-title">Luyện Viết & Chính Tả Tiếng Anh</h3>
              <p className="modal-subtitle">Gõ từ vựng - Tự động phát âm chuẩn khi viết đúng</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Đóng cửa sổ">
            <X size={20} />
          </button>
        </div>

        {/* Toolbar chế độ & Unit */}
        <div className="writing-toolbar">
          <div className="writing-mode-selector">
            <button 
              className={`mode-btn ${mode === 'vi_to_en' ? 'active' : ''}`}
              onClick={() => handleModeChange('vi_to_en')}
            >
              🇻🇳 → 🇬🇧 Nhìn nghĩa gõ từ
            </button>
            <button 
              className={`mode-btn ${mode === 'dictation' ? 'active' : ''}`}
              onClick={() => handleModeChange('dictation')}
            >
              🎧 Nghe chép chính tả (Dictation)
            </button>
          </div>

          <div className="writing-filter-unit">
            <label htmlFor="writing-unit-select"><Layers size={14} /> Unit:</label>
            <select 
              id="writing-unit-select"
              value={selectedUnit}
              onChange={(e) => handleUnitChange(e.target.value)}
            >
              <option value="all">Tất cả Unit (Toàn bộ từ vựng)</option>
              {unitsList && unitsList.length > 0 ? (
                unitsList.map(u => (
                  <option key={u.unit} value={u.unit}>Unit {u.unit} - {u.title}</option>
                ))
              ) : (
                Array.from({ length: 50 }, (_, i) => i + 1).map(u => (
                  <option key={u} value={u}>Unit {u}</option>
                ))
              )}
            </select>
            <button 
              className="btn btn-sm btn-ghost" 
              onClick={() => loadUnitWords(selectedUnit, mode)} 
              title="Trộn bài mới"
            >
              <RotateCcw size={14} /> Trộn lại
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body writing-modal-body">
          {isLoading ? (
            <div className="state-container">
              <div className="spinner" />
              <p>Đang nạp từ vựng cho bài luyện viết...</p>
            </div>
          ) : !isFinished && current ? (
            <>
              {/* Progress bar & Stats */}
              <div className="writing-progress-header">
                <div className="progress-info">
                  <span>Từ {currentIndex + 1} / {writingPool.length}</span>
                  <span className="badge badge-unit">Unit {current.unit}: {current.unit_title}</span>
                </div>
                <div className="writing-streak-box">
                  {stats.streak >= 3 && (
                    <span className="streak-badge animate-bounce">
                      🔥 Streak: {stats.streak}
                    </span>
                  )}
                  <span className="text-muted">Đúng: <strong className="text-success">{stats.correct}</strong></span>
                  <span className="text-muted">Sai: <strong className="text-danger">{stats.wrong}</strong></span>
                </div>
              </div>

              <div className="writing-progress-bar">
                <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
              </div>

              {/* Card Câu Hỏi */}
              <div className="writing-card-container">
                {mode === 'dictation' ? (
                  <div className="dictation-prompt-box">
                    <button 
                      className="btn-large-speaker"
                      onClick={() => onSpeak(current.word)}
                      title="Bấm để nghe phát âm"
                    >
                      <Volume2 size={36} />
                      <span>Bấm nghe phát âm</span>
                    </button>
                    <p className="text-muted" style={{ marginTop: 8, fontSize: '0.88rem' }}>
                      Lắng nghe kỹ và gõ lại chính xác từ tiếng Anh bạn vừa nghe
                    </p>
                  </div>
                ) : (
                  <div className="meaning-prompt-box">
                    <div className="word-type-tag">{current.word_type || 'noun'}</div>
                    <h2 className="writing-vi-meaning">"{current.meaning_vi}"</h2>
                    {showPhonetic && (
                      <p className="font-mono text-muted" style={{ fontSize: '1.1rem', marginTop: 4 }}>
                        {current.phonetic}
                      </p>
                    )}
                  </div>
                )}

                {/* Gợi ý âm thanh tương tự Hack Não */}
                {showSoundBridge && current.sound_bridge && (
                  <div className="sound-bridge-hint-box animate-fadeIn">
                    <Lightbulb size={16} className="hint-icon" />
                    <div>
                      <strong>Mẹo Âm Thanh Tương Tự:</strong>
                      <p>{current.sound_bridge}</p>
                    </div>
                  </div>
                )}

                {/* Form Nhập Đáp Án */}
                <form onSubmit={handleCheckAnswer} className="writing-input-form">
                  <div className={`writing-input-wrapper ${status}`}>
                    <input
                      ref={inputRef}
                      type="text"
                      className="writing-input"
                      placeholder={`Gõ từ tiếng Anh (${current.word.length} chữ cái)...`}
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      disabled={status === 'correct'}
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck="false"
                    />

                    <button 
                      type="button" 
                      className="input-speaker-btn"
                      onClick={() => onSpeak(current.word)}
                      title="Nghe phát âm từ này"
                    >
                      <Volume2 size={20} />
                    </button>
                  </div>

                  {/* Feedback Message */}
                  {status === 'correct' && (
                    <div className="writing-feedback correct animate-fadeIn">
                      <CheckCircle2 size={22} />
                      <div>
                        <strong>Chính xác 100%!</strong>
                        <div style={{ fontSize: '0.9rem', marginTop: 2 }}>
                          <strong>{current.word}</strong> <span className="font-mono text-muted">({current.phonetic})</span>: {current.meaning_vi}
                        </div>
                      </div>
                    </div>
                  )}

                  {status === 'wrong' && (
                    <div className="writing-feedback wrong animate-fadeIn">
                      <XCircle size={22} />
                      <div>
                        <strong>Chưa chính xác! Bạn hãy thử gõ lại nhé.</strong>
                        <div style={{ fontSize: '0.85rem', marginTop: 2 }}>
                          Gợi ý: Từ này có <strong>{current.word.length} chữ cái</strong>. (Bấm Gợi ý chữ hoặc Xem đáp án nếu bí).
                        </div>
                      </div>
                    </div>
                  )}

                  {status === 'revealed' && (
                    <div className="writing-feedback revealed animate-fadeIn">
                      <HelpCircle size={22} />
                      <div style={{ width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div>
                            <strong>Đáp án mẫu: </strong> 
                            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', marginLeft: 4 }}>
                              {current.word}
                            </span>
                            <span className="font-mono text-muted" style={{ marginLeft: 6 }}>({current.phonetic})</span>
                          </div>
                          <button 
                            type="button" 
                            className="btn-icon-sm"
                            onClick={() => onSpeak(current.word)}
                            title="Nghe phát âm"
                          >
                            <Volume2 size={18} />
                          </button>
                        </div>
                        <p style={{ fontSize: '0.85rem', margin: '4px 0 0 0', color: 'var(--text-secondary)' }}>
                          👉 Hãy nhìn từ trên và <strong>gõ lại vào ô bên trên</strong> rồi bấm <strong>Kiểm Tra (Enter)</strong> để ghi nhớ cách viết nhé!
                        </p>
                      </div>
                    </div>
                  )}
                </form>

                {/* Gợi ý chữ cái ô trống */}
                <div className="letter-placeholders">
                  {current.word.split('').map((char, i) => {
                    const isRevealed = i < revealedLetters || status === 'correct' || status === 'revealed';
                    return (
                      <span key={i} className={`letter-box ${isRevealed ? 'revealed' : ''}`}>
                        {isRevealed ? char : (char === ' ' ? ' ' : '•')}
                      </span>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            /* Kết quả hoàn thành */
            <div className="writing-results-view animate-fadeIn">
              <div className="results-badge-icon">
                <Award size={48} />
              </div>
              <h3>🎉 Hoàn thành bài luyện viết!</h3>
              <p className="text-muted">Bạn đã hoàn thành phiên luyện gõ từ vựng tiếng Anh.</p>

              <div className="results-stats-grid">
                <div className="result-stat-card">
                  <span className="stat-num text-success">{stats.correct}</span>
                  <span className="stat-label">Viết đúng</span>
                </div>
                <div className="result-stat-card">
                  <span className="stat-num text-danger">{stats.wrong}</span>
                  <span className="stat-label">Cần luyện thêm</span>
                </div>
                <div className="result-stat-card">
                  <span className="stat-num text-primary">{Math.round((stats.correct / Math.max(1, writingPool.length)) * 100)}%</span>
                  <span className="stat-label">Tỷ lệ chính xác</span>
                </div>
                <div className="result-stat-card">
                  <span className="stat-num text-warning">{stats.maxStreak}</span>
                  <span className="stat-label">Chuỗi đúng nhất</span>
                </div>
              </div>

              {/* Bảng chi tiết từ đã luyện */}
              <div className="results-table-container">
                <h4>Chi tiết các từ đã viết:</h4>
                <div className="results-list">
                  {resultsHistory.map((res, i) => (
                    <div key={i} className={`result-row ${res.isCorrect ? 'correct' : 'wrong'}`}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {res.isCorrect ? <CheckCircle2 size={16} className="text-success" /> : <XCircle size={16} className="text-danger" />}
                        <strong>{res.item.word}</strong>
                        <span className="text-muted" style={{ fontSize: '0.85rem' }}>- {res.item.meaning_vi}</span>
                      </div>
                      <button 
                        className="btn-icon-sm"
                        onClick={() => onSpeak(res.item.word)}
                        title="Nghe phát âm"
                      >
                        <Volume2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="modal-footer">
          {!isFinished && current ? (
            <div className="writing-footer-actions">
              <div className="hint-buttons-group">
                <button 
                  className="btn btn-ghost btn-sm"
                  onClick={handleHintLetter}
                  disabled={status === 'correct' || revealedLetters >= current?.word.length}
                  title="Hiện 1 chữ cái (Ctrl + H)"
                >
                  <Lightbulb size={15} /> Gợi ý chữ ({revealedLetters}/{current?.word.length})
                </button>

                <button 
                  className="btn btn-ghost btn-sm"
                  onClick={() => setShowSoundBridge(!showSoundBridge)}
                  title="Mẹo âm thanh tương tự"
                >
                  <Sparkles size={15} /> {showSoundBridge ? 'Ẩn mẹo nhớ' : 'Mẹo âm thanh'}
                </button>

                <button 
                  className="btn btn-ghost btn-sm"
                  onClick={() => setShowPhonetic(!showPhonetic)}
                  title="Ẩn / Hiện phiên âm IPA"
                >
                  {showPhonetic ? <EyeOff size={15} /> : <Eye size={15} />} {showPhonetic ? 'Ẩn IPA' : 'Hiện IPA'}
                </button>

                {userInput && status !== 'correct' && (
                  <button 
                    className="btn btn-ghost btn-sm"
                    onClick={handleResetInput}
                    title="Xóa trắng để gõ lại"
                  >
                    <RefreshCw size={14} /> Xóa gõ lại
                  </button>
                )}

                {status !== 'correct' && status !== 'revealed' && (
                  <button 
                    className="btn btn-ghost btn-sm text-danger"
                    onClick={handleRevealAnswer}
                    title="Xem đáp án mẫu"
                  >
                    Xem đáp án
                  </button>
                )}
              </div>

              <div className="submit-buttons-group">
                {status === 'revealed' && (
                  <button 
                    className="btn btn-ghost btn-sm"
                    onClick={handleNextWord}
                    title="Bỏ qua sang từ tiếp theo mà không cần gõ lại"
                  >
                    Bỏ qua <SkipForward size={14} />
                  </button>
                )}

                {status !== 'correct' ? (
                  <button 
                    className="btn btn-primary"
                    onClick={handleCheckAnswer}
                    disabled={!userInput.trim()}
                  >
                    Kiểm Tra (Enter)
                  </button>
                ) : (
                  <button 
                    className="btn btn-primary"
                    onClick={handleNextWord}
                  >
                    Từ Tiếp Theo (Enter) <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: 12 }}>
              <button className="btn btn-outline" onClick={onClose}>
                Đóng
              </button>
              <button className="btn btn-primary" onClick={() => loadUnitWords(selectedUnit, mode)}>
                <RotateCcw size={16} /> Luyện Tập Bài Mới
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
