import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight, QrCode } from 'lucide-react';
import { CbeQrCard } from './CbeQrCard';

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  type?: 'general' | 'qr' | 'transactions' | 'transfer';
}

export const ActionModal: React.FC<ActionModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  type = 'general',
}) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleAction = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-2xl relative border border-neutral-100 flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors"
        >
          <X size={20} />
        </button>

        {isSuccess ? (
          <div className="py-8 flex flex-col items-center text-center">
            <CheckCircle className="text-emerald-600 mb-3 animate-bounce" size={48} />
            <h3 className="text-lg font-bold text-neutral-800">Transaction Successful</h3>
            <p className="text-sm text-neutral-500 mt-1">
              Your request for {title} has been processed.
            </p>
          </div>
        ) : type === 'qr' ? (
          <div className="flex flex-col items-center pt-1">
            <CbeQrCard
              mode={title.toLowerCase().includes('personal') ? 'personal' : 'pay'}
              accountName="MUSEL YU***"
              phoneNumber="251927035376"
            />
          </div>
        ) : type === 'transactions' ? (
          <div className="py-2">
            <h3 className="text-lg font-bold text-neutral-900 mb-1">Transaction History</h3>
            <p className="text-xs text-neutral-500 mb-4">Recent account activities</p>

            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {[
                { id: '1', title: 'Mekedonia Donation', date: 'Today, 11:20 AM', amount: '-500.00 ETB', type: 'debit' },
                { id: '2', title: 'Salary Credit - CBE', date: 'Yesterday, 09:15 AM', amount: '+12,400.00 ETB', type: 'credit' },
                { id: '3', title: 'Air Time Top-up', date: '08 Sep, 04:30 PM', amount: '-100.00 ETB', type: 'debit' },
                { id: '4', title: 'Ethio Telecom Bill', date: '05 Sep, 02:10 PM', amount: '-850.00 ETB', type: 'debit' },
              ].map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-50 border border-neutral-100"
                >
                  <div>
                    <div className="text-xs font-semibold text-neutral-800">{tx.title}</div>
                    <div className="text-[10px] text-neutral-400">{tx.date}</div>
                  </div>
                  <span
                    className={`text-xs font-bold ${
                      tx.type === 'credit' ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {tx.amount}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={onClose}
              className="w-full mt-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold rounded-xl text-sm transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleAction} className="py-2">
            <h3 className="text-lg font-bold text-neutral-900 mb-1">{title}</h3>
            {subtitle && <p className="text-xs text-neutral-500 mb-4">{subtitle}</p>}

            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Recipient / Account / Service
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 100029384992 or 0911223344"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8f278f] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Amount (ETB)
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8f278f] focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold rounded-xl text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-[#8f278f] hover:bg-[#7a1f7a] text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Proceed</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
