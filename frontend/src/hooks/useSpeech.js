import { useState, useCallback, useEffect } from 'react';

export function useSpeech() {
  const [speakingWord, setSpeakingWord] = useState(null);

  const speak = useCallback((text, lang = 'en-US') => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;

    utterance.onstart = () => {
      setSpeakingWord(text);
    };

    utterance.onend = () => {
      setSpeakingWord(null);
    };

    utterance.onerror = () => {
      setSpeakingWord(null);
    };

    window.speechSynthesis.speak(utterance);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return { speak, speakingWord };
}
