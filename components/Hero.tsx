import React, { useState, useEffect } from 'react';
import { ArrowRight, Star } from 'lucide-react';

interface HeroProps {
  scrollToDemos: () => void;
}

export const Hero: React.FC<HeroProps> = ({ scrollToDemos }) => {
  const [fontIndex, setFontIndex] = useState(0);

  const fonts = [
    "Inter, sans-serif",
    "Playfair Display, serif",
    "Courier New, monospace",
    "Georgia, serif",
    "Times New Roman, serif",
    "Verdana, sans-serif",
    "Arial, sans-serif",
    "Impact, sans-serif",
    "Trebuchet MS, sans-serif",
    "Arial Black, sans-serif",
    "Palatino, serif",
    "Garamond, serif",
    "Bookman, serif",
    "Avant Garde, sans-serif",
    "Comic Sans MS, cursive",
    "Brush Script MT, cursive",
    "Lucida Console, monospace",
    "Perpetua, serif",
    "Rockwell, serif",
    "Franklin Gothic Medium, sans-serif"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
        setFontIndex((prev) => (prev + 1) % fonts.length);
    }, 200); // Change every 200ms
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[85vh] flex flex-col items-center pt-28 pb-10 px-4 md:px-8 overflow-hidden">
      
      {/* Decorative Elements - Neon Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-light/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center z-10 mb-12">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-secondary/20 bg-white px-4 py-1.5 md:px-5 md:py-2 rounded-full mb-6 md:mb-8 shadow-sm animate-fade-in-up">
            <div className="flex -space-x-1">
                {[1,2,3,4,5].map(i => (
                    <Star key={i} size={12} className="fill-accent text-accent md:w-3.5 md:h-3.5" />
                ))}
            </div>
            <span className="text-xs md:text-sm font-semibold tracking-wide text-secondary">Trusted by 50+ Studios</span>
        </div>
        
        {/* Headline */}
        <h1 className="font-display font-bold text-4xl md:text-7xl lg:text-8xl leading-tight md:leading-[1] tracking-tight text-primary mb-6 md:mb-8 max-w-5xl">
          <span className="block text-lg md:text-3xl mb-3 md:mb-4 font-sans font-medium text-secondary tracking-normal">Hey Interior Designers & Architects.</span>
          Need more <span 
            className="text-accent underline decoration-accent-light decoration-4 underline-offset-4 decoration-wavy"
            style={{ fontFamily: fonts[fontIndex] }}
          >
            clients?
          </span>
        </h1>
        
        {/* Description - Friend to Friend */}
        <p className="text-base md:text-2xl text-secondary max-w-2xl leading-relaxed font-light mb-8 md:mb-10">
          You're great at design. But nobody knows you exist. <br className="hidden md:block"/>
          We build you a website that actually gets people to call you.
        </p>
        
        {/* CTAs - "Screaming Conversion" */}
        <div className="flex flex-col sm:flex-row gap-4 items-center w-full justify-center">
          <button 
            onClick={scrollToDemos}
            className="group w-full sm:w-auto inline-flex justify-center items-center gap-3 bg-accent text-white px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-lg md:text-xl hover:bg-emerald-500 hover:scale-105 shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300 uppercase tracking-wide"
          >
            <span>Get Clients Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

      {/* Hero Image Wrapper */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 perspective-1000 mt-8">
          
          {/* Geometrical Architectural Lines Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] -z-10 pointer-events-none">
             <svg className="w-full h-full opacity-40 text-secondary" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
                 {/* Grid Pattern */}
                 <defs>
                    <pattern id="smallGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    </pattern>
                 </defs>
                 
                 {/* Abstract Shapes */}
                 <rect x="0" y="0" width="100%" height="100%" fill="url(#smallGrid)" opacity="0.2" />
                 
                 {/* Diagonal Construction Lines */}
                 <line x1="0" y1="300" x2="400" y2="0" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
                 <line x1="200" y1="300" x2="400" y2="100" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
                 
                 {/* Circle accents */}
                 <circle cx="200" cy="150" r="130" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" opacity="0.4" />
                 <circle cx="200" cy="150" r="160" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />

                 {/* Plus marks */}
                 <path d="M 50 50 L 70 50 M 60 40 L 60 60" stroke="currentColor" strokeWidth="2" className="text-accent" />
                 <path d="M 350 250 L 370 250 M 360 240 L 360 260" stroke="currentColor" strokeWidth="2" className="text-accent" />
             </svg>
          </div>

          {/* The Image - Clean floating style */}
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-[1.01] group bg-transparent">
             <img 
                 src="https://lh3.googleusercontent.com/d/1QlSZqLyCR9dDNpIcp-lbdxbxtQLqTRMp" 
                 onError={(e) => {
                     // Fallback if Google Drive link is private/broken
                     e.currentTarget.src = "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop";
                     e.currentTarget.alt = "Modern Interior Design";
                 }}
                 alt="Ragegrow Dashboard Preview" 
                 className="w-full h-auto object-cover rounded-[2rem] shadow-lg"
             />
             {/* Border Ring */}
             <div className="absolute inset-0 rounded-[2rem] border border-secondary/10 pointer-events-none"></div>
          </div>
      </div>

    </section>
  );
};