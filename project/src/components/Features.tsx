import React from 'react';
import { PlayCircle, BookOpen } from 'lucide-react';

// Importing images from the assets folder
import poem1 from '../assets/poem1.png';
import poem2 from '../assets/poem2.png';
import poem3 from '../assets/poem3.png';
import poem4 from '../assets/poem4.png';
import poem5 from '../assets/poem5.png';

const poems = [
  { id: 1, title: "Bus Adventure", img: poem1, link: "https://www.youtube.com/watch?v=e_04ZrNroTo" },
  { id: 2, title: "Fire Truck Hero", img: poem2, link: "https://www.youtube.com/watch?v=K3SInH9X670" },
  { id: 3, title: "Dino Stomp", img: poem3, link: "https://www.youtube.com/watch?v=E_u7P_T_RRE" },
  { id: 4, title: "Row Your Boat", img: poem4, link: "https://www.youtube.com/watch?v=7otAJa3jui8" },
  { id: 5, title: "Space Rocket", img: poem5, link: "https://www.youtube.com/watch?v=dg0O94B2pXw" },
];

const Features: React.FC = () => {
  return (
    <section className="py-10 px-4 max-w-[1400px] mx-auto text-center relative overflow-hidden">
      
      {/* Playful Section Title */}
      <div className="mb-10">
        <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-2 tracking-tight">
          Smarty's Poetry Corner <span className="text-yellow-400 animate-pulse inline-block">📖</span>
        </h2>
        <p className="text-lg font-bold text-slate-500 uppercase tracking-widest">Pick a Story Mission!</p>
      </div>

      {/* Container with overflow hidden to keep it "no-scroll" */}
      <div className="relative w-full overflow-hidden py-8">
        
        {/* The Scrolling Track */}
        <div className="flex gap-8 w-max animate-scroll-loop group">
          {/* Tripling the items ensures a seamless infinite loop with no empty space */}
          {[...poems, ...poems, ...poems].map((poem, index) => (
            <div 
              key={`${poem.id}-${index}`} 
              className="flex-shrink-0 w-[320px] bg-white rounded-[2rem] p-6 shadow-xl border-2 border-slate-50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-indigo-200 group/card cursor-pointer"
            >
              {/* MEDIUM Image Card */}
              <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-5 shadow-sm">
                <img 
                  src={poem.img} 
                  alt={poem.title} 
                  className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Title */}
              <h4 className="text-2xl font-black text-slate-800 mb-4 flex items-center justify-center gap-2">
                <BookOpen className="text-indigo-400" size={24} />
                {poem.title}
              </h4>
              
              {/* Play Button */}
              <a 
                href={poem.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-rose-500 hover:bg-rose-600 text-white font-black text-lg py-3 rounded-xl transition-all shadow-md active:scale-95"
              >
                <PlayCircle size={24} />
                PLAY NOW
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Styles for Smooth Infinite Scroll & Hover Pause */}
      <style>{`
        @keyframes scrollLoop {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }

        .animate-scroll-loop {
          animation: scrollLoop 25s linear infinite;
        }

        /* This stops the movement when ANY part of the card is hovered */
        .group:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Decorative Background Elements */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-100 rounded-full blur-3xl opacity-40 -z-10" />
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-40 -z-10" />
    </section>
  );
};

export default Features;