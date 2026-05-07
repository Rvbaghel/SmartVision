import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Volume2, Sparkles, PawPrint } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import Navbar from "../Components/Navbar";

// 1. Define the TypeScript Interface for the animal object
interface Animal {
  name: string;
  img: string;
  color: string;
  borderColor: string;
  sound: string;
}

const animalData: Animal[] = [
  { 
    name: "Bird", 
    img: "https://img.icons8.com/color/144/bird.png", 
    color: "bg-blue-50", 
    borderColor: "border-blue-300", 
    sound: "/sounds/bird.mp3" 
  },
  { 
    name: "Cat", 
    img: "https://img.icons8.com/color/144/cat.png", 
    color: "bg-pink-50", 
    borderColor: "border-pink-300", 
    sound: "/sounds/cat.mp3" 
  },
  { 
    name: "Dog", 
    img: "https://img.icons8.com/color/144/dog.png", 
    color: "bg-amber-50", 
    borderColor: "border-amber-300", 
    sound: "/sounds/dog.mp3" 
  },
  { 
    name: "Elephant", 
    img: "https://img.icons8.com/color/144/elephant.png", 
    color: "bg-slate-100", 
    borderColor: "border-slate-300", 
    sound: "/sounds/elephant.mp3" 
  },
  { 
    name: "Frog", 
    img: "https://img.icons8.com/color/144/frog.png", 
    color: "bg-green-50", 
    borderColor: "border-green-300", 
    sound: "/sounds/frog.mp3" 
  },
  { 
    name: "Lion", 
    img: "https://img.icons8.com/color/144/lion.png", 
    color: "bg-orange-50", 
    borderColor: "border-orange-300", 
    sound: "/sounds/lion.mp3" 
  },
];

const AnimalSoundLearn: React.FC = () => {
  const navigate = useNavigate();
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);

  const handleAnimalTap = (animal: Animal) => {
    setSelectedAnimal(animal.name);

    // Voice Synthesis Logic
    window.speechSynthesis.cancel();
    const introMsg = new SpeechSynthesisUtterance(`This is a ${animal.name}.`);
    introMsg.pitch = 1.2;
    introMsg.rate = 0.85;
    window.speechSynthesis.speak(introMsg);

    // Audio Playback Logic
    setTimeout(() => {
      const audio = new Audio(animal.sound);
      audio.play().catch((error) => console.error("Audio error:", error));
    }, 1100);

    // Celebration
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#10b981", "#fbbf24", "#3b82f6"],
    });
  };

  return (
    <div className="min-h-screen bg-emerald-50 font-sans pb-24 overflow-x-hidden">
      <Navbar />

      <div className="pt-28 px-6 max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Back Button */}
        <div className="w-full flex justify-start mb-8">
          <button
            onClick={() => navigate('/games/animal/info')}
            className="group flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-md text-emerald-600 font-black border-b-4 border-emerald-200 hover:bg-emerald-50 active:border-b-0 active:translate-y-1 transition-all"
          >
            <ArrowLeft size={22} className="group-hover:-translate-x-1 transition-transform" /> 
            BACK
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="flex items-center gap-3">
              <PawPrint size={44} className="text-emerald-500" />
              <h1 className="text-4xl md:text-5xl font-black text-emerald-800 tracking-tight">
                Animal Sounds
              </h1>
            </div>
            <p className="bg-white/80 border border-emerald-100 px-6 py-2 rounded-full text-emerald-600 font-bold uppercase text-sm tracking-wide shadow-sm">
              Tap the animals to hear what they say!
            </p>
          </motion.div>
        </div>

        {/* Fixed Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {animalData.map((animal) => (
            <motion.button
              key={animal.name}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleAnimalTap(animal)}
              className={`
                relative flex flex-col items-center p-5 rounded-[2rem] transition-all duration-300
                border-b-[10px] ${animal.borderColor} ${animal.color}
                ${selectedAnimal === animal.name ? "ring-4 ring-emerald-400 shadow-2xl" : "shadow-xl"}
              `}
            >
              {/* Image Container */}
              <div className="bg-white/90 rounded-2xl p-4 mb-4 w-full aspect-square flex items-center justify-center shadow-inner overflow-hidden">
                <img 
                  src={animal.img} 
                  alt={animal.name} 
                  className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <span className="font-black text-xl md:text-2xl text-gray-800 mb-2 uppercase">
                {animal.name}
              </span>

              <div className="flex items-center gap-2 bg-white/60 px-4 py-1.5 rounded-full text-emerald-700 font-bold text-xs uppercase shadow-sm">
                <Volume2 size={16} className={selectedAnimal === animal.name ? "animate-bounce" : ""} /> 
                Tap to hear
              </div>

              {selectedAnimal === animal.name && (
                <Sparkles className="absolute top-4 right-4 text-emerald-500 animate-pulse" size={24} />
              )}
            </motion.button>
          ))}
        </div>

        {/* Play CTA */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button 
            onClick={() => navigate("/games/animal/play")}
            className="group bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-6 rounded-[2.5rem] text-2xl md:text-3xl font-black shadow-2xl shadow-emerald-200 flex items-center gap-4 transition-all active:scale-95 hover:scale-105"
          >
            <Sparkles className="group-hover:rotate-45 transition-transform duration-500" /> 
            READY TO PLAY?
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AnimalSoundLearn;