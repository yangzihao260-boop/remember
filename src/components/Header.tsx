import React from 'react';
import { Volume2, VolumeX, RotateCcw, BookOpen, Sparkles, Gauge } from 'lucide-react';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  speechRate: number;
  onChangeSpeechRate: (rate: number) => void;
  onResetGame: () => void;
  onOpenTeacherGuide: () => void;
  matchedCount: number;
  totalPairs: number;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
  speechRate,
  onChangeSpeechRate,
  onResetGame,
  onOpenTeacherGuide,
  matchedCount,
  totalPairs,
}) => {
  return (
    <header className="w-full bg-stone-900/95 backdrop-blur-md text-stone-100 border-b border-amber-500/20 px-4 py-3 sm:px-8 sm:py-4 sticky top-0 z-30 shadow-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Title and Branding */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-stone-950 font-bold text-xl shadow-lg ring-2 ring-amber-300/40">
            🏛️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-amber-100 font-serif">
                Ancient Greece Word Match
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                教学记忆游戏
              </span>
            </div>
            <p className="text-xs text-stone-400">
              点击翻牌配对单词与生动插画 · 点击即听纯正英音发音
            </p>
          </div>
        </div>

        {/* Progress and Lesson Assistant Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {/* Progress pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800/90 border border-amber-500/20 text-xs font-medium text-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>收集进度:</span>
            <span className="font-bold text-amber-300 text-sm ml-0.5">{matchedCount}</span>
            <span className="text-stone-400">/ {totalPairs}</span>
          </div>

          {/* Speech Rate Selector */}
          <button
            id="speech-rate-btn"
            onClick={() => onChangeSpeechRate(speechRate === 0.8 ? 1.0 : 0.8)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 text-xs transition-colors cursor-pointer"
            title="切换朗读语速（慢速更适合初学者磨耳朵）"
          >
            <Gauge className="w-3.5 h-3.5 text-amber-400" />
            <span>语速: {speechRate === 0.8 ? '慢速 0.8x' : '标准 1.0x'}</span>
          </button>

          {/* Audio toggle */}
          <button
            id="sound-toggle-btn"
            onClick={onToggleSound}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
              soundEnabled
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
                : 'bg-stone-800 text-stone-400 border-stone-700 hover:bg-stone-700'
            }`}
            title={soundEnabled ? '音效已开启' : '音效已静音'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{soundEnabled ? '声音开' : '静音'}</span>
          </button>

          {/* Lesson Guide Button */}
          <button
            id="teacher-guide-btn"
            onClick={onOpenTeacherGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs transition-all shadow-sm cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>备课小助手</span>
          </button>

          {/* Restart / Shuffle */}
          <button
            id="restart-game-btn"
            onClick={onResetGame}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 text-xs transition-colors cursor-pointer"
            title="重新打乱八张卡片"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">重新洗牌</span>
          </button>
        </div>
      </div>
    </header>
  );
};
