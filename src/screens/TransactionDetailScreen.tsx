import React from 'react';
import { ArrowLeft, Search, ChevronRight } from 'lucide-react';

interface TransactionDetailScreenProps {
  onBack: () => void;
  onOpenRecent: () => void;
  onOpenMiniStatement: () => void;
}

export const TransactionDetailScreen: React.FC<TransactionDetailScreenProps> = ({
  onBack,
  onOpenRecent,
  onOpenMiniStatement,
}) => {
  return (
    <div className="min-h-full w-full bg-neutral-50 flex flex-col justify-between pb-24 text-neutral-800">
      <div>
        {/* Top Header matching IMG_20260805_203334_249.jpg */}
        <div className="bg-[#8f278f] text-white px-4 py-3 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1 hover:bg-white/10 rounded-full transition-colors active:scale-95"
              title="Back"
            >
              <ArrowLeft size={22} />
            </button>
            <h1 className="text-[18px] font-bold tracking-wide">Transaction Detail</h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-1 hover:bg-white/10 rounded-full transition-colors" title="Search">
              <Search size={20} />
            </button>
            <span className="text-[16px] font-bold">EN</span>
          </div>
        </div>

        {/* Options List matching screenshot */}
        <div className="px-4 py-5 space-y-3.5">
          {/* Card 1: Recent Transactions */}
          <div
            onClick={onOpenRecent}
            className="bg-white rounded-2xl p-4 shadow-2xs border border-neutral-200/80 flex items-center justify-between hover:shadow-xs active:scale-[0.99] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                <img
                  src="/assets/images/cbe_logo.jpg"
                  alt="CBE"
                  className="w-10 h-10 object-contain rounded"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[16px] font-bold text-neutral-900 leading-tight">
                  Recent Transactions
                </span>
                <span className="text-[12px] text-neutral-400 mt-0.5 font-medium">
                  Review your recent transactions.
                </span>
              </div>
            </div>
            <ChevronRight size={20} className="text-neutral-400" />
          </div>

          {/* Card 2: Mini Statement */}
          <div
            onClick={onOpenMiniStatement}
            className="bg-white rounded-2xl p-4 shadow-2xs border border-neutral-200/80 flex items-center justify-between hover:shadow-xs active:scale-[0.99] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                <img
                  src="/assets/images/cbe_logo.jpg"
                  alt="CBE"
                  className="w-10 h-10 object-contain rounded"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[16px] font-bold text-neutral-900 leading-tight">
                  Mini Statement
                </span>
                <span className="text-[12px] text-neutral-400 mt-0.5 font-medium">
                  Get your mini statement.
                </span>
              </div>
            </div>
            <ChevronRight size={20} className="text-neutral-400" />
          </div>
        </div>
      </div>
    </div>
  );
};
