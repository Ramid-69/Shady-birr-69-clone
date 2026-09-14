import React, { useState } from 'react';
import { ArrowLeft, Search, ChevronRight, Check } from 'lucide-react';

interface AirtimePackageScreenProps {
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

export const AirtimePackageScreen: React.FC<AirtimePackageScreenProps> = ({
  onBack,
  onRequestPin,
}) => {
  const [selectedTarget, setSelectedTarget] = useState<'self' | 'other' | null>(null);
  const [targetPhone, setTargetPhone] = useState('0969121369');
  const [packageType, setPackageType] = useState<'voice' | 'internet' | 'combo'>('internet');

  const packages = [
    { id: 'pkg-1', name: 'Daily Unlimited Internet', price: 65, duration: '24 Hours', data: 'Unlimited' },
    { id: 'pkg-2', name: 'Weekly 5GB + 60 Mins', price: 210, duration: '7 Days', data: '5 GB' },
    { id: 'pkg-3', name: 'Monthly 20GB Data Package', price: 650, duration: '30 Days', data: '20 GB' },
    { id: 'pkg-4', name: 'Weekly Voice 120 Minutes', price: 90, duration: '7 Days', data: '120 Mins' },
  ];

  const handlePurchase = (pkg: typeof packages[0]) => {
    onRequestPin({
      amount: pkg.price,
      receiverName: selectedTarget === 'self' ? 'My Phone Package' : `Package for ${targetPhone}`,
      receiverAccount: targetPhone,
      receiverBank: 'Ethio Telecom',
      reason: `Ethio Telecom ${pkg.name}`,
      type: 'Air Time Package',
    });
  };

  if (!selectedTarget) {
    // MAIN VIEW matching IMG_20260805_203334_236.jpg
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
              <h1 className="text-[18px] font-bold tracking-wide">Airtime Package</h1>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-1 hover:bg-white/10 rounded-full transition-colors" title="Search">
                <Search size={20} />
              </button>
              <span className="text-[16px] font-bold">EN</span>
            </div>
          </div>

          <div className="px-4 py-5 space-y-3.5">
            {/* Buy package for yourself */}
            <div
              onClick={() => {
                setSelectedTarget('self');
                setTargetPhone('0969121369');
              }}
              className="bg-white rounded-2xl p-4 shadow-2xs border border-neutral-200/80 flex items-center justify-between hover:shadow-xs active:scale-[0.99] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
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
                    Buy package for yourself
                  </span>
                  <span className="text-[12px] text-neutral-400 mt-0.5 font-medium">
                    Ethio telecom package for self phone number.
                  </span>
                </div>
              </div>
              <ChevronRight size={20} className="text-neutral-400" />
            </div>

            {/* Buy package for others */}
            <div
              onClick={() => {
                setSelectedTarget('other');
                setTargetPhone('');
              }}
              className="bg-white rounded-2xl p-4 shadow-2xs border border-neutral-200/80 flex items-center justify-between hover:shadow-xs active:scale-[0.99] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
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
                    Buy package for others
                  </span>
                  <span className="text-[12px] text-neutral-400 mt-0.5 font-medium">
                    Ethio telecom package for other phone number.
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

  // Package Choice View
  return (
    <div className="min-h-full w-full bg-neutral-50 flex flex-col justify-between pb-24 text-neutral-800">
      <div>
        <div className="bg-[#8f278f] text-white px-4 py-3 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedTarget(null)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors active:scale-95"
              title="Back"
            >
              <ArrowLeft size={22} />
            </button>
            <h1 className="text-[18px] font-bold tracking-wide">
              {selectedTarget === 'self' ? 'Package for Self' : 'Package for Others'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[16px] font-bold">EN</span>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {selectedTarget === 'other' && (
            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1">
                Recipient Phone Number
              </label>
              <input
                type="tel"
                placeholder="09XXXXXXXX"
                value={targetPhone}
                onChange={(e) => setTargetPhone(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#8f278f]"
              />
            </div>
          )}

          <div className="space-y-3">
            <span className="text-xs font-extrabold text-neutral-700 tracking-wide block">
              Available Bundles
            </span>
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => handlePurchase(pkg)}
                className="bg-white rounded-2xl p-3.5 border border-neutral-200/80 flex items-center justify-between hover:border-[#8f278f] hover:shadow-xs transition-all cursor-pointer"
              >
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">{pkg.name}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-1">
                    <span>{pkg.duration}</span>
                    <span>•</span>
                    <span className="font-semibold text-[#8f278f]">{pkg.data}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-neutral-900 block">
                    ETB {pkg.price}
                  </span>
                  <span className="text-[10px] text-[#8f278f] font-bold">Buy Now</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
