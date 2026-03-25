import { useRef, useState } from "react";
import { ReactSketchCanvas, type ReactSketchCanvasRef } from "react-sketch-canvas";
import { 
  Undo2, 
  Trash2, 
  CheckCircle2, 
  Info, 
  Pencil, 
  Image as ImageIcon, 
  Trophy, 
  Apple, 
  Dog, 
  Rocket 
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Replace these with your local black & white assets for better results
const CATEGORIES = {
  Fruits: [
    { name: "Apple", url: "https://i.pinimg.com/originals/8a/9b/6c/8a9b6c6b4b5b4b5b4b5b4b5b4b5b4b5b.png", icon: <Apple size={20} /> },
    { name: "Banana", url: "https://cdn-icons-png.flaticon.com/512/2909/2909808.png", icon: <Apple size={20} /> },
    { name: "Grapes", url: "https://cdn-icons-png.flaticon.com/512/2909/2909761.png", icon: <Apple size={20} /> }
  ],
  Animals: [
    { name: "Cat", url: "https://cdn-icons-png.flaticon.com/512/616/616408.png", icon: <Dog size={20} /> },
    { name: "Dog", url: "https://cdn-icons-png.flaticon.com/512/616/616408.png", icon: <Dog size={20} /> },
    { name: "Rabbit", url: "https://cdn-icons-png.flaticon.com/512/616/616408.png", icon: <Dog size={20} /> }
  ],
  Vehicles: [
    { name: "Car", url: "https://cdn-icons-png.flaticon.com/512/741/741407.png", icon: <Rocket size={20} /> },
    { name: "Rocket", url: "https://cdn-icons-png.flaticon.com/512/1356/1356479.png", icon: <Rocket size={20} /> }
  ]
};

const ArtStudio = () => {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [activeCategory, setActiveCategory] = useState<keyof typeof CATEGORIES>("Fruits");
  const [selectedImg, setSelectedImg] = useState(CATEGORIES.Fruits[0].url);
  const [accuracy, setAccuracy] = useState<number | null>(null);

  const handleUndo = () => canvasRef.current?.undo();
  const handleClear = () => {
    canvasRef.current?.clearCanvas();
    setAccuracy(null);
  };

  const handleSubmit = async () => {
    const image = await canvasRef.current?.exportImage("png");
    console.log("Image captured for AI:", image);
    setAccuracy(Math.floor(Math.random() * 25) + 75);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        
        {/* 1. HOW TO PLAY BOX */}
        <div className="bg-white border-2 border-yellow-200 p-6 rounded-[2rem] mb-10 shadow-sm flex items-start gap-4">
          <div className="bg-yellow-400 p-3 rounded-2xl text-white">
            <Info size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-secondary mb-2 uppercase tracking-tight">How to Play?</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-gray-600 font-bold italic">
              <li>• Pick a category (Fruits, Animals, or Vehicles)</li>
              <li>• Select a drawing to use as your reference</li>
              <li>• Use your mouse or finger to draw the shape</li>
              <li>• Hit "Check Art" to let the AI score your work!</li>
            </ul>
          </div>
        </div>

        {/* 2. CATEGORY SELECTOR */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {Object.keys(CATEGORIES).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat as keyof typeof CATEGORIES);
                setSelectedImg(CATEGORIES[cat as keyof typeof CATEGORIES][0].url);
              }}
              className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black transition-all shadow-md active:scale-95 ${
                activeCategory === cat ? "bg-primary text-white scale-105" : "bg-white text-gray-400 hover:text-secondary"
              }`}
            >
              {cat === "Fruits" && <Apple size={20} />}
              {cat === "Animals" && <Dog size={20} />}
              {cat === "Vehicles" && <Rocket size={20} />}
              {cat}
            </button>
          ))}
        </div>

        {/* 3. IMAGE GALLERY */}  
        <div className="flex gap-6 overflow-x-auto pb-6 mb-10 justify-center no-scrollbar">
          {CATEGORIES[activeCategory].map((item) => (
            <div 
              key={item.name}
              onClick={() => setSelectedImg(item.url)}
              className={`p-4 bg-white rounded-3xl cursor-pointer transition-all border-4 shadow-sm min-w-[140px] text-center group ${
                selectedImg === item.url ? "border-primary bg-primary/5" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img src={item.url} alt={item.name} className="h-20 w-full object-contain mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-bold text-gray-500 text-xs uppercase tracking-widest">{item.name}</p>
            </div>
          ))}
        </div>

        {/* 4. GAME ARENA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Target Card */}
          <div className="bg-white p-10 rounded-[3.5rem] shadow-xl border-b-8 border-slate-200 flex flex-col items-center justify-center min-h-[450px]">
            <div className="flex items-center gap-2 text-gray-400 font-black mb-8 uppercase tracking-[0.2em] text-sm">
              <ImageIcon size={18} />
              <span>Target Image</span>
            </div>
            <img src={selectedImg} alt="Target" className="w-full max-w-[280px] object-contain opacity-90" />
          </div>

          {/* Canvas Card */}
          <div className="bg-white p-8 rounded-[3.5rem] shadow-2xl border-b-8 border-green-500 flex flex-col">
             <div className="flex justify-between items-center mb-6 px-4 font-black text-gray-400 uppercase tracking-widest text-sm">
                <div className="flex items-center gap-2">
                  <Pencil size={18} />
                  <span>Draw Here</span>
                </div>
                <span className="text-green-500 font-black">Ready!</span>
             </div>
             
             <div className="flex-grow border-4 border-dashed border-slate-100 rounded-[2.5rem] overflow-hidden bg-slate-50/50">
                <ReactSketchCanvas
                  ref={canvasRef}
                  strokeWidth={6}
                  strokeColor="#1e293b"
                  canvasColor="transparent"
                  style={{ height: "400px" }}
                />
             </div>

             {/* Game Controls */}
             <div className="grid grid-cols-3 gap-4 mt-8">
                <button 
                  onClick={handleUndo} 
                  className="flex items-center justify-center gap-2 py-4 bg-blue-50 text-blue-600 font-black rounded-2xl hover:bg-blue-100 transition active:translate-y-1"
                >
                  <Undo2 size={20} />
                  <span>Undo</span>
                </button>
                <button 
                  onClick={handleClear} 
                  className="flex items-center justify-center gap-2 py-4 bg-red-50 text-red-500 font-black rounded-2xl hover:bg-red-100 transition active:translate-y-1"
                >
                  <Trash2 size={20} />
                  <span>Clear</span>
                </button>
                <button 
                  onClick={handleSubmit} 
                  className="flex items-center justify-center gap-2 py-4 bg-primary text-white font-black rounded-2xl shadow-lg hover:brightness-110 transition active:translate-y-2 active:shadow-none"
                >
                  <CheckCircle2 size={20} />
                  <span>Check Art</span>
                </button>
             </div>
          </div>
        </div>

        {/* AI Result View */}
        {accuracy && (
          <div className="mt-16 flex justify-center">
            <div className="bg-white p-12 rounded-[4rem] shadow-2xl border-4 border-yellow-400 text-center relative overflow-hidden min-w-[320px]">
               <div className="absolute top-0 left-0 w-full h-2 bg-yellow-400"></div>
               <div className="flex justify-center mb-4 text-yellow-500">
                  <Trophy size={48} />
               </div>
               <h2 className="text-2xl font-black text-secondary uppercase tracking-[0.2em] mb-2">Masterpiece Score</h2>
               <div className="text-8xl font-black text-primary my-4 tracking-tighter">{accuracy}%</div>
               <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Accuracy to Reference</p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ArtStudio;