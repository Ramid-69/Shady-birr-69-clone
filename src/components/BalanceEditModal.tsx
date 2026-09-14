import React, { useState } from 'react';
import { X, PlusCircle, Sliders, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface BalanceEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'add' | 'edit';
}

export const BalanceEditModal: React.FC<BalanceEditModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'add',
}) => {
  const { balances, updateBalances, addFundsToBalance } = useApp();
  const [mode, setMode] = useState<'add' | 'edit'>(initialMode);
  const [addAmount, setAddAmount] = useState('');
  const [addReason, setAddReason] = useState('ATM Deposit');
  const [currentInput, setCurrentInput] = useState(balances.current.toString());
  const [rewardInput, setRewardInput] = useState(balances.reward.toString());
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleAddFunds = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(addAmount);
    if (!isNaN(val) && val > 0) {
      addFundsToBalance(val, addReason || 'Deposit / Added Funds');
      setSuccessMsg(`Successfully added ETB ${val.toFixed(2)} to balance!`);
      setTimeout(() => {
        setSuccessMsg('');
        setAddAmount('');
        onClose();
      }, 1400);
    }
  };

  const handleSaveManual = (e: React.FormEvent) => {
    e.preventDefault();
    const cur = parseFloat(currentInput);
    const rew = parseFloat(rewardInput);
    if (!isNaN(cur) && !isNaN(rew)) {
      updateBalances(cur, rew);
      setSuccessMsg('Balances updated successfully!');
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl relative border border-neutral-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-100"
        >
          <X size={20} />
        </button>

        {/* Tab Switcher */}
        <div className="flex bg-neutral-100 p-1 rounded-2xl mb-4 mt-2">
          <button
            onClick={() => setMode('add')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              mode === 'add'
                ? 'bg-white text-[#8f278f] shadow-xs'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <PlusCircle size={14} />
            <span>Add Funds (3-Clicks)</span>
          </button>
          <button
            onClick={() => setMode('edit')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              mode === 'edit'
                ? 'bg-white text-[#8f278f] shadow-xs'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <Sliders size={14} />
            <span>Edit Balances</span>
          </button>
        </div>

        {successMsg ? (
          <div className="py-6 flex flex-col items-center text-center animate-fadeIn">
            <CheckCircle2 className="text-emerald-500 mb-2" size={44} />
            <h4 className="text-base font-bold text-neutral-900">{successMsg}</h4>
            <p className="text-xs text-neutral-500 mt-1">Reflected in your balance and history</p>
          </div>
        ) : mode === 'add' ? (
          <form onSubmit={handleAddFunds} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Enter Amount to Add (ETB)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 font-bold text-sm">
                  ETB
                </span>
                <input
                  type="number"
                  step="any"
                  min="1"
                  required
                  autoFocus
                  placeholder="e.g. 500"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                  className="w-full pl-14 pr-3 py-2.5 text-base font-bold border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8f278f]"
                />
              </div>

              {/* Quick Amount Chips */}
              <div className="flex gap-2 mt-2">
                {[100, 500, 1000, 5000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAddAmount(amt.toString())}
                    className="flex-1 py-1 text-xs font-semibold bg-purple-50 text-[#8f278f] border border-[#8f278f]/20 rounded-lg hover:bg-[#8f278f] hover:text-white transition-colors"
                  >
                    +{amt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Transaction Source / Note
              </label>
              <select
                value={addReason}
                onChange={(e) => setAddReason(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8f278f]"
              >
                <option value="ATM Cash Deposit">ATM Cash Deposit</option>
                <option value="CBE Branch Deposit">CBE Branch Deposit</option>
                <option value="Direct Salary Addition">Direct Salary Addition</option>
                <option value="Transfer from MM To Bank">Transfer from MM To Bank</option>
                <option value="Manual Balance Top-up">Manual Balance Top-up</option>
              </select>
            </div>

            <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-200/60 text-[11px] text-neutral-500">
              Current total: <span className="font-bold text-neutral-800">ETB {balances.current.toFixed(2)}</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#8f278f] hover:bg-[#7a1f7a] active:bg-[#681868] text-white font-bold rounded-xl text-sm transition-colors shadow-sm"
            >
              Add Amount & Update History
            </button>
          </form>
        ) : (
          <form onSubmit={handleSaveManual} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Current Balance (ETB)
              </label>
              <input
                type="number"
                step="any"
                min="0"
                required
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                className="w-full px-3 py-2.5 text-base font-bold border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8f278f]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Reward Balance (ETB)
              </label>
              <input
                type="number"
                step="any"
                min="0"
                required
                value={rewardInput}
                onChange={(e) => setRewardInput(e.target.value)}
                className="w-full px-3 py-2.5 text-base font-bold border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8f278f]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#8f278f] hover:bg-[#7a1f7a] text-white font-bold rounded-xl text-sm transition-colors shadow-sm"
            >
              Save Balances
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
