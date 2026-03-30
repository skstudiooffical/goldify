import React from 'react';
import { Headphones, RefreshCw, Bell, ChevronRight } from 'lucide-react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../constants/translations';

interface SupportScreenProps {
  language: Language;
}

export const SupportScreen = ({ language }: SupportScreenProps) => {
  const t = TRANSLATIONS[language];
  return (
    <div className="pb-32">
      <header className="p-6 pt-12 flex justify-between items-center golden-header rounded-b-[32px] mb-6">
        <h2 className="text-2xl font-bold">{t.support}</h2>
        <button className="w-10 h-10 rounded-full bg-current/10 border border-current/20 flex items-center justify-center opacity-60">
          <Headphones className="w-5 h-5" />
        </button>
      </header>
      <div className="px-6 space-y-6">
        <div className="glass-card rounded-3xl p-6 border border-gold/20">
          <h3 className="text-lg font-bold mb-2">How can we help?</h3>
          <p className="text-sm text-muted mb-6">Our support team is available 24/7 to assist you with any questions or issues.</p>
          <div className="space-y-4">
            <button className="w-full bg-gold text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4" /> Live Chat
            </button>
            <button className="w-full bg-surface border border-border-custom text-foreground font-bold py-4 rounded-2xl flex items-center justify-center gap-2">
              <Bell className="w-4 h-4" /> Email Support
            </button>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-widest text-muted">Common Questions</h4>
          {['How to buy gold?', 'Withdrawal processing time', 'KYC verification guide'].map((q, i) => (
            <div key={i} className="flex justify-between items-center p-4 bg-surface/50 rounded-2xl border border-border-custom">
              <span className="text-sm">{q}</span>
              <ChevronRight className="w-4 h-4 text-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
