import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGoldify } from './hooks/useGoldify';
import { Navbar } from './components/Navbar';
import { LoginScreen } from './components/screens/LoginScreen';
import { SignupScreen } from './components/screens/SignupScreen';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { WithdrawScreen } from './components/screens/WithdrawScreen';
import { AssetsListScreen } from './components/screens/AssetsListScreen';
import { DetailScreen } from './components/screens/DetailScreen';
import { WalletScreen } from './components/screens/WalletScreen';
import { SupportScreen } from './components/screens/SupportScreen';
import { ScannerScreen } from './components/screens/ScannerScreen';
import { ActivityScreen } from './components/screens/ActivityScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { TransactionScreen } from './components/screens/TransactionScreen';
import { ForgotPasswordScreen } from './components/screens/ForgotPasswordScreen';

export default function App() {
  const {
    screen, setScreen,
    selectedAsset,
    language, setLanguage,
    theme, setTheme,
    currency, setCurrency,
    transactionType,
    profilePic, setProfilePic,
    userName, setUserName,
    userEmail, setUserEmail,
    userPhone, setUserPhone,
    paymentMethod, setPaymentMethod,
    paymentNumber, setPaymentNumber,
    showBalance, setShowBalance,
    metalUnit, setMetalUnit,
    history,
    dynamicAssets,
    totalNetWorth,
    handleSelectAsset,
    handleTrade,
    handleConfirmTransaction,
    handleWithdrawConfirm
  } = useGoldify();

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background relative selection:bg-gold selection:text-black transition-colors duration-300">
      <AnimatePresence mode="wait">
        {screen === 'login' && (
          <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LoginScreen 
              onLogin={() => setScreen('dashboard')} 
              onSignup={() => setScreen('signup')} 
              onForgotPassword={() => setScreen('forgot_password')}
              language={language} 
            />
          </motion.div>
        )}
        {screen === 'signup' && (
          <motion.div key="signup" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <SignupScreen 
              onBack={() => setScreen('login')} 
              onSignupComplete={() => setScreen('dashboard')} 
              language={language} 
              setUserName={setUserName}
              setUserEmail={setUserEmail}
              setUserPhone={setUserPhone}
            />
          </motion.div>
        )}
        {screen === 'forgot_password' && (
          <motion.div key="forgot_password" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <ForgotPasswordScreen 
              onBack={() => setScreen('login')}
              language={language}
            />
          </motion.div>
        )}
        {screen === 'dashboard' && (
          <motion.div key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <DashboardScreen 
              onSelectAsset={handleSelectAsset} 
              onProfileClick={() => setScreen('profile')} 
              language={language}
              currency={currency}
              assets={dynamicAssets}
              totalNetWorth={totalNetWorth}
              profilePic={profilePic}
              showBalance={showBalance}
              setShowBalance={setShowBalance}
              onViewAll={() => setScreen('assets_list')}
              onWithdraw={() => setScreen('withdraw')}
              metalUnit={metalUnit}
              setMetalUnit={setMetalUnit}
              userName={userName}
              history={history}
              onActivityClick={() => setScreen('activity')}
            />
          </motion.div>
        )}

        {screen === 'withdraw' && (
          <motion.div key="withdraw" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <WithdrawScreen 
              onBack={() => setScreen('dashboard')}
              language={language}
              currency={currency}
              onConfirm={handleWithdrawConfirm}
              assets={dynamicAssets}
            />
          </motion.div>
        )}

        {screen === 'assets_list' && (
          <motion.div key="assets_list" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <AssetsListScreen 
              assets={dynamicAssets}
              onBack={() => setScreen('dashboard')}
              onSelectAsset={handleSelectAsset}
              language={language}
              currency={currency}
              metalUnit={metalUnit}
              showBalance={showBalance}
            />
          </motion.div>
        )}
        {screen === 'detail' && selectedAsset && (
          <motion.div key="detail" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <DetailScreen 
              asset={selectedAsset} 
              onBack={() => setScreen('dashboard')} 
              language={language} 
              onTrade={handleTrade}
              showBalance={showBalance}
            />
          </motion.div>
        )}
        {screen === 'wallet' && (
          <motion.div key="wallet" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
            <WalletScreen 
              language={language} 
            />
          </motion.div>
        )}
        {screen === 'support' && (
          <motion.div key="support" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
            <SupportScreen 
              language={language} 
            />
          </motion.div>
        )}
        {screen === 'scanner' && (
          <motion.div key="scanner" initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }}>
            <ScannerScreen 
              onBack={() => setScreen('dashboard')}
              language={language}
            />
          </motion.div>
        )}
        {screen === 'activity' && (
          <motion.div key="activity" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
            <ActivityScreen 
              language={language} 
              history={history}
            />
          </motion.div>
        )}
        {screen === 'profile' && (
          <motion.div key="profile" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}>
            <ProfileScreen 
              onBack={() => setScreen('dashboard')}
              language={language}
              setLanguage={setLanguage}
              theme={theme}
              setTheme={setTheme}
              currency={currency}
              setCurrency={setCurrency}
              onSignOut={() => setScreen('login')}
              profilePic={profilePic}
              setProfilePic={setProfilePic}
              userName={userName}
              setUserName={setUserName}
              userEmail={userEmail}
              setUserEmail={setUserEmail}
              userPhone={userPhone}
              setUserPhone={setUserPhone}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              paymentNumber={paymentNumber}
              setPaymentNumber={setPaymentNumber}
            />
          </motion.div>
        )}
        {screen === 'transaction' && selectedAsset && (
          <motion.div key="transaction" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
            <TransactionScreen 
              asset={selectedAsset}
              type={transactionType}
              onBack={() => setScreen('detail')}
              language={language}
              currency={currency}
              onConfirm={handleConfirmTransaction}
              showBalance={showBalance}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {screen !== 'login' && screen !== 'signup' && screen !== 'transaction' && screen !== 'withdraw' && screen !== 'forgot_password' && (
        <Navbar activeScreen={screen} setScreen={setScreen} language={language} />
      )}
    </div>
  );
}
