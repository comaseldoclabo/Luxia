import React, { useState, useRef } from 'react';
import { UploadCloud, Check, X, Image as ImageIcon, ChevronDown } from 'lucide-react';

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'gold' | 'outline' | 'ghost';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'gold', 
  isLoading = false,
  className = '',
  disabled,
  ...props 
}) => {
  const baseClasses = "relative inline-flex items-center justify-center font-bold py-3.5 px-6 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#060608] focus:ring-gold-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none select-none";
  
  const variants = {
    gold: "btn-gold-luminous text-black font-extrabold tracking-wide",
    outline: "bg-transparent border border-gold-400/40 text-gold-300 hover:bg-gold-400/10 hover:border-gold-400",
    ghost: "bg-transparent text-gray-300 hover:text-white hover:bg-white/5",
  };

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
          <span>Traitement en cours...</span>
        </span>
      ) : children}
    </button>
  );
};

const labelStyles = "block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2";

// --- FileUpload ---
interface FileUploadProps {
  label: string;
  required?: boolean;
  helperText?: string;
  onChange: (file: File | null) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ label, required, helperText, onChange }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const id = `file-upload-${label.replace(/[^a-zA-Z0-9]/g, '-')}`;

  const processFile = (selectedFile: File | null) => {
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreview(url);
      onChange(selectedFile);
    } else {
      setFile(null);
      if (preview) URL.revokeObjectURL(preview);
      setPreview(null);
      onChange(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files ? e.target.files[0] : null;
    processFile(selected);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inputRef.current) inputRef.current.value = '';
    processFile(null);
  };

  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <label htmlFor={id} className={labelStyles}>
          {label} {required && <span className="text-gold-400">*</span>}
        </label>
        {file && (
          <span className="text-[11px] text-gold-300 font-mono">
            {(file.size / (1024 * 1024)).toFixed(2)} MB
          </span>
        )}
      </div>

      {helperText && (
        <p className="text-xs text-gray-400 mb-2 leading-relaxed">{helperText}</p>
      )}

      {preview ? (
        <div className="relative group rounded-xl overflow-hidden border border-gold-400/40 bg-luxury-surface/80 p-3 flex items-center gap-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-black flex-shrink-0 border border-gold-400/30">
            <img src={preview} alt="Prévisualisation" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{file?.name}</p>
            <p className="text-xs text-gray-400">Image de référence prête pour l'analyse IA</p>
          </div>
          <button
            type="button"
            onClick={clearFile}
            className="p-2 rounded-lg bg-black/60 text-gray-400 hover:text-red-400 hover:bg-black/80 transition-colors"
            title="Supprimer l'image"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 ${
            isDragging 
              ? 'border-gold-400 bg-gold-400/10 shadow-gold-subtle' 
              : 'border-white/10 hover:border-gold-400/40 bg-luxury-surface/40 hover:bg-luxury-surface/70'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-gold-400/10 border border-gold-400/20 flex items-center justify-center mb-3 text-gold-400 group-hover:scale-105 transition-transform">
            <UploadCloud className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-gray-200 text-center">
            Glissez une image ou <span className="text-gold-400 underline decoration-gold-400/40 hover:decoration-gold-400">parcourez vos fichiers</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">PNG, JPG, WebP jusqu'à 25 MB</p>
        </div>
      )}

      <input
        ref={inputRef}
        id={id}
        name={id}
        type="file"
        className="sr-only"
        onChange={handleFileChange}
        accept="image/*"
      />
    </div>
  );
};

// --- Select ---
interface SelectProps {
  label: string;
  options: string[];
  value?: string;
  helperText?: string;
  onChange: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({ label, options, value, helperText, onChange }) => {
  return (
    <div>
      <label className={labelStyles}>{label}</label>
      {helperText && <p className="text-xs text-gray-400 mb-2">{helperText}</p>}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-luxury-card border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all cursor-pointer hover:border-white/20"
        >
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-[#0D0E14] text-gray-100 py-2">
              {opt}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gold-400">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

// --- CheckboxGroup ---
interface CheckboxGroupProps {
  label: string;
  options: string[];
  selectedValues?: string[];
  helperText?: string;
  onChange: (selected: string[]) => void;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ 
  label, 
  options, 
  selectedValues = [], 
  helperText, 
  onChange 
}) => {
  const toggleOption = (option: string) => {
    const next = selectedValues.includes(option)
      ? selectedValues.filter(item => item !== option)
      : [...selectedValues, option];
    onChange(next);
  };

  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <label className={labelStyles}>{label}</label>
        {selectedValues.length > 0 && (
          <span className="text-xs text-gold-400 font-medium">
            {selectedValues.length} actif{selectedValues.length > 1 ? 's' : ''}
          </span>
        )}
      </div>
      {helperText && <p className="text-xs text-gray-400 mb-2">{helperText}</p>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2">
        {options.map((opt) => {
          const isChecked = selectedValues.includes(opt);
          return (
            <div
              key={opt}
              onClick={() => toggleOption(opt)}
              className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 select-none ${
                isChecked
                  ? 'bg-gold-400/10 border-gold-400/60 shadow-gold-subtle text-white'
                  : 'bg-luxury-card border-white/5 hover:border-white/15 text-gray-300 hover:text-white'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center transition-all ${
                  isChecked
                    ? 'bg-gold-400 text-black shadow-sm font-bold'
                    : 'border border-gray-600 bg-black/40'
                }`}
              >
                {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
              <span className="text-xs leading-relaxed font-medium">{opt}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- Textarea ---
interface TextareaProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  helperText?: string;
  onChange: (value: string) => void;
}

export const Textarea: React.FC<TextareaProps> = ({ 
  label, 
  placeholder, 
  required, 
  value = '', 
  helperText, 
  onChange 
}) => {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <label className={labelStyles}>
          {label} {required && <span className="text-gold-400">*</span>}
        </label>
        <span className="text-[11px] text-gray-500 font-mono">
          {value.length} caractères
        </span>
      </div>
      {helperText && <p className="text-xs text-gray-400 mb-2">{helperText}</p>}
      <textarea
        rows={4}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-luxury-card border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all resize-y min-h-[96px]"
      />
    </div>
  );
};

// --- NumberInput ---
interface NumberInputProps {
  label: string;
  value?: number;
  defaultValue?: number;
  max?: number;
  helperText?: string;
  onChange: (value: number) => void;
}

export const NumberInput: React.FC<NumberInputProps> = ({ 
  label, 
  value, 
  defaultValue = 5, 
  max = 10, 
  helperText, 
  onChange 
}) => {
  const currentValue = value !== undefined ? value : defaultValue;

  return (
    <div>
      <label className={labelStyles}>{label}</label>
      {helperText && <p className="text-xs text-gray-400 mb-2">{helperText}</p>}
      <div className="flex items-center gap-3">
        <input
          type="number"
          value={currentValue}
          min={1}
          max={max}
          onChange={(e) => onChange(parseInt(e.target.value, 10) || 1)}
          className="w-32 bg-luxury-card border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 font-mono text-center"
        />
        <div className="flex gap-2">
          {[5, 10].filter(n => n <= max).map(val => (
            <button
              key={val}
              type="button"
              onClick={() => onChange(val)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentValue === val 
                  ? 'bg-gold-400 text-black' 
                  : 'bg-luxury-card border border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {val}s
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
