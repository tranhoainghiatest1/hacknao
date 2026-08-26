import { useState, useCallback, useEffect, useRef } from 'react';

export function useSpeech() {
  const [speakingWord, setSpeakingWord] = useState(null);
  const voicesRef = useRef([]);

  // Tải danh sách voices của hệ thống ngay khi khởi động
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;

    const updateVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices && availableVoices.length > 0) {
        voicesRef.current = availableVoices;
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Dừng mọi âm thanh đang phát
  const stopAll = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingWord(null);
  }, []);

  // Phát âm tức thì (0ms latency, không chờ mạng, âm lượng tối đa 100%)
  const speak = useCallback((text, lang = 'en-US') => {
    if (!text || typeof text !== 'string') return;
    const cleanText = text.trim();
    if (!cleanText) return;

    if (!('speechSynthesis' in window)) {
      console.warn('Trình duyệt không hỗ trợ Web Speech API.');
      return;
    }

    // Fix lỗi Chrome thỉnh thoảng bị pause/stuck
    window.speechSynthesis.cancel();
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang;
    utterance.rate = 0.92;   // Tốc độ tự nhiên, rõ từng âm tiết
    utterance.volume = 1.0;  // Âm lượng tối đa 100%
    utterance.pitch = 1.0;   // Cao độ chuẩn

    // Tự động tìm giọng đọc to và rõ nhất của US / UK
    const allVoices = voicesRef.current.length > 0 ? voicesRef.current : window.speechSynthesis.getVoices();
    
    if (allVoices && allVoices.length > 0) {
      // Ưu tiên các giọng to và phát âm chuẩn nhất trên Windows / Chrome / Mac
      const preferredVoice = 
        allVoices.find(v => v.lang === 'en-US' && (v.name.includes('Natural') || v.name.includes('Online'))) ||
        allVoices.find(v => v.lang === 'en-US' && v.name.includes('Google')) ||
        allVoices.find(v => v.lang === 'en-US' && (v.name.includes('Zira') || v.name.includes('David') || v.name.includes('Jenny') || v.name.includes('Guy') || v.name.includes('Aria'))) ||
        allVoices.find(v => v.lang === 'en-US') ||
        allVoices.find(v => v.lang.startsWith('en'));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
    }

    utterance.onstart = () => {
      setSpeakingWord(cleanText);
    };

    utterance.onend = () => {
      setSpeakingWord(null);
    };

    utterance.onerror = (e) => {
      // Bỏ qua lỗi canceled khi bấm liên tục từ khác
      if (e.error !== 'canceled') {
        console.warn('Speech error:', e);
      }
      setSpeakingWord(null);
    };

    // Phát ngay lập tức 0 giây
    window.speechSynthesis.speak(utterance);
  }, []);

  // Cleanup khi unmount
  useEffect(() => {
    return () => {
      stopAll();
    };
  }, [stopAll]);

  return { speak, speakingWord, stopAll };
}
