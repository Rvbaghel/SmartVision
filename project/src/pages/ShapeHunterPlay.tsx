import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Trophy, RefreshCw, PlayCircle, Gamepad2, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import Navbar from "../Components/Navbar";
import { getAuth } from "firebase/auth";
import { API_BASE_URL } from "../config/api";

const shapeData = [
  { name: "Circle", icon: "⭕", color: "text-red-500", desc: "Round and round!" },
  { name: "Square", icon: "🟧", color: "text-blue-500", desc: "Four equal sides!" },
  { name: "Triangle", icon: "🔺", color: "text-yellow-500", desc: "Three pointy corners!" },
  { name: "Star", icon: "⭐", color: "text-amber-500", desc: "Twinkling bright!" },
  { name: "Heart", icon: "❤️", color: "text-rose-500", desc: "Shape of love!" },
  { name: "Rectangle", icon: "▭", color: "text-emerald-500", desc: "Long and tall!" },
];

const ShapeHunterPlay = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const [target, setTarget] = useState(shapeData[0]);
  const [options, setOptions] = useState<typeof shapeData>([]);
  const [stars, setStars] = useState(0);
  const [wrongCount, setWrongCount] = useState(0); 
  const [isWinner, setIsWinner] = useState(false);

  const WINNING_SCORE = 10;

  // --- SAVE PROGRESS API ---
  const saveGameProgress = async (finalWrongCount: number) => {
    if (!user?.email) return;
    try {
      await fetch(`${API_BASE_URL}/api/save-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_email: user.email,
          game_name: "Shape Hunter",
          wrong_count: finalWrongCount
        })
      });
    } catch (err) {
      console.error("Failed to save shape progress", err);
    }
  };

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.pitch = 1.3;
    msg.rate = 0.9;
    window.speechSynthesis.speak(msg);
  };

  const startNewRound = useCallback(() => {
    const randomTarget = shapeData[Math.floor(Math.random() * shapeData.length)];
    const shuffled = [...shapeData].sort(() => 0.5 - Math.random());
    const filtered = shuffled.filter(s => s.name !== randomTarget.name).slice(0, 3);
    const mixed = [...filtered, randomTarget].sort(() => 0.5 - Math.random());

    setTarget(randomTarget);
    setOptions(mixed);

    speak(`Can you find the ${randomTarget.name}?`);
  }, []);

  useEffect(() => {
    startNewRound();
  }, [startNewRound]);

  const handleChoice = (choice: typeof shapeData[0]) => {
    if (isWinner) return;

    if (choice.name === target.name) {
      const newScore = stars + 1;
      setStars(newScore);

      if (newScore >= WINNING_SCORE) {
        setIsWinner(true);
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        speak("Amazing! You are a Shape Hunter Hero!");
        saveGameProgress(wrongCount);
      } else {
        // --- Success Sound ---
        new Audio("/success.mp3").play().catch(() => {});
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.8 } });
        speak(`Great! That's a ${target.name}!`);
        setTimeout(startNewRound, 2000);
      }
    } else {
      // --- Error Feedback ---
      setWrongCount(prev => prev + 1);
      speak(`Not quite! That's a ${choice.name}. Look for the ${target.name}!`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans overflow-hidden relative">
      <Navbar />

      <div className={`relative z-10 pt-24 px-6 max-w-4xl mx-auto w-full flex flex-col items-center transition-all duration-500 ${isWinner ? 'blur-md pointer-events-none' : ''}`}>
        
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-6">
          <button onClick={() => navigate("/games/shapehunter/learning")} className="bg-white p-2 rounded-2xl shadow-md text-slate-600 border-b-4 border-slate-100">
            <ArrowLeft size={22} />
          </button>
          
          <div className="bg-white px-5 py-2 rounded-full shadow-md border-2 border-yellow-400 flex items-center gap-2">
            <Star className="text-yellow-400 fill-yellow-400 animate-pulse" size={24} />
            <span className="text-xl font-black text-slate-700">{stars}/{WINNING_SCORE}</span>
          </div>
        </div>

        {/* Target Display */}
        <motion.div 
            key={target.name}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-[3rem] p-10 mb-8 shadow-xl border-b-[10px] border-slate-100 flex flex-col items-center gap-4 w-full max-w-md"
        >
          <div className="text-8xl drop-shadow-md">{target.icon}</div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-widest">Target: {target.name}</h2>
          <button onClick={() => speak(`Find the ${target.name}`)} className="text-emerald-500 flex items-center gap-2 font-bold uppercase text-xs">
            <Volume2 size={16} /> Hear Again
          </button>
        </motion.div>

        {/* Choice Grid */}
        <div className="grid grid-cols-2 gap-6 w-full max-w-lg">
          {options.map((shape) => (
            <motion.button
              key={shape.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleChoice(shape)}
              className="bg-white p-6 rounded-[2.5rem] shadow-lg border-b-4 border-slate-200 flex flex-col items-center group transition-all hover:border-emerald-200"
            >
              <div className="text-7xl md:text-8xl group-hover:scale-110 transition-transform">
                {shape.icon}
              </div>
            </motion.button>
          ))}
        </div>

        <button onClick={startNewRound} className="mt-8 text-slate-300 hover:text-emerald-500 transition-colors">
            <RefreshCw size={28} />
        </button>
      </div>

      {/* Win Modal */}
      <AnimatePresence>
        {isWinner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/30 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-white rounded-[3rem] p-10 shadow-2xl border-4 border-yellow-400 max-w-sm w-full text-center relative">
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-yellow-400 p-4 rounded-full shadow-lg border-4 border-white">
                <Trophy size={60} className="text-white fill-white" />
              </div>
              <h2 className="mt-10 text-4xl font-black text-slate-800 mb-2">FOUND THEM!</h2>
              <p className="text-lg font-bold text-slate-600 mb-2">You found all the shapes!</p>
              <p className="text-sm font-black text-rose-500 mb-8 uppercase tracking-widest">Mistakes: {wrongCount}</p>
              
              <div className="flex flex-col gap-3">
                <button onClick={() => { setStars(0); setWrongCount(0); setIsWinner(false); startNewRound(); }} className="bg-emerald-500 text-white py-4 rounded-2xl text-xl font-black shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all">
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

export default ShapeHunterPlay;