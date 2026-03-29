import React from "react";
import { Bot, ShieldCheck, Palette, Sparkles } from "lucide-react";

const Features = () => {
  const featureList = [
    {
      title: "AI Powered",
      description: "Our smart robot helps you learn at your own speed with cool vision technology!",
      icon: <Bot size={48} className="text-blue-500" />,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      title: "100% Safe",
      description: "A secure playground made just for you to explore and grow every day.",
      icon: <ShieldCheck size={48} className="text-yellow-500" />,
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    },
    {
      title: "Fun Themes",
      description: "Bright colors, cute animals, and 3D worlds that make learning feel like a party!",
      icon: <Palette size={48} className="text-green-500" />,
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    }
  ];

  return (
    <section className="px-10 py-24 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-slate-800 mb-4 flex items-center justify-center gap-3">
            Why Kids Love Smart Vision! <Sparkles className="text-yellow-400" />
          </h2>
          <p className="text-xl text-gray-500 font-bold uppercase tracking-widest">Everything you need to grow smarter</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featureList.map((feature, index) => (
            <div 
              key={index} 
              className={`${feature.bgColor} p-10 rounded-[3rem] text-center border-b-[10px] ${feature.borderColor} transition-transform hover:-translate-y-2 duration-300`}
            >
              <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-4 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-gray-600 font-bold leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;