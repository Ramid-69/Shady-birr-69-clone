import { CbeMessage } from '../types';

export function buildTransferMessage({
  senderName,
  senderPhone,
  amount,
  receiverAccount,
  receiverName,
  transferType = 'Select Transfer',
  date = new Date(),
  txnId,
  balance,
}: {
  senderName: string;
  senderPhone?: string;
  amount: number;
  receiverAccount: string;
  receiverName: string;
  transferType?: string;
  date?: Date;
  txnId: string;
  balance: number;
}): CbeMessage {
  const pad = (n: number) => String(n).padStart(2, '0');
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  const timestamp = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

  const formattedAmount = amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const formattedBalance = balance.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  let h = date.getHours();
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  const displayTime = `${pad(h)}:${minutes} ${ampm}`;

  const phone = senderPhone || '+251969121369';
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : 'https://ais-pre-yn7ljpwvkdzih3zdstsw6z-422362660795.europe-west2.run.app';

  const receiptUrl = `${origin}/?TID=${txnId}&PH=${encodeURIComponent(
    phone
  )}&a=${formattedAmount}&n=${encodeURIComponent(
    `${receiverName} (${transferType})`
  )}&c=${receiverAccount}&d=${day}-${month}-${year}&detailed=1`;

  const text = `Dear ${senderName}, you have successfully transferred ${formattedAmount}Br. to ${receiverAccount}-${receiverName} (${transferType}) on ${timestamp}.Txn ID ${txnId}.Your balance is ${formattedBalance}Br.Thank You! CBEBirr transaction Receipt. Com ${receiptUrl}`;

  return {
    id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    type: 'transfer',
    text,
    timestamp,
    displayTime,
    receiptUrl,
    txnId,
    amount,
    balance,
    senderName,
    receiverName,
    receiverAccount,
  };
}

export function buildDepositMessage({
  amount,
  date = new Date(),
  receiptNumber,
  balance,
}: {
  amount: number;
  date?: Date;
  receiptNumber?: string;
  balance: number;
}): CbeMessage {
  const pad = (n: number) => String(n).padStart(2, '0');
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const shortYear = String(date.getFullYear()).slice(-2);
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const timestamp = `${day}/${month}/${shortYear} ${hours}:${minutes}`;

  const formattedAmount = amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const formattedBalance = balance.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const displayTime = `${hours}:${minutes}`;

  const rNo =
    receiptNumber ||
    'CLH' +
      Math.random().toString(36).substring(2, 9).toUpperCase();

  const text = `Dear Customer, you have deposited ${formattedAmount}Br. into your CBE Birr account on ${timestamp} with receipt number ${rNo}. Your current balance is ${formattedBalance}Br. Thank you!`;

  return {
    id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    type: 'deposit',
    text,
    timestamp,
    displayTime,
    receiptNumber: rNo,
    amount,
    balance,
  };
}

export function getInitialCbeMessages(user?: { name: string; phone?: string }): CbeMessage[] {
  const name = user?.name || 'AHMED HUSSEN SEID';
  const phone = user?.phone ? `+251${user.phone.replace(/^\+?251|^0/, '')}` : '+251969121369';

  return [
    {
      id: 'cbe-msg-1',
      type: 'transfer',
      text: `Dear ${name}, you have successfully transferred 1,000.00Br. to 1000284910283-GABISA (Select Transfer) on 11-09-2026 20:31:48.Txn ID DC2M7573L.Your balance is 15,350.50Br.Thank You! CBEBirr transaction Receipt. Com https://cbetransaction.cbe.com.et/aureceipt?TID=DC2M7573L&PH=${encodeURIComponent(
        phone
      )}`,
      timestamp: '11-09-2026 20:31:48',
      displayTime: '08:31 PM',
      txnId: 'DC2M7573L',
      amount: 1000,
      balance: 15350.5,
      senderName: name,
      receiverName: 'GABISA',
      receiverAccount: '1000284910283',
      receiptUrl: `https://cbetransaction.cbe.com.et/aureceipt?TID=DC2M7573L&PH=${encodeURIComponent(
        phone
      )}`,
    },
    {
      id: 'cbe-msg-2',
      type: 'deposit',
      text: 'Dear Customer, you have deposited 5,000.00Br. into your CBE Birr account on 14/09/26 10:55 with receipt number CLHZ8WV5DX. Your current balance is 15,050.50Br. Thank you!',
      timestamp: '14/09/26 10:55',
      displayTime: '10:55',
      receiptNumber: 'CLHZ8WV5DX',
      amount: 5000,
      balance: 15050.5,
    },
    {
      id: 'cbe-msg-3',
      type: 'transfer',
      text: `Dear ${name}, you have successfully transferred 200.00Br. to 1000384910283-Fraol Endale Wagari (Select Transfer) on 14-09-2026 11:23:29.Txn ID DCO33JQ9P.Your balance is 14,850.50Br.Thank You! CBEBirr transaction Receipt. Com https://ais-pre-yn7ljpwvkdzih3zdstsw6z-422362660795.europe-west2.run.app/?TID=DCO33JQ9P&PH=${encodeURIComponent(
        phone
      )}&a=200.00&n=Fraol%20Endale%20Wagari%20(Select%20Transfer)&c=1000384910283&d=14-09-2026&detailed=1`,
      timestamp: '14-09-2026 11:23:29',
      displayTime: '11:23 AM',
      txnId: 'DCO33JQ9P',
      amount: 200,
      balance: 14850.5,
      senderName: name,
      receiverName: 'Fraol Endale Wagari',
      receiverAccount: '1000384910283',
      receiptUrl: `https://ais-pre-yn7ljpwvkdzih3zdstsw6z-422362660795.europe-west2.run.app/?TID=DCO33JQ9P&PH=${encodeURIComponent(
        phone
      )}&a=200.00&n=Fraol%20Endale%20Wagari%20(Select%20Transfer)&c=1000384910283&d=14-09-2026&detailed=1`,
    },
  ];
}

export const INITIAL_CBE_MESSAGES: CbeMessage[] = getInitialCbeMessages();
