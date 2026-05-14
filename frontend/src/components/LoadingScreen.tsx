import React, { useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(7);

  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sliderValue = Number(event.target.value);
    const invertedProgress = 100 - sliderValue;

    setProgress(invertedProgress);

    if (invertedProgress >= 100) {
      setTimeout(onComplete, 300);
    }
  };

  return (
    <div className="app">
      <div className="screen splash">
        <div className="background-orb orb-one"></div>
        <div className="background-orb orb-two"></div>
        <div className="background-orb orb-three"></div>

        <div className="loading-card">
          <div className="brand-pill">Enterprise Friction as a Service</div>

          <h1>SynergiFlow</h1>

          <p className="loading-subtitle">
            Sincronizando stakeholders, validando sinergias y bloqueando
            productividad innecesaria.
          </p>

          <div className="corporate-loader">
            <div className="loader-ring"></div>
            <div className="loader-core">SF</div>
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

            <div className="loading-hint">Esperando alineacion operacional...</div>
          </div>
        </div>
      </div>
    </div>
  );
}
