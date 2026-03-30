import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, Currency, Asset, TransactionType } from '../../types';
import { TRANSLATIONS } from '../../constants/translations';
import { cn } from '../../lib/utils';

interface TransactionScreenProps {
  asset: Asset;
  type: TransactionType;
  onBack: () => void;
  language: Language;
  currency: Currency;
  onConfirm: (amount: number, unit: string) => void;
  showBalance: boolean;
}

export const TransactionScreen = ({ 
  asset, 
  type, 
  onBack, 
  language, 
  currency,
  onConfirm,
  showBalance
}: TransactionScreenProps) => {
  const t = TRANSLATIONS[language];
  const [step, setStep] = useState<'input' | 'payment'>('input');
  const [unit, setUnit] = useState<'gram' | 'bhari'>(asset.id === 'gold' || asset.id === 'silver' ? 'gram' : 'gram');
  const [quantity, setQuantity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState('');

  const isMetal = asset.id === 'gold' || asset.id === 'silver';
  const rate = currency === 'USD' ? 1 : currency === 'BDT' ? 110 : 83;
  
  // Mock prices per unit
  const prices = {
    gold: { gram: 70.25 * rate, bhari: 819.35 * rate },
    silver: { gram: 0.85 * rate, bhari: 9.92 * rate },
    bitcoin: { gram: 68420 * rate, bhari: 68420 * rate } 
  };

  const currentPrice = isMetal ? prices[asset.id as keyof typeof prices][unit] : parseFloat(asset.price.replace(/[^0-9.]/g, ''));
  const currencySymbol = currency === 'USD' ? '$' : currency === 'BDT' ? '৳' : '₹';
  const displayTotal = quantity ? (parseFloat(quantity) * currentPrice).toFixed(2) : '0.00';

  const paymentMethods = [
    { id: 'bkash', name: 'bKash', icon: 'https://raw.githubusercontent.com/T-Shimul/Aureum-Assets/main/bkash.png' },
    { id: 'nagad', name: 'Nagad', icon: 'https://raw.githubusercontent.com/T-Shimul/Aureum-Assets/main/nagad.png' },
    { id: 'upaya', name: 'Upaya', icon: 'https://raw.githubusercontent.com/T-Shimul/Aureum-Assets/main/upaya.png' },
    { id: 'binance', name: 'Binance', icon: 'https://raw.githubusercontent.com/T-Shimul/Aureum-Assets/main/binance.png' },
    { id: 'visa', name: 'Visa Card', icon: 'https://raw.githubusercontent.com/T-Shimul/Aureum-Assets/main/visa.png' },
    { id: 'mastercard', name: 'Master Card', icon: 'https://raw.githubusercontent.com/T-Shimul/Aureum-Assets/main/mastercard.png' },
  ];

  const handleConfirmBuy = () => {
    if (type === 'buy') {
      setStep('payment');
    } else {
      onConfirm(parseFloat(quantity), isMetal ? unit : asset.symbol);
    }
  };

  const handleFinalConfirm = () => {
    if (transactionId.trim()) {
      onConfirm(parseFloat(quantity), isMetal ? unit : asset.symbol);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="flex items-center p-6 pt-12 golden-header rounded-b-[32px] mb-6">
        <button onClick={step === 'payment' ? () => setStep('input') : onBack} className="w-10 h-10 rounded-full bg-current/10 border border-current/20 flex items-center justify-center mr-4 opacity-60">
          <ChevronRight className="w-5 h-5 rotate-180" />
        </button>
        <h3 className="font-bold text-xl uppercase tracking-tight">
          {step === 'input' ? (type === 'buy' ? t.buy : t.sell) : t.paymentMethod} {asset.name}
        </h3>
      </header>

      <div className="flex-1 px-6 py-8 overflow-y-auto">
        <AnimatePresence mode="wait">
          {step === 'input' ? (
            <motion.div 
              key="input"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="glass-card rounded-3xl p-8 mb-8 text-center">
                <p className="text-[10px] text-muted uppercase tracking-widest font-bold mb-4">{t.quantity}</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="0.00"
                    className="bg-transparent text-5xl font-bold text-center w-full focus:outline-none placeholder:text-muted/30"
                    autoFocus
                  />
                  <span className="text-xl font-bold text-gold">
                    {isMetal ? (unit === 'gram' ? t.gram : t.bhari) : asset.symbol}
                  </span>
                </div>

                {isMetal && (
                  <div className="flex bg-surface/50 p-1 rounded-xl border border-border-custom mb-6">
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

                <div className="space-y-2 pt-6 border-t border-border-custom/50">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted">{t.pricePerUnit}</span>
                    <span className="font-bold">{currencySymbol}{currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted">{t.available}</span>
                    <span className="font-bold text-gold">{showBalance ? asset.balance : "••••••••"}</span>
                  </div>
                </div>
              </div>

              <div className="text-center mb-8">
                <p className="text-[10px] text-muted uppercase tracking-widest font-bold mb-1">Estimated Total</p>
                <h2 className="text-4xl font-bold tracking-tighter">{currencySymbol}{displayTotal}</h2>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={cn(
                      "glass-card p-4 rounded-2xl flex flex-col items-center gap-2 border transition-all",
                      paymentMethod === method.id ? "border-gold bg-gold/5" : "border-border-custom"
                    )}
                  >
                    <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center overflow-hidden">
                      <img src={method.icon} alt={method.name} className="w-8 h-8 object-contain" />
                    </div>
                    <span className="text-xs font-bold">{method.name}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">{t.transactionId}</label>
                <input 
                  type="text" 
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="Enter Transaction ID" 
                  className="w-full bg-surface border border-border-custom rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-gold/50 transition-colors text-foreground"
                />
              </div>

              <div className="glass-card rounded-2xl p-4 flex justify-between items-center">
                <span className="text-xs text-muted">Total to Pay</span>
                <span className="text-xl font-bold text-gold">{currencySymbol}{displayTotal}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-6 pb-12">
        {step === 'input' ? (
          <button 
            disabled={!quantity || parseFloat(quantity) <= 0}
            onClick={handleConfirmBuy}
            className={cn(
              "w-full py-5 rounded-2xl font-bold text-lg shadow-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:scale-100",
              type === 'buy' ? "bg-green-500 text-white shadow-green-500/20" : "bg-red-500 text-white shadow-red-500/20"
            )}
          >
            {t.confirm} {type === 'buy' ? t.buy : t.sell}
          </button>
        ) : (
          <button 
            disabled={!paymentMethod || !transactionId}
            onClick={handleFinalConfirm}
            className="w-full py-5 rounded-2xl font-bold text-lg shadow-xl bg-gold text-black shadow-gold/20 active:scale-[0.98] disabled:opacity-50 disabled:scale-100"
          >
            {t.confirmPayment}
          </button>
        )}
      </div>
    </div>
  );
};
