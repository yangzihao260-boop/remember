import React from 'react';
import { Volume2, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { TargetWordId } from '../types';
import { TARGET_WORDS } from '../data/words';
import { speakEnglishWord } from '../utils/audio';

interface MatchedShowcaseProps {
  matchedWordIds: TargetWordId[];
  speechRate: number;
}

export const MatchedShowcase: React.FC<MatchedShowcaseProps> = ({
  matchedWordIds,
  speechRate,
}) => {
  const handlePlayWord = (word: string) => {
    speakEnglishWord(word, speechRate);
  };

  return (
    <section 
      id="matched-showcase-section" 
      aria-label="已配对词汇展示区"
      className="w-full bg-stone-900/90 rounded-3xl border-2 border-amber-500/30 p-5 sm:p-7 shadow-2xl backdrop-blur-sm mt-8 transition-all"
    >
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold font-serif text-amber-100">
                已点亮的词汇宝库
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                {matchedWordIds.length} / {TARGET_WORDS.length} 已解锁
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              卡片配对成功后自动收录于此 · 随时点击喇叭跟读复习
            </p>
          </div>
        </div>

        {matchedWordIds.length === TARGET_WORDS.length && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold animate-pulse">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>太棒了！四个词汇已全部配对成功！</span>
          </div>
        )}
      </div>

      {/* Grid of 4 word showcase slots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {TARGET_WORDS.map((item) => {
          const isUnlocked = matchedWordIds.includes(item.id);

          if (!isUnlocked) {
            return (
              <div
                key={item.id}
                id={`showcase-locked-${item.id}`}
                className="h-full min-h-[260px] rounded-2xl border-2 border-dashed border-stone-800 bg-stone-950/40 p-5 flex flex-col items-center justify-center text-center select-none"
              >
                <div className="w-14 h-14 rounded-full bg-stone-800/80 border border-stone-700/80 flex items-center justify-center text-2xl text-stone-600 mb-3 shadow-inner">
                  🔒
                </div>
                <h4 className="text-sm font-serif font-bold text-stone-500">
                  神秘词汇待解锁
                </h4>
                <p className="text-xs text-stone-600 mt-1 max-w-[160px]">
                  在上方网格中找出对应的单词与插画卡片
                </p>
              </div>
            );
          }

          return (
            <div
              key={item.id}
              id={`showcase-card-${item.id}`}
              className="group h-full rounded-2xl bg-gradient-to-b from-stone-850 to-stone-900 border-2 border-amber-500/40 overflow-hidden shadow-xl hover:border-amber-400 transition-all flex flex-col justify-between"
            >
              {/* Illustration banner */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-stone-950">
                <img
                  src={item.image}
                  alt={item.word}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent" />
                
                <div className="absolute top-2.5 right-2.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/90 text-stone-950 text-[10px] font-bold shadow-md">
                    <CheckCircle2 className="w-3 h-3" />
                    已掌握
                  </span>
                </div>
              </div>

              {/* Word Details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold font-serif text-amber-100 tracking-wide leading-tight">
                        {item.word}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-mono text-amber-300/80">
                          {item.phonetic}
                        </span>
                        <span className="text-xs px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-200 border border-amber-500/30 font-medium">
                          {item.chinese}
                        </span>
                      </div>
                    </div>

                    {/* Pronunciation button */}
                    <button
                      id={`pronounce-btn-${item.id}`}
                      onClick={() => handlePlayWord(item.word)}
                      className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 shadow-md transition-all cursor-pointer flex-shrink-0"
                      title="朗读这个单词"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Story Fact for Lesson Assistant */}
                  <div className="mt-3 p-2.5 rounded-xl bg-stone-950/60 border border-stone-800 text-[11px] text-stone-300 leading-relaxed">
                    <span className="text-amber-400 font-semibold mr-1">💡 知识点:</span>
                    {item.storyFact}
                  </div>
                </div>

                {/* Read aloud hint */}
                <button
                  onClick={() => handlePlayWord(item.word)}
                  className="mt-3 w-full py-1.5 px-3 rounded-lg bg-stone-800/80 hover:bg-stone-750 text-amber-300 hover:text-amber-200 text-xs font-medium border border-amber-500/20 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>点击大声跟读</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
