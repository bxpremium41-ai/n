import React, { useState, useEffect } from 'react';
import { X, Lock, Check, ArrowRight, Loader2, ShieldCheck, Star, Zap, Timer, CreditCard, Award, Flame } from 'lucide-react';
import { COURSES } from '../constants';
import { Course } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCourse?: Course | null;
}

// getDriveUrl helper to fetch images from Google Drive
const getDriveUrl = (id: string) => `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const [addedCount, setAddedCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });
  const [viewingCount, setViewingCount] = useState(12);

  useEffect(() => {
    if (isOpen) {
      setAddedCount(0);
      const interval = setInterval(() => {
        setAddedCount(prev => {
          if (prev >= COURSES.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  useEffect(() => {
    const calculateTime = () => {
      const DURATION = (2 * 60 * 60 * 1000) + (23 * 60 * 1000) + (49 * 1000);
      const now = Date.now();
      const remaining = DURATION - (now % DURATION);
      setTimeLeft({
        h: Math.floor((remaining / (1000 * 60 * 60)) % 24),
        m: Math.floor((remaining / (1000 * 60)) % 60),
        s: Math.floor((remaining / 1000) % 60)
      });
    };
    const timerInterval = setInterval(calculateTime, 1000);
    calculateTime();
    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewingCount(prev => {
        const delta = Math.floor(Math.random() * 3) - 1;
        return Math.max(8, Math.min(32, prev + delta));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const formatTime = (val: number) => val.toString().padStart(2, '0');

  const handleFinalRedirect = () => {
    window.location.href = 'https://www.avada.space/books';
  };

  const isBundleComplete = addedCount >= COURSES.length;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <style>{`
        @keyframes pulse-soft { 0%, 100% { transform: scale(1); box-shadow: 0 10px 30px -10px rgba(16,185,129,0.5); } 50% { transform: scale(1.02); box-shadow: 0 15px 40px -10px rgba(16,185,129,0.7); } }
        .animate-pulse-soft { animation: pulse-soft 2s infinite ease-in-out; }
        .animate-pop-in { animation: popIn 0.5s cubic-bezier(0.26, 0.53, 0.74, 1.48) forwards; }
        @keyframes popIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
      
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out] flex flex-col md:flex-row h-full md:h-[620px] max-h-[90vh] text-gray-900 border border-gray-100">
        <button onClick={onClose} className="absolute top-6 right-6 z-50 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors">
          <X size={20} />
        </button>

        {/* Left Sidebar - Authority Branding */}
        <div className="hidden md:flex md:w-2/5 bg-gray-950 p-10 flex-col justify-between relative overflow-hidden text-white border-r border-white/5">
           <div className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity" style={{ backgroundImage: `url(${getDriveUrl('1IuTkD-KkOz4_2VWOFyLXSwCGVzSBXKBr')})` }} />
           <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/40 via-transparent to-black/90"></div>
           
           <div className="relative z-10">
             <div className="flex items-center gap-2 text-brand-success font-black text-[10px] uppercase tracking-[0.2em] mb-6 bg-brand-success/10 w-fit px-3 py-1.5 rounded-full border border-brand-success/20">
               <ShieldCheck size={14} /> Certified Premium Resource
             </div>
             <h2 className="text-4xl font-display font-black leading-tight mb-4">
               Unlock the <br/><span className="text-brand-primary">Full Library.</span>
             </h2>
             <p className="text-gray-400 text-sm leading-relaxed font-medium">
               Get all 6 simplified design books + technical blueprints in one digital bundle.
             </p>
           </div>

           <div className="relative z-10 mt-auto">
             <div className="space-y-5">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                        <Star size={18} className="text-yellow-400 fill-yellow-400" />
                    </div>
                    <div>
                        <div className="text-xs font-black">4.9/5 Average Rating</div>
                        <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Global Community</div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                        <Zap size={18} className="text-brand-primary fill-brand-primary" />
                    </div>
                    <div>
                        <div className="text-xs font-black">Instant Download</div>
                        <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Digital PDF Format</div>
                    </div>
                </div>
             </div>
           </div>
        </div>

        {/* Right Content Area - Magic Animation & Final CTA */}
        <div className="w-full md:w-3/5 flex flex-col h-full bg-white relative">
          <div className="flex-1 overflow-hidden p-6 md:p-10 flex flex-col justify-center">
            
            <div className="mb-4 text-center">
                <div className="inline-flex items-center gap-2 mb-2 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                    <Loader2 size={14} className="animate-spin text-brand-primary" />
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-500">Preparing Collection</span>
                </div>
                <h3 className="text-2xl font-black font-display text-gray-900 mb-1">Adding All Books</h3>
                <p className="text-gray-400 text-[10px] font-bold">Unlocking high-res chapters...</p>
            </div>

            <div className="relative mb-6 px-4">
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner border border-gray-50">
                   <div className="h-full bg-gradient-to-r from-brand-primary to-red-400 transition-all duration-300 ease-out" style={{ width: `${(addedCount / COURSES.length) * 100}%` }}></div>
                </div>
            </div>

            {/* 2 in one row for viewport efficiency */}
            <div className="grid grid-cols-2 gap-2 max-w-lg mx-auto w-full mb-6 max-h-[220px] overflow-y-auto no-scrollbar">
                {COURSES.slice(0, addedCount).map((course) => (
                    <div key={course.id} className="flex items-center gap-2 text-[8px] font-black text-gray-800 bg-white p-2 rounded-xl border border-gray-100 shadow-sm animate-pop-in">
                         <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-gray-200">
                             <img src={course.imageUrl} className="w-full h-full object-cover" />
                         </div>
                         <div className="flex-1 truncate uppercase tracking-tight">{course.title}</div>
                         <div className="w-4 h-4 rounded-full bg-brand-success/10 flex items-center justify-center text-brand-success">
                            <Check size={10} strokeWidth={4} />
                         </div>
                    </div>
                ))}
            </div>

            {isBundleComplete && (
                <div className="animate-[fadeIn_0.5s_ease-out] text-center px-4">
                    <div className="flex flex-col gap-4">
                      <div className="bg-red-50 p-3 rounded-2xl border border-red-100 flex items-center justify-between mb-2">
                        <div className="text-left">
                          <span className="text-[9px] font-black text-brand-primary uppercase tracking-widest block leading-none mb-1">Limited Offer</span>
                          <span className="text-xl font-black text-gray-900">$49 <span className="text-gray-400 line-through text-xs font-bold ml-1">$199</span></span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl shadow-sm border border-red-100">
                          <Timer size={14} className="text-brand-primary" />
                          <span className="text-[10px] font-bold font-mono text-brand-primary tabular-nums">
                            {formatTime(timeLeft.h)}:{formatTime(timeLeft.m)}:{formatTime(timeLeft.s)}
                          </span>
                        </div>
                      </div>

                      <button 
                          onClick={handleFinalRedirect}
                          className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3 animate-pulse-soft border-b-4 border-black"
                      >
                          Download All Books <ArrowRight size={22} />
                      </button>
                    </div>
                </div>
            )}
          </div>

          {/* Persistent Social Proof Footer */}
          <div className="px-10 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full border border-white bg-gray-200 flex items-center justify-center overflow-hidden">
                            <img src={`https://i.pravatar.cc/100?u=${i+10}`} className="w-full h-full object-cover" />
                        </div>
                    ))}
                  </div>
                  <div className="text-[8px] font-black uppercase tracking-widest text-gray-400">
                    <span className="text-gray-900">{viewingCount} users</span> buying now
                  </div>
              </div>
              <div className="flex items-center gap-3 text-[8px] text-gray-400 font-black uppercase tracking-[0.2em]">
                  <div className="flex items-center gap-1"><Lock size={10} /> Secure</div>
                  <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                  <div className="flex items-center gap-1"><CreditCard size={10} /> Fast Pay</div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};
