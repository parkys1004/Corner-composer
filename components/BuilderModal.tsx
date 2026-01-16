import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Music, Disc, Sliders, Wand2, Download, Play, Pause, Zap, Activity } from 'lucide-react';

interface BuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BuilderModal: React.FC<BuilderModalProps> = ({ isOpen, onClose }) => {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<null | { title: string; genre: string }>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Fake generation logs
  const addToLog = (msg: string) => {
    setLog(prev => [...prev, `> ${msg}`]);
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  };

  const handleGenerate = () => {
    if (!topic) return;
    setIsGenerating(true);
    setLog([]);
    setResult(null);

    // Mock generation sequence (NO AI involved)
    const steps = [
      { t: 500, msg: "Analyzing semantic context..." },
      { t: 1200, msg: "Matching genre: Cyberpunk/Synthwave..." },
      { t: 2000, msg: "Generating chord progression..." },
      { t: 2800, msg: "Synthesizing vocal tracks (V5 Engine)..." },
      { t: 3500, msg: "Mastering audio output..." },
      { t: 4000, msg: "Finalizing album artwork..." },
    ];

    steps.forEach(({ t, msg }) => {
      setTimeout(() => addToLog(msg), t);
    });

    setTimeout(() => {
      setIsGenerating(false);
      setResult({
        title: topic.length > 20 ? topic.substring(0, 20) + "..." : topic,
        genre: "Cyberpunk Synthwave",
      });
      setIsPlaying(true);
    }, 4500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4 md:p-8"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0f172a] w-full max-w-6xl h-[85vh] rounded-2xl border border-indigo-500/50 shadow-[0_0_50px_rgba(99,102,241,0.3)] flex flex-col overflow-hidden relative"
            >
              {/* Background Tech Details */}
              <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-75"></div>
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-150"></div>
                </div>
              </div>

              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-indigo-500/20 bg-[#0f172a] z-10">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <Music className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight flex items-center">
                      SUNO V5 STUDIO
                      <span className="ml-3 px-2 py-0.5 text-[10px] font-bold bg-indigo-500 text-white rounded tracking-widest uppercase">PRO DEMO</span>
                    </h2>
                    <p className="text-xs text-indigo-300/60 font-mono tracking-wider">BUILD: v5.2.0-alpha // READY</p>
                  </div>
                </div>
                <button onClick={onClose} className="group relative p-2">
                  <div className="absolute inset-0 bg-red-500/20 rounded-full scale-0 group-hover:scale-100 transition-transform"></div>
                  <X className="w-6 h-6 text-gray-400 group-hover:text-red-400 transition-colors" />
                </button>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative z-10">
                
                {/* Left Panel: Controls */}
                <div className="w-full lg:w-1/3 bg-[#131b2e] p-6 lg:p-8 border-r border-indigo-500/10 flex flex-col gap-8 overflow-y-auto">
                  
                  {/* Input Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                        <Wand2 className="w-3 h-3" />
                        Prompt Input
                      </label>
                      <span className="text-[10px] text-gray-500 font-mono">0/200</span>
                    </div>
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl opacity-20 group-hover:opacity-100 transition duration-500 blur"></div>
                      <textarea 
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Describe the song you want to create... (e.g., An energetic K-pop song about summer love)"
                        className="relative w-full bg-[#0b1121] border border-white/10 rounded-xl p-5 text-sm text-gray-100 focus:outline-none focus:text-white placeholder-gray-600 h-40 resize-none font-medium leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Style Selectors */}
                  <div className="space-y-4">
                     <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                        <Sliders className="w-3 h-3" />
                        Genre Preset
                      </label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Cyberpunk', 'K-Pop', 'Lo-Fi Jazz', 'Epic Orchestral', 'Heavy Metal', 'Dream Pop'].map((style) => (
                        <button key={style} className="text-xs py-3 px-4 rounded-lg bg-[#1e293b] hover:bg-indigo-600 border border-white/5 hover:border-indigo-400/50 text-gray-400 hover:text-white transition-all duration-300 text-left flex items-center justify-between group">
                          {style}
                          <div className="w-2 h-2 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Generate Button */}
                  <div className="mt-auto pt-6">
                    <button 
                      onClick={handleGenerate}
                      disabled={isGenerating || !topic}
                      className={`w-full py-5 rounded-xl font-bold text-lg flex items-center justify-center space-x-3 transition-all duration-300 relative overflow-hidden group ${
                        isGenerating || !topic 
                          ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_30px_rgba(79,70,229,0.4)]'
                      }`}
                    >
                      {isGenerating ? (
                         <div className="flex items-center space-x-3">
                           <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                           <span className="animate-pulse">PROCESSING...</span>
                         </div>
                      ) : (
                        <>
                          <span className="relative z-10 flex items-center gap-2">
                             <Zap className="w-5 h-5 fill-current" />
                             GENERATE TRACK
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Right Panel: Visualization & Output */}
                <div className="flex-1 bg-[#0b1121] relative flex flex-col">
                  
                  {/* Grid overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

                  {/* Empty State */}
                  {!result && !isGenerating && (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-600 p-8">
                      <div className="w-32 h-32 rounded-full border-4 border-dashed border-gray-800 flex items-center justify-center mb-6 animate-[spin_10s_linear_infinite]">
                         <Activity className="w-12 h-12 opacity-20" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-500 mb-2">Ready to Compose</h3>
                      <p className="text-sm max-w-xs text-center opacity-60">Select your parameters on the left and ignite the V5 engine.</p>
                    </div>
                  )}

                  {/* Generating State */}
                  {isGenerating && (
                    <div className="flex-1 flex flex-col items-center justify-center p-12">
                      <div className="w-full max-w-md font-mono text-xs text-green-400 bg-black/50 p-4 rounded-lg border border-green-900/50 h-64 overflow-hidden flex flex-col shadow-inner">
                        <div className="border-b border-green-900/50 pb-2 mb-2 flex justify-between">
                           <span>TERMINAL_OUTPUT</span>
                           <span className="animate-pulse">● LIVE</span>
                        </div>
                        <div ref={logRef} className="flex-1 overflow-y-auto space-y-1">
                          {log.map((line, i) => (
                            <div key={i} className="opacity-80">{line}</div>
                          ))}
                           <div className="animate-pulse">_</div>
                        </div>
                      </div>
                      <div className="mt-8 flex gap-1 items-end h-16">
                         {[...Array(20)].map((_, i) => (
                           <motion.div
                             key={i}
                             className="w-2 bg-indigo-500 rounded-t-sm"
                             animate={{ height: [10, Math.random() * 60 + 10, 10] }}
                             transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }}
                           />
                         ))}
                      </div>
                    </div>
                  )}

                  {/* Result State */}
                  {result && !isGenerating && (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-20">
                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-full max-w-xl bg-gradient-to-b from-[#1e293b] to-[#0f172a] rounded-3xl border border-white/10 p-1 shadow-2xl"
                      >
                         <div className="bg-[#0f172a] rounded-[22px] p-6 border border-white/5 relative overflow-hidden">
                            {/* Ambient Glow */}
                            <div className="absolute -top-20 -right-20 w-60 h-60 bg-indigo-500/20 rounded-full blur-[80px]"></div>
                            
                            <div className="flex gap-6 items-center">
                               {/* Album Art */}
                               <div className="relative w-32 h-32 shrink-0 group">
                                  <div className={`absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg ${isPlaying ? 'animate-pulse' : ''}`}></div>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <Disc className={`w-20 h-20 text-white/30 ${isPlaying ? 'animate-[spin_3s_linear_infinite]' : ''}`} />
                                  </div>
                                  <button 
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                                  >
                                     {isPlaying ? <Pause className="fill-white text-white w-10 h-10" /> : <Play className="fill-white text-white w-10 h-10" />}
                                  </button>
                               </div>

                               <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">AI GENERATED</span>
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">{result.genre}</span>
                                  </div>
                                  <h3 className="text-2xl font-bold text-white truncate mb-1">{result.title}</h3>
                                  <p className="text-sm text-gray-400">Created with Suno V5 Lab</p>
                               </div>
                            </div>

                            {/* Waveform Visualization */}
                            <div className="mt-8 bg-black/40 rounded-xl p-4 h-24 flex items-center justify-center gap-[2px] overflow-hidden">
                               {[...Array(60)].map((_, i) => (
                                  <motion.div
                                    key={i}
                                    className={`w-1.5 rounded-full ${isPlaying ? 'bg-indigo-400' : 'bg-gray-700'}`}
                                    animate={isPlaying ? { height: [8, Math.random() * 60 + 10, 8] } : { height: 4 }}
                                    transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.02, ease: "linear" }}
                                  />
                               ))}
                            </div>

                            {/* Action Bar */}
                            <div className="mt-6 flex justify-between items-center border-t border-white/5 pt-4">
                               <div className="text-xs text-gray-500 font-mono">02:34 / 03:45</div>
                               <button className="flex items-center gap-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg transition-colors shadow-lg shadow-indigo-500/20">
                                  <Download className="w-4 h-4" />
                                  Download MP3
                               </button>
                            </div>
                         </div>
                      </motion.div>
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BuilderModal;
