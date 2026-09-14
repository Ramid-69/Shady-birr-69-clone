import React, { useState } from 'react';
import { CbeQrCode } from './CbeQrCode';
import { User, QrCode as QrIcon, Check, Copy } from 'lucide-react';

interface CbeQrCardProps {
  mode?: 'pay' | 'personal';
  accountName?: string;
  phoneNumber?: string;
  onClose?: () => void;
}

export const CbeQrCard: React.FC<CbeQrCardProps> = ({
  mode: initialMode = 'pay',
  accountName = 'MUSEL YU***',
  phoneNumber = '251927035376',
}) => {
  const [activeTab, setActiveTab] = useState<'pay' | 'personal'>(initialMode);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(phoneNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-5 sm:p-7 max-w-sm w-full flex flex-col items-center border border-gray-100 select-none">
      {/* Tab Switcher: Scan with CBE Birr vs My QR (Personalize) */}
      <div className="w-full flex items-center p-1 bg-neutral-100 rounded-xl mb-4 text-xs font-bold">
        <button
          onClick={() => setActiveTab('pay')}
          className={`flex-1 py-1.5 rounded-lg transition-all text-center flex items-center justify-center gap-1.5 ${
            activeTab === 'pay'
              ? 'bg-[#8f278f] text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <QrIcon size={14} />
          <span>Scan with CBE Birr</span>
        </button>
        <button
          onClick={() => setActiveTab('personal')}
          className={`flex-1 py-1.5 rounded-lg transition-all text-center flex items-center justify-center gap-1.5 ${
            activeTab === 'personal'
              ? 'bg-[#8f278f] text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <User size={14} />
          <span>Personalize</span>
        </button>
      </div>

      {activeTab === 'pay' ? (
        /* Payment / QR Card Header */
        <div className="text-center mb-4">
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">Scan with CBE Birr</h1>
          <p className="text-xs text-gray-500 mt-1">Point your camera or app to pay</p>
        </div>
      ) : (
        /* Personalize Info Card matching Screenshot_20260912-232946_Chrome.png */
        <div className="w-full bg-[#fbf5fb] border border-[#8f278f]/40 rounded-xl p-3 mb-4 shadow-2xs">
          <div className="grid grid-cols-[80px_1fr] text-[13px] gap-y-1">
            <span className="text-neutral-500 font-medium">Name</span>
            <span className="font-bold text-[#7e257e] tracking-wide">{accountName}</span>
            <span className="text-neutral-500 font-medium">Phone No.</span>
            <div className="flex items-center justify-between">
              <span className="font-bold text-neutral-800 font-mono tracking-tight">{phoneNumber}</span>
              <button
                onClick={handleCopy}
                className="text-[11px] text-[#8f278f] hover:underline flex items-center gap-1 font-semibold cursor-pointer ml-2"
                title="Copy phone number"
              >
                {copied ? (
                  <>
                    <Check size={12} className="text-emerald-600" />
                    <span className="text-emerald-600">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Wrapper matching user specification */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 bg-white rounded-2xl p-2 flex items-center justify-center shadow-inner border border-neutral-200">
        <CbeQrCode size={240} />
      </div>

      {/* Instructions / Footer with Commercial Bank of Ethiopia Badge */}
      <div className="mt-5 flex flex-col items-center w-full">
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-800 bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-200 shadow-2xs">
          <svg className="w-3.5 h-3.5 text-[#8f278f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
            />
          </svg>
          <span className="tracking-wide">Commercial Bank of Ethiopia</span>
        </div>
      </div>
    </div>
  );
};
