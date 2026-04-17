import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Trophy, RefreshCw, PlayCircle, Gamepad2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import Navbar from "../components/Navbar";

const alphabetData = [
  { letter: "A", word: "Apple", type: "vowel", color: "bg-rose-400", emoji: "🍎" },
  { letter: "B", word: "Ball", type: "consonant", color: "bg-blue-400", emoji: "⚽" },
  { letter: "C", word: "Cat", type: "consonant", color: "bg-orange-400", emoji: "🐱" },
  { letter: "D", word: "Dog", type: "consonant", color: "bg-green-400", emoji: "🐶" },
  { letter: "E", word: "Elephant", type: "vowel", color: "bg-purple-400", emoji: "🐘" },
  { letter: "F", word: "Fish", type: "consonant", color: "bg-cyan-400", emoji: "🐟" },
  { letter: "G", word: "Giraffe", type: "consonant", color: "bg-emerald-400", emoji: "🦒" },
  { letter: "H", word: "Horse", type: "consonant", color: "bg-amber-400", emoji: "🐴" },
  { letter: "I", word: "Igloo", type: "vowel", color: "bg-indigo-400", emoji: "❄️" },
  { letter: "J", word: "Jellyfish", type: "consonant", color: "bg-pink-400", emoji: "🐙" },
  { letter: "K", word: "Kangaroo", type: "consonant", color: "bg-red-400", emoji: "🦘" },
  { letter: "L", word: "Lion", type: "consonant", color: "bg-yellow-500", emoji: "🦁" },
  { letter: "M", word: "Monkey", type: "consonant", color: "bg-sky-400", emoji: "🐒" },
  { letter: "N", word: "Nest", type: "consonant", color: "bg-teal-400", emoji: "🪺" },
  { letter: "O", word: "Owl", type: "vowel", color: "bg-orange-500", emoji: "🦉" },
  { letter: "P", word: "Penguin", type: "consonant", color: "bg-blue-500", emoji: "🐧" },
  { letter: "Q", word: "Queen", type: "consonant", color: "bg-violet-400", emoji: "👸" },
  { letter: "R", word: "Rabbit", type: "consonant", color: "bg-rose-500", emoji: "🐰" },
  { letter: "S", word: "Sun", type: "consonant", color: "bg-amber-500", emoji: "☀️" },
  { letter: "T", word: "Tiger", type: "consonant", color: "bg-orange-600", emoji: "🐯" },
  { letter: "U", word: "Umbrella", type: "vowel", color: "bg-sky-500", emoji: "☂️" },
  { letter: "V", word: "Van", type: "consonant", color: "bg-slate-400", emoji: "🚐" },
  { letter: "W", word: "Whale", type: "consonant", color: "bg-blue-600", emoji: "🐋" },
  { letter: "X", word: "Xylophone", type: "consonant", color: "bg-lime-500", emoji: "🎹" },
  { letter: "Y", word: "Yo-Yo", type: "consonant", color: "bg-pink-500", emoji: "🪀" },
  { letter: "Z", word: "Zebra", type: "consonant", color: "bg-emerald-600", emoji: "🦓" },
];

