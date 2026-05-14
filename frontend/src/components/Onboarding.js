import { useState } from "react";

function Onboarding({ onComplete }) {
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [onboardingError, setOnboardingError] = useState(false);

  const onboardingProgress = Math.round(((onboardingStep + 1) / 4) * 100);
  const onboardingButtons = [
    "Solicitar autorización",
    "Sincronizar cultura",
    "Continuar bajo protesta",
    "Entrar al dashboard",
  ];
  const emotions = ["😀", "😐", "😭", "🫡"];

  const triggerOnboardingError = () => {
    setOnboardingError(true);
    setTimeout(() => setOnboardingError(false), 500);
  };

  const nextOnboardingStep = () => {
    if (onboardingStep === 1 && !selectedEmotion) {
      triggerOnboardingError();
      return;
    }

    if (onboardingStep === 2 && !policyAccepted) {
      triggerOnboardingError();
      return;
    }

    if (onboardingStep >= 3) {
      onComplete();
      return;
    }

    setOnboardingStep((current) => current + 1);
  };

  return (
    <div className="screen onboarding-screen">
      <div className="background-orb orb-one"></div>
      <div className="background-orb orb-two"></div>
      <div className="background-orb orb-three"></div>

      <div className={`onboarding-card ${onboardingError ? "onboarding-card-error" : ""}`}>
        {onboardingError && (
          <div className="onboarding-warning" aria-hidden="true">
            ⚠️
          </div>
        )}

        <div className="onboarding-status">
          <span>Etapa {onboardingStep + 1} de 4</span>
          <strong>Madurez burocrática: {onboardingProgress}%</strong>
        </div>

        <div className="onboarding-progress-track">
          <div
            className="onboarding-progress-fill"
            style={{ width: `${onboardingProgress}%` }}
          ></div>
        </div>

        {onboardingStep === 0 && (
          <div className="onboarding-step">
            <div className="onboarding-badge">Enterprise Friction as a Service</div>
            <h1>Bienvenido a SynergiFlow™</h1>
            <p>
              Antes de usar la plataforma, debemos confirmar que tu espíritu
              corporativo está suficientemente alineado.
            </p>
          </div>
        )}

        {onboardingStep === 1 && (
          <div className="onboarding-step">
            <div className="onboarding-badge">Formulario emocional 14-B</div>
            <h1>Alineación cultural</h1>
            <p>
              Selecciona la emoción que mejor representa tu compromiso con la
              burocracia.
            </p>

            <div className="onboarding-emotion-grid">
              {emotions.map((emotion) => (
                <button
                  key={emotion}
                  className={`onboarding-emotion ${
                    selectedEmotion === emotion ? "onboarding-emotion-selected" : ""
                  }`}
                  type="button"
                  onClick={() => setSelectedEmotion(emotion)}
                  aria-label={`Seleccionar emoción ${emotion}`}
                >
                  {emotion}
                </button>
              ))}
            </div>
          </div>
        )}

        {onboardingStep === 2 && (
          <div className="onboarding-step">
            <div className="onboarding-badge">Política invisible activa</div>
            <h1>Aceptación de políticas</h1>
            <p>Para continuar, debes aceptar políticas que no puedes leer.</p>

            <button
              className={`onboarding-policy-switch ${
                policyAccepted ? "onboarding-policy-switch-active" : ""
              }`}
              type="button"
              onClick={() => setPolicyAccepted((current) => !current)}
              aria-pressed={policyAccepted}
              aria-label="Aceptar políticas invisibles"
            >
              <span className="onboarding-policy-knob"></span>
              <span className="onboarding-policy-stamp">
                {policyAccepted ? "✓" : "?"}
              </span>
            </button>
          </div>
        )}

        {onboardingStep === 3 && (
          <div className="onboarding-step">
            <div className="onboarding-badge">Sello corporativo provisional</div>
            <h1>Validación final</h1>
            <p>
              Tu alineación fue calculada exitosamente con un margen de error
              emocional del 87%.
            </p>

            <div className="onboarding-final-panel">
              <div className="onboarding-meter">
                <div className="onboarding-meter-fill"></div>
              </div>
              <div className="onboarding-percentage">113%</div>
              <div className="onboarding-seal">APROBADO</div>
            </div>
          </div>
        )}

        <button className="onboarding-button" type="button" onClick={nextOnboardingStep}>
          {onboardingButtons[onboardingStep]}
        </button>
      </div>
    </div>
  );
}

export default Onboarding;
