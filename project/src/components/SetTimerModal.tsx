import { useState } from "react";
import { X, Clock, Play } from "lucide-react";

interface TimerModalProps {
  onClose: () => void;
}

const SetTimerModal = ({ onClose }: TimerModalProps) => {
  const [selectedTime, setSelectedTime] = useState<number>(30); // Default 30 mins

  const timeOptions = [
     { label: "1 MINS", value: 1, color: "bg-emerald-500" },
    { label: "15 MINS", value: 15, color: "bg-emerald-500" },
    { label: "30 MINS", value: 30, color: "bg-amber-500" },
    { label: "45 MINS", value: 45, color: "bg-orange-500" },
    { label: "60 MINS", value: 60, color: "bg-red-500" },
  ];

  const handleStartTimer = () => {
  const endTime = Date.now() + selectedTime * 60 * 1000;
  localStorage.setItem("screenTimeEnd", endTime.toString());
  
  onClose();
  // This helps the Navbar immediately see the new timer
  window.dispatchEvent(new Event("storage")); 
};

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl border-b-8 border-amber-200 overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-amber-500 p-8 text-white text-center">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-amber-400 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          <div className="bg-white/20 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-3">
            <Clock size={32} />
          </div>
          <h2 className="text-2xl font-black uppercase italic tracking-wider">Screen Timer</h2>
          <p className="text-amber-100 text-xs font-bold uppercase mt-1">Select playtime duration</p>
        </div>

        {/* Body */}
        <div className="p-8">
          <div className="grid grid-cols-2 gap-4">
            {timeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedTime(option.value)}
                className={`p-6 rounded-3xl border-4 transition-all flex flex-col items-center justify-center gap-2 ${
                  selectedTime === option.value 
                    ? `border-amber-500 ${option.color} text-white scale-95` 
                    : "border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200"
                }`}
              >
                <span className="text-xl font-black">{option.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-8">
            <button
              onClick={handleStartTimer}
              className="w-full bg-amber-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-[0_6px_0_0_#d97706] hover:shadow-[0_4px_0_0_#d97706] hover:translate-y-[2px] active:translate-y-[6px] active:shadow-none transition-all flex items-center justify-center gap-3"
            >
              <Play size={20} fill="currentColor" />
              Start Learning Session
            </button>
          </div>
          
          <p className="mt-4 text-center text-[10px] text-slate-400 font-bold uppercase">
            The app will lock automatically when the time is up.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SetTimerModal;