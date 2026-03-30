import React from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Language, Currency, Asset } from '../../types';
import { TRANSLATIONS } from '../../constants/translations';
import { cn } from '../../lib/utils';

interface AssetsListScreenProps {
  assets: Asset[];
  onBack: () => void;
  onSelectAsset: (a: Asset) => void;
  language: Language;
  currency: Currency;
  metalUnit: 'gram' | 'bhari';
  showBalance: boolean;
}

export const AssetsListScreen = ({ 
  assets, 
  onBack, 
  onSelectAsset, 
  language, 
  currency,
  metalUnit,
  showBalance
}: AssetsListScreenProps) => {
  const t = TRANSLATIONS[language];
  const currencySymbol = currency === 'USD' ? '$' : currency === 'BDT' ? '৳' : '₹';

  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="flex items-center p-6 pt-12 golden-header rounded-b-[32px] mb-6">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-current/10 border border-current/20 flex items-center justify-center mr-4 opacity-60">
          <ChevronRight className="w-5 h-5 rotate-180" />
        </button>
        <h3 className="font-bold text-xl uppercase tracking-tight">{t.allProducts}</h3>
      </header>

      <div className="px-6 space-y-4">
        {assets.map((asset) => {
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
            
            const balanceInGrams = parseFloat(asset.balance.split(' ')[0]);
            const displayBalanceVal = metalUnit === 'gram' ? balanceInGrams : balanceInGrams / 11.664;
            displayBalance = `${displayBalanceVal.toFixed(2)} ${displaySymbol}`;
          }

          return (
            <motion.div 
              key={asset.id}
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
    </div>
  );
};
