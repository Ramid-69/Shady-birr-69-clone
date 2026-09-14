import React, { useState } from 'react';
import { ArrowLeft, Search, Heart, DollarSign } from 'lucide-react';

interface MekedoniaScreenProps {
  onBack: () => void;
  onRequestPin: (payload: {
    amount: number;
    receiverName: string;
    receiverAccount: string;
    receiverBank: string;
    reason?: string;
    type?: string;
  }) => void;
}

export const MekedoniaScreen: React.FC<MekedoniaScreenProps> = ({ onBack, onRequestPin }) => {
  const [amount, setAmount] = useState('100');
  const [note, setNote] = useState('Charity Donation');

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return;

    onRequestPin({
      amount: val,
      receiverName: 'Mekedonia Charity Association',
      receiverAccount: '1000008271018',
      receiverBank: 'Commercial Bank of Ethiopia',
      reason: note || 'Donation to Mekedonia',
      type: 'Donation',
    });
  };

  return (
    <div className="min-h-full w-full bg-neutral-50 flex flex-col justify-between pb-24 text-neutral-800">
      <div>
        {/* Header matching IMG_20260805_203326_817.jpg */}
        <div className="bg-[#8f278f] text-white px-4 py-3 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1 hover:bg-white/10 rounded-full transition-colors active:scale-95"
              title="Back"
            >
              <ArrowLeft size={22} />
            </button>
            <h1 className="text-[18px] font-bold tracking-wide">Mekedonia</h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-1 hover:bg-white/10 rounded-full transition-colors" title="Search">
              <Search size={20} />
            </button>
            <span className="text-[16px] font-bold">EN</span>
          </div>
        </div>

        {/* Charity Banner & Donation Form */}
        <div className="px-4 py-5 space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-neutral-200 shadow-2xs flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-2">
              <Heart size={32} className="fill-amber-500 text-amber-600" />
            </div>
            <h3 className="text-base font-bold text-neutral-900">
              Mekedonia Homes for the Elderly & Mentally Disabled
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Commercial Bank of Ethiopia Verified Charity Partner
            </p>
          </div>

          <form onSubmit={handleDonate} className="space-y-4">
            <div>
              <label className="block text-[12px] font-bold text-neutral-800 mb-1">
                * Enter Donation Amount (ETB)
              </label>
              <div className="w-full h-14 bg-white rounded-xl border border-neutral-300 px-3.5 flex items-center gap-3 shadow-2xs focus-within:ring-2 focus-within:ring-[#8f278f]">
                <span className="text-[#8f278f] font-bold text-lg pl-1">$</span>
                <input
                  type="number"
                  step="any"
                  min="5"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount"
                  className="flex-1 text-base font-bold text-neutral-900 outline-none bg-transparent"
                />
              </div>

              <div className="grid grid-cols-4 gap-2 mt-2.5">
                {['50', '100', '200', '500'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset)}
                    className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                      amount === preset
                        ? 'bg-[#8f278f] text-white border-[#8f278f]'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-neutral-800 mb-1">
                Dedication Note
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. In memory of family / blessing"
                className="w-full px-3.5 py-3 text-sm bg-white border border-neutral-300 rounded-xl outline-none focus:ring-2 focus:ring-[#8f278f]"
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-[#8f278f] hover:bg-[#7a1f7a] active:bg-[#681868] text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <Heart size={16} />
              <span>Donate to Mekedonia</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
