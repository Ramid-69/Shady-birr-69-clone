import React, { useState } from 'react';
import { ArrowLeft, Search, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface MiniStatementScreenProps {
  onBack: () => void;
  onOpenStatementList?: () => void;
}

export const MiniStatementScreen: React.FC<MiniStatementScreenProps> = ({ onBack }) => {
  const { transactions } = useApp();
  const [startDate, setStartDate] = useState('2026-04-21');
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerated(true);
  };

  return (
    <div className="min-h-full w-full bg-neutral-50 flex flex-col justify-between pb-24 text-neutral-800">
      <div>
        {/* Header matching IMG_20260805_203334_988.jpg */}
        <div className="bg-[#8f278f] text-white px-4 py-3 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1 hover:bg-white/10 rounded-full transition-colors active:scale-95"
              title="Back"
            >
              <ArrowLeft size={22} />
            </button>
            <h1 className="text-[18px] font-bold tracking-wide">Mini Statement</h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-1 hover:bg-white/10 rounded-full transition-colors" title="Search">
              <Search size={20} />
            </button>
            <span className="text-[16px] font-bold">EN</span>
          </div>
        </div>

        {/* Content Form matching screenshot */}
        <div className="px-4 py-5">
          <h2 className="text-[16px] font-extrabold text-neutral-900 mb-4">Mini Statement</h2>

          <form onSubmit={handleGenerate} className="space-y-4">
            {/* Starting Date */}
            <div>
              <label className="block text-[12px] font-bold text-neutral-800 mb-1">
                * Starting Date
              </label>
              <div className="w-full h-14 bg-white rounded-xl border border-neutral-300 px-3.5 flex items-center justify-between shadow-2xs focus-within:ring-2 focus-within:ring-[#8f278f]">
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="flex-1 text-sm font-semibold text-neutral-800 outline-none bg-transparent"
                />
                <Calendar size={20} className="text-neutral-400" />
              </div>
            </div>

            {/* Ending Date */}
            <div>
              <label className="block text-[12px] font-bold text-neutral-800 mb-1">
                * Ending Date
              </label>
              <div className="w-full h-14 bg-white rounded-xl border border-neutral-300 px-3.5 flex items-center justify-between shadow-2xs focus-within:ring-2 focus-within:ring-[#8f278f]">
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="flex-1 text-sm font-semibold text-neutral-800 outline-none bg-transparent"
                />
                <Calendar size={20} className="text-neutral-400" />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-[#8f278f] hover:bg-[#7a1f7a] active:bg-[#681868] text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-6"
            >
              <FileText size={18} />
              <span>Mini Statement</span>
            </button>
          </form>

          {/* Statement Results View */}
          {generated && (
            <div className="mt-6 bg-white rounded-2xl p-4 border border-neutral-200 shadow-2xs animate-fadeIn">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-2 mb-3">
                <span className="text-xs font-bold text-neutral-700">Statement Period</span>
                <span className="text-[11px] font-semibold text-[#8f278f]">
                  {startDate} to {endDate}
                </span>
              </div>

              <div className="space-y-3">
                {transactions.slice(0, 5).map((tx) => (
                  <div key={tx.id} className="flex justify-between items-center text-xs py-1">
                    <div>
                      <span className="font-bold text-neutral-800 block">{tx.title}</span>
                      <span className="text-[10px] text-neutral-400">{tx.date}</span>
                    </div>
                    <span
                      className={`font-bold font-mono ${
                        tx.type === 'credit' ? 'text-emerald-600' : 'text-neutral-900'
                      }`}
                    >
                      {tx.type === 'credit' ? '+' : '-'}ETB {tx.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