const AlphabetPlay = () => {
  const navigate = useNavigate();
  const [target, setTarget] = useState(alphabetData[0]);
  const [options, setOptions] = useState<typeof alphabetData>([]);
  const [stars, setStars] = useState(0);
  const [isWinner, setIsWinner] = useState(false);

  const WINNING_SCORE = 10;

  const startNewRound = () => {
    const randomTarget = alphabetData[Math.floor(Math.random() * alphabetData.length)];
    const others = alphabetData
      .filter(a => a.letter !== randomTarget.letter)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    const newOptions = [...others, randomTarget].sort(() => 0.5 - Math.random());
    
    setTarget(randomTarget);
    setOptions(newOptions);

    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(`Where is the letter for ${randomTarget.word}?`);
    msg.pitch = 1.3;
    window.speechSynthesis.speak(msg);
  };

  useEffect(() => {
    startNewRound();
  }, []);

  const handleChoice = (choice: string) => {
    if (isWinner) return;

    if (choice === target.letter) {
      const newScore = stars + 1;
      setStars(newScore);
      
      if (newScore >= WINNING_SCORE) {
        triggerWin();
      } else {
        new Audio("/success.mp3").play().catch(() => {});
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.8 } });
        const msg = new SpeechSynthesisUtterance(`Yay! That's correct!`);
        window.speechSynthesis.speak(msg);
        setTimeout(startNewRound, 2000);
      }
    } else {
      const msg = new SpeechSynthesisUtterance(`Not quite! Look for the ${target.word}`);
      window.speechSynthesis.speak(msg);
    }
  };

  const triggerWin = () => {
    setIsWinner(true);
    // Mega Confetti Blast
    const end = Date.now() + 3000;
    (function frame() {
      confetti({ particleCount: 7, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 7, angle: 120, spread: 55, origin: { x: 1 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());

    const msg = new SpeechSynthesisUtterance(`Congratulations! You found ten letters! You are a superstar!`);
    msg.pitch = 1.4;
    window.speechSynthesis.speak(msg);
  };

  const resetGame = () => {
    setStars(0);
    setIsWinner(false);
    startNewRound();
  };

  return (
    <div className="min-h-screen bg-indigo-50 font-sans pb-20 relative overflow-hidden">
      <Navbar />

      {/* Main Game Content (Blurs when winner popup shows) */}
      <div className={`pt-28 px-6 max-w-4xl mx-auto flex flex-col items-center transition-all duration-500 ${isWinner ? 'blur-md pointer-events-none' : ''}`}>
        
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-12">
          <button onClick={() => navigate("/games/alphabet/info")} className="bg-white p-3 rounded-2xl shadow-md text-indigo-600 hover:scale-110 transition-transform">
            <ArrowLeft size={24} />
          </button>
          
          <div className="bg-white px-6 py-2 rounded-full shadow-lg border-4 border-yellow-400 flex items-center gap-2">
            <Star className="text-yellow-400 fill-yellow-400 animate-pulse" size={28} />
            <span className="text-2xl font-black text-slate-700">{stars}/{WINNING_SCORE}</span>
          </div>
        </div>

        {/* Question Stage */}
        <motion.div 
          key={target.letter}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-10 rounded-[3rem] shadow-2xl border-b-8 border-indigo-200 flex flex-col items-center mb-12 w-full max-w-md"
        >
          <span className="text-9xl mb-4 leading-none">{target.emoji}</span>
          <h2 className="text-4xl font-black text-slate-800 uppercase tracking-widest">{target.word}</h2>
        </motion.div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 gap-6 w-full max-w-xl">
          {options.map((opt) => (
            <motion.button
              key={opt.letter}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleChoice(opt.letter)}
              className={`${opt.color} h-36 rounded-3xl shadow-xl flex items-center justify-center border-b-8 border-black/20`}
            >
              <span className="text-7xl font-black text-white">{opt.letter}</span>
            </motion.button>
          ))}
        </div>

        {/* Hint */}
        <button 
          onClick={() => {
            const msg = new SpeechSynthesisUtterance(`${target.word} starts with the letter ${target.letter}`);
            window.speechSynthesis.speak(msg);
          }}
          className="mt-12 flex items-center gap-2 text-indigo-400 font-bold hover:text-indigo-600 transition-colors"
        >
          <RefreshCw size={20} /> Hear again
        </button>
      </div>

      {/* Winning Popup */}
      <AnimatePresence>
        {isWinner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="bg-white rounded-[4rem] p-10 shadow-2xl border-8 border-yellow-400 max-w-sm w-full text-center relative"
            >
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 bg-yellow-400 p-5 rounded-full shadow-2xl border-8 border-white">
                <Trophy size={70} className="text-white fill-white" />
              </div>

              <h2 className="mt-12 text-5xl font-black text-slate-800 mb-2">AMAZING!</h2>
              <p className="text-xl font-bold text-slate-600 mb-8">You are an Alphabet Hero!</p>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={resetGame}
                  className="flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white py-4 rounded-3xl text-xl font-black shadow-lg shadow-emerald-200 transition-all active:scale-95"
                >
                  <PlayCircle size={28} /> PLAY AGAIN
                </button>

                <button 
                  onClick={() => navigate("/")}
                  className="flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-400 text-white py-4 rounded-3xl text-xl font-black shadow-lg shadow-blue-200 transition-all active:scale-95"
                >
                  <Gamepad2 size={28} /> ALL GAMES
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AlphabetPlay;