import React, { useState } from 'react';
import { ChevronRight, Camera, FileText, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../constants/translations';
import { cn } from '../../lib/utils';

interface SignupScreenProps {
  onBack: () => void;
  onSignupComplete: () => void;
  language: Language;
  setUserName: (n: string) => void;
  setUserEmail: (e: string) => void;
  setUserPhone: (p: string) => void;
}

export const SignupScreen = ({ 
  onBack, 
  onSignupComplete, 
  language, 
  setUserName,
  setUserEmail,
  setUserPhone
}: SignupScreenProps) => {
  const t = TRANSLATIONS[language];
  const [step, setStep] = useState<'auth' | 'form' | 'kyc'>('auth');
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [value, setValue] = useState('');
  const [countryCode, setCountryCode] = useState('+880');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    gender: 'Male',
    kycType: '',
    kycPhotoFront: null as string | null,
    kycPhotoBack: null as string | null,
    password: '',
    confirmPassword: '',
    referralCode: ''
  });

  const handleSendOtp = () => {
    if (method === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        alert('Please enter a valid email address');
        return;
      }
    } else {
      if (!/^\d+$/.test(value)) {
        alert('Please enter a valid phone number');
        return;
      }
    }
    if (value.trim()) {
      setOtpSent(true);
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length >= 4) {
      setStep('form');
    }
  };

  const handleCreateAccount = () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setUserName(formData.name);
    if (method === 'email') {
      setUserEmail(value);
      setUserPhone('');
    } else {
      setUserPhone(`${countryCode} ${value}`);
      setUserEmail('');
    }
    onSignupComplete();
  };

  const countryCodes = [
    { code: '+880', label: 'BD' },
    { code: '+91', label: 'IN' },
    { code: '+1', label: 'US' },
    { code: '+44', label: 'UK' },
    { code: '+971', label: 'UAE' },
  ];

  if (step === 'kyc') {
    return (
      <div className="min-h-screen flex flex-col p-8 pt-12 bg-background">
        <header className="flex items-center mb-12">
          <button onClick={() => setStep('form')} className="w-10 h-10 rounded-full bg-surface border border-border-custom flex items-center justify-center mr-4">
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <h3 className="font-bold text-xl uppercase tracking-tight">{t.kycVerification}</h3>
        </header>

        <div className="space-y-8 flex-1">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">{t.kycType}</label>
            <div className="grid grid-cols-1 gap-3">
              {[t.nid, t.drivingLicence, t.passport].map((type) => (
                <button
                  key={type}
                  onClick={() => setFormData({ ...formData, kycType: type })}
                  className={cn(
                    "w-full py-4 rounded-2xl border text-sm font-bold transition-all text-left px-6",
                    formData.kycType === type ? "bg-gold/10 border-gold text-gold" : "bg-surface border-border-custom text-muted"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {formData.kycType && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">
                  {formData.kycType === t.nid ? 'Front side of your ID card' : t.uploadPhoto}
                </label>
                <div className="relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData({ ...formData, kycPhotoFront: reader.result as string });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full aspect-video rounded-3xl border-2 border-dashed border-border-custom bg-surface flex flex-col items-center justify-center gap-3 overflow-hidden">
                    {formData.kycPhotoFront ? (
                      <img src={formData.kycPhotoFront} alt="KYC Front" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                          <Camera className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-muted">{t.uploadPhoto}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {formData.kycType === t.nid && (
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">Back side of your ID card</label>
                  <div className="relative">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData({ ...formData, kycPhotoBack: reader.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-full aspect-video rounded-3xl border-2 border-dashed border-border-custom bg-surface flex flex-col items-center justify-center gap-3 overflow-hidden">
                      {formData.kycPhotoBack ? (
                        <img src={formData.kycPhotoBack} alt="KYC Back" className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                            <Camera className="w-6 h-6" />
                          </div>
                          <span className="text-xs font-bold text-muted">{t.uploadPhoto}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>

        <button 
          onClick={() => setStep('form')}
          disabled={!formData.kycType || !formData.kycPhotoFront || (formData.kycType === t.nid && !formData.kycPhotoBack)}
          className="w-full gold-gradient text-black font-bold py-4 rounded-2xl shadow-xl shadow-gold/10 active:scale-[0.98] transition-transform disabled:opacity-50 mt-8"
        >
          {t.ok}
        </button>
      </div>
    );
  }

  if (step === 'form') {
    return (
      <div className="min-h-screen flex flex-col p-8 pt-12 bg-background overflow-y-auto">
        <header className="flex items-center mb-12">
          <button onClick={() => setStep('auth')} className="w-10 h-10 rounded-full bg-surface border border-border-custom flex items-center justify-center mr-4">
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <h3 className="font-bold text-xl uppercase tracking-tight">{t.createAccount}</h3>
        </header>

        <div className="space-y-6 flex-1">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">{t.fullName}</label>
            <input 
              type="text" 
              placeholder="John Doe" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-surface border border-border-custom rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-gold/50 transition-colors text-foreground"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">{t.gender}</label>
            <div className="flex bg-surface p-1 rounded-2xl border border-border-custom">
              {[t.male, t.female, t.other].map((g) => (
                <button 
                  key={g}
                  onClick={() => setFormData({ ...formData, gender: g })}
                  className={cn(
                    "flex-1 py-3 rounded-xl text-xs font-bold transition-all",
                    formData.gender === g ? "bg-gold text-black" : "text-muted hover:text-foreground"
                  )}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => setStep('kyc')}
            className="w-full bg-surface border border-border-custom rounded-2xl p-5 flex items-center justify-between group hover:border-gold/50 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                <FileText className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold uppercase tracking-widest text-muted mb-1">{t.kycVerification}</p>
                <p className="text-sm font-bold text-foreground">
                  {formData.kycType ? `${formData.kycType} - Submitted` : t.unverified}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted group-hover:text-gold transition-colors" />
          </button>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">Referral (Optional)</label>
            <input 
              type="text" 
              maxLength={6}
              placeholder="000000" 
              value={formData.referralCode}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) setFormData({ ...formData, referralCode: val });
              }}
              className="w-full bg-surface border border-border-custom rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-gold/50 transition-colors text-foreground"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">{t.enterPassword}</label>
            <input 
              type="password" 
              maxLength={6}
              placeholder="••••••" 
              value={formData.password}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) setFormData({ ...formData, password: val });
              }}
              className="w-full bg-surface border border-border-custom rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-gold/50 transition-colors text-foreground"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">{t.confirmPassword}</label>
            <input 
              type="password" 
              maxLength={6}
              placeholder="••••••" 
              value={formData.confirmPassword}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) setFormData({ ...formData, confirmPassword: val });
              }}
              className="w-full bg-surface border border-border-custom rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-gold/50 transition-colors text-foreground"
            />
          </div>
        </div>

        <button 
          onClick={handleCreateAccount}
          disabled={!formData.name || !formData.password || !formData.confirmPassword || !formData.kycPhotoFront || (formData.kycType === t.nid && !formData.kycPhotoBack)}
          className="w-full gold-gradient text-black font-bold py-4 rounded-2xl shadow-xl shadow-gold/10 active:scale-[0.98] transition-transform disabled:opacity-50 mt-8 mb-4"
        >
          {t.createAccount}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-8 pt-12 bg-background">
      <header className="flex items-center mb-12">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-surface border border-border-custom flex items-center justify-center mr-4">
          <ChevronRight className="w-5 h-5 rotate-180" />
        </button>
        <h3 className="font-bold text-xl uppercase tracking-tight">{t.createAccount}</h3>
      </header>

      <div className="space-y-6 flex-1">
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
            {method === 'email' ? t.emailAddress : t.phoneNumber}
          </label>
          <div className="flex gap-2">
            {method === 'phone' && (
              <div className="relative">
                <select 
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="appearance-none bg-surface border border-border-custom rounded-2xl px-4 py-4 text-sm focus:outline-none focus:border-gold/50 transition-colors text-foreground pr-8 font-bold"
                >
                  {countryCodes.map(c => (
                    <option key={c.code} value={c.code}>{c.label} {c.code}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
              </div>
            )}
            <input 
              type={method === 'email' ? "email" : "tel"} 
              placeholder={method === 'email' ? "name@example.com" : "1XXX XXXXXX"} 
              value={value}
              onChange={(e) => {
                const val = e.target.value;
                if (method === 'phone') {
                  if (/^\d*$/.test(val)) setValue(val);
                } else {
                  setValue(val);
                }
              }}
              className="flex-1 bg-surface border border-border-custom rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-gold/50 transition-colors text-foreground"
            />
          </div>
        </div>

        {otpSent && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">{t.enterOtp}</label>
            <input 
              type="text" 
              maxLength={4}
              placeholder="0000" 
              value={otp}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) setOtp(val);
              }}
              className="w-full bg-surface border border-border-custom rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-gold/50 transition-colors text-foreground tracking-[1em] text-center"
            />
          </motion.div>
        )}
      </div>

      <div className="pt-8">
        {!otpSent ? (
          <button 
            onClick={handleSendOtp}
            disabled={!value.trim()}
            className="w-full gold-gradient text-black font-bold py-4 rounded-2xl shadow-xl shadow-gold/10 active:scale-[0.98] transition-transform disabled:opacity-50"
          >
            {t.sendOtp}
          </button>
        ) : (
          <button 
            onClick={handleVerifyOtp}
            disabled={otp.length < 4}
            className="w-full gold-gradient text-black font-bold py-4 rounded-2xl shadow-xl shadow-gold/10 active:scale-[0.98] transition-transform disabled:opacity-50"
          >
            {t.verifyAndCreate}
          </button>
        )}
      </div>
    </div>
  );
};
