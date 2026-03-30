import React from 'react';
import { ChevronRight, Camera } from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../constants/translations';

interface ScannerScreenProps {
  onBack: () => void;
  language: Language;
}

export const ScannerScreen = ({ onBack, language }: ScannerScreenProps) => {
  const t = TRANSLATIONS[language];
  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col">
      <header className="p-6 pt-12 flex justify-between items-center golden-header rounded-b-[32px] mb-6">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-current/10 border border-current/20 flex items-center justify-center opacity-60">
          <ChevronRight className="w-6 h-6 rotate-180" />
        </button>
        <h2 className="font-bold">Scan QR Code</h2>
        <div className="w-10 h-10"></div>
      </header>
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="relative w-64 h-64 border-2 border-gold/50 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gold/5 animate-pulse"></div>
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-gold rounded-tl-xl"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-gold rounded-tr-xl"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-gold rounded-bl-xl"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-gold rounded-br-xl"></div>
          <motion.div 
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-1 bg-gold shadow-[0_0_15px_rgba(212,175,55,0.8)] z-10"
          />
        </div>
        <p className="mt-8 text-white/60 text-sm text-center px-12">
          Align the QR code within the frame to scan and complete your transaction.
        </p>
      </div>
      <div className="p-12 flex justify-center">
        <button className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white">
          <Camera className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};
