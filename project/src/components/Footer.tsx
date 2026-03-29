import logo from "../assets/logo1.png";
import { Link } from "react-router-dom";
import { Heart, ChevronRight, Star} from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-100 pt-20 pb-10 px-10 rounded-t-[4rem] mt-20 border-t-8 border-white">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Column */}
        <div className="flex flex-col gap-6">
          <div className="bg-white p-4 rounded-3xl shadow-sm inline-block w-fit">
            <img src={logo} alt="Logo" className="h-12 w-auto" />
          </div>

          <p className="text-slate-500 font-bold text-lg leading-relaxed">
            Making learning an adventure for the next generation of geniuses! 
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">

            {/* Instagram */}
            <div className="p-3 bg-white rounded-2xl shadow-sm text-pink-500 hover:scale-110 transition-transform cursor-pointer">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} />
              </a>
            </div>

            {/* YouTube */}
            <div className="p-3 bg-white rounded-2xl shadow-sm text-red-600 hover:scale-110 transition-transform cursor-pointer">
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <FaYoutube size={24} />
              </a>
            </div>

          </div>
        </div>

        {/* Quick Links Group */}
        {[
          {
            title: "Explore",
            links: [
              { name: "Home", to: "/" },
              { name: "About Us", to: "/about" },
              { name: "My Progress", to: "/activity" },
            ],
          },
          {
            title: "Games",
            links: [
              { name: "Art Studio", to: "/games/drawing-challenge" },
              { name: "Shape Hunter", to: "/game/shapes/info" },
              { name: "Sign Master", to: "/game/road-signs/info" },
            ],
          },
          {
            title: "Parents",
            links: [
              { name: "Privacy Policy", to: "/privacy" },
              { name: "Terms of Use", to: "/terms" },
              { name: "Contact Support", to: "/contact" },
            ],
          },
        ].map((section, idx) => (
          <div
            key={idx}
            className="bg-white/50 p-8 rounded-[2.5rem] border-b-4 border-slate-200"
          >
            <h4 className="text-xl font-black text-slate-800 mb-6 uppercase tracking-widest">
              {section.title}
            </h4>

            <ul className="space-y-4">
              {section.links.map((link, lIdx) => (
                <li key={lIdx}>
                  <Link
                    to={link.to}
                    className="text-slate-500 hover:text-primary font-bold flex items-center gap-2 group transition-all"
                  >
                    <ChevronRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="border-t-2 border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <p className="text-slate-400 font-bold flex items-center gap-2">
          © 2026 Smart Vision | Built with
          <Heart
            size={20}
            className="text-primary fill-primary animate-pulse"
          />
          for kids
        </p>

        <div className="flex items-center gap-2 text-yellow-500 font-black">
          <Star fill="currentColor" size={20} />
          <span>RATED #1 BY PARENTS</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;