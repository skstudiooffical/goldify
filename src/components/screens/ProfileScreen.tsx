import React, { useState } from 'react';
import { ChevronRight, User, ArrowUpRight, LogOut, Copy, Check, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, Theme, Currency } from '../../types';
import { TRANSLATIONS } from '../../constants/translations';
import { cn } from '../../lib/utils';

interface ProfileScreenProps {
  onBack: () => void;
  language: Language;
  setLanguage: (l: Language) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  onSignOut: () => void;
  profilePic: string | null;
  setProfilePic: (s: string | null) => void;
  userName: string;
  setUserName: (n: string) => void;
  userEmail: string;
  setUserEmail: (e: string) => void;
  userPhone: string;
  setUserPhone: (p: string) => void;
  paymentMethod: string;
  setPaymentMethod: (m: string) => void;
  paymentNumber: string;
  setPaymentNumber: (n: string) => void;
}

export const ProfileScreen = ({ 
  onBack, 
  language, 
  setLanguage, 
  theme, 
  setTheme, 
  currency, 
  setCurrency,
  onSignOut,
  profilePic,
  setProfilePic,
  userName,
  setUserName,
  userEmail,
  setUserEmail,
  userPhone,
  setUserPhone,
  paymentMethod,
  setPaymentMethod,
  paymentNumber,
  setPaymentNumber
}: ProfileScreenProps) => {
  const t = TRANSLATIONS[language];
  const [tempPic, setTempPic] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);
  const referralId = "882045";
  const [editData, setEditData] = useState({
    name: userName,
    email: userEmail,
    phone: userPhone,
    paymentMethod: paymentMethod,
    paymentNumber: paymentNumber
  });

  const paymentMethods = ['bKash', 'Nagad', 'Rocket', 'Upay', 'Bank Transfer', 'Crypto Wallet'];

  const handleSave = () => {
    setUserName(editData.name);
    setUserEmail(editData.email);
    setUserPhone(editData.phone);
    setPaymentMethod(editData.paymentMethod);
    setPaymentNumber(editData.paymentNumber);
    setIsEditing(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempPic(reader.result as string);
        setShowConfirm(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    setProfilePic(tempPic);
    setShowConfirm(false);
  };

  return (
    <div className="pb-32">
      <header className="flex justify-between items-center p-6 pt-12 golden-header rounded-b-[32px] mb-6">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-current/10 border border-current/20 flex items-center justify-center opacity-60">
          <ChevronRight className="w-5 h-5 rotate-180" />
        </button>
        <h3 className="font-bold">{t.profileSettings}</h3>
        <div className="w-10" />
      </header>

      <div className="flex flex-col items-center px-6 mb-10">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full bg-surface border-4 border-gold/20 flex items-center justify-center overflow-hidden">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-gold" />
            )}
          </div>
          <label className="absolute bottom-0 right-0 w-8 h-8 gold-gradient rounded-full flex items-center justify-center cursor-pointer shadow-lg border-2 border-background">
            <ArrowUpRight className="w-4 h-4 text-black rotate-45" />
            <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
          </label>
        </div>
        <h2 className="text-2xl font-bold mt-4">{userName}</h2>
        <div className="mt-4 flex flex-col items-center">
          <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-1">{t.yourReferralCode}</p>
          <div className="flex items-center gap-2 mb-3 cursor-pointer group" onClick={() => {
            navigator.clipboard.writeText(referralId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}>
            <p className="text-sm text-gold font-mono tracking-wider font-bold">{referralId}</p>
            <div className="w-6 h-6 rounded-lg bg-surface border border-border-custom flex items-center justify-center transition-all group-hover:border-gold/50">
              {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 text-muted group-hover:text-gold" />}
            </div>
          </div>
        </div>
        <div className="px-3 py-1 bg-gold/10 text-gold rounded-full text-[10px] font-bold uppercase tracking-widest border border-gold/20">
          {t.verified}
        </div>
      </div>

      <AnimatePresence>
        {showConfirm && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="px-6 mb-8"
          >
            <div className="glass-card p-6 rounded-3xl border border-gold/30 text-center">
              <p className="text-sm font-bold mb-4">Confirm profile picture change?</p>
              <div className="flex gap-3">
                <button 
                  onClick={handleConfirm}
                  className="flex-1 py-3 bg-gold text-black rounded-xl font-bold text-xs"
                >
                  Confirm
                </button>
                <button 
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-3 bg-surface text-foreground rounded-xl font-bold text-xs border border-border-custom"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-6 space-y-6">
        {/* User Details */}
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted">Personal Information</h4>
            <button 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="text-xs font-bold text-gold uppercase tracking-widest hover:underline"
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">{t.fullName}</label>
            {isEditing ? (
              <input 
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({...editData, name: e.target.value})}
                className="w-full bg-surface border border-gold/30 rounded-2xl px-5 py-4 text-sm text-foreground font-medium focus:outline-none"
              />
            ) : (
              <div className="w-full bg-surface border border-border-custom rounded-2xl px-5 py-4 text-sm text-foreground font-medium">
                {userName}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">{t.phoneNumber}</label>
            {isEditing ? (
              <input 
                type="text"
                value={editData.phone}
                onChange={(e) => setEditData({...editData, phone: e.target.value})}
                className="w-full bg-surface border border-gold/30 rounded-2xl px-5 py-4 text-sm text-foreground font-medium focus:outline-none"
              />
            ) : (
              <div className="w-full bg-surface border border-border-custom rounded-2xl px-5 py-4 text-sm text-foreground font-medium">
                {userPhone}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">{t.emailAddress}</label>
            {isEditing ? (
              <input 
                type="email"
                value={editData.email}
                onChange={(e) => setEditData({...editData, email: e.target.value})}
                className="w-full bg-surface border border-gold/30 rounded-2xl px-5 py-4 text-sm text-foreground font-medium focus:outline-none"
              />
            ) : (
              <div className="w-full bg-surface border border-border-custom rounded-2xl px-5 py-4 text-sm text-foreground font-medium">
                {userEmail}
              </div>
            )}
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted ml-1">{t.paymentDetails}</h4>
            
            <div className="space-y-2 relative">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">{t.paymentMethod}</label>
              {isEditing ? (
                <>
                  <button 
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="w-full bg-surface border border-gold/30 rounded-2xl px-5 py-4 text-sm text-foreground font-medium flex justify-between items-center"
                  >
                    {editData.paymentMethod}
                    <ChevronDown className={cn("w-4 h-4 transition-transform", showDropdown && "rotate-180")} />
                  </button>
                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-50 left-0 right-0 top-full mt-2 golden-dropdown rounded-2xl overflow-hidden shadow-2xl"
                      >
                        {paymentMethods.map((m) => (
                          <button 
                            key={m}
                            onClick={() => {
                              setEditData({...editData, paymentMethod: m});
                              setShowDropdown(false);
                            }}
                            className="w-full px-5 py-4 text-left text-sm hover:bg-black/10 transition-colors border-b border-black/10 last:border-0"
                          >
                            {m}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <div className="w-full bg-surface border border-border-custom rounded-2xl px-5 py-4 text-sm text-foreground font-medium">
                  {paymentMethod}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">{t.numberLink}</label>
              {isEditing ? (
                <input 
                  type="text"
                  value={editData.paymentNumber}
                  onChange={(e) => setEditData({...editData, paymentNumber: e.target.value})}
                  className="w-full bg-surface border border-gold/30 rounded-2xl px-5 py-4 text-sm text-foreground font-medium focus:outline-none"
                />
              ) : (
                <div className="w-full bg-surface border border-border-custom rounded-2xl px-5 py-4 text-sm text-foreground font-medium">
                  {paymentNumber}
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">{t.kycVerification}</label>
            <div className="w-full bg-surface border border-border-custom rounded-2xl px-5 py-4 text-sm text-green-400 font-bold flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              {t.verified}
            </div>
          </div>
        </div>

        {/* Language */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">{t.language}</label>
          <div className="flex gap-2">
            {(['English', 'Bangla', 'Hindi'] as Language[]).map((l) => (
              <button 
                key={l}
                onClick={() => setLanguage(l)}
                className={cn(
                  "flex-1 py-3 rounded-xl text-xs font-bold border transition-all",
                  language === l ? "bg-gold text-black border-gold" : "bg-surface text-muted border-border-custom"
                )}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Theme */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">{t.theme}</label>
          <div className="flex gap-2">
            {(['dark', 'light'] as Theme[]).map((themeOption) => (
              <button 
                key={themeOption}
                onClick={() => setTheme(themeOption)}
                className={cn(
                  "flex-1 py-3 rounded-xl text-xs font-bold border transition-all capitalize",
                  theme === themeOption ? "bg-gold text-black border-gold" : "bg-surface text-muted border-border-custom"
                )}
              >
                {themeOption}
              </button>
            ))}
          </div>
        </div>

        {/* Currency */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">{t.currency}</label>
          <div className="flex gap-2">
            {(['USD', 'BDT', 'INR'] as Currency[]).map((c) => (
              <button 
                key={c}
                onClick={() => setCurrency(c)}
                className={cn(
                  "flex-1 py-3 rounded-xl text-xs font-bold border transition-all",
                  currency === c ? "bg-gold text-black border-gold" : "bg-surface text-muted border-border-custom"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6">
          <button 
            onClick={onSignOut}
            className="w-full bg-red-500/10 text-red-500 font-bold py-4 rounded-2xl flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" /> {t.signOut}
          </button>
        </div>
      </div>
    </div>
  );
};
