import React from 'react';
import { HomeAppBar } from '../components/HomeAppBar';
import { CbeCard } from '../components/CbeCard';
import { GridContent1 } from '../components/GridContent1';
import { GridContent2 } from '../components/GridContent2';
import { ImageSlider } from '../components/ImageSlider';
import { ChevronRight } from 'lucide-react';
import { GridItem } from '../types';

interface HomeScreenProps {
  language: string;
  onToggleLanguage: () => void;
  onNavigateSubScreen: (subScreen: string) => void;
  onSelectAction: (title: string, subtitle?: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  language,
  onToggleLanguage,
  onNavigateSubScreen,
  onSelectAction,
}) => {
  const handleGrid1Select = (item: GridItem) => {
    switch (item.id) {
      case 'to-cbe':
        onNavigateSubScreen('cbe-send-money');
        break;
      case 'send-money':
        onNavigateSubScreen('phone-send-money');
        break;
      case 'air-time':
        onNavigateSubScreen('airtime');
        break;
      case 'airtime-package':
        onNavigateSubScreen('airtime-package');
        break;
      case 'linked-bank':
        onNavigateSubScreen('bank-transfer');
        break;
      default:
        onSelectAction(item.text, 'CBEBirr fast service');
        break;
    }
  };

  const handleGrid2Select = (item: GridItem) => {
    switch (item.id) {
      case 'other-bank':
        onNavigateSubScreen('bank-transfer');
        break;
      default:
        onSelectAction(item.text, 'CBEBirr convenience service');
        break;
    }
  };

  return (
    <div className="relative w-full min-h-full flex flex-col bg-gradient-to-b from-[#8f278f] via-[#8f278f]/40 to-white">
      {/* Top App Bar */}
      <div className="pt-2">
        <HomeAppBar language={language} onToggleLanguage={onToggleLanguage} />
        <div className="h-[0.5px] bg-white/20 my-1 mx-4" />
      </div>

      {/* CBE Card with Balance & Typewriter (supports 3-click shortcuts) */}
      <CbeCard />

      {/* Main White Content Card */}
      <div className="flex-1 mt-3 bg-white rounded-t-[30px] shadow-sm px-4 pt-5 pb-24">
        {/* Quick Links Row */}
        <div className="flex items-center justify-between px-1 mb-3">
          <button
            onClick={() => onNavigateSubScreen('mekedonia')}
            className="flex items-center text-[#8f278f] font-extrabold text-[14px] hover:opacity-80 transition-opacity"
          >
            <span>Mekedonia</span>
            <ChevronRight size={18} className="text-[#8f278f]" />
          </button>
          <button
            onClick={() => onNavigateSubScreen('transaction-detail')}
            className="flex items-center text-[#8f278f] font-extrabold text-[14px] hover:opacity-80 transition-opacity"
          >
            <span>Transaction Detail</span>
            <ChevronRight size={18} className="text-[#8f278f]" />
          </button>
        </div>

        {/* Primary Action Grid (8 items) */}
        <GridContent1 onSelect={handleGrid1Select} />

        {/* Promotional Banner Carousel */}
        <ImageSlider />

        {/* Secondary Action Grid (8 items) */}
        <GridContent2 onSelect={handleGrid2Select} />
      </div>
    </div>
  );
};
