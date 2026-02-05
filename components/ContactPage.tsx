import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export const ContactPage: React.FC = () => {
  useEffect(() => {
    document.title = "Contact Us | Ragegrow";
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await addDoc(collection(db, "leads"), {
        type: 'contact_form',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        role: 'Contact Inquiry',
        submittedAt: new Date().toISOString()
      });
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('idle');
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-background relative overflow-hidden flex flex-col items-center">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 md:gap-24 relative z-10">
        
        {/* Contact Info */}
        <div className="flex flex-col justify-center animate-fade-in">
            <span className="text-accent font-bold tracking-widest uppercase text-xs mb-6 inline-block">Get in Touch</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-primary mb-8 leading-[1.1]">
                Let's discuss your <br/>
                <span className="text-secondary/40 italic font-serif">next chapter.</span>
            </h1>
            <p className="text-xl text-secondary font-light mb-12 max-w-md leading-relaxed">
                Whether you have a question or are ready to scale, we are here to help architects build their legacy.
            </p>

            <div className="space-y-10">
                <div className="flex items-start gap-6 group cursor-pointer">
                    <div className="w-14 h-14 rounded-full bg-white border border-secondary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:border-accent/20 group-hover:text-accent transition-all duration-300 shadow-sm">
                        <Mail size={22} />
                    </div>
                    <div>
                        <span className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Email Us</span>
                        <a href="mailto:hello@ragegrow.com" className="text-xl md:text-2xl font-display font-bold text-primary hover:text-accent transition-colors">
                            hello@ragegrow.com
                        </a>
                    </div>
                </div>

                <div className="flex items-start gap-6 group cursor-pointer">
                    <div className="w-14 h-14 rounded-full bg-white border border-secondary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:border-accent/20 group-hover:text-accent transition-all duration-300 shadow-sm">
                        <Phone size={22} />
                    </div>
                    <div>
                        <span className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Call Us</span>
                        <a href="tel:+918299584008" className="text-xl md:text-2xl font-display font-bold text-primary hover:text-accent transition-colors">
                            +91 82995 84008
                        </a>
                    </div>
                </div>

                <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-full bg-white border border-secondary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:border-accent/20 group-hover:text-accent transition-all duration-300 shadow-sm">
                        <MapPin size={22} />
                    </div>
                    <div>
                        <span className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Location</span>
                        <p className="text-xl md:text-2xl font-display font-bold text-primary">
                            Global & Remote
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-secondary/5 border border-secondary/10 relative overflow-hidden animate-fade-in-up">
            {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-fade-in">
                    <div className="w-24 h-24 bg-emerald-50 text-accent rounded-full flex items-center justify-center mb-8 neon-shadow">
                        <CheckCircle2 size={48} />
                    </div>
                    <h3 className="text-3xl font-display font-bold text-primary mb-4">Message Sent</h3>
                    <p className="text-secondary text-lg mb-8 max-w-xs mx-auto">Thank you. Our team will review your message and get back to you within 24 hours.</p>
                    <button 
                        onClick={() => setStatus('idle')}
                        className="px-8 py-3 bg-secondary/5 rounded-full text-primary font-bold hover:bg-secondary/10 transition-colors"
                    >
                        Send another message
                    </button>
                </div>
            ) : (
                <>
                    <h3 className="text-3xl font-display font-bold text-primary mb-8">Send a message</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-secondary uppercase tracking-widest ml-1">Full Name</label>
                            <input 
                                required
                                type="text" 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full bg-secondary/5 border border-secondary/10 rounded-xl p-5 text-lg text-primary font-medium focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-secondary/30"
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-secondary uppercase tracking-widest ml-1">Email</label>
                                <input 
                                    required
                                    type="email" 
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full bg-secondary/5 border border-secondary/10 rounded-xl p-5 text-lg text-primary font-medium focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-secondary/30"
                                    placeholder="john@studio.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-secondary uppercase tracking-widest ml-1">Phone</label>
                                <input 
                                    required
                                    type="tel" 
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    className="w-full bg-secondary/5 border border-secondary/10 rounded-xl p-5 text-lg text-primary font-medium focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-secondary/30"
                                    placeholder="+91 82995..."
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-secondary uppercase tracking-widest ml-1">How can we help?</label>
                            <textarea 
                                required
                                rows={5}
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                className="w-full bg-secondary/5 border border-secondary/10 rounded-xl p-5 text-lg text-primary font-medium focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none placeholder:text-secondary/30"
                                placeholder="Tell us about your project or ask a question..."
                            ></textarea>
                        </div>

                        <button 
                            type="submit"
                            disabled={status === 'submitting'}
                            className="w-full py-5 bg-primary text-white rounded-xl font-bold text-xl hover:bg-black hover:scale-[1.01] transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20 mt-4"
                        >
                            {status === 'submitting' ? <Loader2 className="animate-spin" /> : <>Send Message <ArrowRight size={20} /></>}
                        </button>
                    </form>
                </>
            )}
        </div>

      </div>
    </div>
  );
};