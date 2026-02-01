import React, { useState, useEffect } from 'react';
import { COURSES } from '../constants';
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { Course } from '../types';

interface StackedCarouselProps {
    onCourseClick: (course: Course) => void;
}

export const StackedCarousel: React.FC<StackedCarouselProps> = ({ onCourseClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBuzzing, setIsBuzzing] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Total cycle time: 3500ms
    const interval = setInterval(() => {
      // Start buzzing 500ms before switch
      setIsBuzzing(true);
      
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % COURSES.length);
        setIsBuzzing(false);
      }, 500);
      
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleError = (id: string) => {
    setFailedImages(prev => ({ ...prev, [id]: true }));
  };

  const fallbackImage = "https://images.unsplash.com/photo-1518005052304-a37d996b0756?q=80&w=600&auto=format&fit=crop";

  return (
    <div className="w-full bg-white text-gray-900 pt-12 pb-24 md:py-24 overflow-hidden relative">
        <style>{`
          @keyframes buzz-mobile {
            0% { transform: translateX(-50%) rotate(0deg); }
            25% { transform: translateX(calc(-50% - 2px)) rotate(-1deg); }
            50% { transform: translateX(calc(-50% + 2px)) rotate(1deg); }
            75% { transform: translateX(calc(-50% - 1px)) rotate(0deg); }
            100% { transform: translateX(-50%) rotate(0deg); }
          }
          @keyframes buzz-desktop {
            0% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(-2px, 1px) rotate(-1deg); }
            50% { transform: translate(2px, -1px) rotate(1deg); }
            75% { transform: translate(-1px, 2px) rotate(0deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
          }
          .animate-buzz-mobile {
            animation: buzz-mobile 0.4s ease-in-out infinite;
          }
           .animate-buzz-desktop {
            animation: buzz-desktop 0.4s ease-in-out infinite;
          }
        `}</style>

        {/* Background Accents - Light Mode */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-20%] w-[70%] h-[60%] bg-brand-primary/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-20%] w-[60%] h-[60%] bg-blue-100 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-0 lg:gap-16 relative z-10">
            
            {/* Text Info - Top on Mobile */}
            <div className="flex-1 w-full lg:max-w-xl flex flex-col items-center lg:items-start text-center lg:text-left order-1 mb-8 lg:mb-0">
                {/* Header Badge */}
                <div className="flex items-center gap-2 mb-6 text-brand-primary font-bold uppercase tracking-widest text-[10px] md:text-xs bg-red-50 px-4 py-1.5 rounded-full border border-red-100">
                     <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></span>
                     In Demand Now
                </div>
                
                {/* Text Carousel Container */}
                <div className="h-[250px] sm:h-[220px] md:h-64 relative w-full mb-2">
                     {COURSES.map((course, idx) => {
                         const isActive = idx === activeIndex;
                         return (
                         <div 
                            key={course.id} 
                            className={`absolute top-0 left-0 w-full flex flex-col items-center lg:items-start transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                                isActive 
                                ? 'opacity-100 translate-y-0 blur-0 z-10' 
                                : 'opacity-0 translate-y-8 blur-sm pointer-events-none z-0'
                            }`}
                         >
                            <div className="text-gray-300 font-mono text-xs md:text-sm mb-2 font-bold tracking-wider">
                                0{idx + 1} <span className="text-gray-200">/</span> {COURSES.length}
                            </div>
                            
                            <h2 className="text-3xl md:text-6xl font-display font-bold leading-[0.95] mb-4 text-gray-900 tracking-tight">
                                {course.title}
                            </h2>
                            
                            <p className="text-gray-500 text-sm md:text-lg leading-relaxed max-w-md mb-6 mx-auto lg:mx-0 font-medium">
                                {course.description}
                            </p>

                            {/* "What We Provide" section */}
                            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                               <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold text-gray-600 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full">
                                  <CheckCircle2 size={12} className="text-brand-primary"/> Certificate
                               </div>
                               <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold text-gray-600 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full">
                                  <CheckCircle2 size={12} className="text-brand-primary"/> Source Files
                               </div>
                               <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold text-gray-600 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full">
                                  <CheckCircle2 size={12} className="text-brand-primary"/> Mentor Support
                               </div>
                            </div>
                         </div>
                     )})}
                </div>
                
                {/* Progress Indicators */}
                <div className="flex gap-1.5 mt-4 lg:mt-8">
                    {COURSES.map((_, idx) => (
                        <div 
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={`h-1 cursor-pointer transition-all duration-500 rounded-full ${
                                idx === activeIndex ? 'w-8 md:w-12 bg-brand-primary shadow-glow' : 'w-2 bg-gray-200 hover:bg-gray-300'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Card Stack - Bottom on Mobile */}
            {/* Added explicit height to container to ensure space is reserved */}
            <div className="w-full lg:flex-1 h-[420px] sm:h-[480px] md:h-[500px] relative order-2 perspective-1000">
                 {COURSES.map((course, idx) => {
                     // Calculate offset relative to active index
                     let offset = (idx - activeIndex + COURSES.length) % COURSES.length;
                     
                     // Optimization: Only render adjacent cards
                     if (offset > 2 && offset < COURSES.length - 1) return null;

                     let style = '';
                     let buzzClass = '';

                     // Base card styling
                     const baseClasses = "absolute rounded-3xl overflow-hidden bg-white shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] cursor-pointer group border border-gray-100 pointer-events-auto origin-bottom";
                     
                     // Dimensions: 1:1 Square Ratio
                     // Increased widths slightly to make them feel substantial as squares
                     const sizeClasses = "w-[260px] h-[260px] xs:w-[280px] xs:h-[280px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px]";

                     // Position logic: Center on mobile using left-1/2 & translate, use flex/absolute right on desktop
                     const mobilePos = "left-1/2 -translate-x-1/2 top-0";
                     const desktopPos = "md:left-auto md:right-0 md:translate-x-0 md:top-8";

                     if (offset === 0) {
                         // Active
                         // Use positive stacking (downwards) instead of negative (upwards) to avoid top cropping
                         style = `z-30 opacity-100 scale-100 ${mobilePos} ${desktopPos} rotate-0 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] ring-4 ring-white/50`;
                         if (isBuzzing) buzzClass = 'animate-buzz-mobile md:animate-buzz-desktop';
                     } else if (offset === 1) {
                         // Next
                         style = `z-20 opacity-90 scale-[0.92] left-1/2 -translate-x-1/2 translate-y-6 md:translate-y-0 md:left-auto md:right-12 md:translate-x-0 md:rotate-3 shadow-xl`;
                     } else if (offset === 2) {
                         // Third
                         style = `z-10 opacity-80 scale-[0.84] left-1/2 -translate-x-1/2 translate-y-12 md:translate-y-0 md:left-auto md:right-24 md:translate-x-0 md:rotate-6 shadow-lg`;
                     } else if (offset === COURSES.length - 1) {
                         // Exiting
                         style = `z-40 opacity-0 scale-110 left-1/2 -translate-x-1/2 -translate-y-12 md:translate-y-0 md:left-auto md:right-0 md:-translate-x-24 rotate-[-12deg] pointer-events-none`;
                     }

                     return (
                         <div
                            key={course.id}
                            onClick={() => onCourseClick(course)}
                            className={`${baseClasses} ${sizeClasses} ${style} ${buzzClass}`}
                         >
                            {/* Image */}
                            <div className="w-full h-full relative bg-gray-100">
                                <img 
                                    src={failedImages[course.id] ? fallbackImage : course.imageUrl} 
                                    onError={() => handleError(course.id)}
                                    className="w-full h-full object-cover" 
                                    alt={course.title} 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                            </div>
                            
                            {/* Software Badge */}
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold shadow-sm text-gray-900 flex items-center gap-1">
                                {course.software}
                            </div>
                            
                            {/* Card Content */}
                            <div className="absolute bottom-6 left-6 right-6 text-left">
                                <div className="text-brand-primary text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-1">
                                    <Zap size={10} fill="currentColor"/> Popular
                                </div>
                                <h3 className="text-2xl font-display font-bold leading-tight text-white mb-4">
                                    {course.title}
                                </h3>
                                <div className="flex items-center gap-2 text-xs font-bold text-white/90 group-hover:text-white transition-colors bg-white/20 backdrop-blur-md w-fit px-4 py-2 rounded-full border border-white/10">
                                    <span>View Details</span> <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                         </div>
                     );
                 })}
            </div>
        </div>
    </div>
  );
};
