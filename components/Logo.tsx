import React from 'react';

export const Logo: React.FC<{ className?: string, light?: boolean }> = ({ className = "", light = false }) => {
  return (
    <div className={`font-display font-bold tracking-tighter flex items-baseline select-none ${className} ${light ? 'text-white' : 'text-primary'}`}>
      <span>Ragegro</span>
      <div className="relative w-[1em] h-[0.8em] mx-[0.05em] self-baseline transform translate-y-[0.1em]">
        <svg 
            viewBox="0 0 46 36" 
            className="w-full h-full overflow-visible"
        >
            <defs>
                <linearGradient id={light ? "w-grad-light" : "w-grad-dark"} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="currentColor" />
                    <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
            </defs>
            <path 
                d="M 2 12 L 12 32 L 22 12 L 32 32 L 44 2" 
                fill="none" 
                stroke={`url(#${light ? "w-grad-light" : "w-grad-dark"})`}
                strokeWidth="5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="animate-draw-w"
                vectorEffect="non-scaling-stroke"
            />
            <circle cx="44" cy="2" r="3" fill="#10b981" className="animate-ping-dot" />
        </svg>
      </div>
      <span className="text-accent">.</span>
    </div>
  );
};
