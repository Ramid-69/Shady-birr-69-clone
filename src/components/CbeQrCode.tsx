import React from 'react';

interface CbeQrCodeProps {
  value?: string;
  size?: number;
  className?: string;
}

export const CbeQrCode: React.FC<CbeQrCodeProps> = ({
  size = 250,
  className = '',
}) => {
  // Base design width is 288px (w-72), so scale factor adjusts center badge proportionally
  const scale = size / 288;

  return (
    <div
      className={`relative inline-flex items-center justify-center bg-white rounded-2xl select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* SVG Styled QR Code matching user specification */}
      <svg
        className="w-full h-full text-black"
        viewBox="0 0 250 250"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top-Left Finder Pattern */}
        <rect x="8" y="8" width="56" height="56" rx="14" fill="black" />
        <rect x="18" y="18" width="36" height="36" rx="9" fill="white" />
        <rect x="25" y="25" width="22" height="22" rx="6" fill="black" />

        {/* Top-Right Finder Pattern */}
        <rect x="186" y="8" width="56" height="56" rx="14" fill="black" />
        <rect x="196" y="18" width="36" height="36" rx="9" fill="white" />
        <rect x="203" y="25" width="22" height="22" rx="6" fill="black" />

        {/* Bottom-Left Finder Pattern */}
        <rect x="8" y="186" width="56" height="56" rx="14" fill="black" />
        <rect x="18" y="196" width="36" height="36" rx="9" fill="white" />
        <rect x="25" y="203" width="22" height="22" rx="6" fill="black" />

        {/* Stylized Fluid / Rounded QR Modules */}
        {/* Top Row Modules */}
        <rect x="72" y="8" width="22" height="10" rx="5" />
        <circle cx="108" cy="14" r="5" />
        <rect x="122" y="8" width="10" height="20" rx="5" />
        <rect x="140" y="8" width="24" height="9" rx="4.5" />
        <circle cx="174" cy="10" r="4.5" />

        {/* Row 2 */}
        <circle cx="116" cy="28" r="4.5" />
        <rect x="72" y="26" width="10" height="32" rx="5" />
        <rect x="88" y="30" width="20" height="10" rx="5" />
        <circle cx="140" cy="26" r="4" />
        <rect x="154" y="22" width="10" height="26" rx="5" />
        <rect x="168" y="22" width="10" height="10" rx="5" />

        {/* Row 3 & 4 (Top Middle Details) */}
        <circle cx="38" cy="74" r="4.5" />
        <rect x="8" y="70" width="10" height="22" rx="5" />
        <circle cx="12" cy="100" r="4" />
        <rect x="8" y="112" width="10" height="18" rx="5" />
        <rect x="24" y="72" width="22" height="9" rx="4.5" />
        <rect x="24" y="88" width="10" height="28" rx="5" />
        <circle cx="40" cy="76" r="4.5" />
        <rect x="36" y="90" width="18" height="9" rx="4.5" />
        <circle cx="42" cy="112" r="4.5" />

        <rect x="72" y="68" width="18" height="9" rx="4.5" />
        <rect x="94" y="56" width="9" height="22" rx="4.5" />
        <rect x="110" y="48" width="28" height="9" rx="4.5" />
        <rect x="126" y="48" width="9" height="26" rx="4.5" />
        <rect x="142" y="46" width="22" height="9" rx="4.5" />
        <rect x="172" y="46" width="9" height="28" rx="4.5" />

        <rect x="186" y="72" width="30" height="9" rx="4.5" />
        <rect x="222" y="72" width="18" height="9" rx="4.5" />
        <circle cx="240" cy="74" r="4.5" />
        <rect x="236" y="88" width="9" height="20" rx="4.5" />
        <rect x="186" y="90" width="20" height="9" rx="4.5" />
        <rect x="206" y="72" width="9" height="36" rx="4.5" />

        {/* Mid Area */}
        <rect x="54" y="70" width="10" height="22" rx="5" />
        <rect x="54" y="100" width="22" height="10" rx="5" />
        <circle cx="82" cy="90" r="4.5" />
        <rect x="68" y="118" width="20" height="9" rx="4.5" />
        <rect x="94" y="90" width="10" height="24" rx="5" />

        <circle cx="156" cy="106" r="4.5" />
        <rect x="170" y="80" width="9" height="24" rx="4.5" />
        <rect x="170" y="104" width="24" height="9" rx="4.5" />
        <rect x="202" y="112" width="22" height="9" rx="4.5" />
        <circle cx="234" cy="106" r="4.5" />
        <rect x="236" y="120" width="9" height="18" rx="4.5" />
        <circle cx="240" cy="154" r="4.5" />

        <rect x="8" y="140" width="20" height="9" rx="4.5" />
        <rect x="8" y="156" width="28" height="9" rx="4.5" />
        <circle cx="42" cy="144" r="4.5" />
        <circle cx="42" cy="172" r="4.5" />
        <rect x="54" y="130" width="9" height="24" rx="4.5" />
        <rect x="54" y="154" width="20" height="9" rx="4.5" />

        {/* Mid Bottom / Under Center Logo */}
        <rect x="110" y="150" width="44" height="10" rx="5" />
        <rect x="144" y="140" width="10" height="32" rx="5" />
        <circle cx="162" cy="162" r="4.5" />
        <rect x="120" y="166" width="10" height="26" rx="5" />
        <rect x="94" y="176" width="18" height="9" rx="4.5" />

        {/* Bottom Right Patterns */}
        <rect x="170" y="160" width="40" height="10" rx="5" />
        <rect x="216" y="160" width="10" height="24" rx="5" />
        <rect x="164" y="176" width="46" height="40" rx="12" />
        <rect x="174" y="186" width="26" height="20" rx="6" fill="white" />
        <circle cx="187" cy="196" r="5" fill="black" />

        <rect x="218" y="192" width="10" height="24" rx="5" />
        <circle cx="236" cy="196" r="4.5" />
        <rect x="228" y="218" width="18" height="9" rx="4.5" />

        {/* Bottom Strip */}
        <rect x="72" y="200" width="18" height="9" rx="4.5" />
        <circle cx="76" cy="216" r="4.5" />
        <rect x="72" y="232" width="34" height="10" rx="5" />
        <rect x="94" y="210" width="9" height="24" rx="4.5" />
        <rect x="114" y="222" width="24" height="9" rx="4.5" />
        <rect x="136" y="196" width="24" height="9" rx="4.5" />
        <rect x="144" y="216" width="9" height="26" rx="4.5" />
        <circle cx="160" cy="234" r="4.5" />
        <rect x="180" y="224" width="22" height="9" rx="4.5" />
        <rect x="206" y="232" width="18" height="9" rx="4.5" />
      </svg>

      {/* Center CBE Birr Badge */}
      <div
        className="absolute inset-0 m-auto w-20 h-20 bg-[#9c27b0] rounded-2xl shadow-md border-2 border-white overflow-hidden flex flex-col items-center justify-center p-1.5 select-none pointer-events-none"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        {/* Top Dark Edge & Diagonal accents */}
        <div className="absolute top-0 right-0 w-8 h-8 bg-black transform rotate-45 translate-x-4 -translate-y-4 opacity-90" />
        <div className="absolute bottom-0 left-0 w-8 h-8 bg-black transform rotate-45 -translate-x-4 translate-y-4 opacity-90" />

        {/* Logo Content */}
        <div className="relative z-10 flex flex-col items-center leading-tight">
          <span className="text-[9px] font-black tracking-wider text-white uppercase ml-[-8px]">
            CBE
          </span>
          <div className="flex items-center justify-center -mt-0.5">
            <span className="text-xl font-black italic tracking-tighter text-black stroke-white drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
              B
              <span className="relative inline-block text-black">
                i
                {/* Gold note icon above 'i' */}
                <span className="absolute -top-1 left-0 w-2.5 h-1.5 bg-[#f5b300] rounded-xs transform -rotate-12 shadow-2xs border-[0.5px] border-yellow-600" />
              </span>
              rr
            </span>
          </div>
          {/* Subtext in Amharic style representation */}
          <span className="text-[5.5px] text-white font-medium tracking-tight -mt-0.5 opacity-90">
            የቀበሌው የገንዘብ
          </span>
        </div>
      </div>
    </div>
  );
};
