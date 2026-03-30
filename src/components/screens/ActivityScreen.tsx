import React from 'react';
import { History, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../constants/translations';
import { cn } from '../../lib/utils';

interface ActivityScreenProps {
  language: Language;
  history: any[];
}

export const ActivityScreen = ({ 
  language, 
  history
}: ActivityScreenProps) => {
  const t = TRANSLATIONS[language];
  const recentActivity = history;
  return (
    <div className="pb-32">
      <header className="p-6 pt-12 flex justify-between items-center golden-header rounded-b-[32px] mb-6">
        <h2 className="text-2xl font-bold">{t.activity}</h2>
        <button className="w-10 h-10 rounded-full bg-current/10 border border-current/20 flex items-center justify-center opacity-60">
          <History className="w-5 h-5" />
        </button>
      </header>

      {/* Recent Transactions */}
      <section className="px-6">
        <div className="space-y-4">
          {recentActivity.length > 0 ? (
            recentActivity.map((tx, i) => (
              <div key={i} className="flex justify-between items-center py-4 px-4 bg-surface/30 rounded-2xl border border-border-custom hover:border-gold/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", tx.type === 'buy' ? "bg-green-400/10 text-green-400" : "bg-red-400/10 text-red-400")}>
                    {tx.type === 'buy' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-bold text-sm capitalize">{tx.type} {tx.asset}</p>
                    <p className="text-[10px] text-muted uppercase tracking-widest font-bold">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn("font-bold text-sm", tx.type === 'buy' ? "text-green-400" : "text-foreground")}>
                    {tx.type === 'buy' ? '+' : '-'}{tx.price}
                  </p>
                  <p className="text-[10px] text-muted font-bold">{tx.amount}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-surface/30 rounded-3xl border border-dashed border-border-custom">
              <History className="w-8 h-8 text-muted mx-auto mb-3 opacity-20" />
              <p className="text-xs text-muted font-bold uppercase tracking-widest">No recent activity</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
