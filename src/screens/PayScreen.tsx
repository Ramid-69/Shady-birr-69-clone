import React, { useState } from 'react';
import {
  Search,
  Receipt,
  Car,
  Zap,
  Droplets,
  Phone,
  HeartHandshake,
  ChevronRight,
} from 'lucide-react';
import { PayItem } from '../types';

interface PayScreenProps {
  language: string;
  onToggleLanguage: () => void;
  onSelectPayItem: (name: string, about: string) => void;
}

const PAY_ITEMS: PayItem[] = [
  {
    index: '1',
    name: 'Pay Bill',
    about: 'To pay your school, entertainment, and government utilities',
    iconName: 'Receipt',
  },
  {
    index: '2',
    name: 'Traffic Penalty',
    about: 'To pay your traffic penalty, please use this section',
    iconName: 'Car',
  },
  {
    index: '3',
    name: 'Electricity',
    about: 'To settle your electric bill utility, use this section',
    iconName: 'Zap',
  },
  {
    index: '4',
    name: 'Water Supply',
    about: 'To close your monthly household water consumption, use this section',
    iconName: 'Droplets',
  },
  {
    index: '5',
    name: 'Telecom',
    about: 'To pay month,daily or yearly telecoms, use this section',
    iconName: 'Phone',
  },
  {
    index: '6',
    name: 'Fundraising',
    about: 'Donate,give to those who have no one.Help non-profit organizations to flourish',
    iconName: 'HeartHandshake',
  },
];

const renderPayIcon = (iconName: string) => {
  const props = { size: 22, className: 'text-white' };
  switch (iconName) {
    case 'Receipt':
      return <Receipt {...props} />;
    case 'Car':
      return <Car {...props} />;
    case 'Zap':
      return <Zap {...props} />;
    case 'Droplets':
      return <Droplets {...props} />;
    case 'Phone':
      return <Phone {...props} />;
    case 'HeartHandshake':
      return <HeartHandshake {...props} />;
    default:
      return <Receipt {...props} />;
  }
};

export const PayScreen: React.FC<PayScreenProps> = ({
  language,
  onToggleLanguage,
  onSelectPayItem,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);

  const filteredItems = PAY_ITEMS.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.about.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-full flex flex-col bg-neutral-100 pb-24">
      {/* Top Header */}
      <div className="bg-[#8f278f] text-white px-4 py-3 flex items-center justify-between shadow-md">
        <button
          onClick={() => setShowSearchInput(!showSearchInput)}
          className="p-1 hover:bg-white/10 rounded-full transition-colors"
          title="Search"
        >
          <Search size={22} />
        </button>

        <h1 className="text-[18px] font-bold tracking-wide">Pay Bill</h1>

        <button
          onClick={onToggleLanguage}
          className="text-[16px] font-medium px-2 py-1 hover:bg-white/10 rounded-md transition-colors"
        >
          {language}
        </button>
      </div>

      {/* Search Input Bar (collapsible) */}
      {showSearchInput && (
        <div className="p-3 bg-white border-b border-neutral-200">
          <input
            type="text"
            placeholder="Search pay services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8f278f]"
            autoFocus
          />
        </div>
      )}

      {/* List Content */}
      <div className="flex-1 px-4 py-4 space-y-3">
        {filteredItems.map((item) => (
          <div
            key={item.index}
            onClick={() => onSelectPayItem(item.name, item.about)}
            className="bg-white rounded-lg p-3.5 shadow-xs border border-neutral-200/70 flex items-center justify-between hover:shadow-md active:scale-[0.99] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3.5 flex-1 pr-2">
              {/* Circular purple icon container */}
              <div className="w-11 h-11 rounded-full bg-[#8f278f] flex-shrink-0 flex items-center justify-center shadow-xs">
                {renderPayIcon(item.iconName)}
              </div>

              {/* Text content */}
              <div className="flex flex-col">
                <span className="text-[15px] font-bold text-neutral-900 leading-tight">
                  {item.name}
                </span>
                <span className="text-[11px] font-medium text-neutral-600 leading-snug mt-1 line-clamp-2">
                  {item.about}
                </span>
              </div>
            </div>

            <ChevronRight size={20} className="text-[#8f278f] flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
