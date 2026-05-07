import { Link } from "react-router-dom";
import { LogOut, Clock, ShieldCheck, Timer } from "lucide-react";
import { useState, useEffect } from "react";
import { signInWithGoogle } from "../auth";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import PinSettingsModal from "./PinSettingsModal";
import SetTimerModal from "./SetTimerModal";
import { API_BASE_URL } from "../config/api";

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState<string | null>(null); // ✅ Starts as null
  const [isPinSet, setIsPinSet] = useState<boolean>(false);
  
  const [showPinModal, setShowPinModal] = useState(false);
  const [showTimerModal, setShowTimerModal] = useState(false);

  // ✅ 1. Monitor Auth State & Check PIN Status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        localStorage.setItem("userEmail", currentUser.email);
        try {
          const response = await fetch(`${API_BASE_URL}/api/check-pin-status/${currentUser.email}`);
          if (response.ok) {
            const data = await response.json();
            setIsPinSet(data.is_pin_set);
          }
        } catch (error) {
          localStorage.removeItem("userEmail");
          console.error("Error fetching PIN status:", error);
        }
      } else {
        setIsPinSet(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // ✅ 2. Enhanced Live Timer Logic
  useEffect(() => {
    const updateTimer = () => {
      const end = localStorage.getItem("screenTimeEnd");
      
      if (!end) {
        setTimeLeft(null); // ✅ Keep hidden if no timer set
        return;
      }

      const remaining = Math.round((parseInt(end, 10) - Date.now()) / 1000);
      
      if (remaining > 0) {
        const mins = Math.floor(remaining / 60);
        const secs = remaining % 60;
        setTimeLeft(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
      } else {
        setTimeLeft("0:00");
        // Optional: clear on finish so it hides on next refresh
        // localStorage.removeItem("screenTimeEnd");
      }
    };

    // Run every second
    const interval = setInterval(updateTimer, 1000);
    
    // Listen for storage changes (when modal sets the time)
    window.addEventListener("storage", updateTimer);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", updateTimer);
    };
  }, []);

  const handleTimerClick = () => {
    if (!user) {
      alert("Please login to use the Screen Timer feature!");
      return;
    }
    if (!isPinSet) {
      setShowPinModal(true);
      return;
    }
    setShowTimerModal(true);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("screenTimeEnd"); // Clear timer on logout
      localStorage.removeItem("userEmail"); // ✅ Clear email
      setUser(null);
      setIsPinSet(false);
      setShowPinModal(false);
      setShowTimerModal(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <nav className="fixed top-4 left-0 right-0 z-50 mx-auto max-w-7xl px-4 pointer-events-none">
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md border-b-4 border-slate-200 rounded-[2rem] px-8 py-3 shadow-xl flex items-center justify-between">
          
          <Link to="/" className="flex items-center gap-3">
            <span className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic">
              Smart<span className="text-emerald-500">Vision</span>
            </span>
          </Link>

          <div className="flex items-center gap-4 md:gap-6">
            
            <button 
              onClick={handleTimerClick}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl border-b-4 transition-all active:border-0 active:translate-y-1 ${
                user 
                  ? 'bg-amber-100 border-amber-300 text-amber-700' 
                  : 'bg-slate-50 border-slate-200 text-slate-400 opacity-80'
              }`}
            >
              <Timer size={18} />
              <span className="text-xs font-black uppercase hidden sm:block">Set Timer</span>
            </button>

            {user && (
              <button 
                onClick={() => setShowPinModal(true)}
                className="bg-indigo-50 border-indigo-200 border-b-4 text-indigo-600 p-2.5 rounded-2xl hover:bg-indigo-100 transition-all active:border-0 active:translate-y-1"
                title="Parental Security"
              >
                <ShieldCheck size={18} />
              </button>
            )}

            <div className="h-8 w-[2px] bg-slate-200 hidden md:block" />

            {/* ✅ DYNAMIC TIMER DISPLAY: Only appears when timeLeft is not null */}
            {timeLeft && (
              <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100 animate-in fade-in slide-in-from-right-2">
                <Clock 
                  size={18} 
                  className={`${timeLeft !== "0:00" ? "text-emerald-500 animate-pulse" : "text-red-500"}`} 
                />
                <span className={`font-black text-sm tabular-nums ${timeLeft !== "0:00" ? "text-slate-700" : "text-red-600"}`}>
                  {timeLeft}
                </span>
              </div>
            )}

            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-2xl border border-slate-100">
                  <img src={user.photoURL} className="h-7 w-7 rounded-full" alt="avatar" />
                  <span className="text-xs font-black text-slate-700 uppercase hidden lg:block">
                    {user.displayName?.split(" ")[0]}
                  </span>
                </div>
                <button onClick={handleLogout} className="bg-slate-100 text-slate-500 p-2.5 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button 
                className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-2xl font-black hover:scale-105 transition-all shadow-[0_5px_0_0_#059669] active:translate-y-1 active:shadow-none"
                onClick={async () => {
                  try {
                    const loggedUser = await signInWithGoogle();
                    if (loggedUser) setUser(loggedUser);
                  } catch (err) {
                    console.error("Login failed:", err);
                  }
                }}
              >
                <span className="text-sm tracking-widest uppercase">Login</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {showPinModal && user && (
        <PinSettingsModal 
          userEmail={user.email} 
          isPinSet={isPinSet}
          onClose={() => setShowPinModal(false)} 
          onSuccess={() => {
            setIsPinSet(true);
            setShowPinModal(false);
          }} 
        />
      )}
      
      {showTimerModal && user && (
        <SetTimerModal onClose={() => setShowTimerModal(false)} />
      )}
    </>
  );
};

export default Navbar;