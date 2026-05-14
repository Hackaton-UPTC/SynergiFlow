import { useState } from 'react';
import { AuthLogin } from './components/AuthLogin';
import Onboarding from './components/Onboarding';
import { LoadingScreen } from './components/LoadingScreen';
import Dashboard from './pages/Dashboard';
import './index.scss';
import './App.scss';

type Step = 'loading' | 'login' | 'onboarding' | 'dashboard';

export default function App() {
  const [step, setStep] = useState<Step>('loading');

  if (step === 'loading') {
    return <LoadingScreen onComplete={() => setStep('login')} />;
  }

  if (step === 'login') {
    return <AuthLogin onSuccess={() => setStep('onboarding')} />;
  }

  if (step === 'onboarding') {
    return <Onboarding onComplete={() => setStep('dashboard')} />;
  }

  return <Dashboard />;
}
