import React from 'react';
import {
  Landmark,
  ArrowLeftRight,
  Building2,
  PhoneCall,
  Banknote,
  Wifi,
  CalendarClock,
  Wand2,
} from 'lucide-react';
import { GridItem } from '../types';

interface GridContent1Props {
  onSelect: (item: GridItem) => void;
}

export const GRID_1_ITEMS: GridItem[] = [
  { id: 'linked-bank', text: 'Linked Bank Acct', iconName: 'Landmark' },
  { id: 'send-money', text: 'Send Money', iconName: 'ArrowLeftRight' },
  { id: 'to-cbe', text: 'To CBE Acct', iconName: 'Building2' },
  { id: 'air-time', text: 'Air Time', iconName: 'PhoneCall' },
  { id: 'cash-out', text: 'Cash Out', iconName: 'Banknote' },
  { id: 'airtime-package', text: 'Airtime Package', iconName: 'Wifi' },
  { id: 'scheduled-pay', text: 'Scheduled Pay', iconName: 'CalendarClock' },
  { id: 'magic-pay', text: 'MagicPay', iconName: 'Wand2' },
];

const renderIcon = (name: string) => {
  const props = { size: 24, className: 'text-[#8f278f]' };
  switch (name) {
    case 'Landmark':
      return <Landmark {...props} />;
    case 'ArrowLeftRight':
      return <ArrowLeftRight {...props} />;
    case 'Building2':
      return <Building2 {...props} />;
    case 'PhoneCall':
      return <PhoneCall {...props} />;
    case 'Banknote':
      return <Banknote {...props} />;
    case 'Wifi':
      return <Wifi {...props} />;
    case 'CalendarClock':
      return <CalendarClock {...props} />;
    case 'Wand2':
      return <Wand2 {...props} />;
    default:
      return <Landmark {...props} />;
  }
};

export const GridContent1: React.FC<GridContent1Props> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-4 gap-2.5 my-2">
      {GRID_1_ITEMS.map((item) => (
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
