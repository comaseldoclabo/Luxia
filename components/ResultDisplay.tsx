import React, { useState } from 'react';
import { GenerationResult } from '../types';
import { Download, Maximize2, Copy, Check, Sparkles, Film, Image as ImageIcon, RefreshCw, X } from 'lucide-react';

interface ResultDisplayProps {
  results: GenerationResult[];
  onRetry?: () => void;
  onSelectPrompt?: (prompt: string) => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ 
  results, 
  onRetry,
  onSelectPrompt
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [fullscreenMedia, setFullscreenMedia] = useState<GenerationResult | null>(null);

  const handleDownload = (result: GenerationResult) => {
    const link = document.createElement('a');
    link.href = result.url;
    const fileExtension = result.type === 'image' ? 'png' : 'mp4';
    link.download = `luxia-studio-${Date.now()}.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyPrompt = (prompt?: string, idx?: number) => {
    if (!prompt) return;
    navigator.clipboard.writeText(prompt);
    if (idx !== undefined) {
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2500);
    }
  };

  if (results.length === 0) {
    return (
      <div className="luxury-card rounded-2xl p-8 border border-gold-400/20 flex flex-col items-center justify-center min-h-[460px] text-center relative overflow-hidden">
        {/* Ambient gold glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gold-400/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-md flex flex-col items-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-400/20 via-gold-500/10 to-transparent border border-gold-400/30 flex items-center justify-center mb-6 shadow-gold-subtle">
            <Sparkles className="w-10 h-10 text-gold-400 animate-pulse" />
          </div>

          <h3 className="font-display text-2xl font-bold text-white mb-2">
            Zone de Rendu Haute Fidélité
          </h3>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            Vos créations photographiques 8K, retouches Photoshop et vidéos cinématiques VEO apparaîtront ici avec tous les outils d'exportation.
          </p>

          <div className="w-full bg-black/40 border border-gold-400/15 rounded-xl p-4 text-left">
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-gold-300 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Garanties LUXIA Studio</span>
            </div>
            <ul className="text-xs text-gray-400 space-y-1.5 list-disc list-inside">
              <li>Exportation haute résolution sans watermark</li>
              <li>Propriété intellectuelle 100% libre de droits</li>
              <li>Téléchargement immédiat en PNG sans perte ou MP4</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-gold-400 shadow-gold-glow animate-pulse"></div>
          <h3 className="font-display text-xl font-bold text-white tracking-wide">
            Chef-d'œuvre Finalisé
          </h3>
        </div>
        <span className="text-xs text-gold-300 font-mono bg-gold-400/10 border border-gold-400/25 px-3 py-1 rounded-full">
          {results.length} création{results.length > 1 ? 's' : ''} disponible{results.length > 1 ? 's' : ''}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {results.map((result, index) => (
          <div 
            key={index} 
            className="luxury-card rounded-2xl overflow-hidden border border-gold-400/30 group shadow-gold-subtle hover:border-gold-400/50 transition-all duration-300"
          >
            {/* Visual media container */}
            <div className="relative aspect-square sm:aspect-[4/3] bg-black overflow-hidden flex items-center justify-center">
              {result.type === 'image' ? (
                <img
                  src={result.url}
                  alt="Résultat généré par LUXIA Studio"
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />
              ) : (
                <video
                  src={result.url}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain"
                />
              )}

              {/* Quick overlay buttons */}
              <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => setFullscreenMedia(result)}
                  className="p-2.5 rounded-xl bg-black/70 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md transition-all hover:scale-105"
                  title="Plein écran"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDownload(result)}
                  className="p-2.5 rounded-xl btn-gold-luminous text-black font-bold backdrop-blur-md transition-all hover:scale-105 shadow-gold-glow"
                  title="Télécharger"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>

              {/* Tag indicator */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/75 backdrop-blur-md border border-gold-400/25 text-xs text-gold-300">
                {result.type === 'image' ? (
                  <>
                    <ImageIcon className="w-3.5 h-3.5 text-gold-400" />
                    <span className="font-semibold">Image 8K Master</span>
                  </>
                ) : (
                  <>
                    <Film className="w-3.5 h-3.5 text-gold-400" />
                    <span className="font-semibold">Vidéo VEO Cinéma</span>
                  </>
                )}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="p-5 bg-luxury-card border-t border-gold-400/15 flex flex-wrap items-center justify-between gap-4">
              <div className="flex-1 min-w-[200px]">
                {result.prompt ? (
                  <p className="text-xs text-gray-300 line-clamp-2 italic leading-relaxed">
                    "{result.prompt}"
                  </p>
                ) : (
                  <p className="text-xs text-gray-400">Rendu produit par LUXIA Studio IA</p>
                )}
              </div>

              <div className="flex items-center gap-3">
                {result.prompt && (
                  <button
                    onClick={() => handleCopyPrompt(result.prompt, index)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-gray-300 hover:text-white border border-white/10 transition-colors"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copié !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-gold-400" />
                        <span>Copier Prompt</span>
                      </>
                    )}
                  </button>
                )}

                <button
                  onClick={() => handleDownload(result)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl btn-gold-luminous text-xs font-bold whitespace-nowrap shadow-gold-glow"
                >
                  <Download className="w-4 h-4" />
                  <span>Télécharger {result.type === 'image' ? 'PNG HD' : 'MP4'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {fullscreenMedia && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-8"
          onClick={() => setFullscreenMedia(null)}
        >
          <div className="absolute top-6 right-6 flex items-center gap-3 z-20">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownload(fullscreenMedia);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl btn-gold-luminous text-xs font-bold"
            >
              <Download className="w-4 h-4" />
              <span>Télécharger</span>
            </button>
            <button
              onClick={() => setFullscreenMedia(null)}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div 
            className="max-w-6xl max-h-[85vh] w-full flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            {fullscreenMedia.type === 'image' ? (
              <img
                src={fullscreenMedia.url}
                alt="Vue plein écran"
                className="max-h-[82vh] max-w-full object-contain rounded-xl shadow-2xl border border-gold-400/20"
              />
            ) : (
              <video
                src={fullscreenMedia.url}
                controls
                autoPlay
                className="max-h-[82vh] max-w-full rounded-xl shadow-2xl border border-gold-400/20"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
