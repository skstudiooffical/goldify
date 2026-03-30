import { Asset } from '../types';

export const ASSETS: Asset[] = [
  { 
    id: 'gold', 
    name: 'Gold', 
    symbol: 'Gram', 
    price: '$70.25', 
    change: '+1.24%', 
    isPositive: true, 
    balance: '0.00 Gram',
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=2070&auto=format&fit=crop',
    color: '#D4AF37'
  },
  { 
    id: 'silver', 
    name: 'Silver', 
    symbol: 'Gram', 
    price: '$0.85', 
    change: '-0.45%', 
    isPositive: false, 
    balance: '0.00 Gram',
    image: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?q=80&w=2070&auto=format&fit=crop',
    color: '#C0C0C0'
  },
  { 
    id: 'bitcoin', 
    name: 'Bitcoin', 
    symbol: 'BTC', 
    price: '$68,420.00', 
    change: '+5.67%', 
    isPositive: true, 
    balance: '0.00 BTC',
    image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=032',
    color: '#F7931A'
  },
];

export const CHART_DATA = [
  { time: '00:00', value: 2100 },
  { time: '04:00', value: 2120 },
  { time: '08:00', value: 2110 },
  { time: '12:00', value: 2150 },
  { time: '16:00', value: 2180 },
  { time: '20:00', value: 2175 },
  { time: '23:59', value: 2184 },
];
