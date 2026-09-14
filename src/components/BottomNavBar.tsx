import React from 'react';
import { Home, CreditCard, Landmark, LayoutGrid, Menu, QrCode, LucideIcon } from 'lucide-react';
import { ScreenType } from '../types';

interface BottomNavBarProps {
  currentScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
  onOpenQR: () => void;
}

interface TabDef {
  screen: ScreenType;
  label: string;
  icon: LucideIcon;
}

const TABS: TabDef[] = [
  { screen: 'home', label: 'Home', icon: Home },
  { screen: 'pay', label: 'Pay', icon: CreditCard },
  { screen: 'cbe-beje', label: 'CBE Beje', icon: Landmark },
  { screen: 'mini-apps', label: 'Mini Apps', icon: LayoutGrid },
  { screen: 'others', label: 'Others', icon: Menu },
];

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentScreen,
  onSelectScreen,
  onOpenQR,
}) => {
  return (
    <div className="relative w-full">
      {/* Floating QR button centered or positioned above the bar */}
      <button
        onClick={onOpenQR}
        className="absolute -top-6 right-5 z-20 w-13 h-13 rounded-full bg-[#8f278f] border-4 border-white text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
        title="Scan QR Code"
        aria-label="Scan QR Code"
      >
        <QrCode size={24} />
      </button>

      {/* Main Curved / Pill Bar */}
      <div className="w-full bg-[#8f278f] text-white px-2 py-2 flex items-center justify-around shadow-lg rounded-t-2xl">
        {TABS.map((tab) => {
          const isActive = currentScreen === tab.screen;
          const Icon = tab.icon;

          return (
            <button
              key={tab.screen}
              onClick={() => onSelectScreen(tab.screen)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
                isActive
                  ? 'text-white transform -translate-y-1'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <div
                className={`flex items-center justify-center transition-all ${
                  isActive
                    ? 'w-9 h-9 rounded-full bg-white/20 shadow-inner'
                    : 'w-7 h-7'
                }`}
              >
                <Icon size={isActive ? 20 : 18} />
              </div>
              <span
                className={`text-[10px] tracking-tight mt-0.5 whitespace-nowrap ${
                  isActive ? 'font-bold text-white' : 'font-normal opacity-80'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
