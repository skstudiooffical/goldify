import { useState, useMemo, useEffect } from 'react';
import { Screen, Asset, Language, Theme, Currency, TransactionType } from '../types';
import { TRANSLATIONS } from '../constants/translations';
import { ASSETS } from '../constants/mockData';

export const useGoldify = () => {
  const [screen, setScreen] = useState<Screen>('login');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [language, setLanguage] = useState<Language>('English');
  const [theme, setTheme] = useState<Theme>('dark');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [transactionType, setTransactionType] = useState<TransactionType>('buy');
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [userName, setUserName] = useState('Alex Rivera');
  const [userEmail, setUserEmail] = useState('thisisshimulemail@gmail.com');
  const [userPhone, setUserPhone] = useState('+880 1700 000000');
  const [paymentMethod, setPaymentMethod] = useState('bKash');
  const [paymentNumber, setPaymentNumber] = useState('01700000000');
  const [showBalance, setShowBalance] = useState(true);
  const [metalUnit, setMetalUnit] = useState<'gram' | 'bhari'>('gram');
  const [history, setHistory] = useState<any[]>([]);
  const [userBalances, setUserBalances] = useState<Record<string, number>>({
    gold: 0,
    silver: 0,
    bitcoin: 0
  });

  const dynamicAssets = useMemo(() => {
    const t = TRANSLATIONS[language];
    const currencySymbol = currency === 'USD' ? '$' : currency === 'BDT' ? '৳' : '₹';
    const rate = currency === 'USD' ? 1 : currency === 'BDT' ? 110 : 83;

    return ASSETS.map(asset => {
      const basePrice = parseFloat(asset.price.replace(/[^0-9.]/g, ''));
      const convertedPrice = (basePrice * rate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      const balance = userBalances[asset.id] || 0;
      const unit = asset.id === 'bitcoin' ? 'BTC' : 'Gram';
      
      return {
        ...asset,
        name: t[asset.id as keyof typeof t] as string,
        price: `${currencySymbol}${convertedPrice}`,
        balance: `${balance.toFixed(2)} ${unit}`,
        symbol: unit
      };
    });
  }, [language, currency, userBalances]);

  const totalNetWorth = useMemo(() => {
    const rate = currency === 'USD' ? 1 : currency === 'BDT' ? 110 : 83;
    let total = 0;
    ASSETS.forEach(asset => {
      const basePrice = parseFloat(asset.price.replace(/[^0-9.]/g, ''));
      const balance = userBalances[asset.id] || 0;
      total += basePrice * balance * rate;
    });
    return total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }, [currency, userBalances]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }, [theme]);

  const handleSelectAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setScreen('detail');
  };

  const handleTrade = (type: TransactionType) => {
    setTransactionType(type);
    setScreen('transaction');
  };

  const handleConfirmTransaction = (amount: number, unit: string) => {
    if (!selectedAsset) return;
    
    let amountInGrams = amount;
    if (unit === 'bhari' || unit === 'ভরি' || unit === 'भरी') {
      amountInGrams = amount * 11.664;
    }
    
    setUserBalances(prev => ({
      ...prev,
      [selectedAsset.id]: transactionType === 'buy' 
        ? prev[selectedAsset.id] + amountInGrams 
        : Math.max(0, prev[selectedAsset.id] - amountInGrams)
    }));
    
    setScreen('dashboard');
    
    setHistory(prev => [{
      id: Math.random().toString(36).substr(2, 9),
      type: transactionType,
      asset: selectedAsset.name,
      amount: `${amount.toFixed(2)} ${unit}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Completed',
      price: `${currency === 'USD' ? '$' : currency === 'BDT' ? '৳' : '₹'}${(amount * parseFloat(selectedAsset.price.replace(/[^0-9.]/g, ''))).toLocaleString()}`
    }, ...prev]);
  };

  const handleWithdrawConfirm = (amount: number, assetId: string, unit: string) => {
    let amountInGrams = amount;
    if (unit === 'bhari' || unit === 'ভরি' || unit === 'भरी') {
      amountInGrams = amount * 11.664;
    }
    
    setUserBalances(prev => ({
      ...prev,
      [assetId]: Math.max(0, (prev[assetId] || 0) - amountInGrams)
    }));
    
    setScreen('dashboard');

    const asset = dynamicAssets.find(a => a.id === assetId);
    setHistory(prev => [{
      id: Math.random().toString(36).substr(2, 9),
      type: 'withdraw',
      asset: asset?.name || 'Asset',
      amount: `${amount.toFixed(2)} ${unit}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      price: `${currency === 'USD' ? '$' : currency === 'BDT' ? '৳' : '₹'}${(amount * parseFloat(asset?.price.replace(/[^0-9.]/g, '') || '0')).toLocaleString()}`
    }, ...prev]);
  };

  return {
    screen, setScreen,
    selectedAsset, setSelectedAsset,
    language, setLanguage,
    theme, setTheme,
    currency, setCurrency,
    transactionType, setTransactionType,
    profilePic, setProfilePic,
    userName, setUserName,
    userEmail, setUserEmail,
    userPhone, setUserPhone,
    paymentMethod, setPaymentMethod,
    paymentNumber, setPaymentNumber,
    showBalance, setShowBalance,
    metalUnit, setMetalUnit,
    history, setHistory,
    userBalances, setUserBalances,
    dynamicAssets,
    totalNetWorth,
    handleSelectAsset,
    handleTrade,
    handleConfirmTransaction,
    handleWithdrawConfirm
  };
};
