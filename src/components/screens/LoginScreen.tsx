import React, { useState } from 'react';
import { Eye, EyeOff, Fingerprint, ScanFace } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../constants/translations';
import { cn } from '../../lib/utils';

interface LoginScreenProps {
  onLogin: () => void;
  onSignup: () => void;
  onForgotPassword: () => void;
  language: Language;
}

export const LoginScreen = ({ onLogin, onSignup, onForgotPassword, language }: LoginScreenProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [value, setValue] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const t = TRANSLATIONS[language];

  const handleSignIn = () => {
    if (step === 'credentials') {
      if (value && password) {
        setStep('otp');
      }
    } else {
      if (otp.length === 4) {
        onLogin();
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-8 pt-24 bg-background">
      <div className="mb-12">
        <h1 className="text-5xl font-bold tracking-tighter mb-2">GOLDIFY</h1>
        <p className="text-muted text-sm tracking-widest uppercase">Premium Asset Management</p>
      </div>

      <div className="space-y-6 flex-1">
        {step === 'credentials' ? (
          <>
            <div className="flex bg-surface p-1 rounded-2xl border border-border-custom mb-6">
              <button 
                onClick={() => setMethod('email')}
                className={cn(
                  "flex-1 py-3 rounded-xl text-xs font-bold transition-all",
                  method === 'email' ? "bg-gold text-black" : "text-muted hover:text-foreground"
                )}
              >
                Email
              </button>
              <button 
                onClick={() => setMethod('phone')}
                className={cn(
                  "flex-1 py-3 rounded-xl text-xs font-bold transition-all",
                  method === 'phone' ? "bg-gold text-black" : "text-muted hover:text-foreground"
                )}
              >
                Phone
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">
                {method === 'email' ? 'Email Address' : 'Phone Number'}
              </label>
              <div className="relative">
                <input 
                  type={method === 'email' ? "email" : "tel"} 
                  placeholder={method === 'email' ? "name@example.com" : "0123456789"} 
                  value={value}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (method === 'phone') {
                      if (/^\d*$/.test(val)) setValue(val);
                    } else {
                      setValue(val);
                    }
                  }}
                  className="w-full bg-surface border border-border-custom rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-gold/50 transition-colors text-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••" 
                  value={password}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val.length <= 6) setPassword(val);
                  }}
                  className="w-full bg-surface border border-border-custom rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-gold/50 transition-colors text-foreground"
                />
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <button 
                onClick={onForgotPassword}
                className="text-xs text-gold font-medium hover:underline"
              >
                {t.forgotPassword}
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Verify OTP</h2>
              <p className="text-muted text-sm">Enter the 4-digit code sent to your {method}</p>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">OTP Code</label>
              <input 
                type="text" 
                maxLength={4}
                placeholder="0000"
                value={otp}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d*$/.test(val)) setOtp(val);
                }}
                className="w-full bg-surface border border-border-custom rounded-2xl px-5 py-4 text-center text-2xl font-bold tracking-[1em] focus:outline-none focus:border-gold/50 transition-colors text-foreground"
              />
            </div>
            <button 
              onClick={() => setStep('credentials')}
              className="text-xs text-gold font-medium hover:underline w-full text-center"
            >
              Back to Sign In
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <button 
          onClick={handleSignIn}
          className="w-full gold-gradient text-black font-bold py-4 rounded-2xl shadow-xl shadow-gold/10 active:scale-[0.98] transition-transform"
        >
          {step === 'credentials' ? (t.signOut === 'Sign Out' ? 'Sign In' : t.signOut === 'সাইন আউট' ? 'সাইন ইন' : 'साइन इन') : 'Verify & Sign In'}
        </button>
        {step === 'credentials' && (
          <div className="flex flex-col gap-4">
            <button 
              onClick={onSignup}
              className="w-full bg-surface text-foreground font-bold py-4 rounded-2xl active:scale-[0.98] transition-transform border border-border-custom"
            >
              {t.createAccount}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
