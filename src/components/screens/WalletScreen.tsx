import React from 'react';
import { CreditCard } from 'lucide-react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../constants/translations';

interface WalletScreenProps {
  language: Language;
}

export const WalletScreen = ({ 
  language
}: WalletScreenProps) => {
  const t = TRANSLATIONS[language];
  return (
    <div className="pb-32">
      <header className="p-6 pt-12 flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t.myWallet}</h2>
        <button className="w-10 h-10 rounded-full bg-surface border border-border-custom flex items-center justify-center">
          <CreditCard className="w-5 h-5" />
        </button>
      </header>

      {/* Physical Card Mockup */}
      <div className="px-6 mb-8">
        <div className="aspect-[1.6/1] w-full gold-gradient rounded-3xl p-8 flex flex-col justify-between shadow-2xl shadow-gold/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -mr-32 -mt-32"></div>
          <div className="flex justify-between items-start">
            <div className="w-12 h-8 bg-black/20 rounded-md backdrop-blur-md"></div>
            <h3 className="text-black font-black italic text-xl">AUREUM</h3>
          </div>
          <div>
            <p className="text-black/60 text-[10px] font-bold uppercase tracking-widest mb-1">{t.cardHolder}</p>
            <p className="text-black font-bold text-lg">SHIMUL SHAHRIYAR</p>
          </div>
          <div className="flex justify-between items-end">
            <p className="text-black font-mono text-lg tracking-widest">•••• •••• •••• 8842</p>
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-red-500/80"></div>
              <div className="w-8 h-8 rounded-full bg-yellow-500/80"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
