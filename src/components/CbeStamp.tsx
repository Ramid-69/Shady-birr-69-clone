import React from 'react';

interface CbeStampProps {
  className?: string;
  size?: number;
  code?: string;
}

export const CbeStamp: React.FC<CbeStampProps> = ({
  className = '',
  size = 150,
  code = '9.1.6',
}) => {
  return (
    <div
      className={`inline-block relative select-none pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        transform: 'rotate(-5deg)',
      }}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        style={{
          filter: 'drop-shadow(0 0 0.5px rgba(50, 40, 130, 0.4))',
        }}
      >
        <defs>
          {/* Top circular path for Amharic text */}
          <path
            id="cbe-stamp-top-arc"
            d="M 30,100 A 70,70 0 0,1 170,100"
            fill="none"
          />
          {/* Bottom circular path for English text */}
          <path
            id="cbe-stamp-bottom-arc"
            d="M 170,100 A 70,70 0 0,1 30,100"
            fill="none"
          />
        </defs>

        {/* Outer heavy circle with realistic ink stamp grain */}
        <circle
          cx="100"
          cy="100"
          r="92"
          fill="none"
          stroke="#332a84"
          strokeWidth="3.2"
          strokeDasharray="200 1 100 0.5"
          opacity="0.88"
        />

        {/* Outer thin ring */}
        <circle
          cx="100"
          cy="100"
          r="86"
          fill="none"
          stroke="#332a84"
          strokeWidth="1.2"
          opacity="0.85"
        />

        {/* Inner concentric ring */}
        <circle
          cx="100"
          cy="100"
          r="58"
          fill="none"
          stroke="#332a84"
          strokeWidth="1.8"
          opacity="0.85"
        />

        {/* Center inner boundary */}
        <circle
          cx="100"
          cy="100"
          r="54"
          fill="none"
          stroke="#332a84"
          strokeWidth="0.8"
          strokeDasharray="150 1 80 1"
          opacity="0.8"
        />

        {/* Top Text: የኢትዮጵያ ንግድ ባንክ */}
        <text
          fill="#332a84"
          fontSize="13"
          fontWeight="900"
          letterSpacing="2.5"
          opacity="0.9"
        >
          <textPath
            href="#cbe-stamp-top-arc"
            startOffset="50%"
            textAnchor="middle"
          >
            የኢትዮጵያ ንግድ ባንክ
          </textPath>
        </text>

        {/* Bottom Text: Commercial Bank of Ethiopia */}
        <text
          fill="#332a84"
          fontSize="9.2"
          fontWeight="800"
          letterSpacing="1.2"
          opacity="0.9"
        >
          <textPath
            href="#cbe-stamp-bottom-arc"
            startOffset="50%"
            textAnchor="middle"
          >
            Commercial Bank of Ethiopia
          </textPath>
        </text>

        {/* Left & Right Star/Dot Accents */}
        <circle cx="28" cy="100" r="2.2" fill="#332a84" opacity="0.85" />
        <circle cx="172" cy="100" r="2.2" fill="#332a84" opacity="0.85" />

        {/* Center CBE Spiral Logo */}
        <g transform="translate(100, 96)" opacity="0.88">
          {/* Spiral wing 1 */}
          <path
            d="M 0,0 C -6,-15 -22,-12 -24,-2 C -26,8 -14,18 -4,14 C -1,13 0,8 0,0 Z"
            fill="#332a84"
          />
          {/* Spiral wing 2 */}
          <path
            d="M 0,0 C 15,-6 20,-20 10,-24 C 0,-28 -15,-18 -12,-6 C -11,-2 -6,0 0,0 Z"
            fill="#332a84"
          />
          {/* Spiral wing 3 */}
          <path
            d="M 0,0 C 10,12 24,6 22,-6 C 20,-18 4,-18 1,-8 C 0,-5 0,-1 0,0 Z"
            fill="#332a84"
          />
          {/* Center core point */}
          <circle cx="0" cy="0" r="3.5" fill="#332a84" />
        </g>

        {/* Branch / Code Text: 9.1.6 */}
        <text
          x="108"
          y="114"
          fill="#332a84"
          fontSize="10"
          fontWeight="900"
          fontFamily="monospace"
          opacity="0.9"
          transform="rotate(25, 108, 114)"
        >
          {code}
        </text>
      </svg>
    </div>
  );
};
