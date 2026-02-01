import React, { useState, useEffect } from 'react';
import { X, Lock, Check, ArrowRight, Loader2, ShieldCheck, PartyPopper, Star, Users, Zap, Timer, BookOpen, Gift, Layers, CheckCircle2 } from 'lucide-react';
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
  // Default to PACKAGE_PREVIEW to ensure "Unlock All Courses" shows the bundle first
  const [step, setStep] = useState<Step>('PACKAGE_PREVIEW');
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>('quarterly');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Timer & User Count State
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });
  const [userCounts, setUserCounts] = useState({ quarterly: 23754, yearly: 17200 });

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      // If a specific course is passed, show details. Otherwise (Unlock All), show Package Preview.
      setStep(initialCourse ? 'DETAILS' : 'PACKAGE_PREVIEW');
      setError('');
    }
  }, [isOpen, initialCourse]);

  // Sync Timer Logic
  useEffect(() => {
    const calculateTime = () => {
      const DURATION = (2 * 60 * 60 * 1000) + (23 * 60 * 1000) + (49 * 1000);
      const STORAGE_KEY = 'avada_offer_timer_v1';
      
      let startTime = localStorage.getItem(STORAGE_KEY);
      
      if (!startTime) {
        startTime = Date.now().toString();
        localStorage.setItem(STORAGE_KEY, startTime);
      }
      
      const now = Date.now();
      const elapsed = now - parseInt(startTime, 10);
      let remaining = DURATION - elapsed;

      if (remaining <= 0) {
        const cycles = Math.ceil(Math.abs(remaining) / DURATION);
        const newStart = parseInt(startTime, 10) + (cycles * DURATION);
        // We don't write to localStorage here to avoid conflicts with the main app loop
        remaining = DURATION - (Math.abs(remaining) % DURATION); 
      }

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
        quarterly: prev.quarterly + (Math.random() > 0.5 ? 2 : 1),
        yearly: prev.yearly + (Math.random() > 0.5 ? 2 : 1)
      }));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const handlePlanSelect = (id: string) => {
    setSelectedPlanId(id);
  };

  const handleDetailsContinue = () => {
    // Go to Package Preview instead of Plans to show the bundle value
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
      // Direct redirect for $49 plan (Quarterly)
      if (selectedPlan.price === '$49') {
         await submitPhoneNumber('', selectedPlan.id);
         window.location.href = 'https://www.avada.space/checkout';
         return;
      }

      // Direct redirect for $99 plan (Yearly)
      if (selectedPlan.price === '$99') {
         await submitPhoneNumber('', selectedPlan.id);
         window.location.href = 'https://www.avada.space/checkout-now';
         return;
      }

      // Fallback/Legacy logic for other plans
      await submitPhoneNumber('', selectedPlan.id);
      openRazorpayCheckout(
        selectedPlan,
        '', 
        handleRazorpaySuccess,
        handleRazorpayFailure
      );
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out] flex flex-col md:flex-row max-h-[90vh] md:h-auto h-full text-gray-900">
        
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
                 <div className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-2">{initialCourse.software}</div>
                 <h2 className="text-3xl font-display font-bold leading-tight mb-4">{initialCourse.title}</h2>
                 <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <span className="text-white text-xs ml-2 font-bold">5.0</span>
                    </div>
                    <div className="flex items-center gap-1 text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded-full border border-brand-accent/20">
                      <Users size={12} />
                      <span className="text-xs font-bold">{initialCourse.students}+ Students</span>
                    </div>
                 </div>
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
                {step === 'DETAILS' && initialCourse 
                  ? "Included in the Avada All-Access Pass. One subscription, 12 premium courses."
                  : "Join thousands of architects and designers. Access the complete library and fast-track your career."}
             </p>
           </div>
           
           <div className="relative z-10 mt-auto">
             <div className="text-xs uppercase tracking-widest text-gray-500 mb-3 font-bold">What's included</div>
             <ul className="space-y-2">
               <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={14} className="text-brand-accent" /> 12+ Premium Courses</li>
               <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={14} className="text-brand-accent" /> Source Files Download</li>
               <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={14} className="text-brand-accent" /> ISO Certification</li>
             </ul>
           </div>
        </div>

        {/* Right Side: Content Area */}
        <div className="w-full md:w-2/3 flex flex-col h-full bg-white">
          
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">

            {/* STEP 1: PACKAGE PREVIEW (New Lightbox Step) */}
            {step === 'PACKAGE_PREVIEW' && (
              <div className="animate-fadeIn flex flex-col h-full">
                {/* Back button if coming from details */}
                {initialCourse && (
                     <div className="flex items-center gap-2 mb-4">
                        <button onClick={() => setStep('DETAILS')} className="text-gray-400 hover:text-black transition-colors p-1 -ml-1">
                            <ArrowRight size={20} className="rotate-180" />
                        </button>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Back to Course</span>
                     </div>
                )}

                <h3 className="text-2xl font-bold font-display text-gray-900 mb-2">The Ultimate Architecture Bundle</h3>
                <p className="text-gray-500 text-sm mb-6">You're one step away. Get instant access to our entire library + exclusive bonuses.</p>
                
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar -mr-2">
                    {/* Courses Grid */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
                            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                <BookOpen size={14} className="text-brand-primary"/> 12 Premium Courses Included
                            </h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {COURSES.map(course => (
                                <div key={course.id} className="flex items-center gap-3 text-sm text-gray-700 bg-gray-50 p-2.5 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                                     <div className="w-8 h-8 rounded overflow-hidden shrink-0 bg-gray-200">
                                         <img src={course.imageUrl} className="w-full h-full object-cover" alt={course.title} />
                                     </div>
                                     <div className="min-w-0">
                                        <div className="font-bold truncate">{course.title}</div>
                                        <div className="text-[10px] text-gray-500 uppercase">{course.software}</div>
                                     </div>
                                     <CheckCircle2 size={14} className="ml-auto text-green-500 shrink-0" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Freebies List */}
                    <div className="mb-6 bg-brand-primary/5 p-4 rounded-xl border border-brand-primary/10">
                         <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Gift size={14} className="text-brand-primary"/> Exclusive Freebies (Value $497)
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                             {[
                                "10,000+ Textures & 3D Models",
                                "Project Files for every course",
                                "Software Installation Guides",
                                "Portfolio Review Session",
                                "Official Certification",
                                "Beginner-to-Pro Modeling"
                             ].map((item, i) => (
                                 <div key={i} className="flex items-center gap-2 text-sm text-gray-800 font-medium">
                                    <div className="w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                                       <Check size={10} strokeWidth={3} />
                                    </div>
                                    {item}
                                 </div>
                             ))}
                        </div>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 bg-white">
                    <button 
                        onClick={() => setStep('PLANS')}
                        className="w-full py-4 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold rounded-xl transition-all shadow-glow flex items-center justify-center gap-2 group text-lg"
                    >
                        I Want This Package <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-2">100% Money-back guarantee. Cancel anytime.</p>
                </div>
              </div>
            )}

            {/* STEP 2: COURSE DETAILS */}
            {step === 'DETAILS' && initialCourse && (
              <div className="animate-fadeIn flex flex-col h-full">
                {/* Mobile Hero */}
                <div className="md:hidden w-full h-48 -mt-6 -mx-6 mb-6 relative overflow-hidden">
                   <img src={initialCourse.imageUrl} className="w-full h-full object-cover" alt={initialCourse.title} />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                   <div className="absolute bottom-4 left-6 right-6 text-white">
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="text-brand-accent text-[10px] font-bold uppercase tracking-widest">{initialCourse.software}</span>
                          <h2 className="text-2xl font-display font-bold leading-none mb-1">{initialCourse.title}</h2>
                        </div>
                      </div>
                   </div>
                </div>

                <div className="flex-1">
                  <p className="text-lg text-gray-600 mb-6 font-medium leading-relaxed">
                    {initialCourse.description}
                  </p>
                  
                  {/* Workflow Impact */}
                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-brand-primary rounded-r-lg">
                    <div className="flex items-center gap-2 mb-2 text-brand-primary font-bold text-sm uppercase tracking-wider">
                      <Zap size={16} /> Workflow Impact
                    </div>
                    <p className="text-sm text-gray-700 italic">
                      "{initialCourse.workflowImpact}"
                    </p>
                  </div>

                  {/* Learning Points */}
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 mb-6">
                    <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest border-b border-gray-200 pb-2">
                      What you'll learn
                    </h4>
                    <ul className="space-y-3">
                      {initialCourse.learningPoints && initialCourse.learningPoints.map((point, idx) => (
                        <li key={idx} className="flex gap-3 text-sm text-gray-600">
                          <div className="mt-0.5 w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0 text-brand-primary">
                            <Check size={12} strokeWidth={3} />
                          </div>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-auto pt-4">
                  <button 
                    onClick={handleDetailsContinue}
                    className="w-full py-4 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold rounded-xl transition-all shadow-glow flex items-center justify-center gap-2 group"
                  >
                    Unlock All Courses <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PLANS (Direct Payment) */}
            {step === 'PLANS' && (
              <div className="animate-fadeIn">
                <div className="flex items-center gap-2 mb-1">
                  {/* Back button logic */}
                  <button onClick={() => setStep('PACKAGE_PREVIEW')} className="text-gray-400 hover:text-black mr-2 transition-colors">
                      <ArrowRight size={20} className="rotate-180" />
                  </button>
                  <h3 className="text-2xl font-bold font-display text-gray-900">Select Plan</h3>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <p className="text-gray-500 text-sm">Start your journey today. Cancel anytime.</p>
                  
                  {/* Evergreen Timer in Modal */}
                  <div className="flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 self-start sm:self-auto">
                    <div className="flex items-center gap-1 text-brand-primary animate-pulse">
                      <Timer size={14} />
                    </div>
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">Offer Ends in:</span>
                    <div className="flex items-center gap-0.5 text-sm font-bold font-mono text-brand-primary">
                       <span>{formatTime(timeLeft.h)}</span>
                       <span>:</span>
                       <span>{formatTime(timeLeft.m)}</span>
                       <span>:</span>
                       <span>{formatTime(timeLeft.s)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {PRICING_PLANS.map((plan) => {
                    // Determine which user count to show
                    const currentUsers = plan.id === 'quarterly' ? userCounts.quarterly : userCounts.yearly;
                    
                    return (
                      <div 
                        key={plan.id}
                        onClick={() => handlePlanSelect(plan.id)}
                        className={`
                          relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-200
                          flex flex-col sm:flex-row sm:items-center justify-between group gap-4 sm:gap-0
                          ${selectedPlanId === plan.id 
                            ? `bg-red-50 border-brand-primary shadow-lg` 
                            : 'bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50'}
                        `}
                      >
                        {plan.label && (
                          <div className={`
                            absolute -top-3 right-4 px-3 py-1 text-[10px] font-bold uppercase rounded-full shadow-sm z-10
                            ${selectedPlanId === plan.id ? 'bg-brand-primary text-white' : 'bg-gray-200 text-gray-600'}
                          `}>
                            {plan.label}
                          </div>
                        )}

                        <div className="flex items-center gap-4">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedPlanId === plan.id ? 'border-brand-primary' : 'border-gray-300'}`}>
                            {selectedPlanId === plan.id && <div className="w-2.5 h-2.5 rounded-full bg-brand-primary" />}
                          </div>
                          <div>
                            <div className={`font-bold text-lg leading-tight ${selectedPlanId === plan.id ? 'text-brand-primary' : 'text-gray-900'}`}>{plan.duration}</div>
                            <div className="text-xs text-gray-500 font-medium mb-1">{plan.period} Access</div>
                            
                            {/* Live User Count */}
                            <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-medium bg-black/5 w-fit px-2 py-0.5 rounded-md">
                               <Users size={10} className="text-brand-primary" />
                               <span className="tabular-nums font-bold text-gray-700">{currentUsers.toLocaleString()}</span> users joined
                            </div>
                          </div>
                        </div>

                        <div className="text-right sm:text-right flex flex-row sm:flex-col justify-between items-center sm:items-end w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 sm:border-none">
                          <div className="text-sm text-gray-400 sm:hidden">Total Price</div>
                          <div>
                            <div className="text-xl font-bold font-display text-gray-900">{plan.price}</div>
                            <div className="text-[10px] text-gray-400 line-through">
                              {plan.originalPrice || '---'}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8">
                    {error && <p className="text-red-500 text-xs mb-3 text-center bg-red-50 p-2 rounded">{error}</p>}
                    
                    <button 
                    onClick={handlePaymentStart}
                    disabled={isLoading}
                    className="w-full py-4 bg-brand-primary hover:bg-red-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 group shadow-glow disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                    {isLoading ? (
                        <>
                        <Loader2 className="animate-spin" size={20} />
                        Processing...
                        </>
                    ) : (
                        <>
                        Proceed to Checkout <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                    </button>
                    
                    <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-gray-400">
                        <Lock size={10} /> Secured Payment
                    </div>
                </div>
              </div>
            )}

            {step === 'SUCCESS' && (
              <div className="animate-fadeIn h-full flex flex-col items-center justify-center text-center">
                 <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-6 shadow-sm">
                   <PartyPopper size={40} />
                 </div>
                 <h3 className="text-3xl font-bold font-display mb-2 text-gray-900">You're In!</h3>
                 <p className="text-gray-500 max-w-xs mb-8">
                   Your subscription is active. Welcome to the Avada community.
                 </p>
                 <button 
                  onClick={onClose}
                  className="w-full max-w-xs py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-colors"
                 >
                   Start Learning Now
                 </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};