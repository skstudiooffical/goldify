import React, { useState, useMemo } from 'react';
import { ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';
import { Language, Asset, TransactionType } from '../../types';
import { TRANSLATIONS } from '../../constants/translations';
import { cn } from '../../lib/utils';

interface DetailScreenProps {
  asset: Asset;
  onBack: () => void;
  language: Language;
  onTrade: (type: TransactionType) => void;
  showBalance: boolean;
}

export const DetailScreen = ({ 
  asset, 
  onBack, 
  language, 
  onTrade,
  showBalance
}: DetailScreenProps) => {
  const t = TRANSLATIONS[language];
  const [timeframe, setTimeframe] = useState('1Y');
  
  const timeframes = ['1D', '7D', '30D', '1Y', '5Y', '10Y'];

  const chartData = useMemo(() => {
    const points = timeframe === '1D' ? 24 : timeframe === '7D' ? 7 : timeframe === '30D' ? 30 : timeframe === '1Y' ? 12 : timeframe === '5Y' ? 5 : 10;
    const data = [];
    let base = 2000;
    for (let i = 0; i < points; i++) {
      base += Math.random() * 200 - 100;
      data.push({ name: i.toString(), value: base });
    }
    return data;
  }, [timeframe]);

  return (
    <div className="pb-32">
      <header className="flex justify-between items-center p-6 pt-12 golden-header rounded-b-[32px] mb-6">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-current/10 border border-current/20 flex items-center justify-center opacity-60">
          <ChevronRight className="w-5 h-5 rotate-180" />
        </button>
        <h3 className="font-bold">{asset.name}</h3>
        <button className="w-10 h-10 rounded-full bg-current/10 border border-current/20 flex items-center justify-center opacity-60">
          <TrendingUp className="w-5 h-5" />
        </button>
      </header>

      <div className="px-6 text-center mb-8">
        <p className="text-[10px] text-muted uppercase tracking-widest font-bold mb-2">Current Price</p>
        <h2 className="text-5xl font-bold tracking-tighter mb-2">{asset.price}</h2>
        <div className={cn("inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold", asset.isPositive ? "bg-green-400/10 text-green-400" : "bg-red-400/10 text-red-400")}>
          {asset.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {asset.change} (24h)
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="px-6 mb-6">
        <div className="flex bg-surface/50 p-1 rounded-xl border border-border-custom">
          {timeframes.map((tf) => (
            <button 
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={cn(
                "flex-1 py-2 rounded-lg text-[10px] font-bold transition-all",
                timeframe === tf ? "bg-gold text-black" : "text-muted hover:text-foreground"
              )}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 px-2 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={asset.color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={asset.color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--surface)', border: 'none', borderRadius: '12px', fontSize: '12px', color: 'var(--text)' }}
              itemStyle={{ color: 'var(--text)' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={asset.color} 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorValue)" 
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="px-6 grid grid-cols-2 gap-4">
        <div className="glass-card rounded-2xl p-4">
          <p className="text-[10px] text-muted uppercase tracking-widest font-bold mb-1">Your Balance</p>
          <p className="text-lg font-bold">{showBalance ? asset.balance : "••••••••"}</p>
        </div>
        <div className="glass-card rounded-2xl p-4">
          <p className="text-[10px] text-muted uppercase tracking-widest font-bold mb-1">Market Cap</p>
          <p className="text-lg font-bold">$12.4T</p>
        </div>
        <div className="glass-card rounded-2xl p-4">
          <p className="text-[10px] text-muted uppercase tracking-widest font-bold mb-1">24h High</p>
          <p className="text-lg font-bold">$2,192.00</p>
        </div>
        <div className="glass-card rounded-2xl p-4">
          <p className="text-[10px] text-muted uppercase tracking-widest font-bold mb-1">24h Low</p>
          <p className="text-lg font-bold">$2,140.50</p>
        </div>
      </div>

      <div className="fixed bottom-32 left-0 right-0 px-6 flex gap-4">
        <button 
          onClick={() => onTrade('buy')}
          className="flex-1 bg-green-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-green-500/10 active:scale-[0.98] transition-transform"
        >
          {t.buy}
        </button>
        <button 
          onClick={() => onTrade('sell')}
          className="flex-1 bg-red-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-red-500/10 active:scale-[0.98] transition-transform"
        >
          {t.sell}
        </button>
      </div>
    </div>
  );
};
