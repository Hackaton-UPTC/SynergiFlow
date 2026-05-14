import { useState } from 'react';
import { AuthLogin } from './components/AuthLogin';
import Onboarding from './components/Onboarding.jsx';
import { LoadingScreen } from './components/LoadingScreen';
import './index.css';
import './App.scss';

export default function App() {
  const [step, setStep] = useState<'loading' | 'login' | 'onboarding'>('loading');

  if (step === 'loading') {
    return <LoadingScreen onComplete={() => setStep('login')} />;
  }

  if (step === 'login') {
    return <AuthLogin onSuccess={() => setStep('onboarding')} />;
  }

  return <Onboarding onComplete={() => setStep('login')} />;
}
