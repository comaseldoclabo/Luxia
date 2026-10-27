import { GoogleGenAI } from "@google/genai";
import { GenerationResult } from '../types';

// API Key retrieval from environment variables
const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || "";

if (!apiKey) {
  console.warn("Attention: GEMINI_API_KEY non détectée. Veuillez configurer la clé API dans les variables d'environnement.");
}

const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

/**
 * Convert a File object to the GenAI inlineData format
 */
const fileToGenerativePart = async (file: File) => {
  const base64EncodedData = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        reject(new Error("Impossible de lire le fichier image."));
      }
    };
    reader.onerror = () => reject(new Error("Erreur de lecture du fichier image."));
    reader.readAsDataURL(file);
  });

  return {
    inlineData: {
      data: base64EncodedData,
      mimeType: file.type || 'image/png',
    },
  };
};

/**
 * Normalise aspect ratios for gemini-3.1-flash-image
 */
const parseAspectRatio = (str?: string): "1:1" | "3:4" | "4:3" | "16:9" | "9:16" => {
  if (!str) return "1:1";
  if (str.includes("16:9")) return "16:9";
  if (str.includes("9:16")) return "9:16";
  if (str.includes("4:3")) return "4:3";
  if (str.includes("3:4")) return "3:4";
  return "1:1";
};

/**
 * Normalise resolution for gemini-3.1-flash-image
 */
const parseImageSize = (str?: string): "1K" | "2K" | "4K" => {
  if (!str) return "1K";
  if (str.includes("4K")) return "4K";
  if (str.includes("2K")) return "2K";
  return "1K";
};

/**
 * Extract base64 images from a GenerateContent response
 */
const extractImagesFromResponse = (response: any, fallbackPrompt?: string): GenerationResult[] => {
  const results: GenerationResult[] = [];
  const parts = response.candidates?.[0]?.content?.parts || [];
  
  for (const part of parts) {
    if (part.inlineData && part.inlineData.data) {
      const mime = part.inlineData.mimeType || 'image/png';
      const base64 = part.inlineData.data;
      const imageUrl = `data:${mime};base64,${base64}`;
      results.push({
        type: 'image',
        url: imageUrl,
        prompt: fallbackPrompt,
        timestamp: Date.now(),
        format: mime.split('/')[1]?.toUpperCase() || 'PNG'
      });
    }
  }

  return results;
};

/**
 * Service 1: Photographie Shooting UltraRéaliste
 */
export const generateRealisticPhoto = async (
  prompt: string,
  imageFile?: File,
  options?: {
    ratio?: string;
    quality?: string;
    onProgress?: (message: string, progress: number) => void;
  }
): Promise<GenerationResult[]> => {
  options?.onProgress?.("Calibrage de l'objectif Hasselblad & réglage du capteur...", 15);

  const aspectRatio = parseAspectRatio(options?.ratio);
  const imageSize = parseImageSize(options?.quality);

  const enrichedPrompt = `
[MASTERPIECE PHOTOGRAPHY - LUXIA STUDIO]
Directives artistiques : ${prompt}
Exigences esthétiques : Photographie studio professionnelle ultra-détaillée 8K, netteté exceptionnelle, textures de peau ultra-naturelles avec micro-pores visibles, reflets dorés chauds dans les yeux, éclairage volumétrique doux haute fidélité, rendu Leica/Hasselblad, zéro artefact, élégance luxueuse contemporaine.
`.trim();

  options?.onProgress?.("Capture du flux volumétrique et simulation d'éclairage...", 45);

  try {
    const parts: any[] = [];
    if (imageFile) {
      const imagePart = await fileToGenerativePart(imageFile);
      parts.push(imagePart);
    }
    parts.push({ text: enrichedPrompt });

    options?.onProgress?.("Calcul neuronal des micro-contrastes et du rendu or...", 75);

    // Primary model: gemini-3.1-flash-image
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image',
      contents: { parts },
      config: {
        imageConfig: {
          aspectRatio,
          imageSize,
        }
      }
    });

    const results = extractImagesFromResponse(response, prompt);
    if (results.length > 0) {
      options?.onProgress?.("Shooting terminé avec succès !", 100);
      return results;
    }

    // Fallback if no inlineData returned: try gemini-3.1-flash-lite-image
    const fallbackResponse = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-image',
      contents: { parts }
    });

    const fallbackResults = extractImagesFromResponse(fallbackResponse, prompt);
    if (fallbackResults.length > 0) {
      options?.onProgress?.("Shooting terminé !", 100);
      return fallbackResults;
    }

    throw new Error("L'IA n'a pas retourné d'image valide pour ce shooting.");
  } catch (err: any) {
    console.error("Erreur lors de generateRealisticPhoto:", err);
    throw new Error(err.message || "Erreur lors de la génération de la photographie.");
  }
};

/**
 * Service 2: Générateur d'Image Photoshop Pro
 */
