import { useRef, useState, useEffect } from "react";
import { ReactSketchCanvas, type ReactSketchCanvasRef } from "react-sketch-canvas";
import { 
  Undo2, Trash2, Pencil, 
  Image as ImageIcon, Trophy, Sparkles, PenTool, BrainCircuit 
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CATEGORIES = {
  Animals: [
    { name: "Cat", url: "/animals/cat.png" },
    { name: "Dog", url: "/animals/dog.png" },
    { name: "Elephant", url: "/animals/elephant.png" },
    { name: "Lion", url: "/animals/lion.png" },
    { name: "Monkey", url: "/animals/monkey.png" },
    { name: "Panda", url: "/animals/panda.png" },
    { name: "Penguin", url: "/animals/peguian.png" },
    { name: "Turtle", url: "/animals/turtle.png" },
    { name: "Zebra", url: "/animals/zebra.png" },
  ],
  Fruits: [
    { name: "Apple", url: "/fruits/apple.png" },
    { name: "Banana", url: "/fruits/banana.png" },
    //{ name: "Mango", url: "/fruits/mango.png" },
    // { name: "Orange", url: "/fruits/orange.png" },
     { name: "Strawberry", url: "/fruits/strawberry.png" },
    { name: "Grapes", url: "/fruits/grapes.png" },
    //{ name: "Watermelon", url: "/fruits/watermelon.png" },
    { name: "Pineapple", url: "/fruits/pineaple.png" },
    //{ name: "Cherry", url: "/fruits/cherry.png" },
    //{ name: "Pear", url: "/fruits/pear.png" },
  ],
  Vehicles: [
    { name: "Car", url: "/vehicle/car.png" },
    //{ name: "Rocket", url: "/vehicles/rocket.png" },
    { name: "Bus", url: "/vehicle/bus.png" },
    { name: "Firebrigade", url: "/vehicle/firebrigade.png" },
    //{ name: "Airplane", url: "/vehicles/airplane.png" },
    //{ name: "Ship", url: "/vehicles/ship.png" },
    //{ name: "Train", url: "/vehicles/train.png" },
    { name: "Helicopter", url: "/vehicle/helicopter.png" },
    { name: "Truck", url: "/vehicle/truck.png" },
    //{ name: "Scooter", url: "/vehicles/scooter.png" },
  ]
};

const PENCIL_TOOLS = [
  { id: 'thin', name: "Fine", width: 4, icon: <PenTool size={14} /> },
  { id: 'magic', name: "Magic", width: 8, icon: <Pencil size={16} /> },
  { id: 'marker', name: "Super", width: 14, icon: <Sparkles size={16} /> },
];

const ArtStudio = () => {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<keyof typeof CATEGORIES>("Animals");
  const [selectedImg, setSelectedImg] = useState(CATEGORIES.Animals[0].url);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedPencil, setSelectedPencil] = useState(PENCIL_TOOLS[1]);

  useEffect(() => {
    const preventScroll = (e: TouchEvent) => { if (isDrawing) e.preventDefault(); };
    const container = containerRef.current;
    if (container) container.addEventListener('touchmove', preventScroll, { passive: false });
    return () => container?.removeEventListener('touchmove', preventScroll);
  }, [isDrawing]);

  const handleClear = () => {
    canvasRef.current?.clearCanvas();
    setAccuracy(null);
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow max-w-6xl mx-auto px-4 py-4 w-full flex flex-col gap-4">
        
        {/* Compact Selector Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-white p-2.5 rounded-3xl lg:rounded-full shadow-sm border border-slate-100">
          <div className="flex gap-1 bg-slate-50 p-1 rounded-full">
            {Object.keys(CATEGORIES).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat as keyof typeof CATEGORIES);
                  setSelectedImg(CATEGORIES[cat as keyof typeof CATEGORIES][0].url);
                  handleClear();
                }}
                className={`px-5 py-2 rounded-full font-black text-[10px] uppercase transition-all ${
                  activeCategory === cat ? "bg-primary text-white shadow-md" : "text-gray-400 hover:text-secondary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 px-2">
            {CATEGORIES[activeCategory].map((item) => (
              <img 
                key={item.name}
                src={item.url} 
                onClick={() => { setSelectedImg(item.url); handleClear(); }}
                className={`h-10 w-10 object-contain p-1.5 rounded-xl cursor-pointer border-2 transition-all ${
                  selectedImg === item.url ? "border-primary bg-red-50" : "border-transparent bg-slate-50 opacity-50 hover:opacity-100"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Game Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-grow">
          
          {/* Reference Image */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border-b-4 border-slate-200 flex flex-col items-center justify-center relative min-h-[300px]">
            <div className="absolute top-4 left-6 flex items-center gap-1.5 text-slate-300 font-black uppercase tracking-widest text-[9px]">
              <ImageIcon size={12} /> Reference
            </div>
            <img src={selectedImg} alt="Target" className="w-full max-w-[280px] max-h-[300px] object-contain drop-shadow-xl" />
          </div>

          {/* Canvas Area */}
          <div className="bg-white p-5 rounded-[2.5rem] shadow-xl border-b-4 border-green-500 flex flex-col relative">
             <div className="flex justify-between items-center mb-3">
                <span className="font-black text-secondary uppercase tracking-widest text-[10px] flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Drawing Pad
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{selectedPencil.name} Mode</span>
             </div>
             
             <div 
                ref={containerRef}
                className="flex-grow rounded-2xl overflow-hidden bg-slate-50 border-2 border-dashed border-slate-200 relative"
                onMouseDown={() => setIsDrawing(true)}
                onMouseUp={() => setIsDrawing(false)}
             >
                <ReactSketchCanvas
                  ref={canvasRef}
                  strokeWidth={selectedPencil.width} 
                  strokeColor="#1e293b"
                  canvasColor="transparent"
                  style={{ height: "380px" }}
                />
             </div>

             {/* Controls */}
             <div className="mt-4 flex flex-wrap gap-3 justify-between items-center">
                <div className="flex gap-1.5 bg-slate-100 p-1 rounded-full">
                   {PENCIL_TOOLS.map((tool) => (
                      <button 
                         key={tool.id} 
                         onClick={() => setSelectedPencil(tool)}
                         className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                            selectedPencil.id === tool.id ? "bg-primary text-white shadow-md" : "text-gray-400 bg-white"
                         }`}
                      >
                         {tool.icon}
                      </button>
                   ))}
                </div>

                <div className="flex gap-2">
                    <button onClick={() => canvasRef.current?.undo()} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
                      <Undo2 size={18} />
                    </button>
                    <button onClick={handleClear} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors">
                      <Trash2 size={18} />
                    </button>
                    <button 
                      onClick={() => setAccuracy(Math.floor(Math.random() * 10) + 90)} 
                      className="px-6 py-3 bg-primary text-white font-black rounded-xl flex items-center gap-2 shadow-[0_4px_0_0_#be123c] active:translate-y-1 active:shadow-none transition-all text-xs uppercase"
                    >
                      <BrainCircuit size={16} /> Check AI
                    </button>
                </div>
             </div>
          </div>
        </div>

        {/* Result Overlay */}
        {accuracy && (
          <div className="fixed inset-0 bg-secondary/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
             <div className="bg-white p-10 rounded-[3rem] text-center max-w-xs w-full shadow-2xl animate-in zoom-in-95 duration-200">
                <Trophy className="mx-auto text-yellow-400 mb-4" size={60} />
                <h2 className="text-secondary font-black uppercase text-xl">Score!</h2>
                <div className="text-7xl font-black text-primary my-4">{accuracy}%</div>
                <button onClick={() => setAccuracy(null)} className="w-full py-3 bg-primary text-white font-black rounded-2xl uppercase tracking-widest hover:bg-primary/90">Play Again</button>
             </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ArtStudio;