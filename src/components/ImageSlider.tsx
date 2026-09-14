import React, { useState, useEffect } from 'react';

const BANNER_IMAGES = [
  '/assets/images/home_ban1.jpg',
  '/assets/images/home_ban2.jpg',
  '/assets/images/home_ban3.jpg',
  '/assets/images/home_ban4.jpg',
  '/assets/images/home_ban5.jpg',
];

export const ImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNER_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex flex-col items-center my-3">
      {/* Banner image container */}
      <div className="relative w-full h-[110px] overflow-hidden rounded-xl bg-neutral-100 shadow-sm border border-neutral-200">
        {BANNER_IMAGES.map((imgSrc, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={imgSrc}
              alt={`CBE Promotion ${idx + 1}`}
              className="w-full h-full object-cover rounded-xl"
              onError={(e) => {
                // Graceful placeholder
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="flex items-center justify-center gap-1.5 mt-2.5">
        {BANNER_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex
                ? 'w-5 h-2 bg-[#8f278f]'
                : 'w-2 h-2 bg-[#8f278f]/20 border border-[#8f278f]'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
