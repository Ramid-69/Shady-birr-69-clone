import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, SavedAccount, Transaction, ReceiptData, CbeMessage } from '../types';
import {
  buildTransferMessage,
  buildDepositMessage,
  INITIAL_CBE_MESSAGES,
} from '../utils/messageTemplates';

interface AppContextType {
  user: UserProfile;
  balances: {
    current: number;
    reward: number;
    showBalance: boolean;
    showReward: boolean;
  };
  savedAccounts: SavedAccount[];
  hideSavedAccounts: boolean;
  transactions: Transaction[];
  activeReceipt: ReceiptData | null;
  topNotification: { message: string; submessage?: string; id: string } | null;
  isProcessing: boolean;
  processingMessage: string;
  messages: CbeMessage[];
  deleteMessage: (id: string) => void;
  updateMessage: (id: string, newText: string) => void;
  addCustomMessage: (text: string) => void;
  clearAllMessages: () => void;
  updateProfile: (name: string, accountNumber: string) => void;
  updateBalances: (current: number, reward: number) => void;
  addFundsToBalance: (amount: number, reason?: string) => void;
  toggleShowBalance: () => void;
  toggleShowReward: () => void;
  changePin: (newPin: string) => boolean;
  addSavedAccount: (account: Omit<SavedAccount, 'id' | 'createdAt'>) => SavedAccount;
  updateSavedAccount: (id: string, updated: Partial<SavedAccount>) => void;
  deleteSavedAccount: (id: string) => void;
  toggleHideSavedAccounts: () => void;
  dismissNotification: () => void;
  setActiveReceipt: (receipt: ReceiptData | null) => void;
  executeTransactionWithPIN: (
    enteredPin: string,
    payload: {
      amount: number;
      receiverName: string;
      receiverAccount: string;
      receiverBank: string;
      reason?: string;
      type?: string;
    }
  ) => Promise<{ success: boolean; error?: string; receipt?: ReceiptData }>;
}

const DEFAULT_USER: UserProfile = {
  name: 'AHMED HUSSEN SEID',
  accountNumber: '+251969121369',
  phone: '969121369',
  pin: '696969',
  level: 'Level 2',
};

const DEFAULT_SAVED_ACCOUNTS: SavedAccount[] = [
  {
    id: 'sav-1',
    name: 'Fraol Endale Wagari',
    accountNumber: '1000384910283',
    bankName: 'Commercial Bank of Ethiopia',
    nickname: 'Fraol Wagari',
    createdAt: '2026-07-01',
  },
  {
    id: 'sav-2',
    name: 'Endale Wakijira Gudeto',
    accountNumber: '1000293847120',
    bankName: 'Awash International Bank',
    nickname: 'Endale Wakijira',
    createdAt: '2026-07-05',
  },
  {
    id: 'sav-3',
    name: 'Blen Tesfaye Haile',
    accountNumber: '68291047291',
    bankName: 'Bank of Abyssinia',
    nickname: 'Blen Abyssinia',
    createdAt: '2026-07-10',
  },
];

