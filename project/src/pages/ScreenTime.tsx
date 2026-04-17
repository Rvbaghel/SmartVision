import React, { useState, useEffect } from "react";
import { ShieldCheck, Eye, Brain, Clock, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const ScreenTime = () => {
  const navigate = useNavigate();
  const SESSION_DURATION = 1800; // 30 minutes in seconds
  const [timeLeft, setTimeLeft] = useState<number>(SESSION_DURATION);

  useEffect(() => {
    // 1. Check if we already have an 'endTime' saved in the browser
    const savedEndTime = localStorage.getItem("screenTimeEnd");
    let endTime: number;

    if (savedEndTime) {
      endTime = parseInt(savedEndTime, 10);
    } else {
      // 2. If no timer exists, set one for 30 mins from now and save it
      endTime = Date.now() + SESSION_DURATION * 1000;
      localStorage.setItem("screenTimeEnd", endTime.toString());
    }

    // 3. Update the countdown every second
    const timer = setInterval(() => {
      const now = Date.now();
      const remaining = Math.round((endTime - now) / 1000);

      if (remaining <= 0) {
        setTimeLeft(0);
        clearInterval(timer);
        // Optional: trigger alert or lock screen here
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Function to reset timer (e.g., for a new day or admin)
  const resetTimer = () => {
    localStorage.removeItem("screenTimeEnd");
    window.location.reload(); 
  };

  return (
    <div className="min-h-screen bg-emerald-50 pb-20">
      <Navbar />
      
      <div className="pt-32 px-6 max-w-4xl mx-auto flex flex-col items-center">
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl border-b-[12px] border-emerald-200 flex flex-col items-center w-full mb-12 relative overflow-hidden">
          
          <Clock size={48} className={`mb-4 ${timeLeft > 0 ? "text-emerald-500 animate-pulse" : "text-red-500"}`} />
          
          <h2 className="text-2xl font-black text-slate-700 uppercase tracking-widest text-center">
            {timeLeft > 0 ? "Learning Session Time" : "Time for a Break!"}
          </h2>

          <div className={`text-7xl md:text-9xl font-black my-4 ${timeLeft < 300 ? "text-red-500" : "text-emerald-600"}`}>
            {formatTime(timeLeft)}
          </div>

          <p className="text-slate-500 font-bold text-center max-w-md">
            {timeLeft > 0 
              ? "Keep going! You are doing a great job learning today." 
              : "Great work! Now, let's stand up and stretch your legs for 15 minutes."}
          </p>

          {/* Home Button to go back to games */}
          <button 
            onClick={() => navigate("/")}
            className="mt-8 flex items-center gap-2 bg-slate-800 text-white px-8 py-3 rounded-2xl font-black hover:bg-slate-700 transition-all shadow-lg active:scale-95"
          >
            <Home size={20} /> GO TO GAMES
          </button>
        </div>

        {/* Why we need this section */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-lg flex flex-col items-center text-center border-b-4 border-blue-100">
             <Eye className="text-blue-500 mb-2" size={32} />
             <h4 className="font-black text-slate-800 text-lg">Happy Eyes</h4>
             <p className="text-slate-500 text-xs mt-2">Breaks keep your eyes bright and strong!</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-lg flex flex-col items-center text-center border-b-4 border-pink-100">
             <Brain className="text-pink-500 mb-2" size={32} />
             <h4 className="font-black text-slate-800 text-lg">Smart Brain</h4>
             <p className="text-slate-500 text-xs mt-2">Rest helps you remember what you learned.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-lg flex flex-col items-center text-center border-b-4 border-emerald-100">
             <ShieldCheck className="text-emerald-500 mb-2" size={32} />
             <h4 className="font-black text-slate-800 text-lg">Strong Body</h4>
             <p className="text-slate-500 text-xs mt-2">Time to run and jump around!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenTime;