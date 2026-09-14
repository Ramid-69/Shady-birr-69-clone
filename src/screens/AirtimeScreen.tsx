import React, { useState } from 'react';
import { ArrowLeft, Search, Phone, DollarSign, ChevronRight } from 'lucide-react';

interface AirtimeScreenProps {
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

export const AirtimeScreen: React.FC<AirtimeScreenProps> = ({ onBack, onRequestPin }) => {
  const [selectedProvider, setSelectedProvider] = useState<'ethio' | 'safaricom' | null>(null);
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('25');

  const handleTopup = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0 || !phone.trim()) return;

    onRequestPin({
      amount: val,
      receiverName: selectedProvider === 'safaricom' ? 'Safaricom Airtime' : 'Ethio Telecom Airtime',
      receiverAccount: phone.trim(),
      receiverBank: 'Commercial Bank of Ethiopia',
      reason: `${selectedProvider === 'safaricom' ? 'Safaricom' : 'Ethio Telecom'} Airtime Top-Up`,
      type: 'Air Time',
    });
  };

  if (!selectedProvider) {
    // SELECT PROVIDER VIEW matching IMG_20260805_203334_453.jpg
    return (
      <div className="min-h-full w-full bg-neutral-50 flex flex-col justify-between pb-24 text-neutral-800">
        <div>
          <div className="bg-[#8f278f] text-white px-4 py-3 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="p-1 hover:bg-white/10 rounded-full transition-colors active:scale-95"
                title="Back"
              >
                <ArrowLeft size={22} />
              </button>
              <h1 className="text-[18px] font-bold tracking-wide">Select Provider</h1>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-1 hover:bg-white/10 rounded-full transition-colors" title="Search">
                <Search size={20} />
              </button>
              <span className="text-[16px] font-bold">EN</span>
            </div>
          </div>

          <div className="px-4 py-5 space-y-3.5">
            {/* ethioTelecom */}
            <div
              onClick={() => {
                setSelectedProvider('ethio');
                setPhone('0969121369');
              }}
              className="bg-white rounded-2xl p-4 shadow-2xs border border-neutral-200/80 flex items-center justify-between hover:shadow-xs active:scale-[0.99] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img
                    src="/assets/images/es.jpeg"
                    alt="ethioTelecom"
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[16px] font-bold text-neutral-900 leading-tight">
                    ethioTelecom
                  </span>
                  <span className="text-[12px] text-neutral-400 mt-0.5 font-medium">
                    Buy ethio telecom airtime.
                  </span>
                </div>
              </div>
              <ChevronRight size={20} className="text-neutral-400" />
            </div>

            {/* Safaricom */}
            <div
              onClick={() => {
                setSelectedProvider('safaricom');
                setPhone('0712345678');
              }}
              className="bg-white rounded-2xl p-4 shadow-2xs border border-neutral-200/80 flex items-center justify-between hover:shadow-xs active:scale-[0.99] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                  <span className="text-[14px]">S</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[16px] font-bold text-neutral-900 leading-tight">
                    Safaricom
                  </span>
                  <span className="text-[12px] text-neutral-400 mt-0.5 font-medium">
                    Buy safari com airtime.
                  </span>
                </div>
              </div>
              <ChevronRight size={20} className="text-neutral-400" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // TOP-UP VIEW matching IMG_20260805_203334_312.jpg
  const isSafaricom = selectedProvider === 'safaricom';
  const providerTitle = isSafaricom ? 'Safaricom Airtime' : 'ethioTelecom Airtime';
  const buttonTitle = isSafaricom ? 'Safaricom TopUp' : 'ethioTelecom TopUp';

  return (
    <div className="min-h-full w-full bg-neutral-50 flex flex-col justify-between pb-24 text-neutral-800">
      <div>
        <div className="bg-[#8f278f] text-white px-4 py-3 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedProvider(null)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors active:scale-95"
              title="Back"
            >
              <ArrowLeft size={22} />
            </button>
            <h1 className="text-[18px] font-bold tracking-wide">{providerTitle}</h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-1 hover:bg-white/10 rounded-full transition-colors" title="Search">
              <Search size={20} />
            </button>
            <span className="text-[16px] font-bold">EN</span>
          </div>
        </div>

        {/* Top-up Form matching IMG_20260805_203334_312.jpg */}
        <form onSubmit={handleTopup} className="px-4 py-5 space-y-4">
          {/* Phone Number */}
          <div>
            <label className="block text-[12px] font-bold text-neutral-800 mb-1">
              * Phone Number
            </label>
            <div className="w-full h-14 bg-white rounded-xl border border-neutral-300 px-3.5 flex items-center gap-3 shadow-2xs focus-within:ring-2 focus-within:ring-[#8f278f]">
              <div className="w-8 h-8 rounded-lg bg-[#8f278f] text-white flex items-center justify-center">
                <Phone size={16} />
              </div>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="flex-1 text-sm font-semibold text-neutral-900 outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-[12px] font-bold text-neutral-800 mb-1">
              * Amount
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

            {/* Presets: 25, 50, 100, 500 matching screenshot */}
            <div className="grid grid-cols-4 gap-2 mt-3">
              {['25', '50', '100', '500'].map((preset) => {
                const isSelected = amount === preset;
                return (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset)}
                    className={`h-11 rounded-xl text-sm font-bold transition-all border ${
                      isSelected
                        ? 'bg-[#8f278f] text-white border-[#8f278f] shadow-xs'
                        : 'bg-white text-neutral-800 border-neutral-200 hover:bg-purple-50'
                    }`}
                  >
                    {preset}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Purple TopUp button */}
          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-[#8f278f] hover:bg-[#7a1f7a] active:bg-[#681868] text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-6"
          >
            <span>{buttonTitle}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
