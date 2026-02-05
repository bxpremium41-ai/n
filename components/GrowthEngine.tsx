import React from 'react';
import { Monitor, Megaphone, ArrowDown, Plus, Equal, Users } from 'lucide-react';

interface GrowthEngineProps {
  onOpenModal?: () => void;
}

export const GrowthEngine: React.FC<GrowthEngineProps> = ({ onOpenModal }) => {
  const handleScroll = () => {
    document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <section className="py-16 md:py-24 bg-primary text-white relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      {/* Glows */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
            <span className="text-accent-light font-bold tracking-widest uppercase text-xs md:text-sm mb-4 block">The Simple Truth</span>
            <h2 className="text-3xl md:text-6xl font-display font-bold leading-tight">
                It's not magic. <br/>
                It's just <span className="text-accent-light">math.</span>
            </h2>
        </div>

        {/* The Equation Animation */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mb-16 md:mb-20">
            
            {/* Box 1: Website */}
            <div className="w-full md:w-auto flex-1 max-w-xs bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                    <Monitor className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">A Good Website</h3>
                <p className="text-secondary-light text-sm md:text-base">Your digital store.</p>
            </div>

            {/* Plus Sign */}
            <div className="text-white/30 animate-pulse">
                <Plus className="w-8 h-8 md:w-12 md:h-12" />
            </div>

            {/* Box 2: Ads */}
            <div className="w-full md:w-auto flex-1 max-w-xs bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
                 <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                    <Megaphone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">Ads/Organic</h3>
                <p className="text-secondary-light text-sm md:text-base">People searching for you.</p>
            </div>

            {/* Equals Sign */}
            <div className="text-white/30 animate-pulse">
                <Equal className="w-8 h-8 md:w-12 md:h-12" />
            </div>

            {/* Box 3: Result (Highlighted) */}
            <div className="w-full md:w-auto flex-1 max-w-xs bg-accent border-4 border-accent-light/30 rounded-3xl p-6 md:p-8 flex flex-col items-center text-center shadow-[0_0_50px_rgba(16,185,129,0.3)] transform scale-105">
                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">More Clients</h3>
                <p className="text-accent-light text-sm md:text-base font-bold">You get paid.</p>
            </div>

        </div>

        <div className="text-center">
            <p className="text-lg md:text-2xl text-secondary-light max-w-2xl mx-auto mb-10 leading-relaxed">
                Most people complicate it. We don't. <br/>
                We build the site. We turn on the ads. <strong className="text-white">Your phone rings.</strong>
            </p>
            
            <button 
                onClick={onOpenModal || handleScroll}
                className="group w-full md:w-auto px-8 py-4 md:px-12 md:py-6 bg-white text-primary font-bold rounded-full text-lg md:text-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center justify-center gap-3 mx-auto uppercase tracking-wider"
            >
                Start The Machine <ArrowDown className="group-hover:translate-y-1 transition-transform" />
            </button>
        </div>
      </div>
    </section>
  );
};