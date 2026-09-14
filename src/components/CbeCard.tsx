import React, { useState, useEffect, useRef } from 'react';
import { PhoneCall, Eye, EyeOff, Paintbrush, UserCheck, PlusCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BalanceEditModal } from './BalanceEditModal';
import { ProfileEditModal } from './ProfileEditModal';

const CARD_THEMES = [
  { id: 'purple', bg: 'bg-[#721172]', text: 'text-amber-300' },
  { id: 'gold', bg: 'bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-600', text: 'text-amber-100' },
  { id: 'navy', bg: 'bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950', text: 'text-amber-300' },
  { id: 'crimson', bg: 'bg-gradient-to-r from-rose-950 via-purple-900 to-indigo-950', text: 'text-amber-300' },
];

export const CbeCard: React.FC = () => {
  const { user, balances, toggleShowBalance, toggleShowReward } = useApp();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [themeIndex, setThemeIndex] = useState(0);

  // Modal states for 3-click triggers
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);
  const [balanceModalMode, setBalanceModalMode] = useState<'add' | 'edit'>('add');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Click counters for 3-clicks detection
  const balanceClickCount = useRef(0);
  const balanceClickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const nameClickCount = useRef(0);
  const nameClickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const typewriterPhrases = ['Welcome back', `${user.name} !`];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % typewriterPhrases.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [typewriterPhrases.length, user.name]);

  const cycleTheme = () => {
    setThemeIndex((prev) => (prev + 1) % CARD_THEMES.length);
  };

  const handleBalanceClick = () => {
    balanceClickCount.current += 1;
    if (balanceClickTimer.current) {
      clearTimeout(balanceClickTimer.current);
    }

    if (balanceClickCount.current >= 3) {
      balanceClickCount.current = 0;
      setBalanceModalMode('add');
      setIsBalanceModalOpen(true);
    } else {
      balanceClickTimer.current = setTimeout(() => {
        balanceClickCount.current = 0;
      }, 1200);
    }
  };

  const handleNameClick = () => {
    nameClickCount.current += 1;
    if (nameClickTimer.current) {
      clearTimeout(nameClickTimer.current);
    }

    if (nameClickCount.current >= 3) {
      nameClickCount.current = 0;
      setIsProfileModalOpen(true);
    } else {
      nameClickTimer.current = setTimeout(() => {
        nameClickCount.current = 0;
      }, 1200);
    }
  };

  const currentTheme = CARD_THEMES[themeIndex];

  // Masked phone format or full phone
  const displayPhone = user.accountNumber || '+251969121369';

  return (
    <div className="relative w-full px-4 pt-1 pb-2">
      {/* Paintbrush Theme Button */}
      <button
        onClick={cycleTheme}
        className="absolute top-0 right-3 z-10 w-9 h-9 rounded-full bg-[#8f278f] border border-white/30 text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform"
        title="Change Card Theme"
        aria-label="Change Card Theme"
      >
        <Paintbrush size={16} />
      </button>

      {/* Main Bank Card */}
      <div
        className={`w-full rounded-2xl p-4 shadow-lg text-white transition-all duration-300 ${currentTheme.bg} flex flex-col justify-between min-h-[196px] border border-white/10`}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
            <img
              src="/assets/images/cbe.png"
              alt="CBE Logo"
              className="max-h-11 max-w-full object-contain filter drop-shadow"
            />
          </div>
          <div className="text-center flex-1 px-2">
            <div className="text-amber-300 font-semibold text-[13px] leading-tight">
              የኢትዮጵያ ንግድ ባንክ
            </div>
            <div className="text-amber-300 font-medium text-[11px] leading-tight mt-0.5">
              Commercial Bank of Ethiopia
            </div>
          </div>
          <div className="w-9" />
        </div>

        {/* Center: Phone & Animated Welcome (3-Clicks on Name to Edit) */}
        <div
          onClick={handleNameClick}
          className="flex flex-col items-center my-2 text-center cursor-pointer select-none group"
          title="Click 3 times to edit Name and Account Number"
        >
          <div className="flex items-center gap-1.5 text-amber-300 text-[12px] font-medium tracking-wide">
            <PhoneCall size={12} className="text-amber-300" />
            <span>{displayPhone}</span>
          </div>
          <div className="h-6 flex items-center justify-center mt-0.5">
            <span className="text-amber-300 text-[13.5px] font-bold tracking-wide transition-opacity duration-300 flex items-center gap-1.5">
              {typewriterPhrases[currentTextIndex]}
            </span>
          </div>
          <span className="text-[9px] text-amber-300/60 opacity-0 group-hover:opacity-100 transition-opacity -mt-0.5">
            (Tap 3x to edit name)
          </span>
        </div>

        {/* Bottom Balances */}
        <div className="flex items-end justify-between pt-1 border-t border-white/10">
          {/* Balance (3-Clicks to Add Amount / Edit) */}
          <div
            onClick={handleBalanceClick}
            className="flex flex-col cursor-pointer select-none group"
            title="Click 3 times to add specific amount or edit balance"
          >
            <div className="flex items-center gap-1.5 text-white/90">
              <span className="text-[12px] font-bold">Balance(ETB)</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleShowBalance();
                }}
                className="p-0.5 hover:text-amber-300 transition-colors"
              >
                {balances.showBalance ? <Eye size={13} /> : <EyeOff size={13} />}
              </button>
            </div>
            <div className="text-white font-bold text-[18px] tracking-wider mt-0.5 h-7 flex items-center">
              {balances.showBalance
                ? balances.current.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : '••••••'}
            </div>
            <span className="text-[8.5px] text-amber-300/60 opacity-0 group-hover:opacity-100 transition-opacity">
              (Tap 3x to add funds)
            </span>
          </div>

          {/* Reward */}
          <div className="flex flex-col text-right select-none">
            <div className="flex items-center justify-end gap-1.5 text-white/90">
              <span className="text-[12px] font-bold">Reward(ETB)</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleShowReward();
                }}
                className="p-0.5 hover:text-amber-300 transition-colors"
              >
                {balances.showReward ? <Eye size={13} /> : <EyeOff size={13} />}
              </button>
            </div>
            <div className="text-white font-bold text-[18px] tracking-wider mt-0.5 h-7 flex items-center justify-end">
              {balances.showReward
                ? balances.reward.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : '••••••'}
            </div>
            <button
              onClick={() => {
                setBalanceModalMode('edit');
                setIsBalanceModalOpen(true);
              }}
              className="text-[8.5px] text-amber-300/60 hover:text-amber-300 text-right transition-colors"
            >
              Edit Balances
            </button>
          </div>
        </div>
      </div>

      {/* 3-Click Modals */}
      <BalanceEditModal
        isOpen={isBalanceModalOpen}
        onClose={() => setIsBalanceModalOpen(false)}
        initialMode={balanceModalMode}
      />
      <ProfileEditModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  );
};
