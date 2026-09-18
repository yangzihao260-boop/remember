import ancientGreeceImg from '../assets/images/ancient_greece_1789775569929.jpg';
import battleImg from '../assets/images/greek_battle_1789775581249.jpg';
import soldierImg from '../assets/images/greek_soldier_1789775592270.jpg';
import marathonImg from '../assets/images/greek_marathon_1789775603013.jpg';
import { TargetWord } from '../types';

export const TARGET_WORDS: TargetWord[] = [
  {
    id: 'ancient-greece',
    word: 'ancient Greece',
    phonetic: '/ˌeɪn.ʃənt ˈɡriːs/',
    chinese: '古希腊',
    image: ancientGreeceImg,
    shortDesc: '希腊古典文明的发源地，以卫城神庙与灿烂文化闻名于世。',
    storyFact: '古希腊由许多城邦组成，诞生了民主政治、哲学思辨与奥林匹克运动会。',
    color: {
      bg: 'bg-amber-50',
      border: 'border-amber-400',
      text: 'text-amber-900',
      tag: 'bg-amber-100 text-amber-800 border-amber-300'
    }
  },
  {
    id: 'battle',
    word: 'battle',
    phonetic: '/ˈbæt.əl/',
    chinese: '战役 / 战斗',
    image: battleImg,
    shortDesc: '交战双方军队的正面交锋与激烈搏斗。',
    storyFact: '公元前490年的马拉松战役（Battle of Marathon）是雅典保卫家园的著名战役！',
    color: {
      bg: 'bg-rose-50',
      border: 'border-rose-400',
      text: 'text-rose-900',
      tag: 'bg-rose-100 text-rose-800 border-rose-300'
    }
  },
  {
    id: 'soldier',
    word: 'soldier',
    phonetic: '/ˈsoʊl.dʒɚ/',
    chinese: '士兵 / 勇士',
    image: soldierImg,
    shortDesc: '保卫城邦的英勇战士，佩戴铜盔、持圆盾与长矛。',
    storyFact: '古希腊重装步兵被称为 Hoplite，他们肩并肩组成坚固的方阵（Phalanx）作战。',
    color: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-400',
      text: 'text-emerald-900',
      tag: 'bg-emerald-100 text-emerald-800 border-emerald-300'
    }
  },
  {
    id: 'marathon',
    word: 'marathon',
    phonetic: '/ˈmær.ə.θɑːn/',
    chinese: '马拉松 / 长跑',
    image: marathonImg,
    shortDesc: '42.195公里的长跑运动，象征坚韧不拔的体育精神。',
    storyFact: '传令兵菲迪皮德斯飞奔回雅典传递战胜捷报，人们为纪念他创立了马拉松跑！',
    color: {
      bg: 'bg-sky-50',
      border: 'border-sky-400',
      text: 'text-sky-900',
      tag: 'bg-sky-100 text-sky-800 border-sky-300'
    }
  }
];

export const getWordById = (id: string): TargetWord | undefined => {
  return TARGET_WORDS.find(w => w.id === id);
};
