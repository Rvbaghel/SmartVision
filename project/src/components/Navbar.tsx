import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-primary text-white px-6 py-4 shadow-lg flex justify-between items-center">
      
      {/* Logo / Title */}
      <h1 className="text-2xl font-bold tracking-wide">
        🎈 Learn & Play
      </h1>

      {/* Navigation Links */}
      <div className="space-x-4">
        <Link
          to="/"
          className="bg-white text-primary px-4 py-2 rounded-xl font-semibold hover:scale-105 transition"
        >
          Home
        </Link>

        <Link
          to="/subjects"
          className="bg-secondary px-4 py-2 rounded-xl font-semibold hover:scale-105 transition"
        >
          Subjects
        </Link>

        <Link
          to="/game"
          className="bg-yellow text-black px-4 py-2 rounded-xl font-semibold hover:scale-105 transition"
        >
          Play 🎮
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;