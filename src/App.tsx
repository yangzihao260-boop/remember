/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, HelpCircle, Volume2, RotateCcw, Award } from 'lucide-react';
import { GameCard, TargetWordId } from './types';
import { TARGET_WORDS, getWordById } from './data/words';
import { Header } from './components/Header';
import { MemoryCard } from './components/MemoryCard';
import { MatchedShowcase } from './components/MatchedShowcase';
import { TeacherGuideModal } from './components/TeacherGuideModal';
import { VictoryModal } from './components/VictoryModal';
import {
  speakEnglishWord,
  playCardFlipSound,
  playMatchSuccessSound,
  playMismatchSound,
  playVictoryFanfare,
} from './utils/audio';

export default function App() {
  const [cards, setCards] = useState<GameCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<GameCard[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [matchedWordIds, setMatchedWordIds] = useState<TargetWordId[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [speechRate, setSpeechRate] = useState<number>(0.85); // 0.85x by default for young learners
  const [isTeacherGuideOpen, setIsTeacherGuideOpen] = useState<boolean>(false);
  const [isVictoryModalOpen, setIsVictoryModalOpen] = useState<boolean>(false);
  const [gameMessage, setGameMessage] = useState<string>('点击任意卡片翻开，同时收听标准英语读音！');

  /**
   * Initialize 8 cards: 4 word cards + 4 image cards, shuffled
   */
  const initializeGame = useCallback(() => {
    const rawCards: Omit<GameCard, 'numberIndex'>[] = [];

    TARGET_WORDS.forEach((tw) => {
      // 1 Word card
      rawCards.push({
        id: `card-${tw.id}-word`,
        wordId: tw.id,
        cardType: 'word',
        isFlipped: false,
        isMatched: false,
      });
      // 1 Image card
      rawCards.push({
        id: `card-${tw.id}-image`,
        wordId: tw.id,
        cardType: 'image',
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle using Fisher-Yates
    const shuffled = [...rawCards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Assign fixed classroom display numbers #1 ~ #8
    const finalCards: GameCard[] = shuffled.map((card, idx) => ({
      ...card,
      numberIndex: idx + 1,
    }));

    setCards(finalCards);
    setFlippedCards([]);
    setIsProcessing(false);
    setMatchedWordIds([]);
    setMoves(0);
    setIsVictoryModalOpen(false);
    setGameMessage('八张卡片已就绪！请点击卡片翻开，寻找单词与插画配对。');
  }, []);

  // Initialize once on mount
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  /**
   * Handle card click
   */
  const handleCardClick = (clickedCard: GameCard) => {
    if (isProcessing) return;
    if (clickedCard.isFlipped || clickedCard.isMatched) return;

    // 1. Play flip sound
    if (soundEnabled) {
      playCardFlipSound();
    }

    // 2. ALWAYS pronounce the word immediately on click: "每次点击都配有英文读音"
    const wordData = getWordById(clickedCard.wordId);
    if (wordData) {
      speakEnglishWord(wordData.word, speechRate);
    }

    // 3. Mark clicked card as flipped
    const updatedCards = cards.map((c) =>
      c.id === clickedCard.id ? { ...c, isFlipped: true } : c
    );
    setCards(updatedCards);

    const newFlipped = [...flippedCards, { ...clickedCard, isFlipped: true }];
    setFlippedCards(newFlipped);

    // If first card flipped
    if (newFlipped.length === 1) {
      setGameMessage(`已翻开卡片 #${clickedCard.numberIndex}，请寻找它的对应卡片！`);
      return;
    }

    // If second card flipped
    if (newFlipped.length === 2) {
      setIsProcessing(true);
      setMoves((prev) => prev + 1);

      const [first, second] = newFlipped;
      const isMatch = first.wordId === second.wordId && first.cardType !== second.cardType;

      if (isMatch) {
        // MATCH!
        setGameMessage(`🎉 配对成功！【${wordData?.word}】收录到下方展示区！`);

        setTimeout(() => {
          if (soundEnabled) {
            playMatchSuccessSound();
          }

          // Mark both cards as matched so they disappear from the board
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, isMatched: true, isFlipped: true }
                : c
            )
          );

          // Add to matched showcase at bottom
          const nextMatched = [...matchedWordIds, first.wordId];
          setMatchedWordIds(nextMatched);
          setFlippedCards([]);
          setIsProcessing(false);

          // Check if all 4 pairs matched!
          if (nextMatched.length === TARGET_WORDS.length) {
            setTimeout(() => {
              if (soundEnabled) {
                playVictoryFanfare();
              }
              setIsVictoryModalOpen(true);
            }, 600);
          }
        }, 650);
      } else {
        // MISMATCH
        setGameMessage(`卡片 #${first.numberIndex} 与 #${second.numberIndex} 不匹配，再记一记位置哦~`);

        setTimeout(() => {
          if (soundEnabled) {
            playMismatchSound();
          }
          // Flip them back
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedCards([]);
          setIsProcessing(false);
          setGameMessage('请继续点击卡片翻开，寻找对应插画与单词！');
        }, 1100);
      }
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Top Navbar */}
      <Header
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        speechRate={speechRate}
        onChangeSpeechRate={(rate) => setSpeechRate(rate)}
        onResetGame={initializeGame}
        onOpenTeacherGuide={() => setIsTeacherGuideOpen(true)}
        matchedCount={matchedWordIds.length}
        totalPairs={TARGET_WORDS.length}
      />

      {/* Main Game Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col items-center">
        {/* Vocabulary Mission Target Banner */}
        <section 
          id="target-words-banner"
          aria-label="本节课重点词汇"
          className="w-full bg-stone-900/70 border border-amber-500/20 rounded-2xl p-3 sm:p-4 mb-6 shadow-md backdrop-blur-sm"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs">
                🎯
              </span>
              <span className="text-xs font-semibold text-amber-200">
                本节课核心学习目标词汇 (4 Words):
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {TARGET_WORDS.map((tw) => {
                const isFound = matchedWordIds.includes(tw.id);
                return (
                  <button
                    key={tw.id}
                    id={`target-badge-${tw.id}`}
                    onClick={() => speakEnglishWord(tw.word, speechRate)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      isFound
                        ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 shadow-sm'
                        : 'bg-stone-850 border-stone-700/80 text-stone-300 hover:border-amber-400 hover:text-amber-200'
                    }`}
                    title="点击听发音"
                  >
                    <span>{isFound ? '✅' : '🔸'}</span>
                    <span className="font-serif">{tw.word}</span>
                    <span className="text-[10px] opacity-75 font-normal">({tw.chinese})</span>
                    <Volume2 className="w-3 h-3 text-amber-400 opacity-80" />
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Current status / prompt bar */}
        <div 
          id="game-status-bar"
          className="w-full mb-6 p-3.5 rounded-2xl bg-stone-900/90 border border-amber-500/30 flex items-center justify-between shadow-lg"
        >
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-amber-200">
            <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 animate-pulse" />
            <span className="font-medium">{gameMessage}</span>
          </div>
          <div className="text-xs text-stone-400 flex items-center gap-3">
            <span>尝试翻牌: <strong className="text-amber-300 font-bold">{moves}</strong> 次</span>
            <button
              onClick={initializeGame}
              className="hidden sm:inline-flex items-center gap-1 text-xs text-stone-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>洗牌</span>
            </button>
          </div>
        </div>

        {/* 8 Cards Memory Grid */}
        <section 
          id="cards-grid-section" 
          aria-label="记忆翻牌游戏区域"
          className="w-full relative"
        >
          {/* Classical Greek ornamental frame container */}
          <div className="w-full rounded-3xl p-4 sm:p-6 bg-gradient-to-b from-stone-900/90 to-stone-950/95 border-2 border-amber-500/30 shadow-2xl relative">
            {/* Subtle Ancient Greek corner ornaments */}
            <div className="absolute top-2 left-3 text-amber-500/20 text-xl select-none font-serif">
              🏛️
            </div>
            <div className="absolute top-2 right-3 text-amber-500/20 text-xl select-none font-serif">
              🏛️
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-5">
              {cards.map((card) => (
                <MemoryCard
                  key={card.id}
                  card={card}
                  onCardClick={handleCardClick}
                  disabled={isProcessing}
                />
              ))}
            </div>

            {/* Hint footer below cards */}
            <div className="mt-4 pt-3 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>卡片背面标有清晰序号 #1 ~ #8，课堂互动时可直接点名让孩子报号翻牌！</span>
              </div>
              <button
                onClick={() => setIsTeacherGuideOpen(true)}
                className="text-amber-400 hover:text-amber-300 underline font-medium cursor-pointer"
              >
                查看备课互动建议 →
              </button>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* BOTTOM SHOWCASE TRAY: Matched cards appear at the bottom     */}
        {/* "若图片和单词相对应，这两张卡片消失，但是对应的图案和单词出现在最下面进行展示" */}
        {/* ============================================================ */}
        <MatchedShowcase
          matchedWordIds={matchedWordIds}
          speechRate={speechRate}
        />
      </main>

      {/* Teacher Lesson Guide Modal */}
      <TeacherGuideModal
        isOpen={isTeacherGuideOpen}
        onClose={() => setIsTeacherGuideOpen(false)}
        speechRate={speechRate}
      />

      {/* Victory Celebration Modal */}
      <VictoryModal
        isOpen={isVictoryModalOpen}
        moves={moves}
        onPlayAgain={initializeGame}
        speechRate={speechRate}
      />

      {/* Footer */}
      <footer className="w-full py-4 border-t border-stone-900 text-center text-xs text-stone-500">
        Ancient Greece Vocabulary Master · 教师备课与课堂互动教学工具
      </footer>
    </div>
  );
}
