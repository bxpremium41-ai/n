import React from 'react';
import { Clock, CalendarCheck, Zap } from 'lucide-react';

export const QuickDelivery: React.FC = () => {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="bg-primary rounded-[2.5rem] p-8 md:p-16 text-white overflow-hidden relative shadow-2xl neon-shadow ring-1 ring-white/10">
        
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent-light/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="relative z-10 text-center mb-12 md:mb-16">
           <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-white/10 animate-fade-in">
              <Zap className="w-3 h-3 md:w-4 md:h-4 text-accent-light" />
              <span className="text-accent-light font-bold text-xs md:text-sm tracking-wide uppercase">Fast Track</span>
           </div>
           
           <h2 className="text-3xl md:text-6xl font-display font-bold mb-4 md:mb-6 leading-tight">
             Get your new site <br/>
             <span className="text-accent-light">tomorrow.</span>
           </h2>
           
           <p className="text-secondary-light text-base md:text-xl max-w-xl mx-auto font-light leading-relaxed">
             Stop waiting months. We build it in 24 hours. Seriously.
           </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 relative z-10">
           {/* Step 1 */}
           <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-3xl hover:bg-white/10 transition-colors group flex flex-col items-center text-center md:items-start md:text-left">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-accent text-primary rounded-2xl flex items-center justify-center mb-4 md:mb-6 font-display font-bold text-2xl md:text-3xl shadow-lg group-hover:scale-110 transition-transform">1</div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">We Talk</h3>
              <p className="text-secondary-light text-sm md:text-lg">
                We hop on a 15-min call to see what you need.
              </p>
           </div>

           {/* Step 2 */}
           <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-3xl hover:bg-white/10 transition-colors group flex flex-col items-center text-center md:items-start md:text-left">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white text-primary rounded-2xl flex items-center justify-center mb-4 md:mb-6 font-display font-bold text-2xl md:text-3xl shadow-lg group-hover:scale-110 transition-transform">2</div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">We Build</h3>
              <p className="text-secondary-light text-sm md:text-lg">
                We build your site and write the text for you.
              </p>
           </div>

           {/* Step 3 */}
           <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-3xl hover:bg-white/10 transition-colors group flex flex-col items-center text-center md:items-start md:text-left">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-accent-light text-primary rounded-2xl flex items-center justify-center mb-4 md:mb-6 font-display font-bold text-2xl md:text-3xl shadow-lg group-hover:scale-110 transition-transform">3</div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">We Launch</h3>
              <p className="text-secondary-light text-sm md:text-lg">
                We go live the next day. You start getting calls.
              </p>
           </div>
        </div>

        <div className="mt-12 md:mt-16 text-center">
           <button 
             onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
             className="group w-full md:w-auto px-10 py-5 bg-accent text-primary font-bold rounded-full text-xl hover:bg-white hover:scale-105 transition-all shadow-[0_0_40px_rgba(16,185,129,0.4)] flex items-center justify-center gap-3 mx-auto uppercase tracking-wide"
           >
             <CalendarCheck className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
             Get My Website
           </button>
           <div className="mt-6 flex items-center justify-center gap-2 text-secondary-light text-xs md:text-sm">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span>Only 3 spots left this week.</span>
           </div>
        </div>

      </div>
    </section>
  );
};