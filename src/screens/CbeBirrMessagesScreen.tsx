import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  User,
  Trash2,
  Copy,
  Pencil,
  Check,
  Pin,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CbeMessage, ReceiptData } from '../types';

interface CbeBirrMessagesScreenProps {
  onBack: () => void;
  onOpenReceipt: (receipt: ReceiptData) => void;
}

export const CbeBirrMessagesScreen: React.FC<CbeBirrMessagesScreenProps> = ({
  onBack,
  onOpenReceipt,
}) => {
  const { messages, deleteMessage, updateMessage, clearAllMessages, user } = useApp();

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingMessage, setEditingMessage] = useState<CbeMessage | null>(null);
  const [editText, setEditText] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showScrollDown, setShowScrollDown] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prevMsgCountRef = useRef(messages.length);

  // Scroll to bottom helper
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior,
      });
    }
  };

  // Immediate scroll to bottom on entry so newest message is viewed first
  useEffect(() => {
    const scrollToLatest = () => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ block: 'end', behavior: 'auto' });
      }
    };

    // Run immediately and across frames as layout paints
    scrollToLatest();
    const frameId = requestAnimationFrame(scrollToLatest);
    const timer1 = setTimeout(scrollToLatest, 50);
    const timer2 = setTimeout(scrollToLatest, 150);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // When new messages arrive, smoothly scroll to bottom
  useEffect(() => {
    if (messages.length > prevMsgCountRef.current) {
      scrollToBottom('smooth');
    }
    prevMsgCountRef.current = messages.length;
  }, [messages.length]);

  // Handle scroll events to detect if user has scrolled up
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    // Show jump to bottom button if more than 200px from bottom
    setShowScrollDown(distanceFromBottom > 200);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleCopy = (text: string, id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedId(id);
    showToast('Message copied to clipboard');
    setTimeout(() => {
      setCopiedId((curr) => (curr === id ? null : curr));
    }, 2000);
  };

  const handleStartEdit = (msg: CbeMessage) => {
    setEditingMessage(msg);
    setEditText(msg.text);
  };

  const handleSaveEdit = () => {
    if (!editingMessage || !editText.trim()) return;
    updateMessage(editingMessage.id, editText.trim());
    setEditingMessage(null);
    setEditText('');
    showToast('Message updated successfully');
  };

  // Convert a message to ReceiptData for opening in ReceiptView
  const handleOpenReceiptFromMessage = (msg: CbeMessage) => {
    const txId = msg.txnId || 'DG' + Math.random().toString(36).substring(2, 9).toUpperCase();
    const amt = msg.amount || 2200.0;
    const receiver = msg.receiverName || 'Recipient';
    const receiverAcc = msg.receiverAccount || '1000097198482';
    const dateStr = msg.timestamp ? msg.timestamp.split(' ')[0] : '14-09-2026';

    const receipt: ReceiptData = {
      transactionId: txId,
      amount: amt,
      fee: 0,
      senderName: msg.senderName || user.name,
      senderAccount: user.accountNumber,
      receiverName: receiver,
      receiverAccount: receiverAcc,
      receiverBank: 'Commercial Bank of Ethiopia',
      date: dateStr,
      type: msg.type === 'deposit' ? 'Deposit / Top-up' : 'Send Money',
      reason: msg.type === 'deposit' ? 'Account Deposit' : 'Transfer (Select Transfer)',
    };

    onOpenReceipt(receipt);
  };

  // Split text into normal text and URL links
  const renderMessageContent = (msg: CbeMessage) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = msg.text.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <span
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              handleOpenReceiptFromMessage(msg);
            }}
            className="text-blue-600 underline font-medium break-all hover:text-blue-800 cursor-pointer"
          >
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#f5f6f8] relative font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-neutral-900/90 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg pointer-events-none transition-all">
          {toastMessage}
        </div>
      )}

      {/* Top Header: matches Screenshot_20260914-145542_Hermit.png */}
      <div className="w-full bg-white border-b border-neutral-200 px-3 py-2.5 flex items-center justify-between shadow-2xs z-20 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBack}
            className="p-1.5 -ml-1 text-neutral-800 hover:bg-neutral-100 active:bg-neutral-200 rounded-full transition-colors cursor-pointer"
            title="Back"
          >
            <ArrowLeft size={22} />
          </button>

          <div className="w-9 h-9 rounded-full bg-neutral-200 border border-neutral-300 flex items-center justify-center text-neutral-600 flex-shrink-0">
            <User size={20} />
          </div>

          <div className="flex flex-col">
            <span className="text-[17px] font-bold text-neutral-900 tracking-tight leading-tight">
              CBEBirr
            </span>
            <span className="text-[11px] text-neutral-500 font-medium">Official Service</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-neutral-700">
          <button
            className="p-2 hover:bg-neutral-100 active:bg-neutral-200 rounded-full transition-colors cursor-pointer text-neutral-700"
            title="Pin"
          >
            <Pin size={19} />
          </button>
          <button
            onClick={() => setShowClearConfirm(true)}
            className="p-2 hover:bg-neutral-100 active:bg-neutral-200 rounded-full transition-colors cursor-pointer text-neutral-700"
            title="Delete all messages"
          >
            <Trash2 size={19} />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area - Full Height, Free Smooth Scroll in Both Directions */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-3.5 pt-3.5 pb-8 space-y-4 min-h-0 overscroll-y-contain"
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {messages.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center text-neutral-400 p-6">
            <User size={36} className="mb-2 opacity-40 text-neutral-500" />
            <p className="text-sm font-semibold text-neutral-600">No messages yet</p>
            <p className="text-xs text-neutral-400 mt-1">
              Transfers and deposits will arrive here automatically.
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="flex flex-col items-start w-full group">
              {/* Message Bubble Card: matches Hermit screenshot */}
              <div className="w-full max-w-[96%] bg-white rounded-2xl p-3.5 border border-neutral-200 shadow-2xs hover:shadow-xs transition-shadow">
                {/* Main Message Text */}
                <div className="text-[13.5px] leading-[1.5] text-neutral-800 tracking-normal break-words">
                  {renderMessageContent(msg)}
                </div>

                {/* Divider Line */}
                <div className="h-[1px] bg-neutral-200/90 my-2.5 w-full" />

                {/* View all > row (matching screenshot) */}
                <button
                  onClick={() => handleOpenReceiptFromMessage(msg)}
                  className="w-full flex items-center justify-between text-neutral-600 hover:text-[#7a1f7a] text-[13px] font-semibold transition-colors py-0.5 cursor-pointer"
                >
                  <span>View all</span>
                  <ChevronRight size={16} className="text-neutral-400" />
                </button>
              </div>

              {/* Message Footer Actions Row: Copy, Edit, Delete, Timestamp */}
              <div className="w-full max-w-[96%] px-2 pt-1.5 flex items-center justify-between text-[11px] text-neutral-500">
                <div className="flex items-center gap-3">
                  {/* Delete button */}
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className="hover:text-rose-600 active:scale-95 transition-all p-0.5 rounded cursor-pointer"
                    title="Delete message"
                  >
                    <Trash2 size={14} />
                  </button>

                  {/* Edit button */}
                  <button
                    onClick={() => handleStartEdit(msg)}
                    className="hover:text-[#7a1f7a] active:scale-95 transition-all p-0.5 rounded cursor-pointer"
                    title="Edit message"
                  >
                    <Pencil size={14} />
                  </button>

                  {/* Copy button */}
                  <button
                    onClick={() => handleCopy(msg.text, msg.id)}
                    className="hover:text-[#7a1f7a] active:scale-95 transition-all p-0.5 rounded cursor-pointer flex items-center gap-1"
                    title="Copy message"
                  >
                    {copiedId === msg.id ? (
                      <Check size={14} className="text-emerald-600" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>

                {/* Display time e.g. 11:23 AM or 10:55 */}
                <span className="font-medium text-neutral-400 text-[11px]">
                  {msg.displayTime || '11:23 AM'}
                </span>
              </div>
            </div>
          ))
        )}

        {/* Scroll Anchor */}
        <div ref={messagesEndRef} className="h-1" />
      </div>

      {/* Floating Scroll-to-Bottom Quick Button when user scrolls up */}
      {showScrollDown && (
        <button
          onClick={() => scrollToBottom('smooth')}
          className="absolute bottom-4 right-4 z-30 w-9 h-9 rounded-full bg-white/95 border border-neutral-300 shadow-md flex items-center justify-center text-neutral-700 hover:text-[#7a1f7a] active:scale-90 transition-all cursor-pointer"
          title="Scroll to latest"
        >
          <ChevronDown size={18} />
        </button>
      )}

      {/* Edit Message Modal */}
      {editingMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl p-4 flex flex-col border border-neutral-200">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="text-[16px] font-bold text-neutral-900">Edit CBEBirr Message</h3>
              <button
                onClick={() => setEditingMessage(null)}
                className="text-neutral-400 hover:text-neutral-600 text-lg leading-none cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-neutral-500 mt-2 mb-1.5">
              Edit message text details, amount, names, date, or URL:
            </p>

            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              rows={7}
              className="w-full text-[13px] text-neutral-800 p-3 rounded-xl border border-neutral-300 focus:border-[#7a1f7a] focus:ring-2 focus:ring-[#7a1f7a]/20 outline-none resize-none font-sans leading-relaxed"
            />

            <div className="flex items-center justify-end gap-2.5 pt-3 mt-2 border-t border-neutral-100">
              <button
                onClick={() => setEditingMessage(null)}
                className="px-4 py-2 rounded-xl text-neutral-600 hover:bg-neutral-100 text-[13px] font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 rounded-xl bg-[#7a1f7a] hover:bg-[#681868] text-white text-[13px] font-bold shadow-xs transition-colors cursor-pointer"
              >
                Save Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear All Confirm Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl w-full max-w-xs overflow-hidden shadow-2xl p-4 flex flex-col text-center border border-neutral-200">
            <div className="w-11 h-11 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-2.5">
              <Trash2 size={22} />
            </div>
            <h4 className="text-[16px] font-bold text-neutral-900">Clear all messages?</h4>
            <p className="text-xs text-neutral-500 mt-1 mb-4">
              This will remove all stored CBEBirr SMS messages from the list.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-2 rounded-xl text-neutral-700 bg-neutral-100 hover:bg-neutral-200 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  clearAllMessages();
                  setShowClearConfirm(false);
                  showToast('All messages cleared');
                }}
                className="flex-1 py-2 rounded-xl text-white bg-rose-600 hover:bg-rose-700 text-xs font-bold transition-colors shadow-xs cursor-pointer"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
