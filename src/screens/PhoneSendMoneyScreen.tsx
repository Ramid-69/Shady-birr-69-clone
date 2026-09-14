import React, { useState } from 'react';
import { ArrowLeft, Search, Phone, HelpCircle, Grid } from 'lucide-react';

interface PhoneSendMoneyScreenProps {
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

export const PhoneSendMoneyScreen: React.FC<PhoneSendMoneyScreenProps> = ({
  onBack,
  onRequestPin,
}) => {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0 || !phone.trim()) return;

    onRequestPin({
      amount: val,
      receiverName: 'Fraol Endale Wagari',
      receiverAccount: phone.trim(),
      receiverBank: 'Commercial Bank of Ethiopia (CBEBirr)',
      reason: reason || 'Send Money (ok)',
      type: 'Send Money',
    });
  };

  return (
    <div className="min-h-full w-full bg-neutral-50 flex flex-col justify-between pb-24 text-neutral-800">
      {/* Top Header matching IMG_20260805_203326_751.jpg */}
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
            <h1 className="text-[18px] font-bold tracking-wide">Send Money</h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-1 hover:bg-white/10 rounded-full transition-colors" title="Search">
              <Search size={20} />
            </button>
            <span className="text-[16px] font-bold">EN</span>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="px-4 py-5 space-y-4">
          {/* Receivers Phone */}
          <div>
            <label className="block text-[12px] font-bold text-neutral-800 mb-1">
              * Receivers Phone
            </label>
            <div className="w-full h-14 bg-white rounded-xl border border-neutral-300 px-3.5 flex items-center gap-3 shadow-2xs focus-within:ring-2 focus-within:ring-[#8f278f]">
              <div className="text-[#8f278f]">
                <Phone size={20} />
              </div>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Receivers Phone"
                className="flex-1 text-sm font-semibold text-neutral-900 outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setPhone('0911223344')}
                className="text-neutral-400 hover:text-[#8f278f]"
                title="Select Contact"
              >
                <Grid size={18} />
              </button>
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-[12px] font-bold text-neutral-800 mb-1">
              * Amount
            </label>
            <div className="w-full h-14 bg-white rounded-xl border border-neutral-300 px-3.5 flex items-center gap-3 shadow-2xs focus-within:ring-2 focus-within:ring-[#8f278f]">
              <div className="text-[#8f278f] font-bold text-lg pl-1">
                $
              </div>
              <input
                type="number"
                step="any"
                min="1"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                className="flex-1 text-sm font-semibold text-neutral-900 outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-[12px] font-bold text-neutral-800 mb-1">Reason</label>
            <div className="w-full h-14 bg-white rounded-xl border border-neutral-300 px-3.5 flex items-center gap-3 shadow-2xs focus-within:ring-2 focus-within:ring-[#8f278f]">
              <div className="text-[#8f278f]">
                <HelpCircle size={20} />
              </div>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Reason"
                className="flex-1 text-sm font-medium text-neutral-900 outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Send Money Button */}
          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-[#8f278f] hover:bg-[#7a1f7a] active:bg-[#681868] text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-6"
          >
            <span>Send Money</span>
          </button>
        </form>
      </div>
    </div>
  );
};