const DEFAULT_TRANSACTIONS: Transaction[] = [
  {
    id: 'DG831HZCWFB',
    title: 'Send Money',
    subtitle: 'To Fraol Endale Wagari',
    date: '2026-07-19 19:50',
    amount: 100.0,
    type: 'debit',
    status: 'Completed',
    senderName: 'AHMED HUSSEN SEID',
    receiverName: 'Fraol Endale Wagari',
    accountNumber: '1000384910283',
    bankName: 'Commercial Bank of Ethiopia',
    reason: 'Personal transfer',
  },
  {
    id: 'DG830AXBWFA',
    title: 'Send Money',
    subtitle: 'To Endale Wakijira',
    date: '2026-07-19 19:22',
    amount: 100.0,
    type: 'debit',
    status: 'Completed',
    senderName: 'AHMED HUSSEN SEID',
    receiverName: 'Endale Wakijira Gudeto',
    accountNumber: '1000293847120',
    bankName: 'Awash International Bank',
  },
  {
    id: 'DG829KLPQXZ',
    title: 'Send Money',
    subtitle: 'To Blen Tesfaye',
    date: '2026-07-19 19:14',
    amount: 200.0,
    type: 'debit',
    status: 'Completed',
    senderName: 'AHMED HUSSEN SEID',
    receiverName: 'Blen Tesfaye Haile',
    accountNumber: '68291047291',
    bankName: 'Bank of Abyssinia',
  },
  {
    id: 'DG828EMC001',
    title: 'MB E-Money Creation to Registered',
    subtitle: 'From Branch ATM Deposit',
    date: '2026-07-19 19:12',
    amount: 400.0,
    type: 'credit',
    status: 'Completed',
    senderName: 'CBE Branch Deposit',
    receiverName: 'AHMED HUSSEN SEID',
  },
  {
    id: 'DG827TX9941',
    title: 'Send Money',
    subtitle: 'To Fraol Endale Wagari',
    date: '2026-07-17 16:47',
    amount: 200.0,
    type: 'debit',
    status: 'Completed',
    senderName: 'AHMED HUSSEN SEID',
    receiverName: 'Fraol Endale Wagari',
  },
  {
    id: 'DG826EMC002',
    title: 'MB E-Money Creation to Registered',
    subtitle: 'Salary credit addition',
    date: '2026-07-17 16:46',
    amount: 150.0,
    type: 'credit',
    status: 'Completed',
    senderName: 'Employer Account',
    receiverName: 'AHMED HUSSEN SEID',
  },
  {
    id: 'DG825MMTB01',
    title: 'TransferfromMMToBank by Custom...',
    subtitle: 'Bank account cash in',
    date: '2026-07-17 16:32',
    amount: 100.0,
    type: 'debit',
    status: 'Completed',
  },
  {
    id: 'DG824SM1500',
    title: 'Send Money',
    subtitle: 'Airtime package payment',
    date: '2026-07-17 15:45',
    amount: 150.0,
    type: 'debit',
    status: 'Completed',
  },
  {
    id: 'DG823EMC003',
    title: 'MB E-Money Creation to Registered',
    subtitle: 'Transfer from CBE Account',
    date: '2026-07-17 10:57',
    amount: 295.0,
    type: 'credit',
    status: 'Completed',
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

interface BalancesState {
  current: number;
  reward: number;
  showBalance: boolean;
  showReward: boolean;
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. User profile
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('cbe_user_profile_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return DEFAULT_USER;
  });

  useEffect(() => {
    localStorage.setItem('cbe_user_profile_v2', JSON.stringify(user));
  }, [user]);

  // 2. Balances
  const [balances, setBalances] = useState<BalancesState>(() => {
    const saved = localStorage.getItem('cbe_balances_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      current: 14850.5,
      reward: 320.0,
      showBalance: true,
      showReward: true,
    };
  });


  useEffect(() => {
    localStorage.setItem('cbe_balances_v2', JSON.stringify(balances));
  }, [balances]);

  // 3. Saved accounts
  const [savedAccounts, setSavedAccounts] = useState<SavedAccount[]>(() => {
    const saved = localStorage.getItem('cbe_saved_accounts_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return DEFAULT_SAVED_ACCOUNTS;
  });

  useEffect(() => {
    localStorage.setItem('cbe_saved_accounts_v2', JSON.stringify(savedAccounts));
  }, [savedAccounts]);

  // 4. Hide Saved Accounts Setting
  const [hideSavedAccounts, setHideSavedAccounts] = useState<boolean>(() => {
    const saved = localStorage.getItem('cbe_hide_saved_accounts');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('cbe_hide_saved_accounts', JSON.stringify(hideSavedAccounts));
  }, [hideSavedAccounts]);

  // 5. Transactions
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('cbe_transactions_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return DEFAULT_TRANSACTIONS;
  });

  useEffect(() => {
    localStorage.setItem('cbe_transactions_v2', JSON.stringify(transactions));
  }, [transactions]);

  // 6. Active Receipt
  const [activeReceipt, setActiveReceipt] = useState<ReceiptData | null>(null);

  // 7. Top notification (5s banner)
  const [topNotification, setTopNotification] = useState<{
    message: string;
    submessage?: string;
    id: string;
  } | null>(null);

  // 8. Processing status (5-second loading)
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('');

  // 9. CBE SMS Messages state (persisted)
  const [messages, setMessages] = useState<CbeMessage[]>(() => {
    const saved = localStorage.getItem('cbe_sms_messages_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_CBE_MESSAGES;
  });

  useEffect(() => {
    localStorage.setItem('cbe_sms_messages_v3', JSON.stringify(messages));
  }, [messages]);

  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const updateMessage = (id: string, newText: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, text: newText } : m))
    );
  };

  const addCustomMessage = (text: string) => {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    let h = now.getHours();
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    const displayTime = `${pad(h)}:${pad(now.getMinutes())} ${ampm}`;
    const timestamp = `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()} ${pad(
      now.getHours()
    )}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

    const newMsg: CbeMessage = {
      id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      type: 'custom',
      text,
      timestamp,
      displayTime,
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const clearAllMessages = () => {
    setMessages([]);
  };

  // Profile update
  const updateProfile = (name: string, accountNumber: string) => {
    setUser((prev) => ({
      ...prev,
      name: name.trim().toUpperCase(),
      accountNumber: accountNumber.trim(),
    }));
  };

  // Balance edits
  const updateBalances = (current: number, reward: number) => {
    setBalances((prev) => ({
      ...prev,
      current: Math.max(0, current),
      reward: Math.max(0, reward),
    }));
  };

  // Add Funds (from 3 clicks or manual edit)
  const addFundsToBalance = (amount: number, reason = 'Direct deposit') => {
    if (isNaN(amount) || amount <= 0) return;

    setBalances((prev) => ({
      ...prev,
      current: prev.current + amount,
    }));

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;

    const newTx: Transaction = {
      id: 'DG' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      title: 'MB E-Money Creation to Registered',
      subtitle: reason,
      date: formattedDate,
      amount,
      type: 'credit',
      status: 'Completed',
      senderName: 'Deposit / Top-up',
      receiverName: user.name,
      reason,
    };

    setTransactions((prev) => [newTx, ...prev]);

    // Append authentic CBE Birr deposit SMS message
    const newBal = balances.current + amount;
    const depositMsg = buildDepositMessage({
      amount,
      date: now,
      balance: newBal,
    });
    setMessages((prev) => [...prev, depositMsg]);

    // Show 5s notification
    triggerNotification(
      'Commercial Bank of Ethiopia',
      `ETB ${amount.toFixed(2)} credited to your account. Current balance: ETB ${newBal.toFixed(2)}`
    );
  };

  const toggleShowBalance = () => {
    setBalances((prev) => ({ ...prev, showBalance: !prev.showBalance }));
  };

  const toggleShowReward = () => {
    setBalances((prev) => ({ ...prev, showReward: !prev.showReward }));
  };

  const changePin = (newPin: string) => {
    if (/^\d{6}$/.test(newPin)) {
      setUser((prev) => ({ ...prev, pin: newPin }));
      return true;
    }
    return false;
  };

  // Saved accounts management
  const addSavedAccount = (account: Omit<SavedAccount, 'id' | 'createdAt'>) => {
    const newAccount: SavedAccount = {
      ...account,
      id: 'sav-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setSavedAccounts((prev) => [newAccount, ...prev]);
    return newAccount;
  };

  const updateSavedAccount = (id: string, updated: Partial<SavedAccount>) => {
    setSavedAccounts((prev) =>
      prev.map((acc) => (acc.id === id ? { ...acc, ...updated } : acc))
    );
  };

  const deleteSavedAccount = (id: string) => {
    setSavedAccounts((prev) => prev.filter((acc) => acc.id !== id));
  };

  const toggleHideSavedAccounts = () => {
    setHideSavedAccounts((prev) => !prev);
  };

  const triggerNotification = (message: string, submessage?: string) => {
    const id = Date.now().toString();
    setTopNotification({ message, submessage, id });
    setTimeout(() => {
      setTopNotification((current) => (current?.id === id ? null : current));
    }, 5000);
  };

  const dismissNotification = () => {
    setTopNotification(null);
  };

  // Execute transfer with strictly validated PIN and 5-second loading requirement
  const executeTransactionWithPIN = async (
    enteredPin: string,
    payload: {
      amount: number;
      receiverName: string;
      receiverAccount: string;
      receiverBank: string;
      reason?: string;
      type?: string;
    }
  ): Promise<{ success: boolean; error?: string; receipt?: ReceiptData }> => {
    // 1. PIN validation: must be 696969 or user.pin
    if (enteredPin !== '696969' && enteredPin !== user.pin) {
      return { success: false, error: 'Invalid PIN' };
    }

    if (payload.amount <= 0) {
      return { success: false, error: 'Please enter a valid amount' };
    }

    if (balances.current < payload.amount) {
      return { success: false, error: 'Insufficient balance for this transaction' };
    }

    // 2. 5-second loading screen
    setIsProcessing(true);
    setProcessingMessage('Processing transaction with CBEBirr secure gateway...');

    await new Promise((resolve) => setTimeout(resolve, 5000));

    // 3. Deduct balance
    setBalances((prev) => ({
      ...prev,
      current: Math.max(0, prev.current - payload.amount),
    }));

    // Generate Transaction ID like DG831HZCWFB
    const randomChars = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let txIdSuffix = '';
    for (let i = 0; i < 9; i++) {
      txIdSuffix += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    const txId = 'DG' + txIdSuffix;

    const now = new Date();
    // Format: "8 Jul 2026" or "19 Jul 2026"
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateFormatted = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
    const fullDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;

    const receipt: ReceiptData = {
      transactionId: txId,
      amount: payload.amount,
      senderName: user.name,
      senderAccount: user.accountNumber,
      receiverName: payload.receiverName,
      receiverAccount: payload.receiverAccount,
      receiverBank: payload.receiverBank || 'Commercial Bank of Ethiopia',
      date: dateFormatted,
      type: payload.type || 'Send Money',
      reason: payload.reason || 'Send Money (ok)',
    };

    // Add to transactions
    const newTx: Transaction = {
      id: txId,
      title: payload.type || 'Send Money',
      subtitle: `To ${payload.receiverName}`,
      date: fullDate,
      amount: payload.amount,
      type: 'debit',
      status: 'Completed',
      senderName: user.name,
      receiverName: payload.receiverName,
      accountNumber: payload.receiverAccount,
      bankName: payload.receiverBank,
      reason: payload.reason,
    };

    setTransactions((prev) => [newTx, ...prev]);

    // Append authentic CBE Birr transfer SMS message
    const newBal = Math.max(0, balances.current - payload.amount);
    const userPhone = user.accountNumber.startsWith('+')
      ? user.accountNumber
      : `+251${(user.phone || '969121369').replace(/^0/, '')}`;
    const transferMsg = buildTransferMessage({
      senderName: user.name,
      senderPhone: userPhone,
      amount: payload.amount,
      receiverAccount: payload.receiverAccount,
      receiverName: payload.receiverName,
      transferType: payload.type || 'Select Transfer',
      date: now,
      txnId: txId,
      balance: newBal,
    });
    setMessages((prev) => [...prev, transferMsg]);

    setActiveReceipt(receipt);
    setIsProcessing(false);

    // 4. Notification at top for 5 seconds
    triggerNotification(
      'Commercial Bank of Ethiopia',
      `ETB ${payload.amount.toFixed(2)} debited from ${user.name} for ${payload.receiverName} on ${dateFormatted} with Transaction ID: ${txId}`
    );

    return { success: true, receipt };
  };

  return (
    <AppContext.Provider
      value={{
        user,
        balances,
        savedAccounts,
        hideSavedAccounts,
        transactions,
        activeReceipt,
        topNotification,
        isProcessing,
        processingMessage,
        messages,
        deleteMessage,
        updateMessage,
        addCustomMessage,
        clearAllMessages,
        updateProfile,
        updateBalances,
        addFundsToBalance,
        toggleShowBalance,
        toggleShowReward,
        changePin,
        addSavedAccount,
        updateSavedAccount,
        deleteSavedAccount,
        toggleHideSavedAccounts,
        dismissNotification,
        setActiveReceipt,
        executeTransactionWithPIN,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
