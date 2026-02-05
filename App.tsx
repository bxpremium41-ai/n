import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { WakeUpCall } from './components/WakeUpCall';
import { RealityCheck } from './components/RealityCheck';
import { Process } from './components/Process';
import { SocialProof } from './components/SocialProof';
import { FAQ } from './components/FAQ';
import { LeadForm } from './components/LeadForm';
import { QuickDelivery } from './components/QuickDelivery';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { Comparison } from './components/Comparison';
import { GrowthEngine } from './components/GrowthEngine';
import { ContactSection } from './components/ContactSection';
import { Logo } from './components/Logo';
import { Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const openLeadModal = () => {
    setIsLeadModalOpen(true);
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-on-background overflow-x-hidden">
      
      {/* Background Grid - Global */}
      <div className="fixed inset-0 bg-grid-pattern bg-grid opacity-60 pointer-events-none z-0"></div>

      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-secondary/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div 
            className="cursor-pointer" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Logo className="text-2xl" />
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('reality')} className="text-sm font-medium text-secondary hover:text-primary transition-colors">
              The Problem
            </button>
            <button onClick={() => scrollToSection('process')} className="text-sm font-medium text-secondary hover:text-primary transition-colors">
              How It Works
            </button>
            <button onClick={() => scrollToSection('contact-us')} className="text-sm font-medium text-secondary hover:text-primary transition-colors">
              Contact
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-full hover:bg-primary-light hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/20"
            >
              Get Leads
            </button>
          </div>

          <button className="md:hidden p-2 text-primary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 md:hidden animate-fade-in text-primary">
          <button onClick={() => scrollToSection('reality')} className="text-2xl font-display font-medium">The Problem</button>
          <button onClick={() => scrollToSection('process')} className="text-2xl font-display font-medium">How It Works</button>
          <button onClick={() => scrollToSection('contact-us')} className="text-2xl font-display font-medium">Contact Us</button>
          <button onClick={() => scrollToSection('contact')} className="px-10 py-4 bg-primary text-white rounded-full text-xl font-bold">Get Leads</button>
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex flex-col">
        <Hero scrollToDemos={() => scrollToSection('contact')} />
        <WakeUpCall />
        <GrowthEngine onOpenModal={openLeadModal} />
        <QuickDelivery />
        <LeadForm />
        <SocialProof />
        <RealityCheck />
        <Process />
        <Comparison />
        <FAQ />
        <ContactSection />
      </main>

      <Footer onAdminClick={() => setIsAdminOpen(true)} />

      {/* Admin Modal */}
      {isAdminOpen && (
        <AdminDashboard onClose={() => setIsAdminOpen(false)} />
      )}

      {/* Lead Form Modal */}
      {isLeadModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-primary/40 backdrop-blur-md"
            onClick={() => setIsLeadModalOpen(false)}
          ></div>
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl animate-fade-in-up">
             <LeadForm mode="modal" onClose={() => setIsLeadModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;