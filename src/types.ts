export type TargetWordId = 'ancient-greece' | 'battle' | 'soldier' | 'marathon';

export interface TargetWord {
  id: TargetWordId;
  word: string;
  phonetic: string;
  chinese: string;
  image: string;
  shortDesc: string;
  storyFact: string;
  color: {
    bg: string;
    border: string;
    text: string;
    tag: string;
  };
}

export type CardType = 'word' | 'image';

export interface GameCard {
  id: string; // unique card id e.g. "card-ancient-greece-word"
  wordId: TargetWordId;
  cardType: CardType;
  numberIndex: number; // 1 to 8 displayed on card back for classroom teacher call-out
  isFlipped: boolean;
  isMatched: boolean;
}
