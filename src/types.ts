export type ScreenType = 'home' | 'pay' | 'cbe-beje' | 'mini-apps' | 'others';

export interface GridItem {
  id: string;
  text: string;
  iconName: string;
  category?: string;
  badge?: string;
}

export interface PayItem {
  index: string;
  name: string;
  about: string;
  iconName: string;
}

export interface CbeBejeItem {
  index: string;
  name: string;
  about: string;
  rate?: string;
}

export interface MiniAppItem {
  id: string;
  text: string;
  image: string;
  category?: string;
}

export interface OtherItem {
  index: string;
  name: string;
  iconName: string;
}

export interface Transaction {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  amount: number;
  type: 'debit' | 'credit';
  status: 'Completed' | 'Pending';
  senderName?: string;
  receiverName?: string;
  accountNumber?: string;
  bankName?: string;
  reason?: string;
  fee?: number;
}

export interface SavedAccount {
  id: string;
  name: string;
  accountNumber: string;
  bankName: string;
  nickname?: string;
  createdAt: string;
}

export interface UserProfile {
  name: string;
  accountNumber: string;
  phone: string;
  pin: string;
  level: string;
}

export interface ReceiptData {
  transactionId: string;
  amount: number;
  fee?: number;
  senderName: string;
  senderAccount: string;
  receiverName: string;
  receiverAccount: string;
  receiverBank: string;
  date: string;
  type: string;
  reason?: string;
}

export interface CbeMessage {
  id: string;
  type: 'transfer' | 'deposit' | 'custom';
  text: string;
  timestamp: string; // e.g. "14-09-2026 11:23:29"
  displayTime: string; // e.g. "11:23 AM" or "10:55"
  receiptUrl?: string;
  txnId?: string;
  amount?: number;
  balance?: number;
  senderName?: string;
  receiverName?: string;
  receiverAccount?: string;
  receiptNumber?: string;
}

