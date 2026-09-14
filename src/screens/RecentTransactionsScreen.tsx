import React, { useState } from 'react';
import { ArrowLeft, Search, ChevronRight, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Transaction } from '../types';

interface RecentTransactionsScreenProps {
  onBack: () => void;
  onSelectTransaction: (tx: Transaction) => void;
}

export const RecentTransactionsScreen: React.FC<RecentTransactionsScreenProps> = ({
  onBack,
  onSelectTransaction,
}) => {
  const { transactions } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const filtered = transactions.filter(
    (t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.receiverName && t.receiverName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-full w-full bg-neutral-50 flex flex-col justify-between pb-24 text-neutral-800">
      <div>
        {/* Header matching screenshot IMG_20260805_203334_965.jpg */}
        <div className="bg-[#8f278f] text-white px-4 py-3 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1 hover:bg-white/10 rounded-full transition-colors active:scale-95"
              title="Back"
            >
              <ArrowLeft size={22} />
            </button>
            <h1 className="text-[18px] font-bold tracking-wide">Recent Transactions</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSearching(!isSearching)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
              title="Search"
            >
              <Search size={20} />
            </button>
            <span className="text-[16px] font-bold">EN</span>
          </div>
        </div>

        {isSearching && (
          <div className="px-4 py-2 bg-white border-b border-neutral-200">
            <input
              type="text"
              placeholder="Search by name, ID or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8f278f]"
              autoFocus
            />
          </div>
        )}

        {/* Transactions List matching screenshot layout */}
        <div className="divide-y divide-neutral-100 bg-white shadow-2xs">
          {filtered.map((tx) => {
            const isCredit = tx.type === 'credit';
            return (
              <div
                key={tx.id}
                onClick={() => onSelectTransaction(tx)}
                className="px-4 py-3.5 hover:bg-purple-50/40 active:bg-purple-100/40 transition-colors cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isCredit
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-neutral-100 text-[#8f278f]'
                    }`}
                  >
                    {isCredit ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-neutral-900 leading-tight">
                      {tx.title}
                    </span>
                    <span className="text-[11.5px] text-neutral-400 font-medium mt-0.5">
                      {tx.date}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span
                      className={`text-[13.5px] font-bold font-mono ${
                        isCredit ? 'text-emerald-600' : 'text-neutral-900'
                      }`}
                    >
                      {isCredit ? '+' : ''}
                      {tx.amount.toFixed(2)} ETB
                    </span>
                    <span className="block text-[10px] text-neutral-400">Tap for Receipt</span>
                  </div>
                  <ChevronRight size={16} className="text-neutral-300" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