export const generatePhotoshopImage = async (
  prompt: string,
  imageFile?: File,
  options?: {
    ratio?: string;
    onProgress?: (message: string, progress: number) => void;
  }
): Promise<GenerationResult[]> => {
  const steps = [
    { msg: "Analyse des calques & segmentation de la composition...", p: 15 },
    { msg: "Étalonnage colorimétrique & balance des tons or/ambre...", p: 40 },
    { msg: "Application des retouches cosmétiques et des filtres...", p: 65 },
    { msg: "Rendu de l'éclairage studio et des micro-textures...", p: 85 },
  ];

  let stepIdx = 0;
  const progressInterval = setInterval(() => {
    if (stepIdx < steps.length) {
      options?.onProgress?.(steps[stepIdx].msg, steps[stepIdx].p);
      stepIdx++;
    }
  }, 900);

  const aspectRatio = parseAspectRatio(options?.ratio);

  const enrichedPrompt = `
[PHOTOSHOP MASTER STUDIO - LUXIA EDITION]
Demande de retouche/création : ${prompt}
Style d'exécution : Retouche photographique de niveau directeur artistique, composition équilibrée, étalonnage cinématographique soigné, contrastes raffinés, teintes dorées lumineuses et ambiance haute gamme captivante.
`.trim();

  try {
    const parts: any[] = [];
    if (imageFile) {
      const imagePart = await fileToGenerativePart(imageFile);
      parts.push(imagePart);
    }
    parts.push({ text: enrichedPrompt });

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image',
      contents: { parts },
      config: {
        imageConfig: {
          aspectRatio,
          imageSize: "1K",
        }
      }
    });

    clearInterval(progressInterval);
    const results = extractImagesFromResponse(response, prompt);

    if (results.length > 0) {
      options?.onProgress?.("Composition Photoshop finalisée !", 100);
      return results;
    }

    // Try fallback
    const fallbackResponse = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-image',
      contents: { parts }
    });

    const fallbackResults = extractImagesFromResponse(fallbackResponse, prompt);
    if (fallbackResults.length > 0) {
      options?.onProgress?.("Composition terminée !", 100);
      return fallbackResults;
    }

    throw new Error("Aucun rendu généré par le moteur Photoshop IA.");
  } catch (err: any) {
    clearInterval(progressInterval);
    console.error("Erreur lors de generatePhotoshopImage:", err);
    throw new Error(err.message || "Erreur lors du traitement d'image Photoshop.");
  }
};

/**
 * Service 3: Générateur Vidéo VEO IA (VEO 3.1)
 */
export const generateVeoVideo = async (
  prompt: string,
  imageFile?: File,
  options?: {
    ratio?: string;
    quality?: string;
    onProgress?: (message: string) => void;
  }
): Promise<GenerationResult[]> => {
  options?.onProgress?.("Initialisation du pipeline cinématique VEO 3.1...");

  const isPortrait = options?.ratio?.includes("9:16");
  const aspectRatio: '16:9' | '9:16' = isPortrait ? '9:16' : '16:9';
  const resolution: '720p' | '1080p' = options?.quality?.includes("1080p") ? '1080p' : '720p';

  const enrichedPrompt = `
[CINEMATIC VEO 3.1 - LUXIA MASTERPIECE]
Action et mise en scène : ${prompt}
Esthétique visuelle : Vidéo de calibre cinéma 35mm, éclairage volumétrique doré, mouvements de caméra ultra-fluides et stables, dynamique réaliste, reflets caustiques soignés, haute fidélité visuelle.
`.trim();

  let operation;
  try {
    if (imageFile) {
      options?.onProgress?.("Encodage de l'image de départ en haute fidélité...");
      const imagePart = await fileToGenerativePart(imageFile);
      operation = await ai.models.generateVideos({
        model: 'veo-3.1-lite-generate-preview',
        prompt: enrichedPrompt,
        image: {
          imageBytes: imagePart.inlineData.data,
          mimeType: imagePart.inlineData.mimeType,
        },
        config: {
          numberOfVideos: 1,
          resolution,
          aspectRatio,
        }
      });
    } else {
      options?.onProgress?.("Génération des vecteurs de mouvement et des images clés...");
      operation = await ai.models.generateVideos({
        model: 'veo-3.1-lite-generate-preview',
        prompt: enrichedPrompt,
        config: {
          numberOfVideos: 1,
          resolution,
          aspectRatio,
        }
      });
    }
  } catch (err: any) {
    console.error("Erreur lancement VEO:", err);
    throw new Error(err.message || "Impossible de démarrer la génération vidéo VEO.");
  }

  options?.onProgress?.("Rendu de la vidéo VEO en cours. Cette étape prend généralement 1 à 2 minutes...");

  let pollCount = 0;
  const progressMessages = [
    "Simulation physique des lumières et reflets dorés...",
    "Interpolation temporelle et fluidité des mouvements...",
    "Ajustement cinématique du grain et des contrastes...",
    "Harmonisation de la colorimétrie et profondeur...",
    "Compression sans perte et assemblage du master vidéo...",
    "Finalisation des métadonnées du flux..."
  ];

  while (!operation.done) {
    pollCount++;
    const message = progressMessages[pollCount % progressMessages.length];
    options?.onProgress?.(message);

    await new Promise(resolve => setTimeout(resolve, 8000));

    try {
      operation = await ai.operations.getVideosOperation({ operation });
    } catch (pollErr: any) {
      console.warn("Avertissement pendant le sondage VEO:", pollErr);
    }
  }

  const downloadUri = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!downloadUri) {
    throw new Error("La génération vidéo n'a pas produit d'URI de téléchargement.");
  }

  options?.onProgress?.("Téléchargement du master vidéo haute définition...");

  const fetchUrl = downloadUri.includes('?') 
    ? `${downloadUri}&key=${apiKey}` 
    : `${downloadUri}?key=${apiKey}`;

  const videoResponse = await fetch(fetchUrl);
  if (!videoResponse.ok) {
    throw new Error(`Échec du rapatriement de la vidéo (${videoResponse.statusText})`);
  }

  const videoBlob = await videoResponse.blob();
  const videoUrl = URL.createObjectURL(videoBlob);

  options?.onProgress?.("Votre vidéo LUXIA VEO est prête !");

  return [{
    type: 'video',
    url: videoUrl,
    prompt,
    timestamp: Date.now(),
    format: 'MP4'
  }];
};
