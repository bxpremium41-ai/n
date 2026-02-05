import React, { useState, useEffect, useRef } from 'react';
import { Lead } from '../types';
import { CheckCircle2, Loader2, ArrowRight, ArrowLeft, Ruler, PenTool, Hammer, HelpCircle, Calendar, Clock, User, Mail, Smartphone, Video, ChevronDown, X } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

interface LeadFormProps {
  mode?: 'section' | 'modal';
  onClose?: () => void;
}

const FormWrapper: React.FC<{ children: React.ReactNode; mode: 'section' | 'modal'; onClose?: () => void }> = ({ children, mode, onClose }) => {
  if (mode === 'modal') {
    return (
      <div className="bg-white rounded-[2.5rem] overflow-hidden flex flex-col h-[85vh] md:h-[90vh] w-full max-w-3xl">
        {onClose && (
           <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-secondary/5 hover:bg-secondary/10 transition-colors z-50">
              <X className="w-6 h-6 text-secondary" />
           </button>
        )}
        {/* Main Content Area - children handle flex growth */}
        <div className="flex-1 flex flex-col min-h-0 relative">
            {children}
        </div>
      </div>
    );
  }
  return (
    <section id="contact" className="relative py-24 z-20 px-4 bg-surfaceAlt/50 border-t border-secondary/5">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white border border-secondary/10 rounded-[3rem] shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
           {children}
        </div>
      </div>
    </section>
  );
};

