import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { Heart, ChevronRight } from "lucide-react"; // Import Lucide icons

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8 px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-1">
          <div className="bg-white p-2 rounded-xl inline-block mb-4">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </div>
          <p className="text-gray-400 font-medium">
            Making learning an adventure for the next generation of geniuses.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-gray-400 font-medium">
            <li>
              <Link to="/" className="hover:text-primary transition flex items-center gap-2 group">
                <ChevronRight size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary transition flex items-center gap-2 group">
                <ChevronRight size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                About Us
              </Link>
            </li>
            <li>
              <Link to="/activity" className="hover:text-primary transition flex items-center gap-2 group">
                <ChevronRight size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                My Progress
              </Link>
            </li>
          </ul>
        </div>

        {/* Games */}
        <div>
          <h4 className="text-xl font-bold mb-6">Popular Games</h4>
          <ul className="space-y-4 text-gray-400 font-medium">
            <li>
              <Link to="/games/math-quiz" className="hover:text-primary transition flex items-center gap-2 group">
                <ChevronRight size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                Math Wizard
              </Link>
            </li>
            <li>
              <Link to="/games/image-recognition" className="hover:text-primary transition flex items-center gap-2 group">
                <ChevronRight size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                Image Hunter
              </Link>
            </li>
            <li>
              <Link to="/games/drawing-challenge" className="hover:text-primary transition flex items-center gap-2 group">
                <ChevronRight size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                Art Studio
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-xl font-bold mb-6">Parents</h4>
          <ul className="space-y-4 text-gray-400 font-medium">
            <li>
              <Link to="/privacy" className="hover:text-primary transition flex items-center gap-2 group">
                <ChevronRight size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-primary transition flex items-center gap-2 group">
                <ChevronRight size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                Terms of Use
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary transition flex items-center gap-2 group">
                <ChevronRight size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                Contact Support
              </Link>
            </li>
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-800 pt-8 text-center text-gray-500 font-medium">
        <p className="flex items-center justify-center gap-2">
          © 2026 Smart Vision | Built with 
          <Heart size={16} className="text-primary fill-primary" /> 
          for future stars
        </p>
      </div>
    </footer>
  );
};

export default Footer;