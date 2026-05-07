import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Volume2, Sparkles, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import Navbar from "../Components/Navbar";
import bg from "../assets/game3.png";

// Simplified data: 1 Image per color as requested
const colorData = [
  { name: "Red", hex: "#ff0303", img: "https://img.icons8.com/color/96/strawberry.png", voice: "Red like a strawberry!" },
  { name: "Orange", hex: "#f97316", img: "https://img.icons8.com/color/96/orange.png", voice: "Orange like an orange!" },
  { name: "Yellow", hex: "#fff204", img: "https://img.icons8.com/color/96/sun.png", voice: "Yellow like the sun!" },
  { name: "Green", hex: "#02f15a", img: "https://img.icons8.com/color/96/deciduous-tree.png", voice: "Green like the grass!" },
  { name: "Blue", hex: "#0262fd", img: "https://img.icons8.com/color/96/whale.png", voice: "Blue like the ocean!" },
  { name: "Purple", hex: "#8400ff", img: "https://img.icons8.com/color/96/grapes.png", voice: "Purple like grapes!" },
  { name: "Pink", hex: "#ff0080", img: "https://img.icons8.com/color/96/flamingo.png", voice: "Pink like a flamingo!" },
  { name: "Brown", hex: "#6e2800", img: "https://img.icons8.com/color/96/chocolate-bar.png", voice: "Brown like chocolate!" },
];

const ColorMatchLearn = () => {
  const navigate = useNavigate();

  const handleTap = (color: typeof colorData[0]) => {
    // 1. Play our high-quality slow voice
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(color.voice);
    msg.pitch = 1.3;
    msg.rate = 0.7; // Slow and clear for nursery
    window.speechSynthesis.speak(msg);

    // 2. Confetti burst
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: [color.hex, "#ffffff"]
    });

    // 3. Optional: Play click sound
    new Audio("/click.mp3").play().catch(() => {});
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans overflow-x-hidden">
      <Navbar />
      
      {/* Background (Our Style) */}
      <div className="relative flex-grow flex flex-col pt-28 pb-16 px-4 sm:px-6">
        <div className="absolute inset-0 z-0">
          <img src={bg} alt="" className="w-full h-full object-cover blur-sm brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-b from-sky-900/35 via-slate-900/60 to-slate-950" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          {/* Back Button */}
          <button
            onClick={() => navigate("/games/colors/info")}
            className="mb-8 flex items-center gap-3 text-white/90 font-black uppercase tracking-widest hover:text-white transition-all group"
          >
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md group-hover:-translate-x-2 transition-transform shadow-lg">
              <ArrowLeft size={20} />
            </div>
            Back
          </button>

          {/* Title Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-sky-300 font-black uppercase tracking-widest text-xs mb-3">
              <BookOpen size={18} /> Phase 1: Learning Time
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-2xl uppercase">Explore Colors!</h1>
            <p className="text-white/80 font-bold mt-3 flex items-center justify-center gap-2">
              <Sparkles size={20} className="text-amber-300" />
              Tap a card to hear the color name!
            </p>
          </div>

          {/* Grid Layout (Friend's Idea) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {colorData.map((color) => (
              <motion.button
                key={color.name}
                whileHover={{ scale: 1.05, translateY: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTap(color)}
                className="bg-white rounded-[2.5rem] p-6 shadow-2xl border-b-8 border-slate-300 flex flex-col items-center gap-4 group transition-all"
              >
                {/* Large Color Swatch with 1 Image */}
                <div 
                  style={{ backgroundColor: color.hex }}
                  className="w-full aspect-square rounded-[2rem] shadow-inner flex items-center justify-center relative overflow-hidden"
                >
                    <motion.img 
                      src={color.img} 
                      alt={color.name}
                      className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-lg"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: [0.8, 1.1, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
                    />
                </div>

                <div className="flex flex-col items-center">
                    <span className="font-black text-slate-800 text-xl uppercase tracking-tighter">
                        {color.name}
                    </span>
                    <div className="flex items-center gap-2 text-sky-600 font-bold text-xs mt-1 uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                        <Volume2 size={16} /> Tap to hear
                    </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorMatchLearn;