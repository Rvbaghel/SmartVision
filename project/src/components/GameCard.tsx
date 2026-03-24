import { Link } from "react-router-dom";
import { Play } from "lucide-react"; 
import type { ReactNode } from "react"; // Added 'type' here

interface GameCardProps {
  title: string;
  description: string;
  icon: ReactNode; 
  color: string; 
  path: string;
}
// ... rest of the code

const GameCard = ({ title, description, icon, color, path }: GameCardProps) => {
  return (
    <div className={`group relative bg-white rounded-3xl p-8 shadow-xl border-b-8 ${color} transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl flex flex-col h-full`}>
      
      {/* Icon Wrapper */}
      <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
        {icon}
      </div>

      <h3 className="text-2xl font-black mb-3 text-gray-800 tracking-tight">
        {title}
      </h3>

      <p className="text-gray-600 mb-8 font-medium leading-relaxed flex-grow">
        {description}
      </p>

      {/* Play Button */}
      <Link
        to={path}
        className="inline-flex items-center justify-center gap-2 w-full py-4 bg-primary text-white text-lg font-bold rounded-2xl shadow-lg hover:brightness-110 active:scale-95 transition-all"
      >
        Let's Play! <Play size={20} fill="currentColor" />
      </Link>
    </div>
  );
};

export default GameCard;