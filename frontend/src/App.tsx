import { useState } from 'react';
import { AuthLogin } from './components/AuthLogin';
import { LoadingScreen } from './components/LoadingScreen';
import './index.css';
import './App.scss';

export default function App() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  if (!isLoadingComplete) {
    return <LoadingScreen onComplete={() => setIsLoadingComplete(true)} />;
  }

  return <AuthLogin />;
}
