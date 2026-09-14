import React from 'react';
import { Landmark, ChevronRight, Search } from 'lucide-react';
import { CbeBejeItem } from '../types';

interface CbeBejeScreenProps {
  language: string;
  onToggleLanguage: () => void;
  onSelectItem: (item: CbeBejeItem) => void;
}

const CBE_BEJE_ITEMS: CbeBejeItem[] = [
  {
    index: '1',
    name: 'Micro Saving',
    about: 'Save money and earn 7% interest.',
    rate: '7% Interest',
  },
  {
    index: '2',
    name: 'Micro Loan',
    about: "Let's assist to process a micro loan easily.",
    rate: 'Instant Approval',
  },
  {
    index: '3',
    name: 'Fixed Saving',
    about: 'Earn more interest(8% +) by saving using CBEBirr.',
    rate: '8%+ Interest',
  },
];

export const CbeBejeScreen: React.FC<CbeBejeScreenProps> = ({
  language,
  onToggleLanguage,
  onSelectItem,
}) => {
  return (
    <div className="w-full min-h-full flex flex-col bg-neutral-100 pb-24">
      {/* Top Header */}
      <div className="bg-[#8f278f] text-white px-4 py-3 flex items-center justify-between shadow-md">
        <button
          className="p-1 hover:bg-white/10 rounded-full transition-colors"
          title="Search"
        >
          <Search size={22} />
        </button>

        <h1 className="text-[18px] font-bold tracking-wide">CBEBeje</h1>

        <button
          onClick={onToggleLanguage}
          className="text-[16px] font-medium px-2 py-1 hover:bg-white/10 rounded-md transition-colors"
        >
          {language}
        </button>
      </div>

      {/* Brand Typography Center */}
      <div className="flex flex-col items-center justify-center my-6 text-center">
        <span className="text-[15px] font-bold text-[#9b934a] tracking-wide">
          CBE
        </span>
        <span className="text-[32px] font-black text-neutral-900 leading-none">
          Beje
        </span>
        <span className="text-[12px] text-neutral-500 mt-1 font-medium">
          Digital Micro-finance & Savings Services
        </span>
      </div>

      {/* Items List */}
      <div className="px-4 space-y-3">
        {CBE_BEJE_ITEMS.map((item) => (
          <div
            key={item.index}
            onClick={() => onSelectItem(item)}
            className="bg-white rounded-lg p-3.5 shadow-xs border border-neutral-200/70 flex items-center justify-between hover:shadow-md active:scale-[0.99] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3.5 flex-1 pr-2">
              {/* Peach Circle Container */}
              <div className="w-11 h-11 rounded-full bg-[#f7e7ce] flex-shrink-0 flex items-center justify-center shadow-xs">
                <Landmark size={22} className="text-[#8f278f]" />
              </div>

              {/* Text info */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[16px] font-bold text-neutral-900 leading-tight">
                    {item.name}
                  </span>
                  {item.rate && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#8f278f]/10 text-[#8f278f]">
                      {item.rate}
                    </span>
                  )}
                </div>
                <span className="text-[12px] text-neutral-600 leading-snug mt-1">
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
