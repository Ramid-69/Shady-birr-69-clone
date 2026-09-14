import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  Building2,
  Landmark,
  ChevronDown,
  ArrowUpDown,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  CheckCircle2,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ETHIOPIAN_BANKS, BankInfo } from '../data/banks';
import { SavedAccount } from '../types';

interface BankTransferScreenProps {
  onBack: () => void;
  onRequestPin: (payload: {
    amount: number;
    receiverName: string;
    receiverAccount: string;
    receiverBank: string;
    reason?: string;
    type?: string;
  }) => void;
}

export const BankTransferScreen: React.FC<BankTransferScreenProps> = ({
  onBack,
  onRequestPin,
}) => {
  const {
    savedAccounts,
    hideSavedAccounts,
    toggleHideSavedAccounts,
    addSavedAccount,
    updateSavedAccount,
    deleteSavedAccount,
  } = useApp();

  // Selected Bank & Form State
  const [selectedBank, setSelectedBank] = useState<BankInfo>(ETHIOPIAN_BANKS[0]);
  const [bankAccount, setBankAccount] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');

  // Step state: 'select' -> 'details'
  const [step, setStep] = useState<'account' | 'confirm'>('account');

  // Modals inside Bank Transfer
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [bankSearch, setBankSearch] = useState('');
  const [editingAccount, setEditingAccount] = useState<SavedAccount | null>(null);
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);

  // New saved account inputs
  const [newAccName, setNewAccName] = useState('');
  const [newAccNumber, setNewAccNumber] = useState('');
  const [newAccBank, setNewAccBank] = useState(ETHIOPIAN_BANKS[0].name);
  const [newAccNick, setNewAccNick] = useState('');

  const filteredBanks = ETHIOPIAN_BANKS.filter(
    (b) =>
      b.name.toLowerCase().includes(bankSearch.toLowerCase()) ||
      b.shortName.toLowerCase().includes(bankSearch.toLowerCase())
  );

  const handleSelectSavedAccount = (acc: SavedAccount) => {
    const matchedBank = ETHIOPIAN_BANKS.find((b) => b.name === acc.bankName) || ETHIOPIAN_BANKS[0];
    setSelectedBank(matchedBank);
    setBankAccount(acc.accountNumber);
    setReceiverName(acc.name);
  };

  const handleProceedToDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankAccount.trim()) return;

    // Auto-populate receiver name if not yet filled or if matches a saved account
    const matchedSaved = savedAccounts.find(
      (a) => a.accountNumber.trim() === bankAccount.trim()
    );

    if (matchedSaved) {
      setReceiverName(matchedSaved.name);
    } else if (!receiverName) {
      // Realistic Ethiopian banking auto-inquiry lookup
      const sampleNames = [
        'Fraol Endale Wagari',
        'Endale Wakijira Gudeto',
        'Blen Tesfaye Haile',
        'Dawit Kebede Wolde',
        'Selamawit Tadesse Bekele',
        'Yared Mulugeta Alemu',
      ];
      const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
      setReceiverName(randomName);
    }

    setStep('confirm');
  };

  const handleConfirmTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return;

    onRequestPin({
      amount: parsedAmount,
      receiverName: receiverName || 'Beneficiary Account',
      receiverAccount: bankAccount,
      receiverBank: selectedBank.name,
      reason: reason || 'Bank transfer (ok)',
      type: 'Transfer to Other Bank',
    });
  };

  const handleSaveNewBeneficiary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAccName || !newAccNumber) return;

    if (editingAccount) {
      updateSavedAccount(editingAccount.id, {
        name: newAccName.toUpperCase(),
        accountNumber: newAccNumber,
        bankName: newAccBank,
        nickname: newAccNick,
      });
      setEditingAccount(null);
    } else {
      addSavedAccount({
        name: newAccName.toUpperCase(),
        accountNumber: newAccNumber,
        bankName: newAccBank,
        nickname: newAccNick || newAccName,
      });
    }

    setNewAccName('');
    setNewAccNumber('');
    setNewAccNick('');
    setIsAddAccountOpen(false);
  };

  return (
    <div className="min-h-full w-full bg-neutral-50 flex flex-col justify-between pb-24 text-neutral-800">
      {/* Top Header matching screenshot IMG_20260805_203334_338.jpg */}
      <div className="bg-[#8f278f] text-white px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={step === 'confirm' ? () => setStep('account') : onBack}
            className="p-1 hover:bg-white/10 rounded-full transition-colors active:scale-95"
            title="Back"
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-[18px] font-bold tracking-wide">
            {step === 'confirm' ? 'Confirm Transfer' : 'Bank Transfer'}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-1 hover:bg-white/10 rounded-full transition-colors" title="Search">
            <Search size={20} />
          </button>
          <span className="text-[16px] font-bold">EN</span>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="flex-1 px-4 py-4 space-y-4">
        {step === 'account' ? (
          <>
            {/* Bank Transfer Inputs Form matching screenshot */}
            <form onSubmit={handleProceedToDetails} className="space-y-4">
              {/* Select Banks Dropdown Box */}
              <div>
                <label className="block text-[12px] font-bold text-neutral-800 mb-1">
                  * Banks
                </label>
                <div
                  onClick={() => setIsBankModalOpen(true)}
                  className="w-full h-14 bg-white rounded-xl border border-neutral-300 px-3.5 flex items-center justify-between shadow-2xs hover:border-[#8f278f] cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#8f278f]/10 text-[#8f278f] flex items-center justify-center">
                      <Landmark size={18} />
                    </div>
                    <span className="text-sm font-semibold text-neutral-800 line-clamp-1">
                      {selectedBank.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-400">
                    <ArrowUpDown size={16} />
                    <ChevronDown size={18} />
                  </div>
                </div>
              </div>

              {/* Bank Account Input */}
              <div>
                <label className="block text-[12px] font-bold text-neutral-800 mb-1">
                  * Bank Account
                </label>
                <div className="w-full h-14 bg-white rounded-xl border border-neutral-300 px-3.5 flex items-center gap-3 shadow-2xs focus-within:ring-2 focus-within:ring-[#8f278f] focus-within:border-transparent">
                  <Building2 size={20} className="text-neutral-400" />
                  <input
                    type="text"
                    required
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                    placeholder="Bank Account"
                    className="flex-1 text-sm font-semibold text-neutral-900 outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Next Button */}
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-[#8f278f] hover:bg-[#7a1f7a] active:bg-[#681868] text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Next</span>
                <ArrowRight size={16} />
              </button>
            </form>

            {/* DESIGNATED SAVED ACCOUNTS SECTION WITH HIDE SETTING */}
            <div className="mt-6 pt-4 border-t border-neutral-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-extrabold text-neutral-800 tracking-wide">
                    Saved Accounts (Beneficiaries)
                  </span>
                  <span className="px-1.5 py-0.5 rounded-md bg-purple-100 text-[#8f278f] text-[10px] font-bold">
                    {savedAccounts.length}
                  </span>
                </div>

                {/* HIDE SETTING BUTTON */}
                <button
                  onClick={toggleHideSavedAccounts}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-[#8f278f] bg-purple-50 hover:bg-purple-100 transition-colors"
                  title="Hide Setting for saved accounts"
                >
                  {hideSavedAccounts ? <Eye size={14} /> : <EyeOff size={14} />}
                  <span>{hideSavedAccounts ? 'Show Setting' : 'Hide Setting'}</span>
                </button>
              </div>

              {/* Saved accounts list or hidden indicator */}
              {hideSavedAccounts ? (
                <div className="bg-neutral-100/80 rounded-xl p-4 text-center border border-dashed border-neutral-300 text-xs text-neutral-500">
                  <span>Saved accounts are currently hidden via Hide Setting.</span>
                  <button
                    onClick={toggleHideSavedAccounts}
                    className="block mx-auto mt-1.5 text-[#8f278f] font-bold underline"
                  >
                    Reveal Saved Accounts
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[11px] text-neutral-500">
                      Select any account to auto-fill details
                    </span>
                    <button
                      onClick={() => {
                        setEditingAccount(null);
                        setNewAccName('');
                        setNewAccNumber('');
                        setNewAccNick('');
                        setIsAddAccountOpen(true);
                      }}
                      className="text-[11px] font-bold text-[#8f278f] hover:underline flex items-center gap-1"
                    >
                      <Plus size={13} />
                      <span>Add Account</span>
                    </button>
                  </div>

                  {savedAccounts.length === 0 ? (
                    <div className="bg-white rounded-xl p-4 text-center border border-neutral-200 text-xs text-neutral-400">
                      No saved beneficiaries yet. Tap "Add Account" to save one.
                    </div>
                  ) : (
                    savedAccounts.map((acc) => (
                      <div
                        key={acc.id}
                        onClick={() => handleSelectSavedAccount(acc)}
                        className={`bg-white rounded-xl p-3 border transition-all cursor-pointer flex items-center justify-between shadow-2xs hover:shadow-sm ${
                          bankAccount === acc.accountNumber
                            ? 'border-[#8f278f] ring-1 ring-[#8f278f]'
                            : 'border-neutral-200/80 hover:border-purple-200'
                        }`}
                      >
                        <div className="flex items-center gap-3 flex-1 pr-2">
                          <div className="w-10 h-10 rounded-xl bg-[#8f278f]/10 text-[#8f278f] flex items-center justify-center flex-shrink-0 font-bold text-sm">
                            <Landmark size={20} />
                          </div>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="text-[13px] font-bold text-neutral-900 leading-tight">
                                {acc.name}
                              </span>
                              {acc.nickname && (
                                <span className="text-[10px] bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded font-medium">
                                  {acc.nickname}
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] font-semibold text-neutral-500 font-mono mt-0.5">
                              {acc.accountNumber}
                            </span>
                            <span className="text-[10px] text-neutral-400 mt-0.5">
                              {acc.bankName}
                            </span>
                          </div>
                        </div>

                        {/* Actions: Edit / Delete */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingAccount(acc);
                              setNewAccName(acc.name);
                              setNewAccNumber(acc.accountNumber);
                              setNewAccBank(acc.bankName);
                              setNewAccNick(acc.nickname || '');
                              setIsAddAccountOpen(true);
                            }}
                            className="p-1.5 text-neutral-400 hover:text-[#8f278f] rounded-lg hover:bg-neutral-100"
                            title="Edit saved account"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteSavedAccount(acc.id);
                            }}
                            className="p-1.5 text-neutral-400 hover:text-rose-600 rounded-lg hover:bg-neutral-100"
                            title="Delete saved account"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          /* STEP 2: CONFIRM TRANSFER DETAILS WITH AMOUNT & REASON */
          <form onSubmit={handleConfirmTransfer} className="space-y-4">
            <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-4 shadow-2xs">
              <span className="text-[11px] font-bold text-[#8f278f] uppercase tracking-wider block mb-2">
                Recipient Verified
              </span>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-purple-100/60">
                  <span className="text-neutral-500 font-medium">Bank</span>
                  <span className="font-bold text-neutral-800">{selectedBank.name}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-purple-100/60">
                  <span className="text-neutral-500 font-medium">Account Number</span>
                  <span className="font-bold text-neutral-900 font-mono">{bankAccount}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-neutral-500 font-medium">Account Holder</span>
                  <span className="font-extrabold text-[#8f278f] text-sm">{receiverName}</span>
                </div>
              </div>
            </div>

            {/* Transfer Amount Input */}
            <div>
              <label className="block text-[12px] font-bold text-neutral-800 mb-1">
                * Amount (ETB)
              </label>
              <div className="w-full h-14 bg-white rounded-xl border border-neutral-300 px-3.5 flex items-center gap-3 shadow-2xs focus-within:ring-2 focus-within:ring-[#8f278f]">
                <span className="text-neutral-400 font-bold text-base">$</span>
                <input
                  type="number"
                  step="any"
                  min="1"
                  required
                  autoFocus
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount"
                  className="flex-1 text-base font-bold text-neutral-900 outline-none bg-transparent"
                />
              </div>

              {/* Preset Amount Chips */}
              <div className="flex gap-2 mt-2">
                {[50, 100, 500, 1000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt.toString())}
                    className="flex-1 py-1.5 text-xs font-bold rounded-lg border border-neutral-200 bg-white hover:bg-[#8f278f] hover:text-white transition-colors"
                  >
                    {amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-[12px] font-bold text-neutral-800 mb-1">Reason</label>
              <div className="w-full h-14 bg-white rounded-xl border border-neutral-300 px-3.5 flex items-center gap-3 shadow-2xs focus-within:ring-2 focus-within:ring-[#8f278f]">
                <span className="text-neutral-400 font-bold text-base">?</span>
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Reason"
                  className="flex-1 text-sm font-medium text-neutral-900 outline-none bg-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-[#8f278f] hover:bg-[#7a1f7a] text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <Lock size={16} />
              <span>Authorize Transfer (PIN Prompt)</span>
            </button>
          </form>
        )}
      </div>

      {/* SELECT BANKS BOTTOM SHEET MODAL matching IMG_20260805_203334_338.jpg */}
      {isBankModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-full max-w-[430px] rounded-t-3xl sm:rounded-3xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-neutral-100 flex flex-col items-center">
              <div className="w-10 h-1 rounded-full bg-neutral-300 mb-3" />
              <h2 className="text-base font-bold text-[#8f278f]">Select Banks</h2>
              <div className="w-full mt-3 relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                />
                <input
                  type="text"
                  placeholder="Search Banks"
                  value={bankSearch}
                  onChange={(e) => setBankSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8f278f]"
                  autoFocus
                />
              </div>
            </div>

            {/* Bank List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
              {filteredBanks.map((bank) => (
                <div
                  key={bank.id}
                  onClick={() => {
                    setSelectedBank(bank);
                    setIsBankModalOpen(false);
                  }}
                  className="w-full p-3 rounded-2xl bg-white border border-neutral-200/80 hover:border-[#8f278f] flex items-center gap-3.5 cursor-pointer shadow-2xs hover:shadow-xs transition-all active:scale-[0.99]"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs shadow-xs flex-shrink-0"
                    style={{ backgroundColor: bank.logoColor, color: bank.textColor }}
                  >
                    {bank.shortName.slice(0, 3)}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-neutral-900 leading-tight">
                      {bank.name}
                    </span>
                    <span className="text-[11px] text-neutral-400 mt-0.5">
                      Click to select the bank
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-neutral-50 border-t border-neutral-100 text-center">
              <button
                onClick={() => setIsBankModalOpen(false)}
                className="text-xs font-bold text-neutral-600 hover:text-neutral-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT BENEFICIARY MODAL */}
      {isAddAccountOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl relative border border-neutral-100">
            <h3 className="text-base font-bold text-neutral-900 mb-1">
              {editingAccount ? 'Edit Saved Beneficiary' : 'Add New Beneficiary'}
            </h3>
            <p className="text-xs text-neutral-500 mb-4">
              Saved strictly in the Designated Beneficiary Section
            </p>

            <form onSubmit={handleSaveNewBeneficiary} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Account Name
                </label>
                <input
                  type="text"
                  required
                  value={newAccName}
                  onChange={(e) => setNewAccName(e.target.value)}
                  placeholder="e.g. FRAOL ENDALE WAGARI"
                  className="w-full px-3 py-2 text-xs font-bold border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8f278f]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  required
                  value={newAccNumber}
                  onChange={(e) => setNewAccNumber(e.target.value)}
                  placeholder="e.g. 1000384910283"
                  className="w-full px-3 py-2 text-xs font-mono font-medium border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8f278f]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Bank</label>
                <select
                  value={newAccBank}
                  onChange={(e) => setNewAccBank(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8f278f]"
                >
                  {ETHIOPIAN_BANKS.map((b) => (
                    <option key={b.id} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Nickname (Optional)
                </label>
                <input
                  type="text"
                  value={newAccNick}
                  onChange={(e) => setNewAccNick(e.target.value)}
                  placeholder="e.g. Brother, Rent, Office"
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8f278f]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddAccountOpen(false)}
                  className="flex-1 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold rounded-xl text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#8f278f] hover:bg-[#7a1f7a] text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
                >
                  Save Beneficiary
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
