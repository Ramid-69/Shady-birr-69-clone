import React, { useState } from 'react';
import { Search, Menu } from 'lucide-react';
import { MiniAppItem } from '../types';

interface MiniAppsScreenProps {
  onSelectApp: (app: MiniAppItem) => void;
}

const MINI_APPS: MiniAppItem[] = [
  { id: '1', text: '14th Jimma expo 2017', image: '/assets/images/jim.jpeg' },
  { id: '2', text: 'Guzo', image: '/assets/images/guzo.png' },
  { id: '3', text: 'Entoto Park Cbe Run', image: '/assets/images/cbe.png' },
  { id: '4', text: 'Kuraztech', image: '/assets/images/kura.jpeg' },
  { id: '5', text: 'National ID', image: '/assets/images/ni.jpeg' },
  { id: '6', text: 'DSTV', image: '/assets/images/dstv.png' },
  { id: '7', text: 'ET Airlines', image: '/assets/images/etair.png' },
  { id: '8', text: 'Beu Delivery', image: '/assets/images/beu.jpeg' },
  { id: '9', text: 'Es Services', image: '/assets/images/es.jpeg' },
  { id: '10', text: 'CBE Donation', image: '/assets/images/cbed.png' },
  { id: '11', text: 'Commercepal', image: '/assets/images/cp.png' },
  { id: '12', text: 'TicketBiro', image: '/assets/images/tb.png' },
  { id: '13', text: 'Get Reset', image: '/assets/images/gr.jpeg' },
  { id: '14', text: 'School Pay', image: '/assets/images/scp.jpeg' },
];

export const MiniAppsScreen: React.FC<MiniAppsScreenProps> = ({ onSelectApp }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const filteredApps = MINI_APPS.filter((app) =>
    app.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-full flex flex-col bg-neutral-100 pb-24">
      {/* Top Header */}
      <div className="bg-[#8f278f] text-white px-4 py-3 flex items-center justify-between shadow-md">
        <button className="p-1 hover:bg-white/10 rounded-full transition-colors" title="Menu">
          <Menu size={22} />
        </button>

        <h1 className="text-[18px] font-bold tracking-wide">Mini Apps</h1>

        <button
          onClick={() => setShowSearch(!showSearch)}
          className="p-1 hover:bg-white/10 rounded-full transition-colors"
          title="Search"
        >
          <Search size={22} />
        </button>
      </div>

      {/* Search Field */}
      {showSearch && (
        <div className="p-3 bg-white border-b border-neutral-200">
          <input
            type="text"
            placeholder="Search mini apps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8f278f]"
            autoFocus
          />
        </div>
      )}

      {/* 3-Column Grid */}
      <div className="p-3">
        <div className="grid grid-cols-3 gap-3">
          {filteredApps.map((app) => (
            <button
              key={app.id}
              onClick={() => onSelectApp(app)}
              className="bg-white rounded-lg p-3 flex flex-col items-center justify-center text-center shadow-xs border border-neutral-200/70 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all aspect-square"
            >
              <div className="w-12 h-12 flex items-center justify-center mb-2 overflow-hidden rounded-md">
                <img
                  src={app.image}
                  alt={app.text}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    // fallback icon if needed
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <span className="text-[12px] font-medium text-neutral-800 leading-tight line-clamp-2">
                {app.text}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
