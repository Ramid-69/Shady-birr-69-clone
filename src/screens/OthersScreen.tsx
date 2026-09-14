import React, { useState, useRef } from 'react';
import {
  Search,
  User,
  QrCode,
  ChevronRight,
  Scale,
  KeyRound,
  Lock,
  Fingerprint,
  Users,
  Info,
  HelpCircle,
  MessageSquare,
  MessageSquareText,
} from 'lucide-react';
import { OtherItem } from '../types';
import { useApp } from '../context/AppContext';

interface OthersScreenProps {
  language: string;
  onToggleLanguage: () => void;
  onSelectItem: (item: OtherItem) => void;
  onOpenProfileQR: () => void;
  onOpenMessages: () => void;
  onLogout: () => void;
}

const OTHER_ITEMS: OtherItem[] = [
  { index: '1', name: 'All Balances', iconName: 'Scale' },
  { index: '2', name: 'Pin Reset', iconName: 'KeyRound' },
  { index: '3', name: 'Change PIN', iconName: 'Lock' },
  { index: '4', name: 'Biometrics', iconName: 'Fingerprint' },
  { index: '5', name: 'Invite Friends', iconName: 'Users' },
  { index: '6', name: 'About Us', iconName: 'Info' },
  { index: '7', name: 'FAQ', iconName: 'HelpCircle' },
  { index: '8', name: 'CBEBeje Feedback', iconName: 'MessageSquare' },
];

const renderOtherIcon = (iconName: string) => {
  const props = { size: 22, className: 'text-[#7e257e]' };
  switch (iconName) {
    case 'Scale':
      return <Scale {...props} />;
    case 'KeyRound':
      return <KeyRound {...props} />;
    case 'Lock':
      return <Lock {...props} />;
    case 'Fingerprint':
      return <Fingerprint {...props} />;
    case 'Users':
      return <Users {...props} />;
    case 'Info':
      return <Info {...props} />;
    case 'HelpCircle':
      return <HelpCircle {...props} />;
    case 'MessageSquare':
      return <MessageSquare {...props} />;
    default:
      return <Info {...props} />;
  }
};

export const OthersScreen: React.FC<OthersScreenProps> = ({
  language,
  onToggleLanguage,
  onSelectItem,
  onOpenProfileQR,
  onOpenMessages,
  onLogout,
}) => {
  const { user, messages } = useApp();
  const [isHolding, setIsHolding] = useState(false);
  const [showHoldHint, setShowHoldHint] = useState(false);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didTriggerRef = useRef(false);

  const startHold = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    didTriggerRef.current = false;
    setIsHolding(true);
    setShowHoldHint(false);

    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
    }

    holdTimerRef.current = setTimeout(() => {
      didTriggerRef.current = true;
      setIsHolding(false);
      onOpenMessages();
    }, 550);
  };

  const cancelHold = (e?: React.SyntheticEvent) => {
    if (e) e.stopPropagation();
    setIsHolding(false);
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!didTriggerRef.current) {
      setShowHoldHint(true);
      setTimeout(() => {
        setShowHoldHint(false);
      }, 2000);
    }
  };

  const displayName = user.name
    ? user.name.split(' ')[0] + ' ' + (user.name.split(' ')[1] ? user.name.split(' ')[1].charAt(0) + '******' : '')
    : 'Asmare A******';

  return (
    <div className="w-full min-h-full flex flex-col bg-neutral-100 pb-24 relative">
      {/* Header with Profile */}
      <div className="bg-[#8f278f] text-white px-4 pt-3 pb-5 rounded-b-[25px] shadow-md">
        <div className="flex items-center justify-between mb-4">
          <button className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer" title="Search">
            <Search size={24} />
          </button>
          <h1 className="text-[20px] font-bold tracking-wide">Others</h1>
          <button
            onClick={onToggleLanguage}
            className="text-[17px] font-medium px-2 py-1 hover:bg-white/10 rounded-md transition-colors cursor-pointer"
          >
            {language}
          </button>
        </div>

        {/* Profile Card */}
        <div
          onClick={onOpenProfileQR}
          className="bg-[#7e257e] rounded-2xl p-3.5 flex items-center justify-between shadow-inner border border-white/10 cursor-pointer hover:bg-[#721f72] transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#7e257e] shadow-xs flex-shrink-0">
              <User size={28} />
            </div>
            <div className="flex flex-col">
              <span className="text-[16px] font-bold text-white tracking-wide">
                {displayName}
              </span>
              <span className="text-[11px] text-white/70">Verified Account Holder</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-white">
            {/* Dedicated Message Icon with Long Press trigger */}
            <div className="relative">
              <button
                onPointerDown={startHold}
                onPointerUp={cancelHold}
                onPointerLeave={cancelHold}
                onPointerCancel={cancelHold}
                onClick={handleClick}
                title="CBEBirr Messages (Long press to open)"
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-200 cursor-pointer select-none relative ${
                  isHolding
                    ? 'bg-white/40 scale-110 ring-2 ring-amber-300 shadow-md'
                    : 'bg-white/15 hover:bg-white/25 active:scale-95'
                }`}
              >
                <MessageSquareText size={20} />
                {messages.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-400 text-neutral-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {messages.length}
                  </span>
                )}
              </button>

              {/* Hold progress / instruction hint */}
              {isHolding && (
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-neutral-950/90 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md animate-pulse">
                  Holding...
                </span>
              )}
              {showHoldHint && !isHolding && (
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-neutral-950/90 text-white text-[10px] font-medium px-2 py-0.5 rounded-full shadow-md">
                  Press & hold
                </span>
              )}
            </div>

            <QrCode size={24} />
            <ChevronRight size={18} />
          </div>
        </div>
      </div>

      {/* Other Settings List */}
      <div className="px-4 py-4 space-y-2.5">
        {OTHER_ITEMS.map((item) => (
          <div
            key={item.index}
            onClick={() => onSelectItem(item)}
            className="bg-[#e4e2e2] rounded-lg p-3 flex items-center justify-between hover:bg-[#dedede] active:scale-[0.99] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3.5 flex-1 pr-2">
              <div className="w-11 h-11 rounded-full bg-[#f7e7ce] flex-shrink-0 flex items-center justify-center">
                {renderOtherIcon(item.iconName)}
              </div>
              <span className="text-[15px] font-bold text-neutral-900">{item.name}</span>
            </div>
            <ChevronRight size={18} className="text-[#8f278f] flex-shrink-0" />
          </div>
        ))}

        {/* Log Out Button */}
        <div className="pt-4 flex justify-center">
          <button
            onClick={onLogout}
            className="w-full max-w-xs h-11 rounded-xl bg-[#7e257e] hover:bg-[#6c1f6c] active:bg-[#5a195a] text-white font-bold text-[15px] shadow-sm transition-colors flex items-center justify-center"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};
