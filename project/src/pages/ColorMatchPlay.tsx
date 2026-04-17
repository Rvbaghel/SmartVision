import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Trophy, RefreshCw, PlayCircle, Gamepad2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import Navbar from "../components/Navbar";

const colorData = [
  { name: "Red", hex: "#ef4444", img: "https://img.icons8.com/color/96/strawberry.png" },
  { name: "Orange", hex: "#f97316", img: "https://img.icons8.com/color/96/orange.png" },
  { name: "Yellow", hex: "#eab308", img: "https://img.icons8.com/color/96/sun.png" },
  { name: "Green", hex: "#22c55e", img: "https://img.icons8.com/color/96/deciduous-tree.png" },
  { name: "Blue", hex: "#3b82f6", img: "https://img.icons8.com/color/96/whale.png" },
  { name: "Purple", hex: "#a855f7", img: "https://img.icons8.com/color/96/grapes.png" },
  { name: "Pink", hex: "#ec4899", img: "https://img.icons8.com/color/96/flamingo.png" },
  { name: "Brown", hex: "#78350f", img: "https://img.icons8.com/color/96/chocolate-bar.png" },
];

const ColorMatchPlay = () => {
  const navigate = useNavigate();
  const [target, setTarget] = useState(colorData[0]);
  const [options, setOptions] = useState<typeof colorData>([]);
  const [stars, setStars] = useState(0);
  const [isWinner, setIsWinner] = useState(false);
  
  const WINNING_SCORE = 10;

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.pitch = 1.3;
    msg.rate = 0.75;
    window.speechSynthesis.speak(msg);
  };

  const startNewRound = useCallback(() => {
    const randomTarget = colorData[Math.floor(Math.random() * colorData.length)];
    const shuffled = [...colorData].sort(() => 0.5 - Math.random());
    const filtered = shuffled.filter(c => c.name !== randomTarget.name).slice(0, 3);
    const mixed = [...filtered, randomTarget].sort(() => 0.5 - Math.random());
    
    setTarget(randomTarget);
    setOptions(mixed);

    setTimeout(() => {
        speak(`Can you find the ${randomTarget.name} color?`);
    }, 500);
  }, []);

  useEffect(() => {
    startNewRound();
  }, [startNewRound]);

  const handleChoice = (choice: typeof colorData[0]) => {
    if (isWinner) return;

    if (choice.name === target.name) {
      const newScore = stars + 1;
      setStars(newScore);

      if (newScore >= WINNING_SCORE) {
        triggerWin();
      } else {
        new Audio("/success.mp3").play().catch(() => {});
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: [choice.hex, "#ffffff"]
        });
        speak(`Yay! You found ${target.name}!`);
        setTimeout(startNewRound, 2000);
      }
    } else {
      speak(`That's ${choice.name}. Look for ${target.name}!`);
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
    speak("Congratulations! You are a Color Master!");
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col font-sans overflow-hidden relative">
      <Navbar />

      <div className={`relative z-10 pt-24 px-6 max-w-4xl mx-auto w-full flex flex-col items-center transition-all duration-500 ${isWinner ? 'blur-md pointer-events-none' : ''}`}>
        
        {/* Header - Compact */}
        <div className="w-full flex justify-between items-center mb-4">
          <button onClick={() => navigate("/games/colors/info")} className="bg-white p-2 rounded-2xl shadow-md text-blue-600 hover:scale-110 transition-transform border border-blue-100">
            <ArrowLeft size={22} />
          </button>
          
          <div className="bg-white px-5 py-2 rounded-full shadow-md border-2 border-yellow-400 flex items-center gap-2">
            <Star className="text-yellow-400 fill-yellow-400 animate-pulse" size={24} />
            <span className="text-xl font-black text-slate-700">{stars}/{WINNING_SCORE}</span>
          </div>
        </div>

        {/* Question Area - Compact */}
        <motion.div 
            key={target.name}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-[2rem] px-8 py-4 mb-6 text-center shadow-sm border border-blue-100"
        >
          <h1 className="text-2xl md:text-4xl font-black text-slate-800 uppercase tracking-tight">
            FIND THE <span style={{ color: target.hex }} className="drop-shadow-sm">{target.name}</span> COLOR!
          </h1>
        </motion.div>

        {/* Small Choice Grid - Adjusted for no scrolling */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
          {options.map((color) => (
            <motion.button
              key={color.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleChoice(color)}
              className="bg-white p-3 rounded-[2rem] shadow-lg border-b-4 border-slate-200 flex flex-col items-center group"
            >
              <div 
                style={{ backgroundColor: color.hex }}
                className="w-full aspect-square rounded-[1.5rem] flex items-center justify-center shadow-inner"
              >
                <img src={color.img} alt="" className="w-16 h-16 md:w-24 md:h-24 object-contain drop-shadow-md group-hover:rotate-6 transition-transform" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Action Button - Small */}
        <button onClick={startNewRound} className="mt-6 text-blue-300 hover:text-blue-500 transition-colors">
            <RefreshCw size={24} />
        </button>
      </div>

      {/* Winner Popup */}
      <AnimatePresence>
        {isWinner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-blue-900/20 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[3rem] p-10 shadow-2xl border-4 border-yellow-400 max-w-sm w-full text-center relative">
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-yellow-400 p-4 rounded-full shadow-lg border-4 border-white">
                <Trophy size={60} className="text-white fill-white" />
              </div>
              <h2 className="mt-10 text-4xl font-black text-slate-800 mb-2">WOW!</h2>
              <p className="text-lg font-bold text-slate-600 mb-6">You are a Color Superstar!</p>
              <div className="flex flex-col gap-3">
                <button onClick={() => { setStars(0); setIsWinner(false); startNewRound(); }} className="bg-emerald-500 text-white py-4 rounded-2xl text-xl font-black shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all">
                  <PlayCircle size={24} /> PLAY AGAIN
                </button>
                <button onClick={() => navigate("/")} className="bg-blue-500 text-white py-4 rounded-2xl text-xl font-black shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all">
                  <Gamepad2 size={24} /> ALL GAMES
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ColorMatchPlay;