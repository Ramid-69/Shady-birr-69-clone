import React from 'react';
import {
  ArrowRightLeft,
  Wallet,
  Zap,
  Fuel,
  Building,
  CircleDollarSign,
  MapPin,
  Trophy,
} from 'lucide-react';
import { GridItem } from '../types';

interface GridContent2Props {
  onSelect: (item: GridItem) => void;
}

export const GRID_2_ITEMS: GridItem[] = [
  { id: 'other-bank', text: 'Other Bank Transfer', iconName: 'ArrowRightLeft' },
  { id: 'other-wallet', text: 'Other Wallet Transfer', iconName: 'Wallet' },
  { id: 'quick-pay', text: 'Quick Pay', iconName: 'Zap' },
  { id: 'fuel-pay', text: 'Fuel Pay', iconName: 'Fuel' },
  { id: 'condo-pay', text: 'Condominium Repayment', iconName: 'Building' },
  { id: 'money-request', text: 'Money Request', iconName: 'CircleDollarSign' },
  { id: 'location', text: 'Location', iconName: 'MapPin' },
  { id: 'play-win', text: 'Play and Win', iconName: 'Trophy' },
];

const renderIcon = (name: string) => {
  const props = { size: 24, className: 'text-[#8f278f]' };
  switch (name) {
    case 'ArrowRightLeft':
      return <ArrowRightLeft {...props} />;
    case 'Wallet':
      return <Wallet {...props} />;
    case 'Zap':
      return <Zap {...props} />;
    case 'Fuel':
      return <Fuel {...props} />;
    case 'Building':
      return <Building {...props} />;
    case 'CircleDollarSign':
      return <CircleDollarSign {...props} />;
    case 'MapPin':
      return <MapPin {...props} />;
    case 'Trophy':
      return <Trophy {...props} />;
    default:
      return <Zap {...props} />;
  }
};

export const GridContent2: React.FC<GridContent2Props> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-4 gap-2.5 my-2">
      {GRID_2_ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item)}
          className="bg-white rounded-lg p-2 flex flex-col items-center justify-center text-center shadow-xs border border-neutral-100/80 hover:shadow-md hover:scale-[1.02] active:scale-[0.97] transition-all min-h-[82px]"
        >
          <div className="flex items-center justify-center mb-1.5 h-7">
            {renderIcon(item.iconName)}
          </div>
          <span className="text-[11px] font-bold text-neutral-800 leading-tight line-clamp-2">
            {item.text}
          </span>
        </button>
      ))}
    </div>
  );
};