export const LeadForm: React.FC<LeadFormProps> = ({ mode = 'section', onClose }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 5; // Date -> Role -> Name -> Email -> Phone
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  // Refs for auto-focusing inputs
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  // Phone State
  const [localPhone, setLocalPhone] = useState('');
  const [countryIso, setCountryIso] = useState('IN');

  const countries = [
    { code: '+91', flag: '🇮🇳', label: 'IN' },
    { code: '+1', flag: '🇺🇸', label: 'US' },
    { code: '+1', flag: '🇨🇦', label: 'CA' },
    { code: '+44', flag: '🇬🇧', label: 'UK' },
    { code: '+61', flag: '🇦🇺', label: 'AU' },
    { code: '+971', flag: '🇦🇪', label: 'UAE' },
    { code: '+49', flag: '🇩🇪', label: 'DE' },
    { code: '+33', flag: '🇫🇷', label: 'FR' },
  ];

  const currentCountry = countries.find(c => c.label === countryIso) || countries[0];

  const [formData, setFormData] = useState<Partial<Lead>>({
    role: 'Architect',
    name: '',
    email: '',
    phone: '',
    philosophy: 'Modernist',
    barrier: '',
    scheduledDate: '',
    scheduledTime: ''
  });

  const [dates, setDates] = useState<{label: string, value: string, isToday: boolean}[]>([]);
  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", 
    "05:00 PM", "06:00 PM", "07:00 PM"
  ];

  // Initialize Calendar Dates (Next 7 Days based on IST)
  useEffect(() => {
    const generateDates = () => {
        const dateArray = [];
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const istOffset = 5.5 * 60 * 60 * 1000;
        const istNow = new Date(utc + istOffset);

        for (let i = 0; i < 7; i++) {
            const d = new Date(istNow);
            d.setDate(istNow.getDate() + i);
            
            const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
            const dayNum = d.getDate();
            
            dateArray.push({
                label: `${dayName} ${dayNum}`,
                value: d.toISOString().split('T')[0], // YYYY-MM-DD
                isToday: i === 0
            });
        }
        setDates(dateArray);
        if (!formData.scheduledDate && dateArray.length > 0) {
            updateField('scheduledDate', dateArray[0].value);
        }
    };
    generateDates();
  }, []);

  useEffect(() => {
    updateField('phone', `${currentCountry.code} ${localPhone}`);
  }, [countryIso, localPhone]);

  useEffect(() => {
    if (step === 3) setTimeout(() => nameInputRef.current?.focus(), 100);
    if (step === 4) setTimeout(() => emailInputRef.current?.focus(), 100);
    if (step === 5) setTimeout(() => phoneInputRef.current?.focus(), 100);
  }, [step]);

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
        if (step === 3 && formData.name) nextStep();
        else if (step === 4 && formData.email) nextStep();
        else if (step === 5 && localPhone) handleSubmit();
    }
  };

  const updateField = (field: keyof Lead, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setStatus('submitting');
    try {
      const newLead = {
        ...formData,
        submittedAt: new Date().toISOString()
      };
      await addDoc(collection(db, "leads"), newLead);
      setStatus('success');
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus('error');
    }
  };

  // Styles for modal vs section
  const containerClasses = mode === 'modal' ? 'h-full flex flex-col' : 'flex flex-col';
  const contentClasses = mode === 'modal' ? 'flex-1 overflow-y-auto px-1' : '';
  const footerClasses = mode === 'modal' ? 'shrink-0 pt-4 bg-white z-10' : 'mt-8';

  if (status === 'success') {
    return (
      <FormWrapper mode={mode} onClose={onClose}>
        <div className="text-center animate-fade-in p-12 flex flex-col items-center justify-center h-full">
          <div className="w-24 h-24 bg-accent-light/20 rounded-full flex items-center justify-center mx-auto mb-6 neon-shadow">
            <CheckCircle2 className="w-10 h-10 text-accent" />
          </div>
          <h2 className="text-3xl font-display font-bold mb-4 text-primary">Meeting Confirmed!</h2>
          <p className="text-lg mb-2 text-secondary">
             Thanks <strong>{formData.name}</strong>.
          </p>
          <p className="text-xl mb-8 font-bold text-primary">
            We'll see you on <span className="text-accent">{formData.scheduledDate}</span> at <span className="text-accent">{formData.scheduledTime} (IST)</span>.
          </p>
          <div className="p-4 bg-secondary/5 rounded-xl text-sm text-secondary mb-8 inline-flex items-center gap-2">
            <Video size={16} /> Our team will reach out to you soon.
          </div>
          <button 
              onClick={() => {
              setFormData({ role: 'Architect', name: '', email: '', phone: '', philosophy: 'Modernist', barrier: '', scheduledDate: '', scheduledTime: '' });
              setLocalPhone('');
              setStep(1);
              setStatus('idle');
              if (mode === 'modal' && onClose) {
                  onClose();
              }
              }}
              className="text-primary font-bold hover:text-accent underline transition-colors"
          >
              {mode === 'modal' ? 'Close Window' : 'Schedule another meeting'}
          </button>
        </div>
      </FormWrapper>
    );
  }

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className={containerClasses}>
            <div className={`text-center space-y-1 md:space-y-2 shrink-0 ${mode === 'modal' ? '' : 'pt-4'}`}>
                <span className="text-accent font-bold tracking-widest uppercase text-xs md:text-sm bg-accent/10 px-3 py-1 rounded-full">Step 1 of 5</span>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-primary pt-2 md:pt-4">Schedule a Free Meeting</h3>
                <p className="text-secondary text-xs md:text-sm">Select a time (IST) to chat with our experts.</p>
            </div>
            
            <div className={contentClasses}>
                {/* Date Selection */}
                <div className="mt-4 md:mt-8">
                    <label className="block text-left text-xs font-bold uppercase tracking-widest text-secondary mb-2 md:mb-3">Select Date</label>
                    <div className="flex gap-2 md:gap-3 overflow-x-auto pb-4 no-scrollbar">
                        {dates.map((date) => (
                            <button
                                key={date.value}
                                onClick={() => updateField('scheduledDate', date.value)}
                                className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                                    formData.scheduledDate === date.value
                                    ? 'bg-primary border-primary text-white neon-shadow scale-105'
                                    : 'bg-white border-secondary/10 text-secondary hover:border-accent'
                                }`}
                            >
                                <span className={`text-[10px] md:text-xs font-bold uppercase ${formData.scheduledDate === date.value ? 'text-accent-light' : 'text-secondary/60'}`}>{date.isToday ? 'Today' : date.label.split(' ')[0]}</span>
                                <span className="text-xl md:text-2xl font-display font-bold">{date.label.split(' ')[1]}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Time Selection */}
                <div className="mt-2 md:mt-4 mb-4">
                    <label className="block text-left text-xs font-bold uppercase tracking-widest text-secondary mb-2 md:mb-3">Select Time (IST)</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 md:gap-3">
                        {timeSlots.map((time) => (
                            <button
                                key={time}
                                onClick={() => updateField('scheduledTime', time)}
                                className={`py-2 md:py-3 px-1 md:px-2 rounded-xl text-xs md:text-sm font-bold border transition-all duration-200 ${
                                    formData.scheduledTime === time
                                    ? 'bg-accent text-white border-accent shadow-lg scale-105'
                                    : 'bg-white border-secondary/10 text-secondary hover:border-accent hover:text-primary'
                                }`}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className={footerClasses}>
                <button 
                    onClick={nextStep} 
                    disabled={!formData.scheduledDate || !formData.scheduledTime} 
                    className="w-full py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-black transition-all disabled:opacity-50 shadow-xl shadow-primary/20 neon-shadow flex items-center justify-center gap-2"
                >
                    Confirm Time <ArrowRight size={20} />
                </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className={containerClasses}>
            <div className={`text-center space-y-2 shrink-0 ${mode === 'modal' ? '' : 'pt-4'}`}>
                <span className="text-accent font-bold tracking-widest uppercase text-xs md:text-sm bg-accent/10 px-3 py-1 rounded-full">Step 2 of 5</span>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-primary pt-4">Tell us about your business</h3>
            </div>
            <div className={`${contentClasses} flex flex-col justify-center`}>
                <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto mt-8 w-full">
                {[
                    { label: 'Interior Designer', icon: <PenTool/>, val: 'Interior Designer' },
                    { label: 'Architect', icon: <Ruler/>, val: 'Architect' },
                    { label: 'Contractor', icon: <Hammer/>, val: 'Contractor' },
                    { label: 'Other', icon: <HelpCircle/>, val: 'Other' }
                ].map((role) => (
                    <button 
                    key={role.val}
                    onClick={() => { updateField('role', role.val); nextStep(); }}
                    className={`p-6 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center gap-3 group shadow-sm ${
                        formData.role === role.val 
                        ? 'bg-primary text-white border-primary shadow-lg scale-105 neon-shadow' 
                        : 'bg-white text-secondary border-transparent hover:border-accent hover:shadow-md'
                    }`}
                    >
                    <div className={`p-3 rounded-full ${formData.role === role.val ? 'bg-white/10 text-accent-light' : 'bg-secondary/5 group-hover:bg-accent-light/20 group-hover:text-accent'} transition-colors`}>
                        {role.icon}
                    </div>
                    <span className="font-bold">{role.label}</span>
                    </button>
                ))}
                </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className={containerClasses}>
             <div className={`text-center space-y-2 mb-8 shrink-0 ${mode === 'modal' ? '' : 'pt-4'}`}>
                <span className="text-accent font-bold tracking-widest uppercase text-xs md:text-sm bg-accent/10 px-3 py-1 rounded-full">Step 3 of 5</span>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-primary pt-4">What's your full name?</h3>
             </div>

             <div className={`${contentClasses} flex flex-col items-center justify-center`}>
                <div className="relative group bg-white rounded-2xl shadow-lg border border-secondary/10 overflow-hidden focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/10 transition-all transform hover:scale-[1.01] w-full max-w-xl">
                    <User className="absolute top-1/2 -translate-y-1/2 left-6 text-secondary/40 group-focus-within:text-accent transition-colors w-8 h-8" />
                    <input 
                        ref={nameInputRef}
                        type="text"
                        className="w-full bg-white text-3xl font-display font-bold p-8 pl-20 outline-none text-primary placeholder-secondary/20 transition-all"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
             </div>

             <div className={footerClasses}>
                <button 
                onClick={nextStep} 
                disabled={!formData.name}
                className="w-full py-5 bg-primary text-white rounded-full font-bold text-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl shadow-primary/20"
                >
                Next Step <ArrowRight/>
                </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className={containerClasses}>
             <div className={`text-center space-y-2 mb-8 shrink-0 ${mode === 'modal' ? '' : 'pt-4'}`}>
                <span className="text-accent font-bold tracking-widest uppercase text-xs md:text-sm bg-accent/10 px-3 py-1 rounded-full">Step 4 of 5</span>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-primary pt-4">Where should we send the invite?</h3>
             </div>

             <div className={`${contentClasses} flex flex-col items-center justify-center`}>
                <div className="relative group bg-white rounded-2xl shadow-lg border border-secondary/10 overflow-hidden focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/10 transition-all transform hover:scale-[1.01] w-full max-w-xl">
                    <Mail className="absolute top-1/2 -translate-y-1/2 left-6 text-secondary/40 group-focus-within:text-accent transition-colors w-8 h-8" />
                    <input 
                        ref={emailInputRef}
                        type="email"
                        className="w-full bg-white text-3xl font-display font-bold p-8 pl-20 outline-none text-primary placeholder-secondary/20 transition-all"
                        placeholder="john@studio.com"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
             </div>

             <div className={footerClasses}>
                <button 
                onClick={nextStep} 
                disabled={!formData.email}
                className="w-full py-5 bg-primary text-white rounded-full font-bold text-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl shadow-primary/20"
                >
                Next Step <ArrowRight/>
                </button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className={containerClasses}>
             <div className={`text-center space-y-2 mb-8 shrink-0 ${mode === 'modal' ? '' : 'pt-4'}`}>
                <span className="text-accent font-bold tracking-widest uppercase text-xs md:text-sm bg-accent/10 px-3 py-1 rounded-full">Final Step</span>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-primary pt-4">Best number to reach you?</h3>
                <p className="text-secondary text-lg">We'll send a text reminder before the meeting.</p>
             </div>

             <div className={`${contentClasses} flex flex-col items-center justify-center`}>
                <div className="relative group bg-white rounded-2xl shadow-lg border border-secondary/10 overflow-hidden focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/10 transition-all transform hover:scale-[1.01] flex items-stretch w-full max-w-xl">
                    
                    {/* Country Code Selector */}
                    <div className="relative flex items-center justify-center bg-secondary/5 border-r border-secondary/10 min-w-[120px] hover:bg-secondary/10 transition-colors cursor-pointer">
                        <select 
                            value={countryIso}
                            onChange={(e) => setCountryIso(e.target.value)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        >
                            {countries.map((c, idx) => (
                                <option key={idx} value={c.label}>{c.flag} {c.label} ({c.code})</option>
                            ))}
                        </select>
                        <div className="flex items-center gap-2 pointer-events-none px-4">
                            <span className="text-2xl">{currentCountry.flag}</span>
                            <span className="font-bold text-primary text-xl">{currentCountry.code}</span>
                            <ChevronDown className="w-4 h-4 text-secondary/50" />
                        </div>
                    </div>

                    {/* Number Input */}
                    <div className="relative flex-1">
                        <input 
                            ref={phoneInputRef}
                            type="tel"
                            className="w-full h-full bg-white text-3xl font-display font-bold p-8 outline-none text-primary placeholder-secondary/20 transition-all"
                            placeholder="98765 00000"
                            value={localPhone}
                            onChange={(e) => setLocalPhone(e.target.value.replace(/\D/g, ''))} // Only numbers
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>
                 <p className="text-secondary/60 text-xs mt-4">We respect your inbox. Zero spam, just results.</p>
             </div>

             <div className={footerClasses}>
                <button 
                onClick={handleSubmit} 
                disabled={!localPhone || status === 'submitting'} 
                className="w-full py-5 bg-primary text-white rounded-full font-bold text-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl shadow-primary/20 neon-shadow"
                >
                {status === 'submitting' ? <Loader2 className="animate-spin" /> : <>Complete Booking <ArrowRight/></>}
                </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <FormWrapper mode={mode} onClose={onClose}>
        {/* Progress Bar */}
        <div className="px-8 md:px-12 pt-8 md:pt-12 shrink-0">
            <div className="w-full h-1.5 bg-secondary/10 rounded-full overflow-hidden mb-8">
            <div 
                className="h-full bg-accent transition-all duration-500 ease-out shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
            </div>

            {/* Navigation Controls */}
            {step > 1 && (
            <button 
                onClick={prevStep}
                className="absolute top-12 left-12 text-secondary hover:text-accent flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors hidden md:flex"
            >
                <ArrowLeft size={14} /> Back
            </button>
            )}
        </div>

        <div className="pb-8 px-8 md:px-12 md:pb-12 h-full flex flex-col min-h-0">
            {renderStep()}
        </div>
    </FormWrapper>
  );
};