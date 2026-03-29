import React from "react";
import { 
  Gamepad2, Rocket, Sparkles, Trophy, Star, 
  Bot, ShieldCheck, Palette, Brush 
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GameCard from "../components/GameCard";
import Features from "../components/Features";
import logo from "../assets/logo1.png";

// Import your assets
import shapesImg from "../assets/shapegame.png";
import roadSignsImg from "../assets/roadgame.png";
import animalsImg from "../assets/animal.png";
import foodImg from "../assets/food.png";
import artStudioImg from "../assets/drawing.png"; // AI image for Art Studio
import heroMascot from "../assets/mascort.png"
const Home = () => {
  const games = [
    {
      title: "Art Studio",
      category: "Creative Drawing",
      imageUrl: artStudioImg,
      color: "text-green-500",
      path: "/games/drawing-challenge" // Kept your original path
    },
    {
      title: "Shape Hunter",
      category: "Geometric Shape Games",
      imageUrl: shapesImg,
      color: "text-orange-500",
      path: "/game/shapes/info"
    },
    {
      title: "Sign Master",
      category: "Road Safety Games",
      imageUrl: roadSignsImg,
      color: "text-red-500",
      path: "/game/road-signs/info"
    },
    {
      title: "Animal World",
      category: "Science & Habitats",
      imageUrl: animalsImg,
      color: "text-emerald-600",
      path: "/game/animals/info"
    },
    {
      title: "Healthy Plate",
      category: "Food & Nutrition",
      imageUrl: foodImg,
      color: "text-blue-500",
      path: "/game/food/info"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen scroll-smooth">
      <Navbar />

 {/* HERO SECTION */}
<section className="relative flex flex-col md:flex-row items-center justify-between px-10 py-10 max-w-7xl mx-auto gap-12 min-h-[70vh] -mt-1">
  
  {/* Left: Text Content */}
  <div className="flex-1 text-center md:text-left z-10 scale-90 md:scale-100">
    
    {/* Professional Badge (No Emoji) */}
    <div className="inline-flex items-center gap-2 p-2 px-6 bg-white rounded-full shadow-sm mb-6 border border-gray-100">
      <Sparkles size={16} className="text-yellow-500 animate-pulse" />
      <span className="text-primary font-black uppercase tracking-widest text-[10px] md:text-xs">
        Welcome to the Future of Learning
      </span>
    </div>
    
    <h1 className="text-6xl md:text-7xl font-black text-slate-900 mb-6 leading-tight">
      Learn & <br />
      <span className="text-primary underline decoration-yellow-400 decoration-8 underline-offset-4">Play!</span>
    </h1>
    
    {/* Subtext with Rocket Icon */}
    <p className="flex items-center justify-center md:justify-start gap-3 text-xl md:text-2xl text-slate-600 mb-8 font-bold leading-relaxed max-w-md">
      The fun world where your smart robot friend helps you grow every single day! 
      <Rocket size={28} className="text-primary animate-bounce-slow" />
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
      <a href="#games" className="group bg-primary text-white px-8 py-4 rounded-[2rem] text-xl font-black hover:scale-105 transition-all shadow-[0_10px_0_0_#be123c] active:translate-y-2 active:shadow-none inline-flex items-center gap-3">
        START ADVENTURE <Star size={24} fill="currentColor" className="group-hover:rotate-45 transition-transform" />
      </a>
    </div>
  </div>

  {/* Right: The Mascot Visual */}
  <div className="flex-1 flex justify-center relative scale-90 md:scale-100">
    {/* Animated background glow */}
    <div className="absolute w-[400px] h-[400px] bg-yellow-200/40 blur-[100px] rounded-full animate-pulse"></div>
    
    <div className="relative z-10 animate-float">
      <img 
        src={heroMascot} 
        alt="Smarty the Robot Mascot" 
        className="w-full max-w-[450px] drop-shadow-2xl mix-blend-multiply"
      />
      
      {/* Floating Badges */}
      <div className="absolute -top-5 right-5 bg-white p-3 rounded-2xl shadow-xl rotate-12 animate-bounce-slow border-b-4 border-yellow-400">
        <Trophy size={32} className="text-yellow-500" />
      </div>
      <div className="absolute bottom-5 -left-5 bg-white p-3 rounded-2xl shadow-xl -rotate-12 animate-pulse border-b-4 border-blue-400">
        <Sparkles size={32} className="text-blue-500" />
      </div>
    </div>
  </div>
</section>     {/* GAMES SECTION */}
      <section id="games" className="px-10 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-slate-800 mb-4">
            Pick Your Adventure! <Sparkles className="inline text-yellow-400" />
          </h2>
          <div className="h-2 w-32 bg-yellow-400 mx-auto rounded-full"></div>
        </div>

        {/* Responsive Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {games.map((game, index) => (
            <GameCard key={index} {...game} />
          ))}
        </div>
      </section>
          {/* 2. INSERT FEATURES COMPONENT HERE */}
      <Features />
      <Footer />
    
    </div>
  );
};

export default Home;