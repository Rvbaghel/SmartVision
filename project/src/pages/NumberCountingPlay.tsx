import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Trophy, RefreshCw, PlayCircle, Gamepad2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import Navbar from "../components/Navbar";

const playThemes = [
  { icon: "🧁", name: "cupcakes" },
  { icon: "🦖", name: "dinosaurs" },
  { icon: "🎈", name: "balloons" },
  { icon: "🐝", name: "bees" },
  { icon: "🚀", name: "rockets" }
];

const NumberCountingPlay = () => {
  const navigate = useNavigate();
  const [stars, setStars] = useState(0);
  const [isWinner, setIsWinner] = useState(false);
  const [targetNum, setTargetNum] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [currentTheme, setCurrentTheme] = useState(playThemes[0]);
  
  const WINNING_SCORE = 10;

  const startNewRound = () => {
    const num = Math.floor(Math.random() * 10) + 1; // 1 to 10 for nursery/KG
    setTargetNum(num);
    
    // Generate 3 random options (1 correct, 2 wrong)
    const ops = new Set<number>();
    ops.add(num);
    while (ops.size < 3) {
      const wrong = Math.floor(Math.random() * 10) + 1;
      ops.add(wrong);
    }
    setOptions(Array.from(ops).sort(() => Math.random() - 0.5));
    
    const theme = playThemes[Math.floor(Math.random() * playThemes.length)];
    setCurrentTheme(theme);

    // Voice instruction
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(`How many ${theme.name} can you see?`);
    msg.pitch = 1.3;
    msg.rate = 0.9;
    window.speechSynthesis.speak(msg);
  };

  useEffect(() => {
    startNewRound();
  }, []);

  const handleChoice = (choice: number) => {
    if (isWinner) return;

    if (choice === targetNum) {
      const newScore = stars + 1;
      setStars(newScore);
      
      if (newScore >= WINNING_SCORE) {
        triggerWin();
      } else {
        new Audio("/success.mp3").play().catch(() => {});
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.8 } });
        const msg = new SpeechSynthesisUtterance(`Excellent! That's ${targetNum}!`);
        window.speechSynthesis.speak(msg);
        setTimeout(startNewRound, 2000);
      }
    } else {
      const msg = new SpeechSynthesisUtterance(`Oops! Let's try counting again.`);
      window.speechSynthesis.speak(msg);
    }
  };

  const triggerWin = () => {
    setIsWinner(true);
    const end = Date.now() + 3000;
    (function frame() {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
    const msg = new SpeechSynthesisUtterance(`You are a Math Genius! You got ten stars!`);
    window.speechSynthesis.speak(msg);
  };

  return (
    <div className="min-h-screen bg-sky-50 font-sans pb-20 relative overflow-hidden">
      <Navbar />

      {/* Main Game Content */}
      <div className={`pt-28 px-6 max-w-4xl mx-auto flex flex-col items-center transition-all duration-500 ${isWinner ? 'blur-md pointer-events-none' : ''}`}>
        
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-8">
          <button onClick={() => navigate("/games/numbercounting/info")} className="bg-white p-4 rounded-3xl shadow-lg text-blue-600 hover:scale-110 transition-transform">
            <ArrowLeft size={28} />
          </button>
          
          <div className="bg-white px-8 py-3 rounded-full shadow-lg border-4 border-yellow-400 flex items-center gap-3">
            <Star className="text-yellow-400 fill-yellow-400 animate-spin-slow" size={32} />
            <span className="text-3xl font-black text-slate-700">{stars}/{WINNING_SCORE}</span>
          </div>
        </div>

        {/* The Picnic Blanket (Items to Count) */}
        <div className="w-full bg-white min-h-[350px] rounded-[4rem] shadow-2xl border-b-[12px] border-blue-100 p-10 flex flex-wrap items-center justify-center gap-6 mb-12">
          <AnimatePresence>
            {Array.from({ length: targetNum }).map((_, i) => (
              <motion.button
                key={i}
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => {
                   const count = new SpeechSynthesisUtterance(`${i + 1}`);
                   count.pitch = 1.4;
                   window.speechSynthesis.speak(count);
                }}
                className="text-7xl md:text-8xl drop-shadow-md hover:rotate-12 transition-transform cursor-pointer"
              >
                {currentTheme.icon}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* The Answer Bubbles */}
        <div className="flex flex-wrap justify-center gap-6">
          {options.map((num) => (
            <motion.button
              key={num}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleChoice(num)}
              className="h-24 w-24 md:h-32 md:w-32 bg-blue-500 hover:bg-blue-400 text-white text-5xl font-black rounded-full shadow-2xl border-b-8 border-blue-700 flex items-center justify-center"
            >
              {num}
            </motion.button>
          ))}
        </div>

        <button onClick={startNewRound} className="mt-10 text-blue-400 font-bold flex items-center gap-2 hover:text-blue-600">
          <RefreshCw size={20} /> Change Items
        </button>
      </div>

      {/* Win Popup */}
      <AnimatePresence>
        {isWinner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/30 backdrop-blur-md">
            <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="bg-white rounded-[4rem] p-12 shadow-2xl border-8 border-yellow-400 max-w-sm w-full text-center relative">
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 bg-yellow-400 p-6 rounded-full shadow-2xl border-8 border-white">
                <Trophy size={80} className="text-white fill-white" />
              </div>
              <h2 className="mt-14 text-5xl font-black text-slate-800 mb-2">HERO!</h2>
              <p className="text-xl font-bold text-slate-600 mb-8">You counted all the way to 10!</p>
              <div className="flex flex-col gap-4">
                <button onClick={() => { setStars(0); setIsWinner(false); startNewRound(); }} className="bg-emerald-500 text-white py-5 rounded-3xl text-2xl font-black shadow-lg shadow-emerald-200 flex items-center justify-center gap-3">
                  <PlayCircle size={32} /> PLAY AGAIN
                </button>
                <button onClick={() => navigate("/")} className="bg-blue-500 text-white py-5 rounded-3xl text-2xl font-black shadow-lg shadow-blue-200 flex items-center justify-center gap-3">
                  <Gamepad2 size={32} /> ALL GAMES
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NumberCountingPlay;