import React, { useState } from 'react';
import { Shield, RefreshCw, MessageSquare, ChevronDown, Wifi, Battery } from 'lucide-react';

interface LoginScreenProps {
  onGoToAuth: (phone: string) => void;
  language: string;
  onLanguageChange: (lang: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onGoToAuth,
  language,
  onLanguageChange,
}) => {
  // Default phone number from user's screenshot: 987508140
  const [phoneNumber, setPhoneNumber] = useState('987508140');
  const [showUssdModal, setShowUssdModal] = useState(false);
  const [showRatesModal, setShowRatesModal] = useState(false);
  const [showChatbotModal, setShowChatbotModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim().length >= 6) {
      onGoToAuth(phoneNumber);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-[#f5f5f7] text-neutral-800 overflow-hidden select-none font-sans">
      {/* Background Subtle Watermark & Vertical Security Lines matching IMG_20260805_160106_067.jpg */}
      <div className="absolute inset-0 pointer-events-none opacity-45 overflow-hidden z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dashed-grid" width="16" height="24" patternUnits="userSpaceOnUse">
              <line x1="8" y1="0" x2="8" y2="12" stroke="#d5d5de" strokeWidth="1" strokeDasharray="2,3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dashed-grid)" />
          {/* Subtle curved watermark ribbons */}
          <path
            d="M -50,300 C 150,280 200,500 450,420"
            fill="none"
            stroke="#e4e4ed"
            strokeWidth="1.5"
          />
          <path
            d="M 50,200 C 250,350 150,600 480,550"
            fill="none"
            stroke="#ececf2"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Top Right Organic Deep Purple Curve - Exactly matching IMG_20260805_160106_067.jpg */}
      <div className="absolute top-0 right-0 w-48 sm:w-56 h-64 pointer-events-none z-0 overflow-hidden">
        <svg
          viewBox="0 0 200 240"
          className="w-full h-full text-[#7a1f7a] fill-current translate-x-4 -translate-y-4"
        >
          <path d="M70,0 C120,0 200,30 200,90 L200,240 C170,200 130,160 110,120 C85,70 20,40 70,0 Z" />
        </svg>
      </div>

      {/* Top Status Bar matching Android Screenshot */}
      <div className="pt-2 px-5 flex justify-between items-center z-20 text-neutral-800 text-[12px] font-semibold">
        <div className="flex items-center gap-1.5">
          <span>16:25</span>
          {/* Subtle music note */}
          <span className="text-[10px] text-neutral-600">🎵</span>
        </div>
        <div className="flex items-center gap-1.5 text-neutral-800 text-[11px]">
          <span className="text-[10px] font-bold tracking-tighter">4G</span>
          <Wifi size={13} strokeWidth={2.5} />
          <div className="flex items-center gap-0.5">
            <Battery size={15} strokeWidth={2.5} />
            <span className="text-[10px] font-bold">64</span>
          </div>
        </div>
      </div>

      {/* App Bar: English Dropdown */}
      <div className="pt-3 px-5 flex justify-between items-center z-10">
        <div className="relative inline-block">
          <div className="flex items-center gap-1 text-[#7a1f7a] font-bold text-[15px] cursor-pointer">
            <span>{language === 'EN' ? 'English' : 'አማርኛ'}</span>
            <ChevronDown size={17} strokeWidth={2.5} className="text-[#7a1f7a]" />
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            >
              <option value="EN">English</option>
              <option value="አማ">አማርኛ</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 max-w-sm mx-auto w-full z-10 -mt-2">
        {/* CBE Birr Official Stylized Logo */}
        <div className="flex flex-col items-center mb-5">
          <div className="flex flex-col items-center leading-none">
            <span className="text-[14px] font-black text-[#7a1f7a] tracking-wider mb-0.5">
              CBE
            </span>
            <div className="relative inline-block">
              <span className="text-[46px] font-black text-[#7a1f7a] tracking-tight leading-none italic pr-1">
                Birr
              </span>
              {/* Characteristic yellow swoosh underneath Birr */}
              <div className="w-full h-1.5 bg-[#f6ab2f] rounded-full mt-0.5" />
            </div>
            <span className="text-[10.5px] font-semibold text-[#f6ab2f] tracking-wide mt-1">
              የባንክ አገልግሎት
            </span>
          </div>
        </div>

        {/* Welcome message with exclamation badge matching screenshot */}
        <div className="flex items-center justify-center gap-2 mb-2 text-neutral-800">
          <div className="w-4 h-4 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] font-black">
            !
          </div>
          <span className="text-[15px] font-bold text-neutral-800">
            Welcome to CBEBirr
          </span>
        </div>

        {/* Login Title with underline bar */}
        <div className="flex flex-col items-center mb-6">
          <span className="text-[18px] font-black text-[#7a1f7a] tracking-wide">
            Login
          </span>
          <div className="w-12 h-[3px] bg-[#7a1f7a] rounded-full mt-1" />
        </div>

        {/* Phone Input Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col">
          <label className="text-[13px] font-medium text-neutral-900 mb-1.5 text-left">
            Phone number
          </label>

          {/* Input field with +251 button inside container */}
          <div className="w-full h-13 flex rounded-xl border border-neutral-300 bg-white shadow-2xs overflow-hidden focus-within:ring-2 focus-within:ring-[#7a1f7a] focus-within:border-transparent transition-all mb-5">
            <div className="bg-[#7a1f7a] text-white px-4 flex items-center justify-center font-bold text-[14.5px] flex-shrink-0 m-1 rounded-lg">
              +251
            </div>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="987508140"
              className="flex-1 px-3 text-[16px] font-semibold text-neutral-900 outline-none bg-transparent tracking-wide"
              required
            />
          </div>

          {/* NEXT BUTTON: Big solid purple rounded button matching screenshot */}
          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-[#7a1f7a] hover:bg-[#681868] active:scale-[0.99] text-white font-bold text-[16px] shadow-sm transition-all flex items-center justify-center cursor-pointer"
          >
            <span>Next</span>
          </button>
        </form>

        {/* Don't have an account link */}
        <div className="flex items-center justify-center gap-1.5 text-[13px] mt-6">
          <span className="text-neutral-700">Don't have an account ?</span>
          <button
            type="button"
            onClick={() => onGoToAuth(phoneNumber)}
            className="text-[#7a1f7a] font-bold hover:underline cursor-pointer"
          >
            Create Account
          </button>
        </div>

        {/* Chatbot question link */}
        <div className="flex items-center justify-center gap-1.5 text-[13px] mt-4">
          <span className="text-neutral-700">Do you have any question?</span>
          <button
            type="button"
            onClick={() => setShowChatbotModal(true)}
            className="text-[#7a1f7a] font-bold flex items-center gap-1 hover:underline cursor-pointer"
          >
            <MessageSquare size={14} className="fill-[#7a1f7a] text-[#7a1f7a]" />
            <span>Chatbot</span>
          </button>
        </div>
      </div>

      {/* Bottom Section: USSD & Exchange Rate pills + Version footer */}
      <div className="w-full flex flex-col items-center px-4 pb-4 z-10">
        <div className="w-full max-w-sm flex items-center gap-3 mb-5">
          {/* USSD - OFFLINE button with bronze background */}
          <button
            type="button"
            onClick={() => setShowUssdModal(true)}
            className="flex-1 h-12 rounded-2xl bg-[#be844c] hover:bg-[#b07740] active:scale-[0.98] text-white font-bold text-[12px] tracking-wide flex items-center justify-center gap-2 shadow-xs transition-all px-2 cursor-pointer"
          >
            <Shield size={18} className="text-white flex-shrink-0" />
            <span className="truncate">USSD - OFFLINE</span>
          </button>

          {/* Exchange rate button with bronze background */}
          <button
            type="button"
            onClick={() => setShowRatesModal(true)}
            className="flex-1 h-12 rounded-2xl bg-[#be844c] hover:bg-[#b07740] active:scale-[0.98] text-white font-bold text-[12px] tracking-wide flex items-center justify-center gap-2 shadow-xs transition-all px-2 cursor-pointer"
          >
            <RefreshCw size={18} className="text-white flex-shrink-0" />
            <span className="truncate">Exchange rate</span>
          </button>
        </div>

        {/* Exact copyright footer matching IMG_20260805_160106_067.jpg */}
        <p className="text-[10.5px] text-neutral-500 text-center font-medium">
          © 2026 Commercial Bank of Ethiopia, All Rights Reserved 6.0.3 version.
        </p>
      </div>

      {/* USSD Modal */}
      {showUssdModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-xs w-full text-center shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#be844c]/20 text-[#be844c] flex items-center justify-center mx-auto mb-3">
              <Shield size={24} />
            </div>
            <h3 className="font-bold text-neutral-900 text-[16px] mb-1">CBEBirr USSD Offline</h3>
            <p className="text-neutral-600 text-xs mb-4">
              Dial <span className="font-bold text-[#7a1f7a] text-sm">*847#</span> from your mobile phone to access offline banking anywhere without data.
            </p>
            <button
              onClick={() => setShowUssdModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#7a1f7a] text-white font-bold text-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Exchange Rates Modal */}
      {showRatesModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-xs w-full text-center shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#be844c]/20 text-[#be844c] flex items-center justify-center mx-auto mb-3">
              <RefreshCw size={24} />
            </div>
            <h3 className="font-bold text-neutral-900 text-[16px] mb-2">Daily Exchange Rates</h3>
            <div className="text-xs text-neutral-700 space-y-1.5 text-left mb-4 bg-neutral-50 p-3 rounded-xl border border-neutral-200/60">
              <div className="flex justify-between">
                <span className="font-bold">USD / ETB:</span>
                <span>Buy: 135.20 | Sell: 137.90</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">EUR / ETB:</span>
                <span>Buy: 147.80 | Sell: 150.75</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">GBP / ETB:</span>
                <span>Buy: 172.40 | Sell: 175.80</span>
              </div>
            </div>
            <button
              onClick={() => setShowRatesModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#7a1f7a] text-white font-bold text-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Chatbot Modal */}
      {showChatbotModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-xs w-full text-center shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#7a1f7a]/15 text-[#7a1f7a] flex items-center justify-center mx-auto mb-3">
              <MessageSquare size={24} />
            </div>
            <h3 className="font-bold text-neutral-900 text-[16px] mb-1">CBE Customer Assistant</h3>
            <p className="text-neutral-600 text-xs mb-4">
              Hello AHMED! For any inquiry regarding CBEBirr Plus services, transfer limits, or bill payments, call our 24/7 hotline at <span className="font-bold text-[#7a1f7a]">951</span>.
            </p>
            <button
              onClick={() => setShowChatbotModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#7a1f7a] text-white font-bold text-xs cursor-pointer"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
