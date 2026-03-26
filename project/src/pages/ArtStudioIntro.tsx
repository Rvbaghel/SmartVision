import React from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from "lottie-react"; 
import { Sparkles, ArrowRight } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import artAnimationData from "../assets/sketchpad-painting.json";

const LottiePlayer = (Lottie as any).default || Lottie;

const ArtStudioIntro = () => {
  const navigate = useNavigate();

  return (
    // Changed min-h-screen to h-screen to force it to fit the viewport
    <div className="bg-slate-50 h-screen flex flex-col font-sans overflow-hidden">
      <Navbar />

      {/* Reduced max-width and vertical padding */}
      <main className="flex-grow max-w-[1100px] mx-auto px-6 py-8 flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* LEFT SIDE: HERO TEXT */}
          <div className="flex flex-col items-start gap-5">
            <div className="flex items-center gap-2 text-secondary font-black bg-primary/10 px-4 py-2 rounded-full shadow-sm">
              <Sparkles size={16} className="text-primary" />
              <span className="uppercase tracking-tight text-xs">Become a Master Artist!</span>
            </div>

            {/* Reduced from 7xl to 5xl for better fit */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-secondary leading-tight tracking-tighter">
              Welcome to the <br /> 
              <span className="text-primary">Art Studio</span>
            </h1>

            <div className="text-lg text-gray-500 font-bold max-w-md flex flex-col gap-4 leading-relaxed">
              <p>Show us your creativity! Draw accurately to earn a top spot on the <span className="text-yellow-500 underline font-black">Hall of Fame</span>.</p>
              
              <div className="space-y-2">
                <p className="text-secondary uppercase text-sm tracking-widest">How to play:</p>
                <ul className="space-y-1.5 pl-1 text-secondary font-black uppercase tracking-tight text-sm">
                  <li className="flex gap-3"><span className="text-primary">01</span> Pick a cool category</li>
                  <li className="flex gap-3"><span className="text-primary">02</span> Select a magic target image</li>
                  <li className="flex gap-3"><span className="text-primary">03</span> Draw the lines perfectly</li>
                  <li className="flex gap-3"><span className="text-primary">04</span> Get your AI masterpiece score!</li>
                </ul>
              </div>
            </div>

            <div className="mt-4">
              {/* Scaled down the button size and padding */}
              <button 
                onClick={() => navigate('/games/drawing-challenge/play')} 
                className="group flex items-center gap-2 bg-primary text-white text-xl font-black px-10 py-5 rounded-[2rem] shadow-[0_8px_0_0_#be123c] hover:shadow-[0_4px_0_0_#be123c] hover:translate-y-[4px] active:translate-y-[8px] active:shadow-none transition-all"
              >
                START DRAWING
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: ANIMATION */}
          <div className="flex justify-center md:justify-end">
            {/* Reduced max-width of the image container from 650px to 450px */}
            <div className="w-full max-w-[450px] aspect-square relative flex items-center justify-center p-6 bg-white shadow-xl rounded-[2.5rem] border-b-4 border-slate-200">
              
              {artAnimationData && (
                <LottiePlayer
                  animationData={artAnimationData} 
                  loop={true} 
                  className="w-[80%] h-auto opacity-95"
                />
              )}

              <div className="absolute -top-6 -right-6 bg-yellow-400 p-4 rounded-2xl text-white rotate-12 shadow-lg hidden lg:block">
                <Sparkles size={24} />
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArtStudioIntro;