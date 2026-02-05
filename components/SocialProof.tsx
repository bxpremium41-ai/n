import React from 'react';

export const SocialProof: React.FC = () => {
  const companies = [
    "ARCH DAILY", "DEZEEN", "DWELL", "ARCHITECTURAL DIGEST", "CONTEMPORIST"
  ];

  return (
    <section className="py-12 border-b border-secondary/5 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <span className="text-xs font-bold tracking-widest uppercase text-secondary/60 whitespace-nowrap">As seen in</span>
        <div className="flex flex-wrap justify-center md:justify-end gap-8 md:gap-16 w-full opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {companies.map((company, i) => (
                <h3 key={i} className="text-lg md:text-xl font-display font-bold text-secondary hover:text-primary transition-colors cursor-default">
                    {company}
                </h3>
            ))}
        </div>
      </div>
    </section>
  );
};