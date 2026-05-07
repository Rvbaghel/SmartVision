import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Volume2, Sparkles, Cloud } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import Navbar from "../Components/Navbar";

// More fun themes for kids
const countingThemes = [
{ icon: "🍎", name: "Apples" },
{ icon: "🚗", name: "Cars" },
{ icon: "🦋", name: "Butterflies" },
{ icon: "⭐", name: "Stars" },
{ icon: "🍦", name: "Ice Creams" },
{ icon: "🐶", name: "Dogs" },
{ icon: "⚽", name: "Balls" },
{ icon: "🍭", name: "Candies" },
{ icon: "🐸", name: "Frogs" },
{ icon: "🎈", name: "Balloons" }
];

const NumberCountingLearn = () => {
const navigate = useNavigate();
const [selectedNum, setSelectedNum] = useState<number | null>(null);
const [currentTheme, setCurrentTheme] = useState(countingThemes[0]);
const [isAutoPlaying, setIsAutoPlaying] = useState(false);

const numbers = Array.from({ length: 20 }, (_, i) => i + 1);

const handleNumberSelect = (num: number) => {
setSelectedNum(num);

const randomTheme =
  countingThemes[Math.floor(Math.random() * countingThemes.length)];
setCurrentTheme(randomTheme);

window.speechSynthesis.cancel();

const intro = new SpeechSynthesisUtterance(
  `Let's count ${num} ${randomTheme.name}!`
);
window.speechSynthesis.speak(intro);

};

// ✅ AUTO PLAY FUNCTION
const startAutoPlay = async () => {
if (isAutoPlaying) return;

   
setIsAutoPlaying(true);

for (let num = 1; num <= 20; num++) {
  setSelectedNum(num);

  const randomTheme =
    countingThemes[Math.floor(Math.random() * countingThemes.length)];
  setCurrentTheme(randomTheme);

  window.speechSynthesis.cancel();

  const voice = new SpeechSynthesisUtterance(`${num}`);
  window.speechSynthesis.speak(voice);

  await new Promise((res) => setTimeout(res, 1800));
}

setIsAutoPlaying(false);
   

};

// ✅ STOP FUNCTION
const stopAutoPlay = () => {
setIsAutoPlaying(false);
window.speechSynthesis.cancel();
};

return ( <div className="min-h-screen bg-sky-50 font-sans pb-20 overflow-x-hidden"> <Navbar />

   
  <div className="pt-28 px-6 max-w-5xl mx-auto">
    {/* Top */}
    <div className="flex justify-between items-center mb-8">
      <button
        onClick={() => navigate("/games/numbercounting/info")}
        className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl shadow-lg hover:bg-blue-50 transition-all text-blue-600 font-black border-b-4 border-blue-200"
      >
        <ArrowLeft size={24} /> BACK
      </button>

      <div className="hidden md:flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full border border-sky-200 text-sky-600 font-bold">
        <Cloud size={20} />
        Counting Garden
      </div>
    </div>

    {/* ✅ AUTO PLAY BUTTONS */}
    <div className="flex justify-center gap-4 mb-6">
      <button
        onClick={startAutoPlay}
        disabled={isAutoPlaying}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg active:scale-95 disabled:opacity-50"
      >
        {isAutoPlaying ? "Playing..." : "Auto Play"}
      </button>

      <button
        onClick={stopAutoPlay}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg active:scale-95"
      >
        Stop
      </button>
    </div>

    {/* Main Stage */}
    <div className="relative h-[400px] w-full bg-white rounded-[4rem] shadow-2xl border-b-[12px] border-blue-100 flex items-center justify-center mb-12 overflow-hidden">
      <AnimatePresence mode="wait">
        {selectedNum ? (
          <motion.div
            key={selectedNum}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center w-full h-full p-6"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-7xl md:text-8xl font-black text-blue-600 mb-4"
            >
              {selectedNum}
            </motion.span>

            <div
              className={`grid gap-3 w-full justify-center
              ${
                selectedNum <= 5
                  ? "grid-cols-2"
                  : selectedNum <= 10
                  ? "grid-cols-4"
                  : "grid-cols-5"
              }`}
            >
              {Array.from({ length: selectedNum }).map((_, i) => {
                const iconSize =
                  selectedNum > 15
                    ? "text-3xl"
                    : selectedNum > 10
                    ? "text-4xl"
                    : selectedNum > 5
                    ? "text-5xl"
                    : "text-7xl";

                return (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ delay: i * 0.1 }}
                    className={`${iconSize} flex justify-center`}
                  >
                    {currentTheme.icon}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center text-blue-300">
            <Sparkles size={64} className="animate-pulse mb-4" />
            <p className="text-xl font-bold">
              Tap a number to start counting
            </p>
          </div>
        )}
      </AnimatePresence>
    </div>

    {/* Number Buttons */}
    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-4">
      {numbers.map((num) => (
        <motion.button
          key={num}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleNumberSelect(num)}
          className={`h-16 w-16 md:h-20 md:w-20 rounded-full flex items-center justify-center text-2xl font-black shadow-xl border-b-4
          ${
            selectedNum === num
              ? "bg-blue-600 text-white border-blue-800 scale-110"
              : "bg-white text-blue-500 border-gray-200 hover:bg-blue-50"
          }`}
        >
          {num}
        </motion.button>
      ))}
    </div>

    {/* Footer */}
    <div className="mt-12 flex justify-center">
      <div className="bg-amber-100 px-6 py-3 rounded-2xl flex items-center gap-3">
        <Volume2 size={20} />
        <p className="font-bold text-amber-800">
          Count along with the voice
        </p>
      </div>
    </div>
  </div>
</div>
   

);
};

export default NumberCountingLearn;
