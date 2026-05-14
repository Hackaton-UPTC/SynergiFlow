import { useState } from "react";
import Login from "./components/Login";
import Onboarding from "./components/Onboarding";
import "./App.scss";

function App() {
  const [step, setStep] = useState("splash");
  const [progress, setProgress] = useState(7);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleProgressChange = (e) => {
    const sliderValue = Number(e.target.value);

    // BadUI: mientras más a la izquierda, más carga.
    const invertedProgress = 100 - sliderValue;

    setProgress(invertedProgress);

    if (invertedProgress >= 100) {
      setTimeout(() => {
        setStep("login");
      }, 300);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setStep("onboarding");
  };

  return (
    <div className="app">
      {step === "splash" && (
        <div className="screen splash">
          <div className="background-orb orb-one"></div>
          <div className="background-orb orb-two"></div>
          <div className="background-orb orb-three"></div>

          <div className="loading-card">
            <div className="brand-pill">
              Enterprise Friction as a Service
            </div>

            <h1>SynergiFlow™</h1>

            <p className="loading-subtitle">
              Sincronizando stakeholders, validando sinergias y bloqueando
              productividad innecesaria.
            </p>

            <div className="corporate-loader">
              <div className="loader-ring"></div>
              <div className="loader-core">∞</div>
            </div>

            <div className="loading-panel">
              <div className="progress-header">
                <span>Carga corporativa</span>
                <strong>{progress}%</strong>
              </div>

              <div className="stealth-slider-wrapper">
                <input
                  className="bad-progress-slider stealth-slider"
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="93"
                  onChange={handleProgressChange}
                  aria-label="Carga corporativa"
                  style={{
                    background: `linear-gradient(to right, var(--color-primary) ${progress}%, rgba(255,255,255,0.16) ${progress}%)`,
                  }}
                />

                <div className="progress-markers">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>

              <div className="loading-hint">
                Esperando alineación operacional...
              </div>
            </div>
          </div>
        </div>
      )}

      {step === "login" && (
        <Login onSuccess={handleLoginSuccess} />
      )}

      {step === "onboarding" && isLoggedIn && (
        <Onboarding onComplete={() => setStep("dashboard")} />
      )}

      {step === "onboarding" && !isLoggedIn && (
        <div className="screen placeholder-screen">
          <h1>Login</h1>
          <p>Loading desbloqueado correctamente.</p>
          <button
            className="onboarding-button"
            type="button"
            onClick={() => setStep("login")}
          >
            Volver al login
          </button>
        </div>
      )}

      {step === "dashboard" && isLoggedIn && (
        <div className="screen onboarding-dashboard">
          <div className="onboarding-dashboard-card">
            <div className="onboarding-badge">Operación aprobada</div>
            <h1>Dashboard Ejecutivo</h1>
            <p>Sinergia operacional estabilizada.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
