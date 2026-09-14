import React, { useState } from 'react';
import { X, UserCheck, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ isOpen, onClose }) => {
  const { user, updateProfile } = useApp();
  const [name, setName] = useState(user.name);
  const [accountNumber, setAccountNumber] = useState(user.accountNumber);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !accountNumber.trim()) return;

    updateProfile(name, accountNumber);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl relative border border-neutral-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-100"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2.5 mb-3 mt-1">
          <div className="w-10 h-10 rounded-2xl bg-[#8f278f]/10 text-[#8f278f] flex items-center justify-center shadow-xs">
            <UserCheck size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-900">Edit Profile</h3>
            <p className="text-[11px] text-neutral-500">Triggered via 3-click shortcut</p>
          </div>
        </div>

        {saved ? (
          <div className="py-6 text-center animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
              <Shield size={26} />
            </div>
            <h4 className="text-sm font-bold text-neutral-900">Profile Updated Successfully</h4>
            <p className="text-xs text-neutral-500 mt-1">Changes are saved throughout CBEBirr</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Account Holder Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value.toUpperCase())}
                placeholder="AHMED HUSSEN SEID"
                className="w-full px-3 py-2.5 text-sm font-bold border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8f278f]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Account / Phone Number
              </label>
              <input
                type="text"
                required
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="+251969121369"
                className="w-full px-3 py-2.5 text-sm font-medium border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8f278f]"
              />
            </div>

            <div className="bg-purple-50 p-2.5 rounded-xl border border-purple-100 text-[11px] text-[#8f278f]">
              Changes will persist in your session and reflect on your card, transactions, and receipts.
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold rounded-xl text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-[#8f278f] hover:bg-[#7a1f7a] text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
