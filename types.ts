
export interface FormOption {
  nom: string;
  type: 'upload' | 'dropdown' | 'checkbox' | 'textarea' | 'number';
  required?: boolean;
  options?: string[];
  placeholder?: string;
  default?: number | string;
  max?: number;
  helperText?: string;
}

export interface ExamplePreset {
  title: string;
  category: string;
  prompt: string;
  description: string;
  badge?: string;
  settings?: Record<string, any>;
  sampleImageUrl?: string;
}

export interface Service {
  id: string;
  nomService: string;
  subtitle: string;
  badge: string;
  description: string;
  optionsFormulaire: FormOption[];
  fonctionnalités: string[];
  examplePresets: ExamplePreset[];
}

export type FormData = {
  [key: string]: string | string[] | File | number | boolean | undefined;
};

export interface ImageResult {
  type: 'image';
  url: string;
  prompt?: string;
  timestamp?: number;
  format?: string;
}

export interface VideoResult {
  type: 'video';
  url: string;
  prompt?: string;
  timestamp?: number;
  format?: string;
}

export type GenerationResult = ImageResult | VideoResult;

