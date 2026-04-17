import React, { useState, useEffect } from "react";
import { Clock, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ScreenTimeManager = ({ children }: { children: React.ReactNode }) => {
  const [isLocked, setIsLocked] = useState(false);
  const SESSION_DURATION = 1800; // 30 Minutes

  useEffect(() => {
    const checkTimer = () => {
      const savedEndTime = localStorage.getItem("screenTimeEnd");
      
      if (!savedEndTime) {
        // Initialize if first time
        const newEndTime = Date.now() + SESSION_DURATION * 1000;
        localStorage.setItem("screenTimeEnd", newEndTime.toString());
        return;
      }

      const remaining = Math.round((parseInt(savedEndTime) - Date.now()) / 1000);

      if (remaining <= 0) {
        setIsLocked(true);
      }
    };

    // Check every second
    const interval = setInterval(checkTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleReset = () => {
    // Reset for today (Parental Action)
    const newEndTime = Date.now() + SESSION_DURATION * 1000;
    localStorage.setItem("screenTimeEnd", newEndTime.toString());
    setIsLocked(false);
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
              <p className="text-slate-600 font-bold mb-8 leading-relaxed">
                You've done a great job learning! Now it's time to rest your eyes and play outside. 🏃‍♂️☀️
              </p>

              <div className="space-y-3">
                <button 
                  onDoubleClick={handleReset}
                  className="w-full bg-slate-800 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-slate-700 transition-all active:scale-95"
                >
                  <Lock size={18} /> PARENTAL RESET (Double Click)
                </button>
                
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  Resetting starts a new 30-minute session
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScreenTimeManager;