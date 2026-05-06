import React, { useState, useEffect } from "react";
import { Clock, Lock, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE_URL } from "../config/api";

const ScreenTimeManager = ({ children }: { children: React.ReactNode }) => {
  const [isLocked, setIsLocked] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [parentPin, setParentPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkTimer = () => {
      const savedEndTime = localStorage.getItem("screenTimeEnd");
      if (!savedEndTime) {
        setIsLocked(false);
        return;
      }

      const remaining = Math.round((parseInt(savedEndTime, 10) - Date.now()) / 1000);
      if (remaining <= 0) {
        setIsLocked(true);
      } else {
        setIsLocked(false);
      }
    };

    const interval = setInterval(checkTimer, 1000);
    window.addEventListener("storage", checkTimer);
    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", checkTimer);
    };
  }, []);

  
  const handleVerifyAndUnlock = async () => {
    const userEmail = localStorage.getItem("userEmail"); // Make sure this is set on login!
    
    if (!userEmail) {
      setError("Please login as parent");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/verify-pin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_email: userEmail,
          pin: parentPin
        }),
      });

      const data = await response.json();

      if (data.verified) {
        localStorage.removeItem("screenTimeEnd");
        setIsLocked(false);
        setIsVerifying(false);
        setParentPin("");
        window.dispatchEvent(new Event("storage")); // Notify Navbar
      } else {
        setError("Wrong PIN!");
        setParentPin("");
      }
    } catch (err) {
      setError("Connection Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {children}

      <AnimatePresence>
        {isLocked && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-emerald-600/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white p-10 rounded-[3rem] shadow-2xl max-w-md w-full text-center border-b-[12px] border-emerald-200"
            >
              <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock size={40} className="text-yellow-600 animate-bounce" />
              </div>

              <h2 className="text-3xl font-black text-slate-800 mb-2 uppercase tracking-tight">
                Time is up!
              </h2>
              
              {!isVerifying ? (
                <>
                  <p className="text-slate-600 font-bold mb-8 leading-relaxed">
                    You've done a great job learning! Now it's time to rest your eyes and play outside.
                  </p>
                  <button 
                    onClick={() => setIsVerifying(true)}
                    className="w-full bg-slate-800 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-slate-700 transition-all active:scale-95"
                  >
                    <Lock size={18} /> UNLOCK (Parent Only)
                  </button>
                </>
              ) : (
                <div className="space-y-4 py-4 animate-in fade-in zoom-in duration-300">
                  <div className="flex items-center justify-center gap-2 text-emerald-600 font-black uppercase text-xs">
                    <ShieldCheck size={16} /> Enter Master PIN
                  </div>
                  <input 
                    type="password"
                    maxLength={4}
                    value={parentPin}
                    onChange={(e) => setParentPin(e.target.value.replace(/\D/g, ""))}
                    className="w-full text-center text-5xl font-black tracking-[1rem] p-4 rounded-3xl border-4 border-slate-100 focus:border-emerald-500 outline-none transition-all"
                    placeholder="****"
                    autoFocus
                  />
                  {error && <p className="text-red-500 font-black text-[10px] uppercase">{error}</p>}
                  <div className="flex gap-3">
                    <button 
                      onClick={() => { setIsVerifying(false); setError(""); }}
                      className="flex-1 bg-slate-100 text-slate-500 py-3 rounded-2xl font-black text-xs uppercase"
                    >
                      Back
                    </button>
                    <button 
                      onClick={handleVerifyAndUnlock}
                      disabled={loading || parentPin.length < 4}
                      className="flex-1 bg-emerald-600 text-white py-3 rounded-2xl font-black text-xs uppercase shadow-[0_4px_0_0_#059669] active:translate-y-1 active:shadow-none transition-all"
                    >
                      {loading ? "..." : "Unlock"}
                    </button>
                  </div>
                </div>
              )}

              <p className="mt-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                A Parent must verify the PIN to continue learning
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScreenTimeManager;