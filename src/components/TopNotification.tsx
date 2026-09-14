import React from 'react';
import { Bell, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TopNotification: React.FC = () => {
  const { topNotification, dismissNotification } = useApp();

  if (!topNotification) return null;

  return (
    <div className="absolute top-2 left-3 right-3 z-50 animate-bounce-short">
      <div
        onClick={dismissNotification}
        className="w-full bg-neutral-900/95 text-white backdrop-blur-md rounded-2xl p-3.5 shadow-2xl border border-white/20 flex items-start justify-between cursor-pointer hover:bg-neutral-900 active:scale-[0.99] transition-all"
      >
        <div className="flex items-start gap-3 flex-1 pr-2">
          <div className="w-8 h-8 rounded-full bg-[#8f278f] flex items-center justify-center text-white flex-shrink-0 shadow-sm mt-0.5">
            <Bell size={16} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold text-amber-400 tracking-wide">
                {topNotification.message}
              </span>
              <span className="text-[10px] text-white/50">now</span>
            </div>
            {topNotification.submessage && (
              <p className="text-[11px] text-white/90 leading-tight mt-1 font-medium line-clamp-3">
                {topNotification.submessage}
              </p>
            )}
            <span className="text-[9px] text-white/50 mt-1">Tap to dismiss</span>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            dismissNotification();
          }}
          className="text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
