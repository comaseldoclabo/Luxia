import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 7000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const isError = type === 'error';

  return (
    <div className={`flex items-start gap-3 w-full p-4 rounded-xl shadow-2xl backdrop-blur-xl border transition-all duration-300 ${
      isError 
        ? 'bg-red-950/80 border-red-500/40 text-red-200' 
        : 'bg-emerald-950/80 border-emerald-500/40 text-emerald-200'
    }`}>
      <div className="mt-0.5 flex-shrink-0">
        {isError ? (
          <AlertCircle className="w-5 h-5 text-red-400" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        )}
      </div>

      <div className="flex-1 text-xs sm:text-sm font-medium leading-relaxed">
        {message}
      </div>

      <button
        onClick={onClose}
        className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors flex-shrink-0"
        title="Fermer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
