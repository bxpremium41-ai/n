import React from 'react';
import { Lock } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onAdminClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer className="bg-primary text-white py-12 border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <Logo className="text-xl mb-2 justify-center md:justify-start" light={true} />
          <p className="text-sm text-secondary-light opacity-60">Helping businesses grow since 2024.</p>
        </div>
        
        <div className="flex items-center space-x-8 text-sm font-medium text-secondary-light">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <button 
                onClick={onAdminClick}
                className="flex items-center hover:text-white transition-colors px-4 py-2 hover:bg-white/10 rounded-full"
                aria-label="Admin Login"
            >
                <Lock className="w-3 h-3 mr-2" />
                Staff
            </button>
        </div>
      </div>
    </footer>
  );
};