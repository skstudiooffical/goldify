export type Screen = 'login' | 'signup' | 'dashboard' | 'detail' | 'wallet' | 'activity' | 'profile' | 'transaction' | 'assets_list' | 'withdraw' | 'support' | 'scanner' | 'forgot_password';
export type TransactionType = 'buy' | 'sell';
export type Language = 'English' | 'Bangla' | 'Hindi';
export type Theme = 'dark' | 'light';
export type Currency = 'USD' | 'BDT' | 'INR';

export type Asset = {
  id: string;
  name: string;
  symbol: string;
  price: string;
  change: string;
  isPositive: boolean;
  balance: string;
  image: string;
  color: string;
};

export type Transaction = {
  id: string;
  assetId: string;
  type: TransactionType;
  amount: string;
  price: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
};
