import { Link } from "react-router-dom";
import { LogOut, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { signInWithGoogle } from "../auth";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState<string>("30:00");

  // ✅ 1. Monitor Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // ✅ 2. Live Timer Logic (Syncs with ScreenTimeManager)
  useEffect(() => {
    const interval = setInterval(() => {
      const end = localStorage.getItem("screenTimeEnd");
      if (end) {
        const remaining = Math.round((parseInt(end, 10) - Date.now()) / 1000);
        
        if (remaining > 0) {
          const mins = Math.floor(remaining / 60);
          const secs = remaining % 60;
          setTimeLeft(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
        } else {
          setTimeLeft("0:00");
        }
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 mx-auto max-w-7xl px-4 pointer-events-none">
      <div className="pointer-events-auto bg-white/95 backdrop-blur-md border-b-4 border-slate-200 rounded-[2rem] px-8 py-3 shadow-xl flex items-center justify-between">
        
        {/* LEFT: Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <span className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic">
            Smart<span className="text-emerald-500">Vision</span>
          </span>
        </Link>

        {/* RIGHT: Navigation & Timer */}
        <div className="flex items-center gap-4 md:gap-6">
          
          {/* ✅ LIVE TIMER DISPLAY */}
          <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100 shadow-sm transition-all hover:bg-emerald-100">
            <Clock 
              size={18} 
              className={`${timeLeft !== "0:00" ? "text-emerald-500 animate-pulse" : "text-red-500"}`} 
            />
            <span className={`font-black text-sm tabular-nums ${timeLeft !== "0:00" ? "text-slate-700" : "text-red-600"}`}>
              {timeLeft}
            </span>
          </div>

          <div className="h-8 w-[2px] bg-slate-200 hidden md:block" />

          {user ? (
            <div className="flex items-center gap-4">
              {/* User Profile Info */}
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-2xl border border-slate-100">
                <img 
                  src={user.photoURL} 
                  className="h-7 w-7 rounded-full border-2 border-white shadow-sm" 
                  alt="avatar" 
                />
                <span className="text-xs font-black text-slate-700 uppercase hidden lg:block">
                  {user.displayName?.split(" ")[0]}
                </span>
              </div>

              {/* Logout Button */}
              <button 
                onClick={handleLogout}
                className="bg-slate-100 text-slate-500 p-2.5 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all border-b-2 border-slate-200 active:border-0"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            /* Login Button */
            <button 
              className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-2xl font-black hover:scale-105 transition-all shadow-[0_5px_0_0_#059669] active:translate-y-1 active:shadow-none"
              onClick={async () => {
                const loggedUser = await signInWithGoogle();
                if (loggedUser) setUser(loggedUser);
              }}
            >
              <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="h-5 w-5 bg-white rounded-full p-0.5" alt="G" />
              <span className="text-sm tracking-widest uppercase">Login</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;