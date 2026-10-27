import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Service, FormData, GenerationResult, ExamplePreset } from '../types';
import { generateRealisticPhoto, generatePhotoshopImage, generateVeoVideo } from '../services/geminiService';
import { Button, FileUpload, Select, CheckboxGroup, Textarea, NumberInput } from './ui/FormControls';
import { ResultDisplay } from './ResultDisplay';
import { Notification } from './ui/Notification';
import { Sparkles, Wand2, Camera, Film, Layers, CheckCircle2, ChevronRight, Sliders } from 'lucide-react';

interface ServiceContainerProps {
  service: Service;
}

export const ServiceContainer: React.FC<ServiceContainerProps> = ({ service }) => {
  const initialFormData = useMemo(() => {
    const data: FormData = {};
    service.optionsFormulaire.forEach(opt => {
      if (opt.type === 'checkbox') {
        data[opt.nom] = [];
      } else if (opt.default !== undefined) {
        data[opt.nom] = opt.default;
      } else {
        data[opt.nom] = undefined;
      }
    });
    return data;
  }, [service]);

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<GenerationResult[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Reset form and results when switching service
  useEffect(() => {
    setFormData(initialFormData);
    setError(null);
    setResults([]);
  }, [service.nomService, initialFormData]);

  useEffect(() => {
    const uploadField = service.optionsFormulaire.find(o => o.type === 'upload');
    if (uploadField) {
      const file = formData[uploadField.nom] as File | undefined;
      if (file) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
      } else {
        setPreviewUrl(null);
      }
    }
  }, [formData, service.optionsFormulaire]);

  const handleFormChange = useCallback((name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleApplyPreset = (preset: ExamplePreset) => {
    setFormData(prev => {
      const next = { ...prev };
      // Set description
      if ('Champ de description' in next || service.optionsFormulaire.some(o => o.nom === 'Champ de description')) {
        next['Champ de description'] = preset.prompt;
      }
      // Apply any preset settings
      if (preset.settings) {
        Object.entries(preset.settings).forEach(([key, val]) => {
          next[key] = val;
        });
      }
      return next;
    });

    // Provide friendly notification or scroll to form
    const formElem = document.getElementById('studio-form');
    formElem?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const constructPrompt = () => {
    let prompt = "";
    for (const [key, value] of Object.entries(formData)) {
      if (
        value &&
        ![
          'Image de référence',
          'Image de référence (optionnelle)',
          'Commentaires supplémentaires',
          'Champ de description',
          'Cadrage / Ratio',
          'Format / Ratio',
          'Qualité & Résolution',
          'Qualité',
          'Format rendu',
          'Format',
          'Durée vidéo (secondes)',
          'Nombre de résultats maximum'
        ].includes(key)
      ) {
        if (Array.isArray(value) && value.length > 0) {
          prompt += `${key}: ${value.join(', ')}. `;
        } else if (!Array.isArray(value)) {
          prompt += `${key}: ${value}. `;
        }
      }
    }
    const description = (formData["Champ de description"] as string) || "";
    if (description) {
      prompt += `${description}. `;
    }
    const commentaires = (formData["Commentaires supplémentaires"] as string) || "";
    if (commentaires) {
      prompt += `\nDirectives additionnelles : ${commentaires}`;
    }
    return prompt.trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredField = service.optionsFormulaire.find(opt => opt.required);
    if (requiredField && !formData[requiredField.nom]) {
      setError(`Le champ "${requiredField.nom}" est obligatoire pour lancer ce studio.`);
      return;
    }

    setLoading(true);
    setLoadingMessage('Initialisation du moteur LUXIA Studio...');
    setProgress(5);
    setError(null);

    try {
      const prompt = constructPrompt();
      let newResults: GenerationResult[] = [];

      const ratio = (formData['Cadrage / Ratio'] || formData['Format / Ratio']) as string | undefined;
      const quality = (formData['Qualité & Résolution'] || formData['Qualité']) as string | undefined;

      switch (service.nomService) {
        case "Photographie Shooting UltraRéaliste": {
          const photoFile = formData['Image de référence'] as File | undefined;
          newResults = await generateRealisticPhoto(prompt, photoFile, {
            ratio,
            quality,
            onProgress: (msg, p) => {
              setLoadingMessage(msg);
              setProgress(p);
            }
          });
          break;
        }
        case "Générateur d'Image Photoshop": {
          const psFile = formData['Image de référence (optionnelle)'] as File | undefined;
          newResults = await generatePhotoshopImage(prompt, psFile, {
            ratio,
            onProgress: (msg, p) => {
              setLoadingMessage(msg);
              setProgress(p);
            }
          });
          break;
        }
        case "Générateur Vidéo VEO IA": {
          const videoFile = formData['Image de référence (optionnelle)'] as File | undefined;
          newResults = await generateVeoVideo(prompt, videoFile, {
            ratio,
            quality,
            onProgress: (msg) => {
              setLoadingMessage(msg);
            }
          });
          break;
        }
      }

      setResults(newResults);
    } catch (err: any) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Une erreur imprévue est survenue.");
    } finally {
      setLoading(false);
      setLoadingMessage('');
      setProgress(0);
    }
  };

  const getServiceIcon = () => {
    switch (service.id) {
      case 'photo-shoot':
        return <Camera className="w-6 h-6 text-gold-400" />;
      case 'photoshop-pro':
        return <Wand2 className="w-6 h-6 text-gold-400" />;
      case 'veo-video':
        return <Film className="w-6 h-6 text-gold-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-gold-400" />;
    }
  };

  return (
    <div className="space-y-8" id="studio-viewport">
      {error && (
        <Notification message={error} type="error" onClose={() => setError(null)} />
      )}

      {/* Preset inspirations banner */}
      {service.examplePresets && service.examplePresets.length > 0 && (
        <div className="luxury-card rounded-2xl p-5 border border-gold-400/20">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-gold-300">
                Inspirations Studio & Presets Clé en Main
              </h3>
            </div>
            <span className="text-[11px] text-gray-400 hidden sm:inline">
              Cliquez pour charger automatiquement le prompt
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {service.examplePresets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                className="text-left p-3.5 rounded-xl bg-luxury-surface/70 hover:bg-gold-400/10 border border-white/5 hover:border-gold-400/40 transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 font-mono">
                      {preset.category}
                    </span>
                    {preset.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-gold-400/15 text-gold-300 font-medium">
                        {preset.badge}
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-semibold text-white group-hover:text-gold-200 transition-colors line-clamp-1 mb-1">
                    {preset.title}
                  </h4>
                  <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                    {preset.description}
                  </p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-gold-400 font-medium">
                  <span>Charger ce style</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Studio Console Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-6 luxury-card rounded-2xl p-6 sm:p-8 border border-gold-400/25 shadow-gold-subtle relative overflow-hidden">
          
          {/* Subtle gold aura on top right corner */}
          <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full bg-gold-400/10 blur-3xl pointer-events-none"></div>

          {/* Service Header */}
          <div className="flex items-start gap-4 mb-6 pb-6 border-b border-white/10">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400/20 via-gold-500/10 to-transparent border border-gold-400/30 flex items-center justify-center flex-shrink-0 shadow-gold-subtle">
              {getServiceIcon()}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400 font-mono">
                  {service.badge}
                </span>
              </div>
              <h2 className="font-display text-2xl font-bold text-white tracking-tight">
                {service.nomService}
              </h2>
              <p className="text-xs text-gold-200/80 font-medium mt-0.5">
                {service.subtitle}
              </p>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>

          {/* Creation Form */}
          <form id="studio-form" onSubmit={handleSubmit} className="space-y-6">
            {service.optionsFormulaire.map(opt => {
              switch (opt.type) {
                case 'upload':
                  return (
                    <FileUpload
                      key={opt.nom}
                      label={opt.nom}
                      required={opt.required}
                      helperText={opt.helperText}
                      onChange={file => handleFormChange(opt.nom, file)}
                    />
                  );
                case 'dropdown':
                  return (
                    <Select
                      key={opt.nom}
                      label={opt.nom}
                      options={opt.options || []}
                      value={formData[opt.nom] as string}
                      helperText={opt.helperText}
                      onChange={value => handleFormChange(opt.nom, value)}
                    />
                  );
                case 'checkbox':
                  return (
                    <CheckboxGroup
                      key={opt.nom}
                      label={opt.nom}
                      options={opt.options || []}
                      selectedValues={(formData[opt.nom] as string[]) || []}
                      helperText={opt.helperText}
                      onChange={values => handleFormChange(opt.nom, values)}
                    />
                  );
                case 'textarea':
                  return (
                    <Textarea
                      key={opt.nom}
                      label={opt.nom}
                      required={opt.required}
                      placeholder={opt.placeholder}
                      value={(formData[opt.nom] as string) || ''}
                      helperText={opt.helperText}
                      onChange={value => handleFormChange(opt.nom, value)}
                    />
                  );
                case 'number':
                  return (
                    <NumberInput
                      key={opt.nom}
                      label={opt.nom}
                      defaultValue={opt.default as number}
                      value={formData[opt.nom] as number}
                      max={opt.max}
                      helperText={opt.helperText}
                      onChange={value => handleFormChange(opt.nom, value)}
                    />
                  );
                default:
                  return null;
              }
            })}

            {/* Submit Action */}
            <div className="pt-4">
              <Button type="submit" isLoading={loading} className="w-full text-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Lancer la création LUXIA Studio
              </Button>
            </div>

            {/* Feature Guarantees */}
            <div className="pt-2 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-gray-400">
              {service.fonctionnalités.slice(0, 4).map((feat, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          </form>
        </div>

        {/* Right Column: Viewport / Results / Realtime Engine */}
        <div className="lg:col-span-6 sticky top-28">
          {loading ? (
            <div className="luxury-card rounded-2xl p-8 border border-gold-400/40 min-h-[460px] flex flex-col items-center justify-center relative overflow-hidden text-center shadow-gold-glow">
              
              {/* Reference preview blur background */}
              {previewUrl && (
                <div className="absolute inset-0 z-0">
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover blur-2xl opacity-20" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#060608]/80 to-[#060608]/95"></div>
                </div>
              )}

              {/* Luminous orbital spinner */}
              <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
                <div className="relative w-28 h-28 mb-6">
                  {/* Outer pulsating ring */}
                  <div className="absolute inset-0 rounded-full border border-gold-400/20 animate-ping"></div>
                  {/* Rotating golden gradient ring */}
                  <div className="w-full h-full rounded-full border-4 border-t-gold-400 border-r-gold-300 border-b-transparent border-l-transparent animate-spin"></div>
                  
                  {/* Inner percentage badge */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Sparkles className="w-6 h-6 text-gold-400 animate-pulse" />
                    {progress > 0 && (
                      <span className="text-xs font-mono font-bold text-gold-300 mt-1">
                        {progress}%
                      </span>
                    )}
                  </div>
                </div>

                {/* Status messages */}
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  {loadingMessage || 'Génération du chef-d’œuvre en cours...'}
                </h3>
                
                {progress > 0 && (
                  <div className="w-full max-w-xs space-y-2 mt-4">
                    <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/10">
                      <div 
                        className="h-full bg-gradient-to-r from-gold-400 to-amber-500 transition-all duration-500 ease-out shadow-gold-glow"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <p className="text-xs text-gray-400 max-w-xs mt-4 leading-relaxed italic">
                  "L'intelligence artificielle LUXIA façonne la lumière et la matière avec une précision d'artisan joaillier."
                </p>

                <div className="mt-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/25 text-[11px] text-gold-300 font-mono">
                  <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse"></span>
                  <span>Pipeline neuronal actif</span>
                </div>
              </div>
            </div>
          ) : (
            <ResultDisplay results={results} />
          )}
        </div>

      </div>
    </div>
  );
};
