import React, { useState } from 'react';
import { Phone, X, Check, Loader2, ChevronDown } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export const FloatingCallback: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [countryIso, setCountryIso] = useState('IN');

  const countries = [
    { code: '+91', flag: '🇮🇳', label: 'IN' },
    { code: '+1', flag: '🇺🇸', label: 'US' },
    { code: '+1', flag: '🇨🇦', label: 'CA' },
    { code: '+44', flag: '🇬🇧', label: 'UK' },
    { code: '+61', flag: '🇦🇺', label: 'AU' },
    { code: '+971', flag: '🇦🇪', label: 'UAE' },
    { code: '+49', flag: '🇩🇪', label: 'DE' },
  ];

  const currentCountry = countries.find(c => c.label === countryIso) || countries[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setStatus('submitting');
    try {
        await addDoc(collection(db, "leads"), {
            type: 'callback_request',
            phone: `${currentCountry.code} ${phone}`,
            submittedAt: new Date().toISOString()
        });
        setStatus('success');
        setTimeout(() => {
            setIsOpen(false);
            setStatus('idle');
            setPhone('');
        }, 3000);
    } catch (error) {
        console.error(error);
        setStatus('idle'); 
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className={`fixed bottom-6 right-6 z-[60] transition-all duration-300 ${isOpen ? 'translate-y-24 opacity-0' : 'translate-y-0 opacity-100'}`}>
         {/* Pulse Effect Rings */}
         <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-20 duration-1000"></div>
         <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-10 delay-300 duration-1000"></div>
         
         <button 
            onClick={() => setIsOpen(true)}
            className="relative bg-accent text-white p-4 rounded-full shadow-[0_8px_30px_rgba(16,185,129,0.3)] hover:scale-110 hover:bg-emerald-500 transition-all duration-300 group ring-4 ring-white/20"
         >
            <Phone className="w-6 h-6 fill-current animate-pulse" />
            
            {/* Tooltip */}
            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap translate-x-4 group-hover:translate-x-0">
                Request Callback
                <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-primary rotate-45"></div>
            </span>
         </button>
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center p-4 sm:p-6">
           <div className="absolute inset-0 bg-primary/60 backdrop-blur-md transition-opacity animate-fade-in" onClick={() => setIsOpen(false)}></div>
           
           <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-fade-in-up ring-1 ring-white/20">
              
              {/* Header */}
              <div className="bg-primary p-6 pt-8 text-white flex justify-between items-start relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                 
                 <div className="relative z-10">
                    <h3 className="text-2xl font-display font-bold mb-1">Request Callback</h3>
                    <p className="text-secondary-light text-sm">We'll call you within 15 mins.</p>
                 </div>
                 <button onClick={() => setIsOpen(false)} className="relative z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                    <X size={20} />
                 </button>
              </div>

              {/* Body */}
              <div className="p-8 bg-white">
                 {status === 'success' ? (
                     <div className="text-center py-6 animate-fade-in">
                        <div className="w-20 h-20 bg-emerald-50 text-accent rounded-full flex items-center justify-center mx-auto mb-6 neon-shadow">
                            <Check size={40} />
                        </div>
                        <h4 className="text-2xl font-display font-bold text-primary mb-2">Request Sent!</h4>
                        <p className="text-secondary text-base">Keep your phone nearby.</p>
                     </div>
                 ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block text-xs font-bold uppercase tracking-widest text-secondary/70 mb-3 ml-1">Your Phone Number</label>
                            
                            <div className="relative flex items-center bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-accent/50 focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/10 transition-all duration-300">
                                {/* Country Select */}
                                <div className="relative flex items-center justify-center h-[72px] px-4 border-r border-secondary/10 cursor-pointer hover:bg-black/5 transition-colors rounded-l-2xl group/select">
                                    <select 
                                        value={countryIso}
                                        onChange={(e) => setCountryIso(e.target.value)}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    >
                                        {countries.map((c, idx) => (
                                            <option key={idx} value={c.label}>{c.flag} {c.label} ({c.code})</option>
                                        ))}
                                    </select>
                                    <div className="flex flex-col items-center">
                                        <span className="text-xl mb-0.5">{currentCountry.flag}</span>
                                        <div className="flex items-center gap-0.5">
                                            <span className="text-xs font-bold text-primary">{currentCountry.code}</span>
                                            <ChevronDown size={10} className="text-secondary/50 group-hover/select:text-primary transition-colors" />
                                        </div>
                                    </div>
                                </div>

                                <input 
                                    type="tel"
                                    autoFocus
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                    placeholder="98765 00000"
                                    className="w-full h-[72px] bg-transparent p-5 outline-none font-display font-bold text-2xl text-primary placeholder-secondary/20 tracking-wide"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={!phone || status === 'submitting'}
                            className="w-full py-5 bg-primary text-white rounded-2xl font-bold text-xl hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20 disabled:opacity-70 disabled:hover:scale-100"
                        >
                            {status === 'submitting' ? <Loader2 className="animate-spin w-6 h-6" /> : (
                                <>
                                   <span>Call Me Now</span>
                                   <Phone size={20} className="fill-current" />
                                </>
                            )}
                        </button>
                    </form>
                 )}
              </div>
           </div>
        </div>
      )}
    </>
  );
};