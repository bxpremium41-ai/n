import React from 'react';
import { X, Check, AlertCircle } from 'lucide-react';

export const Comparison: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-primary">Don't waste money.</h2>
        <p className="text-secondary text-base md:text-xl max-w-xl mx-auto">
          Most agencies overcharge and underdeliver. We don't.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center relative">
        
        {/* VS Badge */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-16 h-16 bg-white border border-secondary/10 rounded-full shadow-xl font-display font-bold text-xl text-primary">
            VS
        </div>

        {/* The Old Way */}
        <div className="bg-white border border-secondary/10 rounded-3xl p-6 md:p-12 opacity-80 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-4 mb-6 md:mb-8">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-red-50 rounded-full flex items-center justify-center">
                    <AlertCircle className="text-red-500 w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-secondary">Traditional Agencies</h3>
            </div>
            
            <ul className="space-y-4 md:space-y-6">
                <li className="flex items-start gap-4 text-secondary text-sm md:text-base">
                    <X className="w-5 h-5 md:w-6 md:h-6 text-red-400 shrink-0" />
                    <span>Takes <strong>months</strong> to finish.</span>
                </li>
                <li className="flex items-start gap-4 text-secondary text-sm md:text-base">
                    <X className="w-5 h-5 md:w-6 md:h-6 text-red-400 shrink-0" />
                    <span>Expensive upfront fees.</span>
                </li>
                <li className="flex items-start gap-4 text-secondary text-sm md:text-base">
                    <X className="w-5 h-5 md:w-6 md:h-6 text-red-400 shrink-0" />
                    <span>Just a pretty picture. No strategy.</span>
                </li>
                <li className="flex items-start gap-4 text-secondary text-sm md:text-base">
                    <X className="w-5 h-5 md:w-6 md:h-6 text-red-400 shrink-0" />
                    <span><strong>No marketing.</strong> Good luck getting found.</span>
                </li>
            </ul>
        </div>

        {/* The New Way */}
        <div className="bg-primary text-white rounded-3xl p-6 md:p-12 shadow-2xl neon-shadow relative overflow-hidden transform md:scale-105">
            {/* Glossy Effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="flex items-center gap-4 mb-6 md:mb-8 relative z-10">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-accent rounded-full flex items-center justify-center">
                    <Check className="text-white w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold">Ragegrow</h3>
            </div>
            
            <ul className="space-y-4 md:space-y-6 relative z-10">
                <li className="flex items-start gap-4 text-sm md:text-lg">
                    <div className="bg-accent/20 p-1 rounded-full shrink-0"><Check className="w-3 h-3 md:w-4 md:h-4 text-accent-light" /></div>
                    <span>Ready in <strong>24 Hours</strong>.</span>
                </li>
                <li className="flex items-start gap-4 text-sm md:text-lg">
                    <div className="bg-accent/20 p-1 rounded-full shrink-0"><Check className="w-3 h-3 md:w-4 md:h-4 text-accent-light" /></div>
                    <span>Built for <strong>High ROI</strong>.</span>
                </li>
                <li className="flex items-start gap-4 text-sm md:text-lg">
                    <div className="bg-accent/20 p-1 rounded-full shrink-0"><Check className="w-3 h-3 md:w-4 md:h-4 text-accent-light" /></div>
                    <span>Designed to get you <strong>Clients</strong>.</span>
                </li>
                <li className="flex items-start gap-4 text-sm md:text-lg">
                    <div className="bg-accent/20 p-1 rounded-full shrink-0"><Check className="w-3 h-3 md:w-4 md:h-4 text-accent-light" /></div>
                    <span><strong>Ads/Organic Included.</strong> We find customers.</span>
                </li>
            </ul>
        </div>

      </div>
    </section>
  );
};