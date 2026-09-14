import React, { useEffect, useState } from 'react';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProcessingOverlay: React.FC = () => {
  const { isProcessing, processingMessage } = useApp();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isProcessing) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 98) return 98;
          return prev + 2;
        });
      }, 100);
      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [isProcessing]);

  if (!isProcessing) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-xs rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center border border-purple-100">
        {/* Animated CBE Birr Logo Circle */}
        <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-purple-100 border-t-[#8f278f] animate-spin" />
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#721172] to-[#8f278f] flex flex-col items-center justify-center text-white shadow-inner">
            <span className="text-[9px] font-black tracking-tight">CBE</span>
            <span className="text-[11px] font-black italic text-amber-300 -mt-1">Birr</span>
          </div>
        </div>

        <h3 className="text-base font-bold text-neutral-900 mb-1">Processing Payment</h3>
        <p className="text-[12px] text-neutral-500 mb-4 px-2 leading-tight">
          {processingMessage || 'Authorizing transaction with CBEBirr secure gateway...'}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden mb-3">
          <div
            className="bg-[#8f278f] h-full transition-all duration-100 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 font-medium">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span>Encrypted 256-bit Bank Security</span>
        </div>
      </div>
    </div>
  );
};
