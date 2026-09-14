import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Delete, Shield, Loader2 } from 'lucide-react';

interface LoginAuthScreenProps {
  onSuccess: () => void;
  onBack: () => void;
  phone?: string;
  accountName?: string;
}

export const LoginAuthScreen: React.FC<LoginAuthScreenProps> = ({
  onSuccess,
  onBack,
  phone = '969121369',
  accountName = 'AHMED HUSSEN SEID',
}) => {
  // 6-digit PIN state - strictly requires 696969
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    inputRefs[0].current?.focus();
  }, []);

  const handleDigitChange = (index: number, value: string) => {
    if (isLoading) return;
    if (value.length > 1) {
      value = value.slice(-1);
    }

    if (!/^\d*$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setErrorMsg('');

    if (value && index < 5) {
      inputRefs[index + 1].current?.focus();
    }

    // Check completion when 6 digits entered
    if (index === 5 && value) {
      const fullPin = newPin.join('');
      validatePin(fullPin);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isLoading) return;
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const validatePin = (code: string) => {
    // PIN Validation: Strictly require 696969. Do NOT allow pass without this PIN!
    if (code === '696969') {
      setIsLoading(true);
      setErrorMsg('');

      // 3-second authentic loading animation
      let timer = 0;
      const interval = setInterval(() => {
        timer += 100;
        setLoadingProgress(Math.min(100, Math.floor((timer / 3000) * 100)));
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        onSuccess();
      }, 3000);
    } else {
      setErrorMsg('Invalid PIN');
      setPin(['', '', '', '', '', '']);
      inputRefs[0].current?.focus();
    }
  };

  const handleKeypadPress = (num: string) => {
    if (isLoading) return;
    const emptyIndex = pin.findIndex((d) => d === '');
    if (emptyIndex !== -1) {
      handleDigitChange(emptyIndex, num);
    }
  };

  const handleKeypadDelete = () => {
    if (isLoading) return;
    const filledIndices = pin.map((d, i) => (d !== '' ? i : -1)).filter((i) => i !== -1);
    if (filledIndices.length > 0) {
      const lastIndex = filledIndices[filledIndices.length - 1];
      const newPin = [...pin];
      newPin[lastIndex] = '';
      setPin(newPin);
      setErrorMsg('');
      inputRefs[lastIndex].current?.focus();
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-white text-neutral-800 select-none">
      {/* App Bar */}
      <div className="p-4 flex items-center justify-between">
        <button
          onClick={onBack}
          disabled={isLoading}
          className="p-2 -ml-2 rounded-full hover:bg-neutral-100 transition-colors disabled:opacity-30 cursor-pointer"
          title="Go back"
        >
          <ArrowLeft size={22} className="text-neutral-700" />
        </button>
        <span className="text-[15px] font-bold text-[#7a1f7a]">CBEBirr Plus</span>
        <div className="w-8" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 max-w-sm mx-auto w-full text-center">
        {/* Account Info matching user profile */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#691869] to-[#7a1f7a] flex items-center justify-center text-white mb-3 shadow-sm">
          <span className="text-xl font-black">AH</span>
        </div>

        <h2 className="text-[18px] font-black text-neutral-900 leading-tight">
          {accountName}
        </h2>
        <p className="text-[13px] font-bold text-[#7a1f7a] mt-0.5 mb-1 font-mono">
          +251 {phone}
        </p>

        <p className="text-[12px] text-neutral-500 mb-6 font-medium">
          Enter your 6-digit PIN to authenticate
        </p>

        {/* PIN Inputs - Strictly masked with password circles to hide entered PIN digits */}
        <div className="flex justify-center gap-2.5 mb-4">
          {pin.map((digit, idx) => (
            <div
              key={idx}
              onClick={() => {
                if (!isLoading) inputRefs[idx].current?.focus();
              }}
              className={`w-11 h-13 rounded-2xl border-2 flex items-center justify-center transition-all cursor-text relative ${
                errorMsg
                  ? 'border-rose-400 bg-rose-50/70'
                  : digit
                  ? 'border-[#7a1f7a] bg-purple-50/50 shadow-2xs'
                  : 'border-neutral-300 bg-neutral-50'
              }`}
            >
              <input
                ref={inputRefs[idx]}
                type="password"
                inputMode="numeric"
                maxLength={1}
                disabled={isLoading}
                value={digit}
                onChange={(e) => handleDigitChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="absolute inset-0 w-full h-full opacity-0 text-center cursor-text"
              />
              {/* Masked circle bullet: keeps PIN completely hidden */}
              {digit ? (
                <div className="w-3.5 h-3.5 rounded-full bg-[#7a1f7a] animate-scaleIn" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-neutral-300" />
              )}
            </div>
          ))}
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="text-rose-600 text-[13px] font-bold mb-3 animate-shake">
            {errorMsg}
          </div>
        )}

        {/* 3-Second Loading Animation on Successful Login */}
        {isLoading && (
          <div className="w-full bg-purple-50 p-4 rounded-2xl border border-purple-200 flex flex-col items-center mb-3 animate-fadeIn">
            <div className="flex items-center gap-2 text-[#7a1f7a] font-bold text-sm mb-2">
              <Loader2 size={18} className="animate-spin" />
              <span>Authenticating AHMED HUSSEN SEID...</span>
            </div>
            <div className="w-full bg-purple-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#7a1f7a] h-full transition-all duration-100 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <span className="text-[11px] text-neutral-500 mt-2 font-medium">
              Redirecting to Home Page...
            </span>
          </div>
        )}

        {/* Generic security badge - PIN value is STRICTLY HIDDEN */}
        {!isLoading && !errorMsg && (
          <div className="text-[11px] text-neutral-400 mb-3 flex items-center gap-1.5">
            <Shield size={13} className="text-emerald-500" />
            <span>Encrypted Banking Session</span>
          </div>
        )}

        {/* On-screen keypad */}
        <div className="grid grid-cols-3 gap-2.5 w-full max-w-[270px] my-2">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              disabled={isLoading}
              onClick={() => handleKeypadPress(num)}
              className="h-12 rounded-2xl bg-neutral-100 hover:bg-neutral-200 active:bg-[#7a1f7a] active:text-white font-bold text-xl text-neutral-800 transition-colors shadow-2xs disabled:opacity-40 cursor-pointer flex items-center justify-center"
            >
              {num}
            </button>
          ))}
          <div />
          <button
            disabled={isLoading}
            onClick={() => handleKeypadPress('0')}
            className="h-12 rounded-2xl bg-neutral-100 hover:bg-neutral-200 active:bg-[#7a1f7a] active:text-white font-bold text-xl text-neutral-800 transition-colors shadow-2xs disabled:opacity-40 cursor-pointer flex items-center justify-center"
          >
            0
          </button>
          <button
            disabled={isLoading}
            onClick={handleKeypadDelete}
            className="h-12 rounded-2xl bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 flex items-center justify-center text-neutral-800 transition-colors shadow-2xs disabled:opacity-40 cursor-pointer"
            title="Backspace"
          >
            <Delete size={20} />
          </button>
        </div>

        {/* Submit button */}
        <button
          onClick={() => validatePin(pin.join(''))}
          disabled={isLoading || pin.join('').length < 6}
          className="w-full max-w-[270px] h-12 rounded-2xl bg-[#7a1f7a] hover:bg-[#681868] text-white font-bold text-sm shadow-xs transition-all mt-3 disabled:opacity-40 flex items-center justify-center cursor-pointer"
        >
          <span>Continue</span>
        </button>
      </div>

      {/* Footer */}
      <div className="py-3 text-center text-[10px] text-neutral-400">
        Commercial Bank of Ethiopia • Secure Mobile Banking
      </div>
    </div>
  );
};
