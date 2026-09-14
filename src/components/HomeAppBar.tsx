import React from 'react';

interface HomeAppBarProps {
  language: string;
  onToggleLanguage: () => void;
}

export const HomeAppBar: React.FC<HomeAppBarProps> = ({ language, onToggleLanguage }) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 text-white">
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm bg-white/10 flex-shrink-0">
          <img
            src="/assets/images/cbe_birr_logo.jpg"
            alt="CBEBirr Plus Logo"
            className="w-full h-full object-cover"
            onError={(e) => {
              // fallback if needed
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-[17px] font-semibold text-white tracking-wide">
            CBEBirr Plus
          </span>
          <span className="text-[12px] font-medium text-amber-300">
            {language === 'EN' ? 'ባሉበት ሁሉ አለ!' : 'Always there for you!'}
          </span>
        </div>
      </div>
      <button
        onClick={onToggleLanguage}
        className="px-2.5 py-1 rounded-md text-[15px] font-bold text-white hover:bg-white/10 transition-colors"
        title="Change Language"
      >
        {language}
      </button>
    </div>
  );
};
