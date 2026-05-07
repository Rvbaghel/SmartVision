import React, { useState, useEffect } from "react";
import { ShieldCheck, Eye, Brain, Clock, Home, Lock, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const ScreenTime = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [parentPin, setParentPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. Monitor the countdown
  useEffect(() => {
    const updateCountdown = () => {
      const savedEndTime = localStorage.getItem("screenTimeEnd");
      if (!savedEndTime) {
        setTimeLeft(null);
        return;
      }

      const remaining = Math.round((parseInt(savedEndTime, 10) - Date.now()) / 1000);
      setTimeLeft(remaining > 0 ? remaining : 0);
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    window.addEventListener("storage", updateCountdown);

    return () => {
      clearInterval(timer);
      window.removeEventListener("storage", updateCountdown);
    };
  }, []);

  // 2. PIN Verification Logic
  const handleVerifyAndReset = async () => {
    const userEmail = localStorage.getItem("userEmail"); // Ensure you save email on login
    if (!userEmail) {
      setError("Please login first");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://smartvision-xnch.onrender.com/api/verify-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_email: userEmail,
          pin: parentPin
        }),
      });

      const data = await response.json();

      if (data.verified) {
        // Success: Clear timer and reset state
        localStorage.removeItem("screenTimeEnd");
        setParentPin("");
        setIsVerifying(false);
        // Refresh Navbar and current page
        window.dispatchEvent(new Event("storage"));
      } else {
        setError("Incorrect PIN. Please try again.");
        setParentPin("");
      }
    } catch (err) {
      setError("Server connection failed.");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen bg-emerald-50 pb-20">
      <Navbar />
      
      <div className="pt-32 px-6 max-w-4xl mx-auto flex flex-col items-center">
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl border-b-[12px] border-emerald-200 flex flex-col items-center w-full mb-12 relative overflow-hidden">
          
          <Clock size={48} className={`mb-4 ${timeLeft && timeLeft > 0 ? "text-emerald-500 animate-pulse" : "text-red-500"}`} />
          
          <h2 className="text-2xl font-black text-slate-700 uppercase tracking-widest text-center">
            {timeLeft === null ? "No Timer Set" : timeLeft > 0 ? "Learning Session Time" : "Time for a Break!"}
          </h2>

          <div className={`text-7xl md:text-9xl font-black my-4 ${timeLeft !== null && timeLeft < 300 ? "text-red-500" : "text-emerald-600"}`}>
            {timeLeft !== null ? formatTime(timeLeft) : "--:--"}
          </div>

          {/* PARENTAL UNLOCK SECTION */}
          {timeLeft === 0 && (
            <div className="w-full max-w-sm mt-6 p-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              {!isVerifying ? (
                <button 
                  onClick={() => setIsVerifying(true)}
                  className="w-full bg-slate-800 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-slate-700 transition-all shadow-lg"
                >
                  <Lock size={18} /> PARENTAL UNLOCK
                </button>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs font-black text-slate-500 uppercase text-center">Enter Parent PIN</p>
                  <input 
                    type="password"
                    maxLength={4}
                    value={parentPin}
                    onChange={(e) => setParentPin(e.target.value.replace(/\D/g, ""))}
                    className="w-full text-center text-3xl font-black tracking-widest p-3 rounded-xl border-4 border-white shadow-inner outline-none focus:border-emerald-400 transition-all"
                    placeholder="****"
                    autoFocus
                  />
                  {error && <p className="text-red-500 text-[10px] font-bold text-center uppercase">{error}</p>}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setIsVerifying(false)}
                      className="flex-1 bg-slate-200 text-slate-600 py-3 rounded-xl font-black text-xs uppercase"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleVerifyAndReset}
                      disabled={loading || parentPin.length < 4}
                      className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-black text-xs uppercase disabled:opacity-50"
                    >
                      {loading ? "Checking..." : "Verify PIN"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <p className="text-slate-500 font-bold text-center max-w-md mt-6">
            {timeLeft && timeLeft > 0 
              ? "Keep going! You are doing a great job learning today." 
              : "Great work! Now, let's stand up and stretch your legs."}
          </p>

          <button 
            onClick={() => navigate("/")}
            className="mt-8 flex items-center gap-2 bg-slate-100 text-slate-600 px-8 py-3 rounded-2xl font-black hover:bg-white transition-all active:scale-95 border-b-4 border-slate-200"
          >
            <Home size={20} /> GO TO GAMES
          </button>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-6 w-full">
          <div className="bg-white p-6 rounded-3xl shadow-lg flex flex-col items-center text-center border-b-4 border-blue-100">
             <Eye className="text-blue-500 mb-2" size={32} />
             <h4 className="font-black text-slate-800 text-lg uppercase tracking-tighter">Happy Eyes</h4>
             <p className="text-slate-500 text-[10px] font-bold uppercase mt-2">Breaks keep your eyes bright and strong!</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-lg flex flex-col items-center text-center border-b-4 border-pink-100">
             <Brain className="text-pink-500 mb-2" size={32} />
             <h4 className="font-black text-slate-800 text-lg uppercase tracking-tighter">Smart Brain</h4>
             <p className="text-slate-500 text-[10px] font-bold uppercase mt-2">Rest helps you remember what you learned.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-lg flex flex-col items-center text-center border-b-4 border-emerald-100">
             <ShieldCheck className="text-emerald-500 mb-2" size={32} />
             <h4 className="font-black text-slate-800 text-lg uppercase tracking-tighter">Strong Body</h4>
             <p className="text-slate-500 text-[10px] font-bold uppercase mt-2">Time to run and jump around!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenTime;