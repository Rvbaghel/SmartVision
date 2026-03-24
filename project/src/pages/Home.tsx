import React from "react";
import { 
  Gamepad2, 
  Rocket, 
  Sparkles, 
  Trophy, 
  Star, 
  Bot, 
  ShieldCheck, 
  Palette,
  Binary,
  Camera,
  Brush 
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GameCard from "../components/GameCard"; // Import our new component
import logo from "../assets/logo.png";

const Home = () => {
  const games = [
    {
      title: "Math Wizard",
      description: "Choose your magic level! Solve addition and subtraction puzzles to become the ultimate Math King.",
      icon: <Binary className="w-12 h-12 text-blue-500" />,
      color: "border-blue-400",
      path: "/games/math-quiz"
    },
    {
      title: "Image Hunter",
      description: "Quick! Can you find the matching objects before the 2-minute timer runs out? Let's see your super sight!",
      icon: <Camera className="w-12 h-12 text-yellow-500" />,
      color: "border-yellow-400",
      path: "/games/image-recognition"
    },
    {
      title: "Art Studio",
      description: "Look at the master drawing and try to copy it perfectly on your digital canvas. Time to create magic!",
      icon: <Brush className="w-12 h-12 text-green-500" />,
      color: "border-green-400",
      path: "/games/drawing-challenge"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen scroll-smooth">
      <Navbar />

      {/* HERO SECTION */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-16 max-w-7xl mx-auto min-h-[85vh] gap-12">
        
        {/* Left: Text Content */}
        <div className="flex-1 text-center md:text-left order-2 md:order-1">
          <div className="inline-block p-4 bg-white rounded-3xl shadow-xl mb-6 border border-gray-100">
            <img src={logo} alt="Smart Vision" className="h-16 w-auto" />
          </div>
          <h2 className="flex items-center justify-center md:justify-start gap-4 text-7xl font-black text-primary mb-6 leading-tight drop-shadow-sm">
            Learn & <span className="text-secondary">Play</span> <Gamepad2 size={64} className="text-secondary" />
          </h2>
          <p className="flex items-center justify-center md:justify-start gap-3 text-2xl text-gray-600 mb-10 font-medium max-w-lg">
            The fun world where you grow smarter every single day! <Rocket className="text-primary" />
          </p>
          <a href="#games" className="bg-primary text-white px-12 py-5 rounded-[2rem] text-2xl font-black hover:scale-105 transition-all shadow-[0_12px_0_0_#e11d48] active:translate-y-2 active:shadow-none inline-block">
            Start Learning
          </a>
        </div>

        {/* Right: Fun Visual Element */}
        <div className="flex-1 flex justify-center items-center relative order-1 md:order-2">
          <div className="absolute w-72 h-72 bg-primary/10 blur-[100px] rounded-full"></div>
          
          <div className="relative animate-bounce-slow">
            <img 
              src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg" 
              alt="Friendly Character" 
              className="w-full max-w-[450px] drop-shadow-2xl rounded-[3rem] border-8 border-white"
            />
            {/* Floating badges */}
            <div className="absolute -top-6 -right-6 bg-yellow-400 p-4 rounded-2xl shadow-lg rotate-12 animate-pulse hidden md:block">
              <Star size={40} className="text-white fill-white" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-lg -rotate-12 hidden md:block border border-gray-100">
              <Trophy size={40} className="text-yellow-500" />
            </div>
          </div>
        </div>
      </section>

      {/* GAMES SECTION */}
      <section id="games" className="px-10 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="flex items-center justify-center gap-3 text-4xl font-black text-secondary mb-4">
            Pick Your Adventure! <Sparkles className="text-yellow-400" />
          </h2>
          <div className="h-2 w-24 bg-yellow-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {games.map((game, index) => (
            <GameCard key={index} {...game} />
          ))}
        </div>
      </section>

      {/* WHY SMART VISION SECTION */}
      <section className="px-10 py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border-2 border-dashed border-blue-200 text-center">
              <div className="flex justify-center mb-4"><Bot size={48} className="text-blue-500" /></div>
              <h3 className="text-2xl font-black text-secondary mb-2">AI Powered</h3>
              <p className="text-gray-500 font-medium">Smart games that adapt to your child's learning speed!</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border-2 border-dashed border-yellow-200 text-center">
              <div className="flex justify-center mb-4"><ShieldCheck size={48} className="text-yellow-500" /></div>
              <h3 className="text-2xl font-black text-secondary mb-2">100% Safe</h3>
              <p className="text-gray-500 font-medium">A secure environment designed specifically for young learners.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border-2 border-dashed border-green-200 text-center">
              <div className="flex justify-center mb-4"><Palette size={48} className="text-green-500" /></div>
              <h3 className="text-2xl font-black text-secondary mb-2">Fun Themes</h3>
              <p className="text-gray-500 font-medium">Beautiful 3D worlds that keep kids engaged for hours.</p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;