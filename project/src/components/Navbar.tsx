import { Link } from "react-router-dom";
import { Trophy, LayoutDashboard, Sparkles, LogIn } from "lucide-react";

const Navbar = () => {
  const isLoggedIn = false; 

  return (
    <nav className="sticky top-4 z-50 mx-auto max-w-7xl px-4 pointer-events-none">
      <div className="pointer-events-auto bg-white/90 backdrop-blur-md border-b-4 border-slate-200 rounded-[2rem] px-8 py-3 shadow-xl flex items-center justify-between">
        
        {/* LEFT: Logo & Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <span className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic">
            Smart<span className="text-primary">Vision</span>
          </span>
        </Link>

        {/* RIGHT: Navigation Links */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4">
            <Link to="/activity" className="flex items-center gap-2 font-black text-slate-600 hover:text-primary transition-colors uppercase text-sm tracking-widest">
              <LayoutDashboard size={20} />
              Activity
            </Link>
            <Link to="/leaderboard" className="flex items-center gap-2 font-black text-slate-600 hover:text-yellow-500 transition-colors uppercase text-sm tracking-widest">
              <Trophy size={20} />
              Hall of Fame
            </Link>
          </div>

          <div className="h-8 w-[2px] bg-slate-200 hidden md:block" />

          {/* Auth Button - Styled like a Game Start Button */}
          <button 
            className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-2xl font-black hover:scale-105 transition-all shadow-[0_5px_0_0_#be123c] active:translate-y-1 active:shadow-none"
            onClick={() => alert("Google Login Coming Soon!")}
          >
            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="h-5 w-5 bg-white rounded-full p-0.5" alt="G" />
            LOGIN
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;