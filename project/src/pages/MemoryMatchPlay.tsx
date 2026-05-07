import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Trophy, PlayCircle, Gamepad2, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import Navbar from "../Components/Navbar";

// We use your reliable animal list
const animals = [
  { name: "Lion", img: "https://img.icons8.com/color/144/lion.png" },
  { name: "Elephant", img: "https://img.icons8.com/color/144/elephant.png" },
  { name: "Dog", img: "https://img.icons8.com/color/144/dog.png" },
  { name: "Panda", img: "https://img.icons8.com/color/144/panda.png" },
  { name: "Rabbit", img: "https://img.icons8.com/color/144/rabbit.png" },
  { name: "Giraffe", img: "https://img.icons8.com/color/144/giraffe.png" },
  { name: "Cat", img: "https://img.icons8.com/color/144/cat.png" },
  { name: "Bear", img: "https://img.icons8.com/color/144/bear.png" },
];

const MemoryMatchPlay = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<any[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [isWinner, setIsWinner] = useState(false);

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.pitch = 1.4;
    msg.rate = 0.8;
    window.speechSynthesis.speak(msg);
  };

  const initializeGame = useCallback(() => {
    // Create pairs and shuffle
    const pairCards = [...animals, ...animals]
      .map((animal, index) => ({ ...animal, id: index }))
      .sort(() => Math.random() - 0.5);
    
    setCards(pairCards);
    setFlipped([]);
    setSolved([]);
    setIsWinner(false);
    setDisabled(false);
    speak("Can you find all the matching friends?");
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleCardClick = (id: number, name: string) => {
    if (disabled || flipped.includes(id) || solved.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      const firstCard = cards.find(c => c.id === newFlipped[0]);
      
      if (firstCard.name === name) {
        // MATCH FOUND
        setSolved([...solved, newFlipped[0], id]);
        setFlipped([]);
        setDisabled(false);
        speak(`Yay! A pair of ${name}s!`);
        
        if (solved.length + 2 === cards.length) {
          triggerWin();
        }
      } else {
        // NO MATCH
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  const triggerWin = () => {
    setIsWinner(true);
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    speak("Amazing! You have a super memory!");
  };

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col font-sans overflow-x-hidden">
      <Navbar />

      <div className={`pt-24 px-4 max-w-5xl mx-auto w-full flex flex-col items-center transition-all ${isWinner ? 'blur-md pointer-events-none' : ''}`}>
        
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-6">
          <button onClick={() => navigate("/games/memory/learning")} className="bg-white p-3 rounded-2xl shadow-md text-purple-600 border-b-4 border-purple-100">
            <ArrowLeft size={24} />
          </button>
          
          <div className="bg-white px-6 py-2 rounded-full shadow-lg border-4 border-yellow-400 flex items-center gap-2">
            <Star className="text-yellow-400 fill-yellow-400" size={24} />
            <span className="text-xl font-black text-slate-700">{solved.length / 2} / 8</span>
          </div>
        </div>

        {/* Game Grid - 4x4 for 16 cards */}
        <div className="grid grid-cols-4 gap-3 md:gap-4 w-full max-w-2xl">
          {cards.map((card) => {
            const isFlipped = flipped.includes(card.id) || solved.includes(card.id);
            const isMatched = solved.includes(card.id);

            return (
              <div key={card.id} className="perspective-1000 aspect-square">
                <motion.div
                  initial={false}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                  className="relative w-full h-full preserve-3d cursor-pointer"
                  onClick={() => handleCardClick(card.id, card.name)}
                >
                  {/* Front of Card (Hidden Side) */}
                  <div className="absolute inset-0 backface-hidden bg-purple-400 rounded-2xl md:rounded-[2rem] shadow-lg border-b-8 border-purple-600 flex items-center justify-center text-white">
                    <HelpCircle size={40} className="opacity-50" />
                  </div>

                  {/* Back of Card (Animal Side) */}
                  <div 
                    className={`absolute inset-0 backface-hidden bg-white rounded-2xl md:rounded-[2rem] shadow-xl border-b-8 flex items-center justify-center p-2 md:p-4 rotate-y-180 
                    ${isMatched ? 'border-green-400' : 'border-purple-200'}`}
                  >
                    <img src={card.img} alt={card.name} className="w-full h-full object-contain" />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Win Modal */}
      <AnimatePresence>
        {isWinner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="bg-white rounded-[3rem] p-10 shadow-2xl border-8 border-yellow-400 max-w-sm w-full text-center relative">
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-yellow-400 p-5 rounded-full shadow-lg border-8 border-white">
                <Trophy size={60} className="text-white fill-white" />
              </div>
              <h2 className="mt-10 text-4xl font-black text-slate-800 mb-2">GENIUS!</h2>
              <p className="text-lg font-bold text-slate-600 mb-8">You found all the animals!</p>
              <div className="flex flex-col gap-3">
                <button onClick={initializeGame} className="bg-emerald-500 text-white py-4 rounded-2xl text-xl font-black shadow-lg flex items-center justify-center gap-2">
                  <PlayCircle size={24} /> PLAY AGAIN
                </button>
                <button onClick={() => navigate("/")} className="bg-blue-500 text-white py-4 rounded-2xl text-xl font-black shadow-lg flex items-center justify-center gap-2">
                  <Gamepad2 size={24} /> ALL GAMES
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}} />
    </div>
  );
};

export default MemoryMatchPlay;