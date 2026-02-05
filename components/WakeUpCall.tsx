import React from 'react';
import { AlertCircle } from 'lucide-react';

export const WakeUpCall: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-white relative border-b border-secondary/5 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-16">
            
            {/* Left: The Hard Truth */}
            <div className="md:w-1/2 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in">
                    <AlertCircle size={14} />
                    <span>The Reality</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-display font-bold text-primary leading-[1.1] mb-8">
                    Stop cold calling. <br/>
                    <span className="text-secondary/30">Start attracting.</span>
                </h2>
                <p className="text-lg md:text-xl text-secondary font-light leading-relaxed mb-8">
                    Reliance on word-of-mouth is slow. Cold outreach is exhausting. 
                    <br/><br/>
                    In the design world, <strong className="text-primary font-medium">credibility is currency</strong>. 
                    If you don't have a professional digital showroom, high-budget clients will simply scroll past you to someone who does.
                </p>
                <div className="p-8 bg-surfaceAlt border-l-4 border-primary italic text-secondary text-lg md:text-xl rounded-r-2xl">
                    "I didn't hire them because they didn't have a website. It felt too risky."
                    <br/>
                    <span className="text-xs font-bold uppercase not-italic text-secondary/60 mt-4 block tracking-widest">— The client you just lost.</span>
                </div>
            </div>

            {/* Right: The Opportunity */}
            <div className="md:w-1/2 flex flex-col justify-center h-full pt-8 md:pt-32 relative z-10">
                 <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6">Your website should be your best salesperson.</h3>
                 <p className="text-secondary text-lg mb-10 leading-relaxed">
                    You shouldn't have to beg for work. We build high-performance platforms that establish your authority instantly, so clients come to <span className="text-primary font-semibold border-b border-primary/20">you</span>.
                    Turn <span className="text-primary font-semibold border-b border-primary/20">casual browsers</span> into <span className="text-accent font-bold border-b border-accent/20">confident bookings</span> automatically.
                 </p>
                 
                 <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 rounded-3xl bg-surfaceAlt hover:bg-surfaceAlt/80 transition-colors">
                        <span className="block text-4xl font-display font-bold text-primary mb-2">24/7</span>
                        <span className="text-xs text-secondary uppercase tracking-wider font-bold">Availability</span>
                        <p className="text-xs text-secondary/60 mt-2">Sales while you sleep.</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-surfaceAlt hover:bg-surfaceAlt/80 transition-colors">
                        <span className="block text-4xl font-display font-bold text-accent mb-2">10x</span>
                        <span className="text-xs text-secondary uppercase tracking-wider font-bold">Credibility</span>
                        <p className="text-xs text-secondary/60 mt-2">Look like a pro.</p>
                    </div>
                 </div>
            </div>

        </div>
      </div>
    </section>
  );
};