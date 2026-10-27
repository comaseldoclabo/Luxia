import React from 'react';
import { Sparkles, Camera, Wand2, Film } from 'lucide-react';

interface HeaderProps {
  activeTab?: number;
  onSelectTab?: (index: number) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab = 0, onSelectTab }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#060608]/85 backdrop-blur-xl border-b border-gold-400/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark with diamond glow */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-300 via-gold-400 to-amber-600 flex items-center justify-center shadow-gold-glow">
            <Sparkles className="w-5 h-5 text-black" />
          </div>
          <div>
            <a href="/" className="font-display text-xl sm:text-2xl font-extrabold tracking-wider uppercase text-white hover:text-gold-300 transition-colors">
              LUXIA <span className="text-gold-gradient font-light">Studio</span>
            </a>
          </div>
        </div>

        {/* Zone 2: Navigation links / Quick mode switcher */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button
            onClick={() => onSelectTab?.(0)}
            className={`flex items-center gap-2 py-1 transition-all duration-200 ${
              activeTab === 0
                ? 'text-gold-400 border-b-2 border-gold-400 font-semibold'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Shooting 8K</span>
          </button>

          <button
            onClick={() => onSelectTab?.(1)}
            className={`flex items-center gap-2 py-1 transition-all duration-200 ${
              activeTab === 1
                ? 'text-gold-400 border-b-2 border-gold-400 font-semibold'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Wand2 className="w-4 h-4" />
            <span>Photoshop IA</span>
          </button>

          <button
            onClick={() => onSelectTab?.(2)}
            className={`flex items-center gap-2 py-1 transition-all duration-200 ${
              activeTab === 2
                ? 'text-gold-400 border-b-2 border-gold-400 font-semibold'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Vidéo VEO 3</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/20 text-xs font-medium text-gold-300">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse"></span>
            <span>Moteurs IA Prêts</span>
          </div>

          <button
            onClick={() => {
              const mainSection = document.getElementById('studio-viewport');
              mainSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-2 text-xs sm:text-sm font-bold rounded-lg btn-gold-luminous whitespace-nowrap"
          >
            Créer un chef-d'œuvre
          </button>
        </div>

      </div>
    </header>
  );
};
