import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Volume2, Sparkles, Star, BookOpen } from "lucide-react";
import confetti from "canvas-confetti";
import Navbar from "../Components/Navbar";

// Define the alphabet data
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

const AlphabetLearn = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "vowel" | "consonant">("all");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const filteredData = alphabetData.filter(item => 
    filter === "all" ? true : item.type === filter
  );

  const handleLearn = (item: any) => {
    setSelectedLetter(item.letter);
    
    // 1. Confetti Burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF69B4', '#FFD700', '#00CED1']
    });

    // 2. Sound Logic
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance();
    msg.text = `${item.letter} is for ${item.word}`;
    msg.rate = 0.8; 
    msg.pitch = 1.3; 
    window.speechSynthesis.speak(msg);

    // 3. Audio Click
    new Audio("/click.mp3").play().catch(() => {});
  };

  return (
    <div className="min-h-screen bg-orange-50 font-sans pb-20">
      <Navbar />

      <div className="pt-28 px-6 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <button 
            onClick={() => navigate("/games/alphabet/info")}
            className="flex items-center gap-2 bg-white px-5 py-2 rounded-2xl shadow-md hover:bg-orange-100 transition-all text-orange-600 font-bold"
          >
            <ArrowLeft size={20} /> Back
          </button>

          <div className="flex bg-white p-2 rounded-3xl shadow-inner border-2 border-orange-100">
            {["all", "vowel", "consonant"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type as any)}
                className={`px-6 py-2 rounded-2xl font-bold capitalize transition-all ${
                  filter === type 
                  ? "bg-orange-500 text-white shadow-lg scale-105" 
                  : "text-orange-400 hover:bg-orange-50"
                }`}
              >
                {type}s
              </button>
            ))}
          </div>
        </div>

        {/* Learning Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {filteredData.map((item) => (
            <div
              key={item.letter}
              onClick={() => handleLearn(item)}
              className={`relative group cursor-pointer aspect-square rounded-[2.5rem] p-1 transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                selectedLetter === item.letter ? "ring-4 ring-orange-400 ring-offset-4" : ""
              }`}
            >
              <div className={`${item.color} w-full h-full rounded-[2.2rem] shadow-xl flex flex-col items-center justify-center text-white relative overflow-hidden`}>
                
                {/* Decorative Sparkles in background */}
                <Sparkles className="absolute top-2 right-2 opacity-20 group-hover:opacity-100 transition-opacity" size={20} />
                
                <span className="text-6xl font-black drop-shadow-lg mb-1">{item.letter}</span>
                <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full uppercase tracking-widest">
                  {item.word}
                </span>

                {/* Floating Emoji on hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.2rem]">
                  <span className="text-6xl animate-bounce">{item.emoji}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Tip Card */}
        <div className="mt-16 bg-white rounded-3xl p-8 shadow-xl border-t-8 border-orange-400 flex flex-col md:flex-row items-center gap-8">
          <div className="bg-orange-100 p-6 rounded-full animate-pulse">
            <Volume2 size={48} className="text-orange-500" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-800 mb-2">Tap a letter to start the magic!</h2>
            <p className="text-slate-600 text-lg">Click on the vowels to hear the special sounds, or explore all the brave consonants!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlphabetLearn;