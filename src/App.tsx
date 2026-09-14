import React, { useState } from 'react';
import { ScreenType, CbeBejeItem, MiniAppItem, OtherItem, Transaction, ReceiptData } from './types';
import { AppProvider, useApp } from './context/AppContext';
import { HomeScreen } from './screens/HomeScreen';
import { PayScreen } from './screens/PayScreen';
import { CbeBejeScreen } from './screens/CbeBejeScreen';
import { MiniAppsScreen } from './screens/MiniAppsScreen';
import { OthersScreen } from './screens/OthersScreen';
import { LoginScreen } from './screens/LoginScreen';
import { LoginAuthScreen } from './screens/LoginAuthScreen';
import { BankTransferScreen } from './screens/BankTransferScreen';
import { CbeSendMoneyScreen } from './screens/CbeSendMoneyScreen';
import { PhoneSendMoneyScreen } from './screens/PhoneSendMoneyScreen';
import { AirtimeScreen } from './screens/AirtimeScreen';
import { AirtimePackageScreen } from './screens/AirtimePackageScreen';
import { TransactionDetailScreen } from './screens/TransactionDetailScreen';
import { RecentTransactionsScreen } from './screens/RecentTransactionsScreen';
import { MiniStatementScreen } from './screens/MiniStatementScreen';
import { MekedoniaScreen } from './screens/MekedoniaScreen';
import { CbeBirrMessagesScreen } from './screens/CbeBirrMessagesScreen';
import { ReceiptView } from './components/ReceiptView';
import { PinPromptModal } from './components/PinPromptModal';
import { ProcessingOverlay } from './components/ProcessingOverlay';
import { TopNotification } from './components/TopNotification';
import { BottomNavBar } from './components/BottomNavBar';
import { ActionModal } from './components/ActionModal';

const AppInner: React.FC = () => {
  const {
    user,
    activeReceipt,
    setActiveReceipt,
    executeTransactionWithPIN,
  } = useApp();

  const [authState, setAuthState] = useState<'login' | 'login-auth' | 'logged-in'>('login');
  const [authPhone, setAuthPhone] = useState('987508140');
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [subScreen, setSubScreen] = useState<string | null>(null);
  const [language, setLanguage] = useState('EN');

  // Direct mobile receipt state (when scanned from another phone's camera or via link)
  const [scannedReceipt, setScannedReceipt] = useState<ReceiptData | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const pathname = window.location.pathname;
      const isReceiptRoute =
        pathname.includes('receipt') ||
        urlParams.get('view') === 'receipt' ||
        Boolean(urlParams.get('tx'));

      if (isReceiptRoute) {
        const tx = urlParams.get('tx') || 'DG831HZCWFB';
        const amt = parseFloat(urlParams.get('amt') || '5.00') || 5.0;
        const sender = urlParams.get('sender') || 'Endale Wakijira Gudeto';
        const senderAcc = urlParams.get('senderAcc') || '0931325262';
        const receiver = urlParams.get('receiver') || 'Fraol Endale Wagari';
        const receiverAcc = urlParams.get('receiverAcc') || '0987508140';
        const date = urlParams.get('date') || '8 Jul 2026';
        const ref = urlParams.get('ref') || 'ok';
        return {
          transactionId: tx,
          amount: amt,
          fee: 0,
          senderName: sender,
          senderAccount: senderAcc,
          receiverName: receiver,
          receiverAccount: receiverAcc,
          receiverBank: 'Commercial Bank of Ethiopia',
          date: date,
          type: 'Send Money',
          reason: ref,
        };
      }
    } catch {
      // ignore
    }
    return null;
  });

  // Generic modal state (for QR scan or informational cards)
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    subtitle?: string;
    type?: 'general' | 'qr' | 'transactions' | 'transfer';
  }>({
    isOpen: false,
    title: '',
  });

  // PIN Prompt Modal & Transfer Payload
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [pendingPayload, setPendingPayload] = useState<{
    amount: number;
    receiverName: string;
    receiverAccount: string;
    receiverBank: string;
    reason?: string;
    type?: string;
  } | null>(null);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'EN' ? 'አማ' : 'EN'));
  };

  const openActionModal = (
    title: string,
    subtitle?: string,
    type: 'general' | 'qr' | 'transactions' | 'transfer' = 'general'
  ) => {
    setModalConfig({
      isOpen: true,
      title,
      subtitle,
      type,
    });
  };

  const closeModal = () => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  // Trigger PIN prompt for any transfer/payment
  const handleRequestPin = (payload: {
    amount: number;
    receiverName: string;
    receiverAccount: string;
    receiverBank: string;
    reason?: string;
    type?: string;
  }) => {
    setPendingPayload(payload);
    setIsPinModalOpen(true);
  };

  // Called when PIN is verified in PinPromptModal
  const handlePinSuccess = async (enteredPin: string) => {
    if (!pendingPayload) return;
    setIsPinModalOpen(false);

    const result = await executeTransactionWithPIN(enteredPin, pendingPayload);
    if (result.success && result.receipt) {
      // Subscreen returns to receipt view
      setPendingPayload(null);
    }
  };

  // When clicking a historic transaction in RecentTransactionsScreen
  const handleSelectHistoricTransaction = (tx: Transaction) => {
    const receiptData: ReceiptData = {
      transactionId: tx.id,
      amount: tx.amount,
      fee: tx.fee || 0,
      senderName: tx.senderName || user.name,
      senderAccount: user.accountNumber,
      receiverName: tx.receiverName || tx.subtitle.replace('To ', ''),
      receiverAccount: tx.accountNumber || '1000384910283',
      receiverBank: tx.bankName || 'Commercial Bank of Ethiopia',
      date: tx.date.split(' ')[0],
      type: tx.title,
      reason: tx.reason || `${tx.title} (ok)`,
    };
    setActiveReceipt(receiptData);
  };

  // Standalone Receipt View (Displays when scanned via QR code on another device or via URL)
  if (scannedReceipt) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-neutral-900/90 sm:p-4 font-sans select-none">
        <div className="w-full max-w-[430px] min-h-screen sm:min-h-[844px] bg-white sm:rounded-[36px] overflow-hidden shadow-2xl relative flex flex-col border sm:border-neutral-700/40">
          <ReceiptView
            receipt={scannedReceipt}
            onClose={() => {
              setScannedReceipt(null);
              if (window.history.replaceState) {
                window.history.replaceState({}, document.title, window.location.pathname);
              }
            }}
            onBackToHome={() => {
              setScannedReceipt(null);
              if (window.history.replaceState) {
                window.history.replaceState({}, document.title, window.location.pathname);
              }
              setAuthState('logged-in');
              setCurrentScreen('home');
            }}
          />
        </div>
      </div>
    );
  }

  // Auth screen: Login phone input
  if (authState === 'login') {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-neutral-900/90 sm:p-4 font-sans">
        <div className="w-full max-w-[430px] min-h-screen sm:min-h-[844px] bg-white sm:rounded-[36px] overflow-hidden shadow-2xl relative flex flex-col">
          <LoginScreen
            language={language}
            onLanguageChange={setLanguage}
            onGoToAuth={(phone) => {
              setAuthPhone(phone);
              setAuthState('login-auth');
            }}
          />
        </div>
      </div>
    );
  }

  // Auth screen: Login Authentication with strict PIN 696969 & 3s loading
  if (authState === 'login-auth') {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-neutral-900/90 sm:p-4 font-sans">
        <div className="w-full max-w-[430px] min-h-screen sm:min-h-[844px] bg-white sm:rounded-[36px] overflow-hidden shadow-2xl relative flex flex-col">
          <LoginAuthScreen
            phone={authPhone}
            accountName={user.name}
            onBack={() => setAuthState('login')}
            onSuccess={() => setAuthState('logged-in')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-900/90 sm:p-4 font-sans select-none">
      {/* Mobile container device framing */}
      <div className="w-full max-w-[430px] min-h-screen sm:min-h-[844px] sm:max-h-[880px] bg-white sm:rounded-[36px] overflow-hidden shadow-2xl relative flex flex-col border sm:border-neutral-700/40">
        {/* Top 5-second push notification */}
        <TopNotification />

        {/* 5-second Transaction Processing Overlay */}
        <ProcessingOverlay />

        {/* Screen Content */}
        <div
          className={`flex-1 relative ${
            subScreen === 'messages' || activeReceipt
              ? 'overflow-hidden flex flex-col h-full min-h-0'
              : 'overflow-y-auto'
          }`}
        >
          {/* Active Receipt View takes priority if open */}
          {activeReceipt ? (
            <ReceiptView
              receipt={activeReceipt}
              onClose={() => setActiveReceipt(null)}
              onBackToHome={() => {
                setActiveReceipt(null);
                setSubScreen(null);
                setCurrentScreen('home');
              }}
            />
          ) : subScreen === 'bank-transfer' ? (
            <BankTransferScreen
              onBack={() => setSubScreen(null)}
              onRequestPin={handleRequestPin}
            />
          ) : subScreen === 'cbe-send-money' ? (
            <CbeSendMoneyScreen
              onBack={() => setSubScreen(null)}
              onRequestPin={handleRequestPin}
            />
          ) : subScreen === 'phone-send-money' ? (
            <PhoneSendMoneyScreen
              onBack={() => setSubScreen(null)}
              onRequestPin={handleRequestPin}
            />
          ) : subScreen === 'airtime' ? (
            <AirtimeScreen
              onBack={() => setSubScreen(null)}
              onRequestPin={handleRequestPin}
            />
          ) : subScreen === 'airtime-package' ? (
            <AirtimePackageScreen
              onBack={() => setSubScreen(null)}
              onRequestPin={handleRequestPin}
            />
          ) : subScreen === 'transaction-detail' ? (
            <TransactionDetailScreen
              onBack={() => setSubScreen(null)}
              onOpenRecent={() => setSubScreen('recent-transactions')}
              onOpenMiniStatement={() => setSubScreen('mini-statement')}
            />
          ) : subScreen === 'recent-transactions' ? (
            <RecentTransactionsScreen
              onBack={() => setSubScreen('transaction-detail')}
              onSelectTransaction={handleSelectHistoricTransaction}
            />
          ) : subScreen === 'mini-statement' ? (
            <MiniStatementScreen onBack={() => setSubScreen('transaction-detail')} />
          ) : subScreen === 'mekedonia' ? (
            <MekedoniaScreen
              onBack={() => setSubScreen(null)}
              onRequestPin={handleRequestPin}
            />
          ) : subScreen === 'messages' ? (
            <CbeBirrMessagesScreen
              onBack={() => setSubScreen(null)}
              onOpenReceipt={(receipt) => {
                setActiveReceipt(receipt);
                setSubScreen(null);
              }}
            />
          ) : currentScreen === 'home' ? (
            <HomeScreen
              language={language}
              onToggleLanguage={toggleLanguage}
              onNavigateSubScreen={(scr) => setSubScreen(scr)}
              onSelectAction={(title, subtitle) => openActionModal(title, subtitle, 'transfer')}
            />
          ) : currentScreen === 'pay' ? (
            <PayScreen
              language={language}
              onToggleLanguage={toggleLanguage}
              onSelectPayItem={(name, about) => {
                if (name === 'Fundraising') {
                  setSubScreen('mekedonia');
                } else if (name === 'Telecom') {
                  setSubScreen('airtime');
                } else {
                  openActionModal(name, about, 'transfer');
                }
              }}
            />
          ) : currentScreen === 'cbe-beje' ? (
            <CbeBejeScreen
              language={language}
              onToggleLanguage={toggleLanguage}
              onSelectItem={(item: CbeBejeItem) =>
                openActionModal(
                  item.name,
                  `${item.about} Guaranteed by Commercial Bank of Ethiopia.`,
                  'transfer'
                )
              }
            />
          ) : currentScreen === 'mini-apps' ? (
            <MiniAppsScreen
              onSelectApp={(app: MiniAppItem) =>
                openActionModal(app.text, 'Launching integrated mini application...', 'general')
              }
            />
          ) : currentScreen === 'others' ? (
            <OthersScreen
              language={language}
              onToggleLanguage={toggleLanguage}
              onSelectItem={(item: OtherItem) => {
                if (item.name === 'Recent Transactions') {
                  setSubScreen('recent-transactions');
                } else if (item.name === 'Mini Statement') {
                  setSubScreen('mini-statement');
                } else {
                  openActionModal(item.name, undefined, 'general');
                }
              }}
              onOpenProfileQR={() =>
                openActionModal('Personal CBEBirr QR', 'Share your QR to receive funds', 'qr')
              }
              onOpenMessages={() => setSubScreen('messages')}
              onLogout={() => setAuthState('login')}
            />
          ) : null}
        </div>

        {/* Bottom Navigation Dock (hidden when viewing active receipt or deep subscreen) */}
        {!activeReceipt && !subScreen && (
          <div className="absolute bottom-0 left-0 right-0 z-30">
            <BottomNavBar
              currentScreen={currentScreen}
              onSelectScreen={(screen) => {
                setSubScreen(null);
                setCurrentScreen(screen);
              }}
              onOpenQR={() => openActionModal('Scan QR', undefined, 'qr')}
            />
          </div>
        )}

        {/* Informational Action Modal */}
        <ActionModal
          isOpen={modalConfig.isOpen}
          onClose={closeModal}
          title={modalConfig.title}
          subtitle={modalConfig.subtitle}
          type={modalConfig.type}
        />

        {/* PIN Security Prompt Modal for Transfers */}
        <PinPromptModal
          isOpen={isPinModalOpen}
          onClose={() => {
            setIsPinModalOpen(false);
            setPendingPayload(null);
          }}
          onSuccess={handlePinSuccess}
          title="Security Verification"
          subtitle={
            pendingPayload
              ? `Transfer ETB ${pendingPayload.amount} to ${pendingPayload.receiverName}`
              : 'Enter 6-digit PIN'
          }
        />
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
};

export default App;
