import React from 'react';
import { Store, UserX, TrendingUp, MousePointer2 } from 'lucide-react';

export const RealityCheck: React.FC = () => {
  return (
    <section id="reality" className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto bg-white rounded-3xl my-6 md:my-12 shadow-sm border border-secondary/5">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-primary">Why is it so quiet?</h2>
        <p className="text-secondary text-base md:text-xl max-w-xl mx-auto">
          It's not because you're bad at design. It's because you're invisible.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 md:gap-12">
        
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-red-50 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <Store className="w-8 h-8 md:w-10 md:h-10 text-red-400" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-2 text-primary">1. No Shop</h3>
            <p className="text-secondary text-sm md:text-base leading-relaxed">
                You don't have a real store on the internet. You're operating in secret.
            </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-yellow-50 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <UserX className="w-8 h-8 md:w-10 md:h-10 text-yellow-500" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-2 text-primary">2. Hard to Find</h3>
            <p className="text-secondary text-sm md:text-base leading-relaxed">
                When people search "Architects", they find the other guy. Not you.
            </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-green-50 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-green-500" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-2 text-primary">3. The Fix</h3>
            <p className="text-secondary text-sm md:text-base leading-relaxed">
                We put you right in front of them. It's that simple.
            </p>
        </div>

      </div>

      <div className="mt-12 md:mt-16 p-6 md:p-8 bg-surfaceAlt rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-secondary/10">
        <div className="flex items-center gap-4 text-center md:text-left">
            <div className="bg-primary text-white p-3 rounded-full hidden md:block">
                <MousePointer2 />
            </div>
            <div>
                <h4 className="font-bold text-lg text-primary">Stop losing money.</h4>
                <p className="text-secondary text-sm">Let's build you a money-making website.</p>
            </div>
        </div>
        <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
            className="w-full md:w-auto px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-black transition-colors"
        >
            Build My Website
        </button>
      </div>
    </section>
  );
};