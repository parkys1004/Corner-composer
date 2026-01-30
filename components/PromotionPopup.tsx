
import React, { useState, useEffect } from 'react';
import { X, ShoppingCart, Music, Sparkles, Timer, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PromotionPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check local storage if previously closed today
    const doNotShowToday = localStorage.getItem('promo_popup_closed_date');
    const today = new Date().toDateString();

    if (doNotShowToday !== today) {
        // Small delay for entrance animation
        const timer = setTimeout(() => setIsOpen(true), 800);
        return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = (doNotShowAgain: boolean) => {
    setIsOpen(false);
    if (doNotShowAgain) {
      localStorage.setItem('promo_popup_closed_date', new Date().toDateString());
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => handleClose(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative w-[95%] sm:w-full max-w-[480px] bg-[#1e293b] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(99,102,241,0.5)]"
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-indigo-500"></div>
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-[60px] pointer-events-none"></div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-[60px] pointer-events-none"></div>

                {/* Content Container */}
                <div className="relative p-6 sm:p-8 text-center">
                    <button 
                        onClick={() => handleClose(false)} 
                        className="absolute top-3 right-3 sm:top-4 sm:right-4 text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 z-10"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Top Badge */}
                    <motion.div 
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block relative z-0"
                    >
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-extrabold text-xs sm:text-sm px-4 py-1.5 rounded-full shadow-lg mb-6 transform -rotate-2 border-2 border-white/20">
                            🎉 출시 기념 50% ↓
                        </div>
                    </motion.div>

                    {/* Main Text - Adjusted leading and margins for readability */}
                    <div className="space-y-3 mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-white leading-relaxed break-keep">
                            Suno AI 음원 자료 + <br className="hidden sm:block"/>
                            <span className="block sm:inline mt-1 sm:mt-0 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                                전용 웹빌더앱까지
                            </span>
                        </h2>
                        <h3 className="text-base sm:text-xl font-medium text-slate-300 break-keep leading-relaxed">
                            'AI 뮤직 비즈니스' 올인원 패키지 세일
                        </h3>
                    </div>

                    {/* Visual Icon Group */}
                    <div className="flex justify-center gap-5 sm:gap-6 mb-8">
                        <div className="bg-white/5 p-3 rounded-2xl border border-white/10 shadow-inner">
                            <Music className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" />
                        </div>
                        <div className="bg-white/5 p-3 rounded-2xl border border-white/10 shadow-inner">
                            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400" />
                        </div>
                        <div className="bg-white/5 p-3 rounded-2xl border border-white/10 shadow-inner">
                            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                        </div>
                    </div>

                    {/* Offer Box */}
                    <div className="bg-[#0f172a] rounded-2xl p-5 border border-indigo-500/30 relative mb-6 group hover:border-indigo-500/60 transition-colors shadow-lg">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md tracking-widest border border-red-400 whitespace-nowrap z-10">
                            LIMITED OFFER
                        </div>
                        
                        <div className="flex items-center justify-center gap-4 mt-2">
                            <div className="flex flex-col items-end opacity-60">
                                <span className="text-sm font-medium text-slate-400 line-through decoration-slate-500">30,000원</span>
                            </div>
                            <ArrowRight className="w-5 h-5 text-slate-500" />
                            <div className="flex flex-col items-start">
                                <span className="text-3xl font-extrabold text-yellow-400 drop-shadow-sm leading-none">
                                    15,000<span className="text-lg font-bold ml-0.5">원</span>
                                </span>
                                <span className="text-[11px] font-bold text-yellow-500/90 mt-1 tracking-wider uppercase">(런칭가)</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer Date */}
                    <div className="inline-flex items-center justify-center w-full gap-2 text-red-300 bg-red-500/10 px-4 py-2 rounded-xl text-sm font-semibold mb-6 border border-red-500/20">
                        <Timer className="w-4 h-4" />
                        <span>할인기간: 2026년 3월 1일까지</span>
                    </div>

                    {/* CTA */}
                    <a 
                        href="https://kmong.com/gig/730531" 
                        target="_blank"
                        className="block w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] mb-4 relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-xl"></div>
                        <span className="relative flex items-center justify-center gap-2">
                            지금 바로 혜택받기 <ArrowRight className="w-4 h-4" />
                        </span>
                    </a>

                    {/* Close Option */}
                    <button 
                        onClick={() => handleClose(true)}
                        className="text-xs text-slate-500 hover:text-slate-300 border-b border-transparent hover:border-slate-300 transition-all pb-0.5"
                    >
                        오늘 하루 보지 않기
                    </button>
                </div>
            </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PromotionPopup;
