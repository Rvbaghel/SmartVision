import { useState } from "react";
import { X, ShieldCheck, RefreshCw } from "lucide-react";
import { API_BASE_URL } from "../config/api";

const PinSettingsModal = ({ userEmail, isPinSet, onClose, onSuccess }: any) => {
  const [pin, setPin] = useState("");
  const [isResetMode, setIsResetMode] = useState(!isPinSet);
  const [loading, setLoading] = useState(false);

  const handleSavePin = async () => {
    if (pin.length !== 4) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/set-pin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_email: userEmail, pin: pin })
      });
      if (response.ok) {
        // Trigger PIN Download as a safety card
        const blob = new Blob([`Smart Vision Parental PIN: ${pin}\nUser: ${userEmail}`], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = "SmartVision_PIN_Card.txt";
        link.click();
        
        onSuccess();
      }
    } catch (err) {
      console.error("Error saving PIN:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
      <div className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden border-b-8 border-indigo-200 relative">
        
        <div className="bg-indigo-600 p-8 text-center text-white">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors">
            <X size={20}/>
          </button>
          <div className="bg-white/20 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-3">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-2xl font-black uppercase italic tracking-wider">
            {isPinSet ? "Security Settings" : "Set Master PIN"}
          </h2>
        </div>

        <div className="p-8 text-center">
          {isPinSet && !isResetMode ? (
            <div className="space-y-4">
              <div className="bg-emerald-50 text-emerald-700 p-4 rounded-2xl border border-emerald-100 font-bold text-sm">
                 PIN is already generated!
              </div>
              <p className="text-slate-500 text-xs font-bold leading-relaxed">
                If you have forgotten your PIN or want to change it, you can reset it below.
              </p>
              <button 
                onClick={() => setIsResetMode(true)}
                className="flex items-center justify-center gap-2 w-full text-indigo-600 font-black uppercase text-xs hover:bg-indigo-50 p-3 rounded-xl transition-all"
              >
                <RefreshCw size={14} /> Re-generate PIN
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <input 
                type="password"
                maxLength={4}
                value={pin}
                autoFocus
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                className="w-full text-center text-5xl font-black tracking-[1rem] border-4 border-slate-100 rounded-2xl p-4 focus:border-indigo-500 outline-none transition-all"
                placeholder="0000"
              />
              <button 
                onClick={handleSavePin}
                disabled={pin.length !== 4 || loading}
                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-[0_5px_0_0_#4338ca] active:shadow-none active:translate-y-1 transition-all disabled:opacity-50"
              >
                {loading ? "Securing..." : (isPinSet ? "Update & Download" : "Confirm & Save")}
              </button>
              {isPinSet && (
                <button onClick={() => setIsResetMode(false)} className="text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-slate-600 transition-colors">
                  Cancel
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PinSettingsModal;