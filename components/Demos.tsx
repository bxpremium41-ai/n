import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const Demos: React.FC = () => {
  return (
    <section id="demos" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 text-primary">Success Stories</h2>
            <p className="text-secondary text-lg max-w-md">See what a high-converting website looks like.</p>
        </div>
        <button className="text-primary border-b-2 border-accent pb-1 hover:text-accent transition-colors font-bold">View all examples</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4 h-auto md:h-[800px]">
        {/* Large Item */}
        <div className="md:col-span-2 md:row-span-2 group relative rounded-3xl overflow-hidden border border-secondary/10 bg-white shadow-lg">
            <img src="https://picsum.photos/800/800?random=1" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" alt="Modernist" />
            <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <h3 className="text-3xl font-bold font-display text-white">The Modernist</h3>
                <p className="text-white/80 mb-4">Generated 40+ leads in month 1.</p>
                <span className="inline-flex items-center gap-2 text-accent font-bold">See Case Study <ArrowUpRight size={18} /></span>
            </div>
        </div>

        {/* Small Item 1 */}
        <div className="group relative rounded-3xl overflow-hidden border border-secondary/10 bg-white shadow-lg min-h-[300px]">
            <img src="https://picsum.photos/600/600?random=2" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" alt="Industrial" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                <h3 className="text-xl font-bold font-display text-white">Industrial Loft</h3>
            </div>
        </div>

        {/* Small Item 2 */}
        <div className="group relative rounded-3xl overflow-hidden border border-secondary/10 bg-white shadow-lg min-h-[300px]">
            <img src="https://picsum.photos/600/600?random=3" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" alt="Biophilic" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                <h3 className="text-xl font-bold font-display text-white">Biophilic Home</h3>
            </div>
        </div>
      </div>
    </section>
  );
};