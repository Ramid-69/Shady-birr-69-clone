import React, { useState, useRef, useEffect } from 'react';
import { X, Lock, Delete, Loader2, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface PinPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (pin: string) => void;
  title?: string;
  subtitle?: string;
}

export const PinPromptModal: React.FC<PinPromptModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  title = 'Security Verification',
  subtitle = 'Please enter your 6-digit CBEBirr PIN to confirm',
}) => {
  const { user } = useApp();
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [errorMsg, setErrorMsg] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    if (isOpen) {
      setPin(['', '', '', '', '', '']);
      setErrorMsg('');
      setIsValidating(false);
      setTimeout(() => {
        inputRefs[0].current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDigitChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    if (!/^\d*$/.test(val)) return;

    const newPin = [...pin];
    newPin[index] = val;
    setPin(newPin);
    setErrorMsg('');

    if (val && index < 5) {
      inputRefs[index + 1].current?.focus();
    }

    if (index === 5 && val) {
      const fullPin = newPin.join('');
      verifyPin(fullPin);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const verifyPin = (enteredCode: string) => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      // Strictly require PIN 696969
      if (enteredCode === '696969' || enteredCode === user.pin) {
        onSuccess(enteredCode);
      } else {
        setErrorMsg('Invalid PIN');
        setPin(['', '', '', '', '', '']);
        inputRefs[0].current?.focus();
      }
    }, 400);
  };

  const handleKeypadPress = (num: string) => {
    const emptyIndex = pin.findIndex((d) => d === '');
    if (emptyIndex !== -1) {
      handleDigitChange(emptyIndex, num);
    }
  };

  const handleKeypadDelete = () => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn select-none">
      <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl relative flex flex-col items-center border border-neutral-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-100 cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Lock Icon badge */}
        <div className="w-12 h-12 rounded-2xl bg-[#7a1f7a]/10 text-[#7a1f7a] flex items-center justify-center mt-2 mb-3 shadow-xs">
          <Lock size={24} />
        </div>

        <h3 className="text-[17px] font-bold text-neutral-900 text-center">{title}</h3>
        <p className="text-[12px] text-neutral-500 text-center mt-1 mb-4 px-3">{subtitle}</p>

        {/* 6 Digit Inputs - Masked to completely hide PIN */}
        <div className="flex justify-center gap-2 mb-3">
          {pin.map((digit, idx) => (
            <div
              key={idx}
              onClick={() => inputRefs[idx].current?.focus()}
              className={`w-10 h-12 rounded-xl border-2 flex items-center justify-center transition-all cursor-text relative ${
                errorMsg
                  ? 'border-rose-400 bg-rose-50'
                  : digit
                  ? 'border-[#7a1f7a] bg-purple-50/50'
                  : 'border-neutral-200 bg-neutral-50'
              }`}
            >
              <input
                ref={inputRefs[idx]}
                type="password"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="absolute inset-0 w-full h-full opacity-0 text-center cursor-text"
              />
              {digit ? (
                <div className="w-3 h-3 rounded-full bg-[#7a1f7a]" />
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
              )}
            </div>
          ))}
        </div>

        {/* Error or validating status - PIN text is NEVER revealed */}
        {errorMsg ? (
          <div className="text-rose-600 text-[12px] font-bold mb-3 animate-shake">
            {errorMsg}
          </div>
        ) : isValidating ? (
          <div className="text-[#7a1f7a] text-[11px] font-medium mb-3 flex items-center gap-1.5">
            <Loader2 size={12} className="animate-spin" />
            <span>Verifying PIN...</span>
          </div>
        ) : (
          <div className="text-neutral-400 text-[11px] mb-3 flex items-center gap-1">
            <Shield size={12} className="text-emerald-500" />
            <span>Encrypted Authorization</span>
          </div>
        )}

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-[260px] my-1">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleKeypadPress(num)}
              className="h-11 rounded-xl bg-neutral-100 hover:bg-neutral-200 active:bg-[#7a1f7a] active:text-white font-bold text-base text-neutral-800 transition-colors shadow-xs cursor-pointer"
            >
              {num}
            </button>
          ))}
          <div />
          <button
            onClick={() => handleKeypadPress('0')}
            className="h-11 rounded-xl bg-neutral-100 hover:bg-neutral-200 active:bg-[#7a1f7a] active:text-white font-bold text-base text-neutral-800 transition-colors shadow-xs cursor-pointer"
          >
            0
          </button>
          <button
            onClick={handleKeypadDelete}
            className="h-11 rounded-xl bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 flex items-center justify-center text-neutral-800 transition-colors shadow-xs cursor-pointer"
            title="Delete"
          >
            <Delete size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
