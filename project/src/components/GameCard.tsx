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

// const CATEGORIES = {
//   Animals: [
//     { name: "Cat", url: "/animals/cat.png" },
//     { name: "Dog", url: "/animals/dog.png" },
//     { name: "Elephant", url: "/animals/elephant.png" },
//     { name: "Lion", url: "/animals/lion.png" },
//     { name: "Monkey", url: "/animals/monkey.png" },
//     { name: "Panda", url: "/animals/panda.png" },
//     { name: "Penguin", url: "/animals/peguian.png" }, // Adjusted to match your filename 'peguian.png'
//     { name: "Turtle", url: "/animals/turtle.png" },
//     { name: "Zebra", url: "/animals/zebra.png" },
//   ],
//   Fruits: [
//     { name: "Apple", url: "/fruits/apple.png" },
//     { name: "Banana", url: "/fruits/banana.png" },
//     { name: "Mango", url: "/fruits/mango.png" },
//     { name: "Orange", url: "/fruits/orange.png" },
//     { name: "Strawberry", url: "/fruits/strawberry.png" },
//     { name: "Grapes", url: "/fruits/grapes.png" },
//     { name: "Watermelon", url: "/fruits/watermelon.png" },
//     { name: "Pineapple", url: "/fruits/pineapple.png" },
//     { name: "Cherry", url: "/fruits/cherry.png" },
//     { name: "Pear", url: "/fruits/pear.png" },
//   ],
//   Vehicles: [
//     { name: "Car", url: "/vehicles/car.png" },
//     { name: "Rocket", url: "/vehicles/rocket.png" },
//     { name: "Bus", url: "/vehicles/bus.png" },
//     { name: "Bicycle", url: "/vehicles/bicycle.png" },
//     { name: "Airplane", url: "/vehicles/airplane.png" },
//     { name: "Ship", url: "/vehicles/ship.png" },
//     { name: "Train", url: "/vehicles/train.png" },
//     { name: "Helicopter", url: "/vehicles/helicopter.png" },
//     { name: "Truck", url: "/vehicles/truck.png" },
//     { name: "Scooter", url: "/vehicles/scooter.png" },
//   ]
// };
