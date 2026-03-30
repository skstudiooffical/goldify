import React from 'react';
import { LayoutDashboard, Headphones, Scan, History, Settings } from 'lucide-react';
import { Screen, Language } from '../types';
import { TRANSLATIONS } from '../constants/translations';
import { cn } from '../lib/utils';

interface NavbarProps {
  activeScreen: Screen;
  setScreen: (s: Screen) => void;
  language: Language;
}

export const Navbar = ({ activeScreen, setScreen, language }: NavbarProps) => {
  const t = TRANSLATIONS[language];
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-6 pb-8 pt-4 backdrop-blur-xl transition-colors">
      <div className="flex justify-between items-center max-w-md mx-auto">
        <button onClick={() => setScreen('dashboard')} className={cn("flex flex-col items-center gap-1 transition-colors", activeScreen === 'dashboard' ? "text-gold [.light_&]:text-black opacity-100" : "opacity-40")}>
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-[10px] font-medium uppercase tracking-widest">{t.dashboard}</span>
        </button>
        <button onClick={() => setScreen('support')} className={cn("flex flex-col items-center gap-1 transition-colors", activeScreen === 'support' ? "text-gold [.light_&]:text-black opacity-100" : "opacity-40")}>
          <Headphones className="w-6 h-6" />
          <span className="text-[10px] font-medium uppercase tracking-widest">{t.support}</span>
        </button>
        <button onClick={() => setScreen('scanner')} className="w-12 h-12 gold-gradient rounded-full flex items-center justify-center -mt-10 shadow-lg shadow-gold/20 active:scale-95 transition-transform border-4 border-background">
          <Scan className="text-black w-6 h-6" />
        </button>
        <button onClick={() => setScreen('activity')} className={cn("flex flex-col items-center gap-1 transition-colors", activeScreen === 'activity' ? "text-gold [.light_&]:text-black opacity-100" : "opacity-40")}>
          <History className="w-6 h-6" />
          <span className="text-[10px] font-medium uppercase tracking-widest">{t.activity}</span>
        </button>
        <button onClick={() => setScreen('profile')} className={cn("flex flex-col items-center gap-1 transition-colors", activeScreen === 'profile' ? "text-gold [.light_&]:text-black opacity-100" : "opacity-40")}>
          <Settings className="w-6 h-6" />
          <span className="text-[10px] font-medium uppercase tracking-widest">{t.settings}</span>
        </button>
      </div>
    </nav>
  );
};
