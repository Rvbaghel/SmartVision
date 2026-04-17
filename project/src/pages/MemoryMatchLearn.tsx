import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Brain, Sparkles, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

// Updated with reliable URLs and bold colors
const memoryData = [
  { id: 1, name: "Lion", img: "https://img.icons8.com/color/144/lion.png", color: "bg-orange-100" },
  { id: 2, name: "Elephant", img: "https://img.icons8.com/color/144/elephant.png", color: "bg-blue-100" },
  
  { id: 3, name: "Dog", img: "https://img.icons8.com/color/144/dog.png", color: "bg-amber-100" },
  
  { id: 4, name: "Panda", img: "https://img.icons8.com/color/144/panda.png", color: "bg-slate-100" },
  { id: 5, name: "Rabbit", img: "https://img.icons8.com/color/144/rabbit.png", color: "bg-pink-100" },
  { id: 6, name: "Giraffe", img: "https://img.icons8.com/color/144/giraffe.png", color: "bg-yellow-100" },

  { id: 7, name: "Cat", img: "https://img.icons8.com/color/144/cat.png", color: "bg-gray-100" },

  { id: 8, name: "Bear", img: "https://img.icons8.com/color/144/bear.png", color: "bg-orange-200" },
];

const MemoryMatchLearn = () => {
  const navigate = useNavigate();

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.pitch = 1.4;
    msg.rate = 0.8;
    window.speechSynthesis.speak(msg);
  };

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col font-sans overflow-x-hidden">
      <Navbar />

      <div className="pt-28 px-6 max-w-6xl mx-auto flex flex-col items-center w-full">
        {/* Navigation Row */}
        <div className="w-full flex justify-start mb-6">
          <button
            onClick={() => navigate("/games/memory/info")}
            className="group flex items-center gap-3 bg-white px-8 py-3 rounded-2xl shadow-xl text-purple-600 font-black border-b-8 border-purple-200 hover:bg-purple-50 transition-all active:scale-95"
          >
            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" /> 
            BACK
          </button>
        </div>

        {/* Header Section */}
        <div className="text-center mb-10">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-4xl md:text-6xl font-black text-purple-600 uppercase flex items-center gap-4 mb-2">
              <Brain size={48} className="text-purple-500" /> Brain Explorer
            </h1>
            <div className="bg-white/50 px-6 py-2 rounded-full border border-purple-200 text-purple-400 font-bold tracking-widest uppercase text-sm">
              Tap the animals to meet your new friends!
            </div>
          </motion.div>
        </div>

        {/* Grid - Wider (max-w-6xl) and larger cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
          {memoryData.map((animal) => (
            <motion.button
              key={animal.id}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => speak(`This is a ${animal.name}!`)}
              className={`${animal.color} p-6 rounded-[3rem] shadow-2xl border-b-[10px] border-purple-200 flex flex-col items-center gap-4 group bg-white relative overflow-hidden`}
            >
              <div className="bg-white/80 rounded-[2rem] p-4 shadow-inner w-full flex justify-center">
                <img 
                  src={animal.img} 
                  alt={animal.name} 
                  className="w-28 h-28 md:w-32 md:h-32 object-contain group-hover:scale-110 transition-transform duration-500" 
                  onError={(e) => {
                    // Fallback if CDN fails
                    e.currentTarget.src = "https://img.icons8.com/color/144/paws.png";
                  }}
                />
              </div>
              
              <div className="flex flex-col items-center">
                <span className="font-black text-slate-800 uppercase text-xl tracking-tighter">
                  {animal.name}
                </span>
                <div className="flex items-center gap-2 text-purple-400 font-bold text-xs mt-1 uppercase opacity-70 group-hover:opacity-100 transition-opacity">
                  <Volume2 size={16} /> Tap to hear
                </div>
              </div>

              {/* Decorative Sparkle */}
              <Sparkles className="absolute top-4 right-4 text-purple-200 opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
            </motion.button>
          ))}
        </div>

        {/* Bottom Play Button */}
        <div className="mt-16 mb-10">
          <button 
            onClick={() => navigate("/games/memory/play")}
            className="group bg-purple-600 hover:bg-purple-500 text-white px-12 py-6 rounded-[2.5rem] text-3xl font-black shadow-2xl shadow-purple-200 flex items-center gap-4 transition-all active:scale-95"
          >
            <Sparkles className="group-hover:animate-spin" /> 
            READY TO PLAY?
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemoryMatchLearn;