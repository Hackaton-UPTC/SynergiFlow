import { useState } from 'react';
import { AuthLogin } from './components/AuthLogin';
import { Onboarding } from './components/Onboarding';
import { LoadingScreen } from './components/LoadingScreen';
import './index.scss';
import './App.scss';

export default function App() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  if (!isLoadingComplete) {
    return <LoadingScreen onComplete={() => setIsLoadingComplete(true)} />;
  }

  if (!isOnboardingComplete) {
    return <Onboarding onComplete={() => setIsOnboardingComplete(true)} />;
  }

  return <AuthLogin />;
}
