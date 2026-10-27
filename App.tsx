import React, { useState } from 'react';
import { SERVICES } from './constants';
import { Header } from './components/Header';
import { ServiceContainer } from './components/ServiceContainer';
import { Service } from './types';
import { Camera, Wand2, Film, Sparkles, ShieldCheck, Zap, Award, ArrowUpRight } from 'lucide-react';

interface ServiceTabsProps {
  services: Service[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

const ServiceTabs: React.FC<ServiceTabsProps> = ({ services, activeIndex, onSelect }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'photo-shoot':
        return <Camera className="w-4 h-4" />;
      case 'photoshop-pro':
        return <Wand2 className="w-4 h-4" />;
      case 'veo-video':
        return <Film className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-10">
      <div 
        className="flex p-1.5 rounded-2xl bg-luxury-card border border-gold-400/20 shadow-gold-subtle"
        role="tablist"
      >
        {services.map((service, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={service.id || service.nomService}
              onClick={() => onSelect(index)}
              role="tab"
              aria-selected={isActive}
              className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 px-3 sm:px-6 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 relative select-none ${
                isActive
                  ? 'bg-gradient-to-r from-gold-400 via-gold-300 to-amber-500 text-black font-extrabold shadow-gold-glow'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className={isActive ? 'text-black' : 'text-gold-400'}>
                {getIcon(service.id)}
              </span>
              <span className="truncate">{service.nomService}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const activeService = SERVICES[activeServiceIndex];

  return (
    <div className="min-h-screen bg-[#060608] text-gray-200 flex flex-col relative overflow-x-hidden selection:bg-gold-400 selection:text-black">
      
      {/* Radiant Background Aura Lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full bg-gold-400/10 blur-[120px]"></div>
        <div className="absolute -top-32 right-1/4 w-[400px] h-[400px] rounded-full bg-amber-600/10 blur-[140px]"></div>
      </div>

      <Header activeTab={activeServiceIndex} onSelectTab={setActiveServiceIndex} />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10 max-w-7xl">
        
        {/* Hero Section with luminous gold typography */}
        <section className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/25 text-xs font-semibold text-gold-300 mb-6 shadow-gold-subtle">
            <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
            <span className="tracking-wide uppercase font-mono">Suite Studio IA • Rendu Photoréaliste & VEO 3.1</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            L'Excellence Visuelle par{' '}
            <span className="text-gold-gradient block sm:inline">l'Intelligence Artificielle</span>
          </h1>

          <p className="text-sm sm:text-lg text-gray-300 max-w-2xl mx-auto font-light leading-relaxed mb-8">
            Trois moteurs d'exception : un studio photo Hasselblad 8K, un atelier de retouche Photoshop pro, et un générateur de cinéma numérique VEO 3.1.
          </p>

          {/* Luxury Highlights Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            <div className="p-3.5 rounded-xl bg-luxury-surface/50 border border-white/5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 flex-shrink-0">
                <Camera className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Shooting 8K</p>
                <p className="text-[10px] text-gray-400">Pores & textures réelles</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-luxury-surface/50 border border-white/5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 flex-shrink-0">
                <Wand2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Photoshop IA</p>
                <p className="text-[10px] text-gray-400">Relighting & calques</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-luxury-surface/50 border border-white/5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 flex-shrink-0">
                <Film className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">VEO 3.1 Vidéo</p>
                <p className="text-[10px] text-gray-400">Cinéma 35mm fluide</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-luxury-surface/50 border border-white/5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 flex-shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">100% Haute Déf</p>
                <p className="text-[10px] text-gray-400">Export libre de droits</p>
              </div>
            </div>
          </div>
        </section>

        {/* Studio Selector Tabs */}
        <ServiceTabs
          services={SERVICES}
          activeIndex={activeServiceIndex}
          onSelect={setActiveServiceIndex}
        />

        {/* Active Studio Workspace */}
        <div className="mt-4">
          <ServiceContainer key={activeService.nomService} service={activeService} />
        </div>

      </main>

      {/* Luxury Footer */}
      <footer className="mt-20 border-t border-gold-400/15 bg-[#040406] py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gold-400/20 border border-gold-400/30 flex items-center justify-center text-gold-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="font-display font-bold text-sm tracking-wider uppercase text-white">
                LUXIA <span className="text-gold-gradient font-light">Studio</span>
              </p>
              <p className="text-[11px] text-gray-500">L'alliance de l'art photographique et du calcul neuronal.</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-gray-400">
            <span>Photographie Ultra-Réaliste</span>
            <span>·</span>
            <span>Retouche Photoshop IA</span>
            <span>·</span>
            <span>Génération Vidéo VEO</span>
          </div>

          <p className="text-xs text-gray-500 font-mono">
            &copy; {new Date().getFullYear()} LUXIA Studio. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
