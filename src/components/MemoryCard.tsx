import React from 'react';
import { Volume2, Sparkles } from 'lucide-react';
import { GameCard } from '../types';
import { getWordById } from '../data/words';

interface MemoryCardProps {
  card: GameCard;
  onCardClick: (card: GameCard) => void;
  disabled: boolean;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({
  card,
  onCardClick,
  disabled
}) => {
  const wordData = getWordById(card.wordId);
  if (!wordData) return null;

  const handleClick = () => {
    if (disabled || card.isFlipped || card.isMatched) return;
    onCardClick(card);
  };

  // When matched, the card disappears from the 8-card board with smooth vanish effect
  if (card.isMatched) {
    return (
      <div 
        id={`card-slot-${card.numberIndex}`}
        className="w-full aspect-[4/5] rounded-2xl border-2 border-dashed border-amber-900/20 bg-amber-900/5 flex flex-col items-center justify-center p-3 text-center transition-all duration-700 opacity-40 select-none"
      >
        <div className="w-8 h-8 rounded-full bg-amber-200/50 flex items-center justify-center text-amber-800 text-xs font-serif font-bold mb-1">
          ✓
        </div>
        <span className="text-[11px] font-medium text-amber-900/60">
          已收录到下方
        </span>
      </div>
    );
  }

  return (
    <div
      id={`memory-card-${card.id}`}
      onClick={handleClick}
      className={`group w-full aspect-[4/5] perspective-1000 select-none cursor-pointer transition-transform duration-300 ${
        disabled ? 'cursor-default' : 'hover:-translate-y-1 active:scale-95'
      }`}
    >
      <div
        className={`relative w-full h-full rounded-2xl shadow-md transition-transform duration-500 transform-style-3d ${
          card.isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* ================= CARD BACK (面对玩家的背面) ================= */}
        <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 p-2.5 backface-hidden border-2 border-amber-500/40 shadow-xl flex flex-col justify-between overflow-hidden">
          {/* Decorative Greek Key pattern corner accent */}
          <div className="absolute inset-1.5 rounded-xl border border-amber-500/20 pointer-events-none" />
          <div className="absolute top-1 right-1 opacity-20 text-amber-300 text-2xl font-serif">
            🏛️
          </div>
          <div className="absolute bottom-1 left-1 opacity-20 text-amber-300 text-2xl font-serif">
            ⚔️
          </div>

          {/* Top index badge */}
          <div className="flex justify-between items-center z-10">
            <span className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-serif font-bold text-xs flex items-center justify-center shadow-inner">
              #{card.numberIndex}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-amber-400/60 font-serif">
              Ancient Greece
            </span>
          </div>

          {/* Central Greek Emblem */}
          <div className="flex flex-col items-center justify-center my-auto z-10 text-center">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-b from-amber-500/20 to-amber-600/10 border-2 border-amber-400/50 flex items-center justify-center shadow-lg group-hover:border-amber-400 transition-colors">
              <span className="text-2xl sm:text-3xl">🏺</span>
              <div className="absolute -inset-1 rounded-full border border-amber-400/20 animate-pulse pointer-events-none" />
            </div>
            <p className="mt-2 text-xs font-serif font-medium text-amber-200/90 tracking-wide">
              点击翻开
            </p>
            <p className="text-[10px] text-stone-400">
              听发音 · 找配对
            </p>
          </div>

          {/* Bottom badge */}
          <div className="flex justify-center items-center z-10">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-950/60 border border-amber-500/30 text-[10px] text-amber-300/80">
              <Sparkles className="w-2.5 h-2.5 text-amber-400" />
              <span>记忆卡 #{card.numberIndex}</span>
            </div>
          </div>
        </div>

        {/* ================= CARD FRONT (翻开后的正面) ================= */}
        <div className="absolute inset-0 w-full h-full rounded-2xl bg-white p-2.5 backface-hidden rotate-y-180 border-2 border-amber-400 shadow-xl flex flex-col justify-between overflow-hidden">
          {card.cardType === 'word' ? (
            /* Word Card Front */
            <div className="w-full h-full rounded-xl bg-gradient-to-b from-amber-50/80 via-white to-amber-100/50 p-3 flex flex-col justify-between items-center text-center border border-amber-200">
              <div className="w-full flex justify-between items-center">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-semibold">
                  📝 单词卡
                </span>
                <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center">
                  #{card.numberIndex}
                </span>
              </div>

              <div className="my-auto flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-700 flex items-center justify-center mb-2 shadow-sm">
                  <Volume2 className="w-5 h-5 animate-bounce" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 tracking-tight leading-snug">
                  {wordData.word}
                </h3>
                <span className="text-xs font-mono text-stone-500 mt-0.5">
                  {wordData.phonetic}
                </span>
                <div className="mt-2.5 px-2.5 py-1 rounded-md bg-amber-200/60 text-amber-900 font-semibold text-xs border border-amber-300/60">
                  {wordData.chinese}
                </div>
              </div>

              <div className="text-[10px] text-amber-800/80 font-medium">
                🔊 正在发音 · 请寻找对应插画
              </div>
            </div>
          ) : (
            /* Illustration Card Front */
            <div className="w-full h-full rounded-xl flex flex-col justify-between overflow-hidden bg-stone-900 border border-amber-300 relative group">
              {/* Image */}
              <div className="relative w-full h-full flex-1 overflow-hidden">
                <img
                  src={wordData.image}
                  alt={wordData.word}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/20" />

                <div className="absolute top-2 left-2 z-10">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-amber-300 text-[10px] font-semibold border border-amber-500/30">
                    🎨 插画卡
                  </span>
                </div>

                <div className="absolute top-2 right-2 z-10">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center shadow-md">
                    #{card.numberIndex}
                  </span>
                </div>

                {/* Bottom caption showing the word hint & speaker */}
                <div className="absolute bottom-2 inset-x-2 z-10 p-2 rounded-lg bg-stone-900/90 backdrop-blur-sm border border-amber-500/30 text-stone-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-amber-200 font-serif">
                      {wordData.word}
                    </p>
                    <p className="text-[10px] text-stone-300">
                      {wordData.chinese}
                    </p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center">
                    <Volume2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
