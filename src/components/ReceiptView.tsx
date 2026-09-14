import React, { useState } from 'react';
import { Download, Share2, X, ArrowLeft, FileText, Check } from 'lucide-react';
import { CbeQrCode } from './CbeQrCode';
import { ReceiptData } from '../types';

interface ReceiptViewProps {
  receipt: ReceiptData;
  onClose: () => void;
  onBackToHome: () => void;
}

export const ReceiptView: React.FC<ReceiptViewProps> = ({
  receipt,
  onClose,
  onBackToHome,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // When scanned by any camera, this URL directly opens THIS EXACT mobile receipt
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  const receiptScanUrl = `${currentOrigin}/?tx=${encodeURIComponent(
    receipt.transactionId
  )}&amt=${receipt.amount}&sender=${encodeURIComponent(
    receipt.senderName
  )}&senderAcc=${encodeURIComponent(receipt.senderAccount)}&receiver=${encodeURIComponent(
    receipt.receiverName
  )}&receiverAcc=${encodeURIComponent(receipt.receiverAccount)}&date=${encodeURIComponent(
    receipt.date
  )}&ref=${encodeURIComponent(receipt.reason || 'ok')}`;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleDownload = () => {
    // Saves/prints this exact receipt without leaving this screen
    showToast('Receipt saved to device');
    if (typeof window !== 'undefined') {
      try {
        window.print();
      } catch {
        // ignore
      }
    }
  };

  const handleShare = () => {
    const shareText = `ETB ${receipt.amount} debited from ${receipt.senderName} for ${receipt.receiverName} on ${receipt.date} with Transaction ID: ${receipt.transactionId} via CBEBirr mobile app's Send Money (${receipt.reason || 'ok'}).`;
    if (navigator.share) {
      navigator
        .share({
          title: `CBEBirr Receipt - ${receipt.transactionId}`,
          text: shareText,
          url: receiptScanUrl,
        })
        .catch(() => {});
    } else {
      navigator.clipboard?.writeText(`${shareText}\n${receiptScanUrl}`);
      showToast('Receipt link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-full w-full bg-white flex flex-col justify-between select-none pb-6 text-neutral-900 font-sans">
      <div>
        {/* Top Header matching Screenshot_20260827-224517_Replit.png */}
        <div className="bg-[#862382] text-white px-4 py-3.5 flex items-center justify-between shadow-xs">
          {/* Download button */}
          <button
            onClick={handleDownload}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors active:scale-95 cursor-pointer"
            title="Download receipt"
          >
            <Download size={20} className="text-white" />
          </button>

          {/* Title: Transaction Details */}
          <h2 className="text-[16px] sm:text-[17px] font-bold tracking-wide">
            Transaction Details
          </h2>

          {/* Share & Close icons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors active:scale-95 cursor-pointer"
              title="Share receipt"
            >
              <Share2 size={20} className="text-white" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors active:scale-95 cursor-pointer"
              title="Close"
            >
              <X size={22} className="text-white" />
            </button>
          </div>
        </div>

        {/* Action feedback toast */}
        {toastMessage && (
          <div className="bg-[#862382] text-white text-xs font-semibold py-2 px-4 text-center animate-fadeIn border-t border-white/20">
            {toastMessage}
          </div>
        )}

        {/* Content Body */}
        <div className="px-5 pt-4 flex flex-col items-center">
          {/* "Thank you! Success" banner matching screenshot */}
          <div className="w-full max-w-[360px] bg-[#862382] rounded-2xl p-4 text-white flex items-center gap-3.5 shadow-sm mb-3">
            <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#862382] flex-shrink-0 shadow-2xs">
              <Check size={26} strokeWidth={3.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-[18px] font-bold leading-tight">Thank you!</span>
              <span className="text-[14px] font-medium text-white/95">Success</span>
            </div>
          </div>

          {/* Message label */}
          <span className="text-[13px] font-medium text-neutral-400 mb-2">Message</span>

          {/* Exact Debited Text matching user's screenshot */}
          <p className="text-center text-[14.5px] font-bold text-neutral-900 leading-snug max-w-[340px] px-1 mb-4">
            ETB {receipt.amount} debited from {receipt.senderName} for {receipt.receiverName} on {receipt.date} with Transaction ID: {receipt.transactionId} via CBEBirr mobile app's Send Money ({receipt.reason || 'ok'}).
          </p>

          {/* Full Style, Full Size, Full Center Icon QR Code matching Screenshot_20260827-224615_Replit.png */}
          <div className="my-2 flex flex-col items-center">
            <div className="p-2 bg-white rounded-2xl border border-neutral-200/80 shadow-2xs flex items-center justify-center">
              <CbeQrCode
                value={receiptScanUrl}
                size={180}
              />
            </div>
          </div>

          {/* Commercial Bank of Ethiopia Trust Banner from Screenshot_20260827-224517_Replit.png */}
          <div className="w-full max-w-[340px] bg-[#f0f1f3] rounded-xl px-3.5 py-2.5 flex items-center gap-3 border border-neutral-200/60 my-3">
            <div className="w-13 h-8 flex items-center justify-center flex-shrink-0 bg-white rounded-md p-1 border border-neutral-200/50 shadow-2xs">
              <div className="flex flex-col items-center leading-none">
                <span className="text-[6.5px] font-black text-[#862382] leading-none">CBE</span>
                <span className="text-[10px] font-black italic text-[#18181c] leading-none">Birr</span>
                <div className="w-full h-[1.5px] bg-[#f5a822] rounded-full mt-[1px]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[13.5px] font-bold text-neutral-800 leading-tight">
                Commercial Bank of Ethiopia
              </span>
              <span className="text-[11.5px] font-medium text-neutral-500 leading-tight">
                The Bank You Can Always Rely On!
              </span>
            </div>
          </div>

          {/* SMS Confirmation Notice */}
          <p className="text-[12px] text-neutral-500 font-medium text-center mb-5">
            you will receive a confirmation SMS shortly!
          </p>

          {/* Dual Purple Action Buttons matching Screenshot_20260827-224517_Replit.png */}
          <div className="w-full max-w-[340px] flex flex-col gap-3">
            {/* Back to home button */}
            <button
              onClick={onBackToHome}
              className="w-full h-12 rounded-full bg-[#862382] hover:bg-[#741e70] active:scale-[0.99] text-white font-bold text-[14.5px] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft size={18} className="text-white" />
              <span>Back to home</span>
            </button>

            {/* Get Receipt button */}
            <button
              onClick={handleDownload}
              className="w-full h-12 rounded-full bg-[#862382] hover:bg-[#741e70] active:scale-[0.99] text-white font-bold text-[14.5px] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText size={18} className="text-white" />
              <span>Get Receipt</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom safe bar indicator */}
      <div className="w-32 h-1 bg-neutral-300 rounded-full mx-auto mt-6" />
    </div>
  );
};
