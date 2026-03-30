import React, { useState } from 'react';
import { TrendingUp, Bell, ArrowDownLeft, Gem, User, EyeOff, Eye, Wallet, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, Currency, Asset } from '../../types';
import { TRANSLATIONS } from '../../constants/translations';
import { cn } from '../../lib/utils';

interface DashboardScreenProps {
  onSelectAsset: (a: Asset) => void;
  onProfileClick: () => void;
  language: Language;
  currency: Currency;
  assets: Asset[];
  totalNetWorth: string;
  profilePic: string | null;
  showBalance: boolean;
  setShowBalance: (b: boolean) => void;
  onViewAll: () => void;
  onWithdraw: () => void;
  metalUnit: 'gram' | 'bhari';
  setMetalUnit: (u: 'gram' | 'bhari') => void;
  userName: string;
  history: any[];
  onActivityClick: () => void;
}

export const DashboardScreen = ({ 
  onSelectAsset, 
  onProfileClick, 
  language, 
  currency,
  assets,
  totalNetWorth,
  profilePic,
  showBalance,
  setShowBalance,
  onViewAll,
  onWithdraw,
  metalUnit,
  setMetalUnit,
  userName,
  history,
  onActivityClick
}: DashboardScreenProps) => {
  const t = TRANSLATIONS[language];
  const [showNotifications, setShowNotifications] = useState(false);

  const currencySymbol = currency === 'USD' ? '$' : currency === 'BDT' ? '৳' : '₹';

  return (
    <div className="pb-32 relative">
      {/* Notifications Pop-up */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-24 right-6 left-6 z-[60] glass-card rounded-3xl p-6 shadow-2xl border border-gold/20"
          >
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-bold text-lg uppercase tracking-tight">Notifications</h4>
              <button 
                onClick={() => setShowNotifications(false)}
                className="w-8 h-8 rounded-full bg-surface border border-border-custom flex items-center justify-center text-muted hover:text-gold transition-colors"
              >
                <EyeOff className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
              {[
                { title: 'Price Alert', desc: 'Gold has increased by 1.2% in the last 24 hours.', time: '2m ago', icon: <TrendingUp className="w-4 h-4 text-green-400" /> },
                { title: 'Security', desc: 'New login detected from a new device.', time: '1h ago', icon: <Bell className="w-4 h-4 text-gold" /> },
                { title: 'Wallet', desc: 'Your withdrawal of 5.00 Gram Gold was successful.', time: '5h ago', icon: <ArrowDownLeft className="w-4 h-4 text-red-400" /> },
                { title: 'System', desc: 'Welcome to Goldify! Start managing your assets today.', time: '1d ago', icon: <Gem className="w-4 h-4 text-gold" /> },
              ].map((n, i) => (
                <div key={i} className="flex gap-4 p-3 rounded-2xl bg-surface/50 border border-border-custom">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                    {n.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-bold">{n.title}</p>
                      <span className="text-[10px] text-muted font-bold">{n.time}</span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">{n.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="flex justify-between items-center p-6 pt-12 golden-header rounded-b-[32px] mb-6">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onProfileClick}>
          <div className="w-10 h-10 rounded-full bg-current/10 border border-current/20 flex items-center justify-center overflow-hidden">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-6 h-6 opacity-60" />
            )}
          </div>
          <div>
            <p className="text-[10px] opacity-60 uppercase tracking-widest font-bold">{t.welcomeBack}</p>
            <p className="text-sm font-bold">{userName}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <motion.button 
            onClick={() => setShowNotifications(!showNotifications)}
            whileTap={{ scale: 0.9 }}
            className={cn(
              "w-10 h-10 rounded-full bg-current/10 border flex items-center justify-center relative transition-all",
              showNotifications ? "border-current bg-current/20" : "border-current/20 hover:border-current/50"
            )}
          >
            <Bell className="w-5 h-5" />
            {!showNotifications && <span className="absolute top-2 right-2 w-2 h-2 bg-current rounded-full border-2 border-gold"></span>}
          </motion.button>
        </div>
      </header>

      {/* Balance Card */}
      <section className="px-6 mb-8">
        <div className="glass-card rounded-[32px] p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gold/10 blur-[80px] rounded-full -mr-24 -mt-24 transition-all group-hover:bg-gold/20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold/5 blur-[60px] rounded-full -ml-16 -mb-16"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                  <Wallet className="w-4 h-4 text-gold" />
                </div>
                <p className="text-[10px] text-muted uppercase tracking-widest font-bold">{t.totalNetWorth}</p>
              </div>
              <button 
                onClick={() => setShowBalance(!showBalance)}
                className="w-8 h-8 rounded-full bg-surface/50 border border-border-custom flex items-center justify-center text-muted hover:text-gold transition-colors"
              >
                {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
            
            <div className="flex items-baseline gap-2 mb-8">
              <h2 className="text-4xl font-bold tracking-tighter bg-gradient-to-br from-foreground to-muted bg-clip-text text-transparent">
                {showBalance ? `${currencySymbol}${totalNetWorth}` : "••••••••"}
              </h2>
              <span className="text-xs font-bold text-green-400 flex items-center gap-0.5 px-2 py-1 bg-green-400/10 rounded-full">
                <TrendingUp className="w-3 h-3" /> +2.4%
              </span>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={onViewAll}
                className="flex-1 bg-green-500 text-white text-xs font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-green-500/10 active:scale-[0.98] transition-transform"
              >
                <ArrowUpRight className="w-4 h-4" /> {t.buyMore}
              </button>
              <button 
                onClick={onWithdraw}
                className="flex-1 bg-red-500 text-white text-xs font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-red-500/10 active:scale-[0.98] transition-transform"
              >
                <ArrowDownLeft className="w-4 h-4" /> {t.withdraw}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Metal Unit Toggle */}
      <section className="px-6 mb-6">
        <div className="flex bg-surface/50 p-1 rounded-xl border border-border-custom">
          <button 
            onClick={() => setMetalUnit('gram')}
            className={cn(
              "flex-1 py-2 rounded-lg text-xs font-bold transition-all",
              metalUnit === 'gram' ? "bg-gold text-black" : "text-muted hover:text-foreground"
            )}
          >
            {t.gram}
          </button>
          <button 
            onClick={() => setMetalUnit('bhari')}
            className={cn(
              "flex-1 py-2 rounded-lg text-xs font-bold transition-all",
              metalUnit === 'bhari' ? "bg-gold text-black" : "text-muted hover:text-foreground"
            )}
          >
            {t.bhari}
          </button>
        </div>
      </section>

      {/* Assets List */}
      <section className="px-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">{t.yourAssets}</h3>
          <button onClick={onViewAll} className="text-xs text-gold font-medium">{t.viewAll}</button>
        </div>
        <div className="space-y-4">
          {assets.map((asset, index) => {
            const isMetal = asset.id === 'gold' || asset.id === 'silver';
            const rate = currency === 'USD' ? 1 : currency === 'BDT' ? 110 : 83;
            const prices = {
              gold: { gram: 70.25 * rate, bhari: 819.35 * rate },
              silver: { gram: 0.85 * rate, bhari: 9.92 * rate }
            };
            
            let displayPrice = asset.price;
            let displaySymbol = asset.symbol;
            let displayBalance = asset.balance;
            
            if (isMetal) {
              const p = prices[asset.id as 'gold' | 'silver'][metalUnit];
              displayPrice = `${currencySymbol}${p.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
              displaySymbol = metalUnit === 'gram' ? t.gram : t.bhari;
              
              // Convert balance for display if needed
              const balanceInGrams = parseFloat(asset.balance.split(' ')[0]);
              const displayBalanceVal = metalUnit === 'gram' ? balanceInGrams : balanceInGrams / 11.664;
              displayBalance = `${displayBalanceVal.toFixed(2)} ${displaySymbol}`;
            }

            return (
              <motion.div 
                key={asset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectAsset(asset)}
                className="glass-card rounded-2xl p-4 flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor: `${asset.color}20` }}
                  >
                    <img src={asset.image} alt={asset.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <p className="font-bold">{asset.name}</p>
                    <p className="text-[10px] text-muted font-bold uppercase tracking-widest">
                      {showBalance ? displayBalance : "••••••••"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{displayPrice}</p>
                  <p className={cn("text-[10px] font-bold", asset.isPositive ? "text-green-400" : "text-red-400")}>
                    {asset.change}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
