import React, { useState } from 'react';
import { ChevronRight, Eye, EyeOff } from 'lucide-react';
import { Language, Currency, Asset } from '../../types';
import { TRANSLATIONS } from '../../constants/translations';
import { cn } from '../../lib/utils';

interface WithdrawScreenProps {
  onBack: () => void;
  language: Language;
  currency: Currency;
  onConfirm: (amount: number, assetId: string, unit: string) => void;
  assets: Asset[];
}

export const WithdrawScreen = ({ 
  onBack, 
  language, 
  currency,
  onConfirm,
  assets
}: WithdrawScreenProps) => {
  const t = TRANSLATIONS[language];
  const [selectedAsset, setSelectedAsset] = useState<Asset>(assets[0]);
  const [unit, setUnit] = useState<'gram' | 'bhari'>(selectedAsset.id === 'bitcoin' ? 'gram' : 'gram');
  const [quantity, setQuantity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [paymentAccount, setPaymentAccount] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isMetal = selectedAsset.id === 'gold' || selectedAsset.id === 'silver';
  const currencySymbol = currency === 'USD' ? '$' : currency === 'BDT' ? '৳' : '₹';

  const paymentMethods = [
    { id: 'bkash', name: 'bKash', icon: 'https://raw.githubusercontent.com/T-Shimul/Aureum-Assets/main/bkash.png' },
    { id: 'nagad', name: 'Nagad', icon: 'https://raw.githubusercontent.com/T-Shimul/Aureum-Assets/main/nagad.png' },
    { id: 'upaya', name: 'Upaya', icon: 'https://raw.githubusercontent.com/T-Shimul/Aureum-Assets/main/upaya.png' },
    { id: 'binance', name: 'Binance', icon: 'https://raw.githubusercontent.com/T-Shimul/Aureum-Assets/main/binance.png' },
    { id: 'visa', name: 'Visa Card', icon: 'https://raw.githubusercontent.com/T-Shimul/Aureum-Assets/main/visa.png' },
    { id: 'mastercard', name: 'Master Card', icon: 'https://raw.githubusercontent.com/T-Shimul/Aureum-Assets/main/mastercard.png' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="flex items-center p-6 pt-12 golden-header rounded-b-[32px] mb-6">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-current/10 border border-current/20 flex items-center justify-center mr-4 opacity-60">
          <ChevronRight className="w-5 h-5 rotate-180" />
        </button>
        <h3 className="font-bold text-xl uppercase tracking-tight">{t.withdraw}</h3>
      </header>

      <div className="flex-1 px-6 py-8 overflow-y-auto space-y-8">
        {/* Asset Selection */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">Select Asset</label>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {assets.map((asset) => (
              <button
                key={asset.id}
                onClick={() => {
                  setSelectedAsset(asset);
                  if (asset.id === 'bitcoin') setUnit('gram');
                }}
                className={cn(
                  "flex-shrink-0 px-6 py-4 rounded-2xl border transition-all flex items-center gap-3",
                  selectedAsset.id === asset.id 
                    ? "bg-gold/10 border-gold shadow-lg shadow-gold/5" 
                    : "bg-surface border-border-custom text-muted"
                )}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img src={asset.image} alt={asset.name} className="w-full h-full object-cover" />
                </div>
                <span className={cn("font-bold", selectedAsset.id === asset.id ? "text-gold" : "text-foreground")}>
                  {asset.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">{t.paymentMethod}</label>
          <div className="grid grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={cn(
                  "p-4 rounded-2xl border transition-all flex flex-col items-center gap-3",
                  paymentMethod === method.id 
                    ? "bg-gold/10 border-gold shadow-lg shadow-gold/5" 
                    : "bg-surface border-border-custom grayscale opacity-50"
                )}
              >
                <img src={method.icon} alt={method.name} className="h-8 object-contain" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{method.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Amount Input */}
        <div className="glass-card rounded-3xl p-8 text-center">
          <p className="text-[10px] text-muted uppercase tracking-widest font-bold mb-4">{t.quantity}</p>
          <div className="flex items-center justify-center gap-2 mb-4">
            <input 
              type="number" 
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="0.00"
              className="bg-transparent text-5xl font-bold text-center w-full focus:outline-none placeholder:text-muted/30"
            />
            <span className="text-xl font-bold text-gold">
              {isMetal ? (unit === 'gram' ? t.gram : t.bhari) : selectedAsset.symbol}
            </span>
          </div>

          {isMetal && (
            <div className="flex bg-surface/50 p-1 rounded-xl border border-border-custom">
              <button 
                onClick={() => setUnit('gram')}
                className={cn(
                  "flex-1 py-2 rounded-lg text-xs font-bold transition-all",
                  unit === 'gram' ? "bg-gold text-black" : "text-muted hover:text-foreground"
                )}
              >
                {t.gram}
              </button>
              <button 
                onClick={() => setUnit('bhari')}
                className={cn(
                  "flex-1 py-2 rounded-lg text-xs font-bold transition-all",
                  unit === 'bhari' ? "bg-gold text-black" : "text-muted hover:text-foreground"
                )}
              >
                {t.bhari}
              </button>
            </div>
          )}
        </div>

        {/* Payment Account */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">{t.paymentAccount}</label>
          <input 
            type="text" 
            placeholder="Enter account number" 
            value={paymentAccount}
            onChange={(e) => setPaymentAccount(e.target.value)}
            className="w-full bg-surface border border-border-custom rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-gold/50 transition-colors text-foreground"
          />
        </div>

        {/* Password Confirmation */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">{t.enterPassword}</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        <button 
          onClick={() => onConfirm(parseFloat(quantity), selectedAsset.id, isMetal ? unit : selectedAsset.symbol)}
          disabled={!quantity || !paymentMethod || !paymentAccount || !password}
          className="w-full gold-gradient text-black font-bold py-4 rounded-2xl shadow-xl shadow-gold/10 active:scale-[0.98] transition-transform disabled:opacity-50"
        >
          {t.confirm}
        </button>
      </div>
    </div>
  );
};
