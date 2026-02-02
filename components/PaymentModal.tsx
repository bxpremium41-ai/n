import React, { useState, useEffect } from 'react';
import { X, Lock, Check, ArrowRight, Loader2, ShieldCheck, PartyPopper, Star, Users, Zap, Timer, BookOpen, Gift, CheckCircle2, Shield, CreditCard, TrendingUp } from 'lucide-react';
import { submitPhoneNumber } from '../services/mockBackend';
import { openRazorpayCheckout } from '../services/razorpay';
import { PRICING_PLANS, COURSES } from '../constants';
import { Course } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCourse?: Course | null;
}

type Step = 'DETAILS' | 'PACKAGE_PREVIEW' | 'PLANS' | 'SUCCESS';

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, initialCourse }) => {
  const [step, setStep] = useState<Step>('PACKAGE_PREVIEW');
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>('lifetime-plus'); // Default to best value
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Animation State for Bundle
  const [addedCount, setAddedCount] = useState(0);
  
  // Timer & User Count State
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });
  const [userCounts, setUserCounts] = useState({ 'lifetime-basic': 23754, 'lifetime-plus': 17200 });
  const [viewingCount, setViewingCount] = useState(12);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(initialCourse ? 'DETAILS' : 'PACKAGE_PREVIEW');
      setError('');
    }
  }, [isOpen, initialCourse]);

  // Handle Bundle Animation
  useEffect(() => {
    if (step === 'PACKAGE_PREVIEW' && isOpen) {
      setAddedCount(0);
      const interval = setInterval(() => {
        setAddedCount(prev => {
          if (prev >= COURSES.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 60); // Snappier animation
      return () => clearInterval(interval);
    }
  }, [step, isOpen]);

  // Sync Timer Logic
  useEffect(() => {
    const calculateTime = () => {
      const DURATION = (2 * 60 * 60 * 1000) + (23 * 60 * 1000) + (49 * 1000);
      const now = Date.now();
      const remaining = DURATION - (now % DURATION);

      const h = Math.floor((remaining / (1000 * 60 * 60)) % 24);
      const m = Math.floor((remaining / (1000 * 60)) % 60);
      const s = Math.floor((remaining / 1000) % 60);

      setTimeLeft({ h, m, s });
    };

    const timerInterval = setInterval(calculateTime, 1000);
    calculateTime();

    return () => clearInterval(timerInterval);
  }, []);

  // Live User Count Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setUserCounts(prev => ({
        'lifetime-basic': prev['lifetime-basic'] + (Math.random() > 0.8 ? 1 : 0),
        'lifetime-plus': prev['lifetime-plus'] + (Math.random() > 0.8 ? 1 : 0)
      }));
      setViewingCount(prev => {
        const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        return Math.max(5, Math.min(25, prev + delta));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const handlePlanSelect = (id: string) => {
    setSelectedPlanId(id);
  };

  const handleDetailsContinue = () => {
    setStep('PACKAGE_PREVIEW');
  };

  const selectedPlan = PRICING_PLANS.find(p => p.id === selectedPlanId);
  const formatTime = (val: number) => val.toString().padStart(2, '0');

  const handleRazorpaySuccess = (paymentId: string) => {
    setIsLoading(false);
    setStep('SUCCESS');
    console.log("Transaction ID:", paymentId);
  };

  const handleRazorpayFailure = (error: any) => {
    setIsLoading(false);
    setError('Payment cancelled or failed. Please try again.');
  };

  const handlePaymentStart = async () => {
    setError('');
    if (!selectedPlan) return;
    setIsLoading(true);

    try {
      if (selectedPlan.price === '$49') {
         await submitPhoneNumber('', selectedPlan.id);
         window.location.href = 'https://www.avada.space/checkout';
         return;
      }
      if (selectedPlan.price === '$99') {
         await submitPhoneNumber('', selectedPlan.id);
         window.location.href = 'https://www.avada.space/checkout-now';
         return;
      }
      await submitPhoneNumber('', selectedPlan.id);
      openRazorpayCheckout(selectedPlan, '', handleRazorpaySuccess, handleRazorpayFailure);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  const isBundleComplete = addedCount >= COURSES.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* MODAL CONTAINER */}
      <div className="relative w-full max-w-5xl bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out] flex flex-col md:flex-row h-full md:h-[650px] max-h-[90vh] text-gray-900">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-white/80 rounded-full text-gray-600 hover:text-black hover:bg-white transition-colors shadow-sm"
        >
          <X size={20} />
        </button>

        {/* Left Side: Course Visuals */}
        <div className={`hidden md:flex md:w-1/3 bg-gray-900 p-8 flex-col justify-between relative overflow-hidden text-white`}>
           <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay transition-all duration-500" 
                style={{ backgroundImage: `url(${step === 'DETAILS' && initialCourse ? initialCourse.imageUrl : 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop'})` }} 
           />
           <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/20 to-black/80"></div>
           
           <div className="relative z-10">
             {step === 'DETAILS' && initialCourse ? (
               <>
                 <div className="text-brand-accent text-[10px] font-bold uppercase tracking-widest mb-2 bg-white/10 w-fit px-2 py-0.5 rounded border border-white/20">{initialCourse.software}</div>
                 <h2 className="text-3xl font-display font-bold leading-tight mb-4">{initialCourse.title}</h2>
               </>
             ) : (
               <>
                 <div className="flex items-center gap-2 text-brand-accent font-bold mb-4">
                   <ShieldCheck size={20} /> Secure Checkout
                 </div>
                 <h2 className="text-3xl font-display font-bold leading-tight mb-4">
                   Master Design.<br/>Build Future.
                 </h2>
               </>
             )}
             
             <p className="text-gray-300 text-sm leading-relaxed font-light">
                One-time investment. Lifetime career growth. join the professional community.
             </p>
           </div>
           
           <div className="relative z-10 mt-auto">
             <div className="text-xs uppercase tracking-widest text-gray-400 mb-3 font-bold border-b border-white/10 pb-1">Verified Value</div>
             <ul className="space-y-3">
               <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 size={16} className="text-brand-accent" /> 12+ Professional Courses</li>
               <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 size={16} className="text-brand-accent" /> Source Files Download</li>
               <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 size={16} className="text-brand-accent" /> Official Certification</li>
             </ul>
           </div>
        </div>

        {/* Right Side: Content Area */}
        <div className="w-full md:w-2/3 flex flex-col h-full bg-white relative">
          
          {/* SCROLLABLE CONTENT */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 pb-0">

            {/* STEP 1: PACKAGE PREVIEW */}
            {step === 'PACKAGE_PREVIEW' && (
              <div className="flex flex-col h-full">
                <div className="mb-4">
                    {initialCourse && (
                         <div className="flex items-center gap-2 mb-2">
                            <button onClick={() => setStep('DETAILS')} className="text-gray-400 hover:text-black transition-colors p-1 -ml-1">
                                <ArrowRight size={16} className="rotate-180" />
                            </button>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Back</span>
                         </div>
                    )}
                    <h3 className="text-2xl font-bold font-display text-gray-900 mb-1">Architecture All-Access Pass</h3>
                    <p className="text-gray-500 text-sm">Everything you need to master design, rendering, and AI.</p>
                </div>
                
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                            <BookOpen size={14} className="text-brand-primary"/> 
                            {isBundleComplete ? '12 Masterclasses Added' : `Syncing Library: ${addedCount}/${COURSES.length}`}
                        </h4>
                        {!isBundleComplete && <Loader2 size={14} className="animate-spin text-brand-primary" />}
                    </div>
                    
                    <div className="h-1.5 w-full bg-gray-100 rounded-full mb-4 overflow-hidden">
                       <div className="h-full bg-brand-primary transition-all duration-300 ease-out" style={{ width: `${(addedCount / COURSES.length) * 100}%` }}></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {COURSES.slice(0, addedCount).map((course) => (
                            <div key={course.id} className="flex items-center gap-3 text-sm text-gray-700 bg-gray-50 p-2 rounded-lg border border-gray-100 animate-[fadeIn_0.3s_ease-out]">
                                 <div className="w-8 h-8 rounded overflow-hidden shrink-0 bg-gray-200">
                                     <img src={course.imageUrl} className="w-full h-full object-cover" alt={course.title} />
                                 </div>
                                 <div className="min-w-0 flex-1">
                                    <div className="font-bold truncate text-[11px] uppercase tracking-tight">{course.title}</div>
                                 </div>
                                 <Check size={14} className="ml-auto text-green-500 shrink-0" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className={`mb-6 bg-brand-primary/5 p-4 rounded-xl border border-brand-primary/10 transition-all duration-700 ${isBundleComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                     <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Gift size={14} className="text-brand-primary"/> Exclusive Pack-Ins
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                         {["10,000+ Pro Textures", "Software Installation Help", "Portfolio Review", "Lifetime Updates"].map((item, i) => (
                             <div key={i} className="flex items-center gap-2 text-xs text-gray-800 font-medium">
                                <div className="w-4 h-4 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0"><Check size={10} strokeWidth={3} /></div>
                                {item}
                             </div>
                         ))}
                    </div>
                </div>
              </div>
            )}

            {/* STEP 2: COURSE DETAILS */}
            {step === 'DETAILS' && initialCourse && (
                <div className="flex flex-col min-h-full pb-8 animate-[fadeIn_0.3s_ease-out]">
                     <div className="md:hidden w-full h-48 -mt-6 -mx-6 mb-6 relative overflow-hidden">
                       <img src={initialCourse.imageUrl} className="w-full h-full object-cover" alt={initialCourse.title} />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                       <div className="absolute bottom-4 left-6 text-white">
                          <span className="text-brand-accent text-[10px] font-bold uppercase tracking-widest">{initialCourse.software}</span>
                          <h2 className="text-2xl font-display font-bold">{initialCourse.title}</h2>
                       </div>
                     </div>
                     <div className="flex-1">
                         <p className="text-lg text-gray-600 mb-6 font-medium leading-relaxed">{initialCourse.description}</p>
                         
                         <div className="mb-6 p-4 bg-red-50 border-l-4 border-brand-primary rounded-r-lg">
                            <div className="flex items-center gap-2 mb-2 text-brand-primary font-bold text-sm uppercase tracking-wider"><Zap size={16} /> Workflow Impact</div>
                            <p className="text-sm text-gray-700 italic">"{initialCourse.workflowImpact}"</p>
                          </div>

                          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 mb-6">
                            <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest border-b border-gray-200 pb-2">Modules</h4>
                            <ul className="space-y-3">
                              {initialCourse.learningPoints && initialCourse.learningPoints.map((point, idx) => (
                                <li key={idx} className="flex gap-3 text-sm text-gray-600">
                                  <div className="mt-0.5 w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0 text-brand-primary"><Check size={12} strokeWidth={3} /></div>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                     </div>
                </div>
            )}

             {/* STEP 3: PLANS */}
             {step === 'PLANS' && (
                 <div className="pb-8 animate-[fadeIn_0.3s_ease-out]">
                    <div className="flex items-center gap-2 mb-1">
                      <button onClick={() => setStep('PACKAGE_PREVIEW')} className="text-gray-400 hover:text-black mr-2 transition-colors">
                          <ArrowRight size={20} className="rotate-180" />
                      </button>
                      <h3 className="text-2xl font-bold font-display text-gray-900">Choose your Access Level</h3>
                    </div>
                    
                    {/* Urgency Badge */}
                    <div className="flex items-center gap-2 text-[11px] font-bold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full w-fit mb-6 border border-orange-100">
                        <TrendingUp size={12} className="animate-bounce" />
                        82% of designers choose the "Lifetime + Updates" plan
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      {PRICING_PLANS.map((plan) => {
                        const isPlus = plan.id === 'lifetime-plus';
                        const currentUsers = isPlus ? userCounts['lifetime-plus'] : userCounts['lifetime-basic'];
                        return (
                          <div 
                            key={plan.id}
                            onClick={() => handlePlanSelect(plan.id)}
                            className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between group gap-4 sm:gap-0 ${selectedPlanId === plan.id ? `bg-red-50 border-brand-primary shadow-xl ring-4 ring-brand-primary/5` : 'bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50'}`}
                          >
                            {plan.label && (
                              <div className={`absolute -top-3 right-6 px-4 py-1.5 text-[10px] font-bold uppercase rounded-full shadow-lg z-10 ${selectedPlanId === plan.id ? 'bg-brand-primary text-white scale-110' : 'bg-gray-900 text-white'}`}>
                                {plan.label}
                              </div>
                            )}
                            <div className="flex items-center gap-4">
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${selectedPlanId === plan.id ? 'border-brand-primary bg-brand-primary' : 'border-gray-300'}`}>
                                {selectedPlanId === plan.id && <Check size={14} className="text-white" strokeWidth={4} />}
                              </div>
                              <div>
                                <div className={`font-bold text-lg leading-tight ${selectedPlanId === plan.id ? 'text-brand-primary' : 'text-gray-900'}`}>{plan.duration}</div>
                                <div className="text-xs text-gray-500 font-medium mb-2">{plan.period}</div>
                                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-600">
                                   <Users size={12} className="text-brand-primary" />
                                   <span className="tabular-nums">{currentUsers.toLocaleString()}</span> professionals joined
                                </div>
                              </div>
                            </div>
                            <div className="text-right sm:text-right flex flex-row sm:flex-col justify-between items-center sm:items-end w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100 sm:border-none">
                              <div className="text-sm text-gray-400 sm:hidden">Investment</div>
                              <div>
                                <div className="text-2xl font-bold font-display text-gray-900">{plan.price}</div>
                                <div className="text-[10px] text-gray-400 line-through tracking-wide">{plan.originalPrice}</div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Trust Indicators */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <Shield className="text-green-600" size={20} />
                            <div className="text-[10px] text-gray-500 font-bold uppercase leading-tight">30-Day Risk-Free Guarantee</div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <CreditCard className="text-blue-600" size={20} />
                            <div className="text-[10px] text-gray-500 font-bold uppercase leading-tight">SSL Secured Payments</div>
                        </div>
                    </div>
                 </div>
             )}

             {step === 'SUCCESS' && (
                 <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-8 shadow-inner animate-bounce"><PartyPopper size={48} /></div>
                    <h3 className="text-4xl font-bold font-display mb-3 text-gray-900 tracking-tight">You're In!</h3>
                    <p className="text-gray-500 max-w-xs mb-8 text-lg font-light leading-relaxed">Welcome to the inner circle. Your dashboard is ready.</p>
                    <button onClick={onClose} className="w-full max-w-xs py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all hover:scale-105 shadow-xl">Start Learning Now</button>
                 </div>
             )}
          </div>

          {/* FIXED FOOTER AREA - ALWAYS IN FRAME */}
          {(step === 'PACKAGE_PREVIEW' || step === 'PLANS' || step === 'DETAILS') && (
             <div className="p-5 border-t border-gray-100 bg-white z-20 shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
                 <div className="flex flex-col gap-4">
                    
                    {/* Synchronized Timer - SHOWN ON PACKAGE AND PLANS */}
                    {(step === 'PACKAGE_PREVIEW' || step === 'PLANS') && (
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                            <div className="flex items-center gap-2 bg-red-50 px-4 py-1.5 rounded-full border border-red-100">
                                <Timer size={14} className="text-brand-primary animate-pulse" />
                                <span className="text-[10px] font-bold text-gray-700 uppercase tracking-widest">Offer expiring:</span>
                                <div className="flex items-center gap-0.5 text-sm font-bold font-mono text-brand-primary tabular-nums">
                                    <span>{formatTime(timeLeft.h)}</span>
                                    <span className="text-red-200">:</span>
                                    <span>{formatTime(timeLeft.m)}</span>
                                    <span className="text-red-200">:</span>
                                    <span>{formatTime(timeLeft.s)}</span>
                                </div>
                            </div>
                            
                            {/* Live Viewers count for urgency */}
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                {viewingCount} architects viewing
                            </div>
                        </div>
                    )}

                    {step === 'PACKAGE_PREVIEW' && (
                        <button onClick={() => setStep('PLANS')} className="w-full py-4 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold rounded-2xl transition-all shadow-glow hover:shadow-glow-lg flex items-center justify-center gap-3 group text-xl">
                            Unlock the Bundle <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    )}

                    {step === 'PLANS' && (
                        <div className="w-full space-y-3">
                             {error && <p className="text-red-500 text-xs text-center bg-red-50 p-2 rounded animate-shake">{error}</p>}
                             <button onClick={handlePaymentStart} disabled={isLoading} className="w-full py-4 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 group shadow-glow disabled:opacity-70 disabled:cursor-not-allowed text-xl">
                                {isLoading ? <><Loader2 className="animate-spin" size={24} /> Securing...</> : <><ShieldCheck size={22} /> Claim my Lifetime Access <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" /></>}
                             </button>
                        </div>
                    )}

                    {step === 'DETAILS' && (
                        <button onClick={handleDetailsContinue} className="w-full py-4 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold rounded-2xl transition-all shadow-glow flex items-center justify-center gap-3 group text-xl">
                            Unlock This & 11 Other Courses <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    )}
                    
                    <div className="flex items-center justify-center gap-4 text-[10px] text-gray-400 font-medium">
                        <div className="flex items-center gap-1"><Lock size={10} /> PCI Compliant</div>
                        <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                        <div className="flex items-center gap-1"><CheckCircle2 size={10} /> Instant Onboarding</div>
                    </div>
                 </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};