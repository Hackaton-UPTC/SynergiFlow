import { useState } from 'react';
import { Onboarding } from './components/Onboarding';
import { LoadingScreen } from './components/LoadingScreen';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './index.scss';
import './App.scss';

export default function App() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [session, setSession] = useState<{ username: string; token: string } | null>(null);

  const handleLoginSuccess = (newSession: { username: string; token: string }) => {
    setSession(newSession);
    // Guardamos en localStorage pero no lo recuperamos al inicio automáticamente
    // para forzar el flujo de login cada vez que refrescas.
    localStorage.setItem('synergiflow.session', JSON.stringify(newSession));
  };

  // 1. Pantalla de Carga Inicial
  if (!isLoadingComplete) {
    return <LoadingScreen onComplete={() => setIsLoadingComplete(true)} />;
  }

  // 2. Proceso de Onboarding
  if (!isOnboardingComplete) {
    return <Onboarding onComplete={() => setIsOnboardingComplete(true)} />;
  }

  // 3. Si se ha logueado con éxito, mostrar Dashboard. Si no, mostrar Login.
  if (session) {
    return <Dashboard />;
  }

  return (
    <Login onLoginSuccess={handleLoginSuccess} />
  );
}
