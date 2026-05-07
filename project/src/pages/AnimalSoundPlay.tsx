import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Trophy, Volume2, PlayCircle, Gamepad2, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import Navbar from "../Components/Navbar";
import { getAuth } from "firebase/auth"; // Added for user email
import { API_BASE_URL } from "../config/api"; // Added for API calls

const animalData = [
  { name: "Bird", img: "https://img.icons8.com/color/144/bird.png", sound: "/sounds/bird.mp3", color: "bg-blue-100" },
  { name: "Cat", img: "https://img.icons8.com/color/144/cat.png", sound: "/sounds/cat.mp3", color: "bg-pink-100" },
  { name: "Dog", img: "https://img.icons8.com/color/144/dog.png", sound: "/sounds/dog.mp3", color: "bg-amber-100" },
  { name: "Elephant", img: "https://img.icons8.com/color/144/elephant.png", sound: "/sounds/elephant.mp3", color: "bg-slate-200" },
  { name: "Frog", img: "https://img.icons8.com/color/144/frog.png", sound: "/sounds/frog.mp3", color: "bg-green-100" },
  { name: "Lion", img: "https://img.icons8.com/color/144/lion.png", sound: "/sounds/lion.mp3", color: "bg-orange-100" },
];

const AnimalSoundPlay = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const [target, setTarget] = useState(animalData[0]);
  const [options, setOptions] = useState<typeof animalData>([]);
  const [stars, setStars] = useState(0);
  const [wrongCount, setWrongCount] = useState(0); // Track mistakes
  const [isWinner, setIsWinner] = useState(false);

  const WINNING_SCORE = 10;

  // --- NEW: Save Session to Backend ---
  const saveGameProgress = async (finalWrongCount: number) => {
    if (!user?.email) return;

    try {
      await fetch(`${API_BASE_URL}/api/save-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_email: user.email,
          game_name: "Animal Sounds",
          wrong_count: finalWrongCount
        })
      });
      console.log("Progress saved successfully!");
    } catch (err) {
      console.error("Failed to save progress", err);
    }
  };

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.pitch = 1.4;
    msg.rate = 0.8;
    window.speechSynthesis.speak(msg);
  };

  const playAnimalSound = (soundPath: string) => {
    const audio = new Audio(soundPath);
    audio.play().catch(err => console.error("Audio play error", err));
  };

  const startNewRound = useCallback(() => {
    const randomTarget = animalData[Math.floor(Math.random() * animalData.length)];
    const shuffled = [...animalData].sort(() => 0.5 - Math.random());
    const filtered = shuffled.filter(a => a.name !== randomTarget.name).slice(0, 3);
    const mixed = [...filtered, randomTarget].sort(() => 0.5 - Math.random());

    setTarget(randomTarget);
    setOptions(mixed);

    speak("Listen closely... Who made this sound?");
    setTimeout(() => {
      playAnimalSound(randomTarget.sound);
    }, 2000);
  }, []);

  useEffect(() => {
    startNewRound();
  }, [startNewRound]);

  const handleChoice = (choice: typeof animalData[0]) => {
    if (isWinner) return;

    if (choice.name === target.name) {
      const newScore = stars + 1;
      setStars(newScore);

      if (newScore >= WINNING_SCORE) {
        setIsWinner(true);
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        speak("You are an animal expert! Congratulations!");
        
        // --- TRIGGER SAVE ON WIN ---
        saveGameProgress(wrongCount);
      } else {
        new Audio("/success.mp3").play().catch(() => {});
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.8 } });
        speak(`Great job! That was the ${target.name}!`);
        setTimeout(startNewRound, 2500);
      }
    } else {
      // --- INCREMENT WRONG COUNT ---
      setWrongCount(prev => prev + 1);
      speak(`Not quite! Listen again.`);
      playAnimalSound(target.sound);
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 flex flex-col font-sans overflow-hidden relative">
      <Navbar />

      <div className={`relative z-10 pt-24 px-6 max-w-4xl mx-auto w-full flex flex-col items-center transition-all duration-500 ${isWinner ? 'blur-md pointer-events-none' : ''}`}>
        
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-6">
          <button onClick={() => navigate("/games/animal/learning")} className="bg-white p-2 rounded-2xl shadow-md text-emerald-600 border-b-4 border-emerald-100">
            <ArrowLeft size={22} />
          </button>
          
          <div className="bg-white px-5 py-2 rounded-full shadow-md border-2 border-yellow-400 flex items-center gap-2">
            <Star className="text-yellow-400 fill-yellow-400 animate-pulse" size={24} />
            <span className="text-xl font-black text-slate-700">{stars}/{WINNING_SCORE}</span>
          </div>
        </div>

        <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => playAnimalSound(target.sound)}
            className="bg-white rounded-[3rem] p-10 mb-8 shadow-xl border-b-[10px] border-emerald-100 flex flex-col items-center gap-4 group"
        >
          <div className="bg-emerald-100 p-8 rounded-full text-emerald-600 group-hover:bg-emerald-200 transition-colors">
            <Volume2 size={80} className="animate-pulse" />
          </div>
          <span className="font-black text-emerald-700 text-xl tracking-widest uppercase">Tap to Hear Sound</span>
        </motion.button>

        {/* Choice Grid */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
          {options.map((animal) => (
            <motion.button
              key={animal.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleChoice(animal)}
              className="bg-white p-3 rounded-[2rem] shadow-lg border-b-4 border-slate-200 flex flex-col items-center group overflow-hidden"
            >
              <div className={`${animal.color} w-full aspect-square rounded-[1.5rem] flex items-center justify-center shadow-inner`}>
                <img src={animal.img} alt="" className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-md group-hover:scale-110 transition-transform" />
              </div>
            </motion.button>
          ))}
        </div>

        <button onClick={startNewRound} className="mt-8 text-emerald-400 hover:text-emerald-600 transition-colors">
            <RefreshCw size={28} />
        </button>
      </div>

      {/* Win Modal */}
      <AnimatePresence>
        {isWinner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-emerald-900/20 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[3rem] p-10 shadow-2xl border-4 border-yellow-400 max-w-sm w-full text-center relative">
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-yellow-400 p-4 rounded-full shadow-lg border-4 border-white">
                <Trophy size={60} className="text-white fill-white" />
              </div>
              <h2 className="mt-10 text-4xl font-black text-slate-800 mb-2">AMAZING!</h2>
              <p className="text-lg font-bold text-slate-600 mb-2">You know all your animal friends!</p>
              <p className="text-sm font-black text-rose-500 mb-8 uppercase tracking-widest">Mistakes: {wrongCount}</p>
              <div className="flex flex-col gap-3">
                <button onClick={() => { setStars(0); setWrongCount(0); setIsWinner(false); startNewRound(); }} className="bg-emerald-500 text-white py-4 rounded-2xl text-xl font-black shadow-md flex items-center justify-center gap-2 active:scale-95">
                  <PlayCircle size={24} /> PLAY AGAIN
                </button>
                <button onClick={() => navigate("/")} className="bg-blue-500 text-white py-4 rounded-2xl text-xl font-black shadow-md flex items-center justify-center gap-2 active:scale-95">
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

export default AnimalSoundPlay;