import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { TARGET_WORDS } from '../data/words';
import { speakEnglishWord } from '../utils/audio';

interface VictoryModalProps {
  isOpen: boolean;
  moves: number;
  onPlayAgain: () => void;
  speechRate: number;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  moves,
  onPlayAgain,
  speechRate,
}) => {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#fbbf24', '#38bdf8', '#10b981', '#f43f5e'],
        });
        const timer = setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#f59e0b', '#fbbf24', '#38bdf8'],
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#10b981', '#f43f5e', '#a855f7'],
          });
        }, 350);
        return () => clearTimeout(timer);
      } catch (e) {
        console.warn(e);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div 
        className="relative w-full max-w-xl bg-stone-900 border-2 border-amber-400 rounded-3xl p-6 sm:p-8 shadow-2xl text-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow effect */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Trophy icon */}
        <div className="relative mx-auto w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-stone-950 shadow-xl mb-5 ring-4 ring-amber-400/30">
          <Trophy className="w-10 h-10 animate-bounce" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold font-serif text-amber-100 mb-2">
          恭喜通关！词汇大师！
        </h3>
        <p className="text-stone-300 text-sm mb-6 max-w-md mx-auto">
          你成功在 <strong className="text-amber-400 font-bold">{moves}</strong> 次尝试中配对了所有古希腊词汇！太棒了！
        </p>

        {/* 4 Cards Quick Recite Grid */}
        <div className="mb-6 p-4 rounded-2xl bg-stone-950/80 border border-stone-800 text-left">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>通关总复习 · 跟着老师读一遍吧：</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {TARGET_WORDS.map((w) => (
              <button
                key={w.id}
                onClick={() => speakEnglishWord(w.word, speechRate)}
                className="p-2 rounded-xl bg-stone-850 hover:bg-stone-750 border border-stone-700/80 flex items-center justify-between transition-colors text-left group cursor-pointer"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <img
                    src={w.image}
                    alt={w.word}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="truncate">
                    <p className="text-xs font-bold font-serif text-stone-100 group-hover:text-amber-300 truncate">
                      {w.word}
                    </p>
                    <p className="text-[10px] text-stone-400 truncate">
                      {w.chinese}
                    </p>
                  </div>
                </div>
                <Volume2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 ml-1" />
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onPlayAgain}
            className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>再玩一局 (重新洗牌)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
