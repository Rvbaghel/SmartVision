import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";

const shapeData = [
  { name: "Circle", icon: "⭕", color: "bg-red-500", desc: "Round and round like a ball!" },
  { name: "Square", icon: "🟧", color: "bg-blue-500", desc: "Four equal sides like a block!" },
  { name: "Triangle", icon: "🔺", color: "bg-yellow-500", desc: "Three sharp corners like a mountain!" },
  { name: "Star", icon: "⭐", color: "bg-amber-500", desc: "Twinkling bright in the sky!" },
  { name: "Heart", icon: "❤️", color: "bg-rose-500", desc: "The shape of love!" },
  { name: "Rectangle", icon: "▭", color: "bg-emerald-500", desc: "Long and tall like a door!" },
];

const ShapeLearning = () => {
  const navigate = useNavigate();

  const speak = (name: string, desc: string) => {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(`${name}. ${desc}`);
    msg.pitch = 1.3;
    msg.rate = 0.9;
    window.speechSynthesis.speak(msg);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      <Navbar />

      <div className="pt-28 px-6 max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-10">
          <button 
            onClick={() => navigate("/")} 
            className="bg-white p-3 rounded-2xl shadow-md text-slate-600 hover:scale-110 transition-transform"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-black text-slate-800 uppercase italic">Shape Academy</h1>
          <button 
            onClick={() => navigate("/games/shapehunter/play")} 
            className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg hover:bg-emerald-400 transition-all"
          >
            PLAY GAME <Play size={20} fill="currentColor" />
          </button>
        </div>

        {/* Intro Card */}
        <div className="bg-white p-8 rounded-[3rem] shadow-xl border-b-8 border-slate-100 mb-12 text-center w-full max-w-2xl">
          <p className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-2">Discovery Mode</p>
          <h2 className="text-4xl font-black text-slate-800">Tap a Shape to Hear its Name!</h2>
        </div>

        {/* Shape Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full">
          {shapeData.map((shape) => (
            <motion.button
              key={shape.name}
              whileHover={{ y: -10 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => speak(shape.name, shape.desc)}
              className="bg-white p-8 rounded-[3rem] shadow-xl border-b-[12px] border-slate-100 flex flex-col items-center group relative overflow-hidden"
            >
              {/* Floating Decoration */}
              <div className={`absolute top-0 right-0 w-20 h-20 ${shape.color} opacity-5 rounded-full -mr-10 -mt-10`} />
              
              <div className={`text-8xl md:text-9xl mb-6 drop-shadow-lg group-hover:scale-110 transition-transform`}>
                {shape.icon}
              </div>
              
              <h3 className="text-2xl font-black text-slate-700 mb-2 uppercase tracking-tight">{shape.name}</h3>
              
              <div className="bg-slate-50 p-3 rounded-full text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                <Volume2 size={24} />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShapeLearning;