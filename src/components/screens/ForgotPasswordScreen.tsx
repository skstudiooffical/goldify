import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Mail, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../constants/translations';

interface ForgotPasswordScreenProps {
  onBack: () => void;
  language: Language;
}

export const ForgotPasswordScreen = ({ onBack, language }: ForgotPasswordScreenProps) => {
  const t = TRANSLATIONS[language];
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailOrPhone) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      <header className="pt-6 mb-10">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-surface border border-border-custom flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </header>

      <div className="flex-1">
        {!isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold mb-2">{t.resetPassword}</h1>
              <p className="text-muted text-sm">{t.resetInstructions}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-muted">
                    {emailOrPhone.includes('@') ? <Mail className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
                  </div>
                  <input 
                    type="text"
                    placeholder="Email or Phone Number"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    className="w-full bg-surface border border-border-custom rounded-2xl pl-14 pr-5 py-5 text-foreground focus:outline-none focus:border-gold/50 transition-all"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full gold-gradient text-black font-bold py-5 rounded-2xl flex items-center justify-center gap-2 group"
              >
                {t.sendResetLink}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center h-full text-center space-y-6"
          >
            <div className="w-20 h-20 rounded-full bg-green-400/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold">Check your Inbox</h2>
            <p className="text-muted text-sm max-w-[280px]">
              We've sent a password reset link to <span className="text-foreground font-bold">{emailOrPhone}</span>. Please check your email or messages.
            </p>
            <button 
              onClick={onBack}
              className="mt-8 text-gold font-bold uppercase tracking-widest text-xs hover:underline"
            >
              {t.backToLogin}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
