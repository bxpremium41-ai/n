import React from 'react';
import { Palette, Code, Rocket } from 'lucide-react';

export const Process: React.FC = () => {
  const steps = [
    {
      icon: <Palette className="w-6 h-6 md:w-8 md:h-8" />,
      title: "1. It Looks Great",
      desc: "If your site looks cheap, clients think you're cheap. We make you look expensive."
    },
    {
      icon: <Code className="w-6 h-6 md:w-8 md:h-8" />,
      title: "2. It Loads Fast",
      desc: "People hate waiting. Our websites load instantly on phones."
    },
    {
      icon: <Rocket className="w-6 h-6 md:w-8 md:h-8" />,
      title: "3. It Gets Calls",
      desc: "Pretty isn't enough. We build the site to make people call you."
    }
  ];

  return (
    <section id="process" className="py-16 md:py-24 bg-surfaceAlt border-y border-secondary/10 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            <div className="md:w-1/3 sticky top-24">
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-primary">How we <br/><span className="text-accent">help you.</span></h2>
                <p className="text-secondary text-base md:text-lg">We don't just "design websites." We build 24/7 sales machines.</p>
            </div>
            
            <div className="md:w-2/3 grid gap-6 md:gap-8">
                {steps.map((step, idx) => (
                    <div key={idx} className="flex gap-4 md:gap-6 p-6 md:p-8 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all border border-secondary/5 group">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform flex-shrink-0">
                            {step.icon}
                        </div>
                        <div>
                            <h3 className="text-lg md:text-xl font-bold mb-2 text-primary">{step.title}</h3>
                            <p className="text-secondary text-sm md:text-base">{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};