import { useState, useCallback, useEffect, useRef } from 'react';

// Cache audio URLs để phát tức thì khi bấm lại
const audioCache = new Map();

export function useSpeech() {
  const [speakingWord, setSpeakingWord] = useState(null);
  const currentAudioRef = useRef(null);

  // Dừng mọi âm thanh đang phát
  const stopAll = useCallback(() => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingWord(null);
  }, []);

  // Fallback: Phát bằng Web Speech API trình duyệt nhưng tối ưu âm lượng to nhất (1.0)
  const speakWithSpeechSynthesis = useCallback((text, lang = 'en-US') => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    utterance.volume = 1.0; // Âm lượng tối đa 100%

    // Chọn giọng đọc tự nhiên và to rõ nhất nếu có
    const voices = window.speechSynthesis.getVoices();
    const premiumVoice = voices.find(v => 
      (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Jenny') || v.name.includes('Guy')) &&
      v.lang.startsWith('en')
    ) || voices.find(v => v.lang.startsWith('en'));

    if (premiumVoice) {
      utterance.voice = premiumVoice;
    }

    utterance.onstart = () => setSpeakingWord(text);
    utterance.onend = () => setSpeakingWord(null);
    utterance.onerror = () => setSpeakingWord(null);

    window.speechSynthesis.speak(utterance);
  }, []);

  // Phát âm thanh Native MP3 độ nét cao (như Oxford / Cambridge)
  const speak = useCallback(async (text, lang = 'en-US') => {
    if (!text || typeof text !== 'string') return;
    const cleanText = text.trim();
    if (!cleanText) return;

    stopAll();
    setSpeakingWord(cleanText);

    try {
      let audioUrl = audioCache.get(cleanText);

      // Nếu là 1 từ đơn (không chứa khoảng trắng), thử lấy file thu âm MP3 của từ điển
      const isSingleWord = !cleanText.includes(' ') && cleanText.length < 30;

      if (!audioUrl && isSingleWord) {
        try {
          const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cleanText.toLowerCase())}`);
          if (res.ok) {
            const data = await res.json();
            const phonetics = data[0]?.phonetics || [];
            // Ưu tiên file mp3 chuẩn US hoặc UK
            const foundAudio = phonetics.find(p => p.audio && (p.audio.includes('-us.mp3') || p.audio.includes('-uk.mp3') || p.audio.endsWith('.mp3')));
            if (foundAudio?.audio) {
              audioUrl = foundAudio.audio;
              audioCache.set(cleanText, audioUrl);
            }
          }
        } catch (e) {
          // Bỏ qua lỗi mạng, sẽ dùng nguồn Google TTS phía dưới
        }
      }

      // Nguồn Google TTS chất lượng cao (to, rõ ràng, đọc cả câu lẫn từ)
      if (!audioUrl) {
        audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(cleanText)}`;
      }

      // Tạo Audio element với volume tối đa 1.0
      const audio = new Audio(audioUrl);
      audio.volume = 1.0;
      currentAudioRef.current = audio;

      audio.onended = () => {
        setSpeakingWord(null);
        currentAudioRef.current = null;
      };

      audio.onerror = () => {
        // Nếu nguồn MP3 bị chặn/lỗi mạng thì fallback sang SpeechSynthesis
        currentAudioRef.current = null;
        speakWithSpeechSynthesis(cleanText, lang);
      };

      await audio.play();
    } catch (err) {
      // Fallback về Web Speech API nếu trình duyệt chặn autoplay
      speakWithSpeechSynthesis(cleanText, lang);
    }
  }, [stopAll, speakWithSpeechSynthesis]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAll();
    };
  }, [stopAll]);

  return { speak, speakingWord, stopAll };
}
