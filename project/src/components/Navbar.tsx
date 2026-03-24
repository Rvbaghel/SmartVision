import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; 
import { Trophy, LayoutDashboard, UserCircle } from "lucide-react"; // Import Lucide icons

const Navbar = () => {
  // Temporary variable to simulate if user is logged in
  const isLoggedIn = false; 

  return (
    <nav className="sticky top-0 z-50 bg-primary text-white px-8 py-3 shadow-lg flex items-center justify-between">
      
      {/* LEFT: Logo & Brand */}
      <Link to="/" className="flex items-center gap-3 group">
        <div className="bg-white p-1.5 rounded-xl shadow-sm transform group-hover:rotate-6 transition-transform">
          <img 
            src={logo} 
            alt="Smart Vision Logo" 
            className="h-8 w-auto object-contain" 
          />
        </div>
        <span className="text-2xl font-black tracking-tight uppercase">Smart Vision</span>
      </Link>

      {/* RIGHT: Navigation Links */}
      <div className="flex items-center gap-4">
        
        {/* Main Links */}
        <div className="hidden md:flex items-center gap-2 mr-4">
          <Link to="/activity" className="flex items-center gap-2 px-4 py-2 font-bold hover:text-yellow-300 transition group">
            <LayoutDashboard size={18} className="group-hover:animate-pulse" />
            Activity
          </Link>
          <Link to="/leaderboard" className="flex items-center gap-2 px-4 py-2 font-bold hover:text-yellow-300 transition group">
            <Trophy size={18} className="group-hover:scale-110 transition-transform" />
            Hall of Fame
          </Link>
        </div>

        {/* Auth Buttons */}
        {isLoggedIn ? (
          <Link 
            to="/profile" 
            className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-2xl font-bold hover:scale-105 transition border-b-4 border-black/20"
          >
            <div className="w-8 h-8 bg-white rounded-full overflow-hidden border-2 border-white">
               {/* This will eventually be the Google Profile Pic */}
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="user" />
            </div>
            Profile
          </Link>
        ) : (
          <button 
            className="flex items-center gap-2 bg-white text-secondary px-6 py-2 rounded-2xl font-black hover:scale-105 transition shadow-[0_5px_0_0_#cbd5e1] active:translate-y-1 active:shadow-none"
            onClick={() => alert("Google Login Coming Soon!")}
          >
            {/* Google Icon Brand Asset */}
            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="h-5 w-5" alt="Google" />
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;