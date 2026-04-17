import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, BookOpen, Sparkles, Dog } from "lucide-react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Navbar from "../components/Navbar";
// Update these paths to your animal game assets
import bg from "../assets/game5.png"; 
import learnThumb from "../assets/game5.png";
import playThumb from "../assets/game5.png";

const AnimalSoundInfo = () => {
  const navigate = useNavigate();

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; 
    utterance.pitch = 1.2; 
    window.speechSynthesis.speak(utterance);
  };

  const playSound = () => {
    const audio = new Audio("/click.mp3");
    audio.play().catch(e => console.log("Click audio failed"));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans overflow-x-hidden">
      <Navbar />

      <div className="relative flex-grow flex flex-col items-center pt-32 pb-20 px-6">
        {/* Background - Nature Theme */}
        <div className="absolute inset-0 z-0">
          <img src={bg} alt="" className="w-full h-full object-cover blur-sm brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/30 via-slate-900/50 to-slate-900/90" />
        </div>

        <div className="relative z-10 max-w-6xl w-full mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="mb-10 flex items-center gap-3 text-white/90 font-semibold tracking-wide hover:text-white transition-all group"
          >
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md group-hover:-translate-x-1 transition-transform shadow-lg">
              <ArrowLeft size={20} />
            </div>
            Back to World
          </button>

          {/* Header */}
          <div className="mb-14 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-2xl tracking-tight mb-3">
              Animal <span className="text-emerald-400">& Sounds</span>
            </h1>

            <div className="flex items-center gap-3 justify-center md:justify-start text-white/85 text-lg font-medium">
              <Dog className="text-orange-400" size={24} />
              <span>Hear the wild world roar!</span>
              <Sparkles className="text-yellow-300" size={20} />
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            {/* Learn Card */}
            <div 
              onMouseEnter={() => speak("Animal Sounds: Learning Phase")} 
              className="group bg-white rounded-[2rem] shadow-xl overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-500 border-4 border-transparent hover:border-emerald-200 cursor-pointer"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={learnThumb}
                  alt="Learn animal sounds"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 flex items-center gap-3 text-white">
                  <div className="bg-emerald-500 p-2 rounded-lg">
                    <BookOpen size={24} />
                  </div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight">Phase 1: Learning</h3>
                </div>
              </div>

              <div className="p-8 flex flex-col items-center">
                <div className="w-full h-44 mb-6 bg-emerald-50/50 rounded-2xl flex justify-center items-center relative overflow-hidden group-hover:bg-emerald-50 transition-colors">
                  <div className="transform group-hover:-translate-y-2 transition-transform duration-500 ease-in-out">
                    {/* You can change this Lottie SRC to an animal-themed one if you have it! */}
                    <DotLottieReact
                      src="/Learning.lottie" 
                      loop
                      autoplay
                      style={{ height: 160, width: 160 }}
                    />
                  </div>
                </div>

                <button
                  onClick={(e) => { 
                    e.stopPropagation();
                    playSound(); 
                    navigate("/game/animals/learn"); 
                  }}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white text-lg font-bold rounded-2xl transition-all shadow-lg shadow-emerald-200 active:scale-95 flex items-center justify-center gap-3"
                >
                  START LEARNING
                  <BookOpen size={20} />
                </button>
              </div>
            </div>

            {/* Play Card */}
            <div 
              onMouseEnter={() => speak("Animal Sounds: Playing Phase")}
              className="group bg-white rounded-[2rem] shadow-xl overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-500 border-4 border-transparent hover:border-orange-200 cursor-pointer"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={playThumb}
                  alt="Play animal game"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 flex items-center gap-3 text-white">
                  <div className="bg-orange-500 p-2 rounded-lg">
                    <Play size={24} />
                  </div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight">Phase 2: Play</h3>
                </div>
              </div>

              <div className="p-8 flex flex-col items-center">
                <div className="w-full h-44 mb-6 bg-orange-50/50 rounded-2xl flex justify-center items-center relative overflow-hidden group-hover:bg-orange-50 transition-colors">
                  <div className="transform group-hover:-translate-y-2 transition-transform duration-500 ease-in-out">
                    <DotLottieReact
                      src="/gaming-community.lottie"
                      loop
                      autoplay
                      style={{ height: 150, width: 150 }}
                    />
                  </div>
                </div>

                <button
                  onClick={(e) => { 
                    e.stopPropagation();
                    playSound(); 
                    navigate("/game/animals/play"); 
                  }}
                  className="w-full py-4 bg-orange-500 hover:bg-orange-400 text-white text-lg font-bold rounded-2xl transition-all shadow-lg shadow-orange-200 active:scale-95 flex items-center justify-center gap-3"
                >
                  PLAY NOW
                  <Play size={20} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalSoundInfo;