import { useState } from 'react';
import { AuthLogin } from './components/AuthLogin';
import Onboarding from './components/Onboarding.jsx';
import Dashboard from './pages/Dashboard';
import { LoadingScreen } from './components/LoadingScreen';
import './index.css';
import './App.scss';

export default function App() {
  const [step, setStep] = useState<'loading' | 'login' | 'onboarding' | 'dashboard'>('loading');

  if (step === 'loading') {
    return <LoadingScreen onComplete={() => setStep('login')} />;
  }

  if (step === 'login') {
    return <AuthLogin onSuccess={() => setStep('onboarding')} />;
  }

  if (step === 'dashboard') {
    return <Dashboard />;
  }

  return <Onboarding onComplete={() => setStep('dashboard')} />;
}
