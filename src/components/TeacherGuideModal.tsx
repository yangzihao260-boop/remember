import React from 'react';
import { X, Volume2, Sparkles, BookOpen, GraduationCap, HelpCircle } from 'lucide-react';
import { TARGET_WORDS } from '../data/words';
import { speakEnglishWord } from '../utils/audio';

interface TeacherGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  speechRate: number;
}

export const TeacherGuideModal: React.FC<TeacherGuideModalProps> = ({
  isOpen,
  onClose,
  speechRate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-stone-900 border-2 border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif text-amber-100">
                高级备课助手 · 古希腊主题词汇教学指南
              </h3>
              <p className="text-xs text-stone-400">
                专为小学与青少儿英语课堂设计 · 串联历史故事与记忆点
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-stone-300">
          {/* Section 1: 教学故事串联线索 */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
            <div className="flex items-center gap-2 text-amber-300 font-serif font-bold text-sm mb-2">
              <Sparkles className="w-4 h-4" />
              <span>教师导语与故事脉络推荐（5分钟破冰串讲）</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              “小朋友们，今天我们要坐上时光机回到两千多年前的 <strong className="text-amber-200">ancient Greece（古希腊）</strong>！
              在那里，英勇的 <strong className="text-amber-200">soldier（士兵）</strong> 们身披青铜铠甲，在著名的 <strong className="text-amber-200">battle（战役）</strong> 中保卫家园。
              战斗胜利后，一位传令兵竭尽全力奔跑了四十多公里传递胜利的好消息，这就是今天我们所熟知的 <strong className="text-amber-200">marathon（马拉松）</strong> 的由来！”
            </p>
          </div>

          {/* Section 2: 4个核心词汇教案卡片 */}
          <div>
            <h4 className="text-sm font-bold font-serif text-amber-200 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>4大核心词汇教学详情与课堂提问点</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TARGET_WORDS.map((w) => (
                <div
                  key={w.id}
                  className="p-4 rounded-2xl bg-stone-850 border border-stone-750 flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={w.image}
                        alt={w.word}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-xl object-cover border border-amber-500/30"
                      />
                      <div>
                        <h5 className="text-base font-bold font-serif text-white">
                          {w.word}
                        </h5>
                        <p className="text-xs text-amber-300 font-mono">
                          {w.phonetic} · {w.chinese}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => speakEnglishWord(w.word, speechRate)}
                      className="p-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 transition-colors cursor-pointer"
                      title="朗读"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-stone-300 bg-stone-900/60 p-2 rounded-lg border border-stone-800">
                    <span className="text-amber-400 font-semibold">背景释义: </span>
                    {w.shortDesc}
                  </p>

                  <p className="text-[11px] text-stone-400">
                    <span className="text-stone-300 font-medium">💡 课堂提问建议: </span>
                    {w.id === 'ancient-greece' && '“古希腊神话里你最喜欢哪个神明？雅典娜还是宙斯？”'}
                    {w.id === 'battle' && '“大家看插画里士兵们是怎么站立并举起盾牌抵挡攻击的？”'}
                    {w.id === 'soldier' && '“古希腊士兵头上的红色羽毛和手里的圆盾有什么作用？”'}
                    {w.id === 'marathon' && '“马拉松跑完全程要跑多少公里呀？大家知不知道是42.195公里？”'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: 课堂游戏互动组织建议 */}
          <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4" />
              <span>课堂游戏组织小妙招（双人/小组PK）</span>
            </h4>
            <ul className="text-xs text-stone-400 space-y-1.5 list-disc list-inside">
              <li>
                <strong className="text-stone-200">看号点名：</strong> 卡片背面均标注有 <strong className="text-amber-300">#1 至 #8</strong> 的清晰序号，方便老师在教室大屏上请同学回答：“Tom, which card do you want? Number 3!”
              </li>
              <li>
                <strong className="text-stone-200">大声跟读：</strong> 每次翻开卡片都会自动触发标准朗读，引导全班小朋友一起齐声大声跟读（Echo Reading）。
              </li>
              <li>
                <strong className="text-stone-200">配对奖励：</strong> 凡是成功将单词卡和插画卡配对的同学，卡片落入下方宝库，全班鼓掌庆祝并记1颗星星！
              </li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-stone-950/80 border-t border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-sm transition-all shadow-md cursor-pointer"
          >
            开始课堂游戏
          </button>
        </div>
      </div>
    </div>
  );
};
