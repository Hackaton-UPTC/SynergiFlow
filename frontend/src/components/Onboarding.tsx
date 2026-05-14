import { useMemo, useState, type UIEvent } from 'react';

interface OnboardingProps {
  onComplete?: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [policyScrolled, setPolicyScrolled] = useState(false);
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [tolerance, setTolerance] = useState(12);
  const [signature, setSignature] = useState('');
  const [onboardingError, setOnboardingError] = useState(false);

  const totalSteps = 6;
  const bureaucracyScores = [8, 23, 41, 64, 82, 113];
  const onboardingProgress = bureaucracyScores[onboardingStep];

  const emotions = useMemo(
    () => [
      { icon: '😀', label: 'Optimismo obligatorio' },
      { icon: '😐', label: 'Neutralidad aprobada' },
      { icon: '😭', label: 'Resiliencia fiscal' },
      { icon: '🫡', label: 'Obediencia ágil' },
    ],
    []
  );

  const currentButton = [
    'Solicitar autorización preliminar',
    'Sincronizar cultura',
    'Continuar bajo protesta',
    'Homologar paciencia',
    'Protocolizar compromiso',
    'Entrar al dashboard',
  ][onboardingStep];

  const triggerOnboardingError = () => {
    setOnboardingError(true);
    setTimeout(() => setOnboardingError(false), 560);
  };

  const isToleranceAligned = tolerance >= 84 && tolerance <= 90;
  const isSignatureValid = signature.trim().toUpperCase() === 'SINERGIA';

  const nextOnboardingStep = () => {
    if (onboardingStep === 1 && !selectedEmotion) {
      triggerOnboardingError();
      return;
    }

    if (onboardingStep === 2 && (!policyScrolled || !policyAccepted)) {
      triggerOnboardingError();
      return;
    }

    if (onboardingStep === 3 && !isToleranceAligned) {
      triggerOnboardingError();
      return;
    }

    if (onboardingStep === 4 && !isSignatureValid) {
      triggerOnboardingError();
      return;
    }

    if (onboardingStep >= totalSteps - 1) {
      onComplete?.();
      return;
    }

    setOnboardingStep((current) => current + 1);
  };

  const handlePolicyScroll = (event: UIEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    const reachedBottom =
      element.scrollTop + element.clientHeight >= element.scrollHeight - 14;

    if (reachedBottom) {
      setPolicyScrolled(true);
    }
  };

  return (
    <div className="screen onboarding-screen">
      <div className="background-orb orb-one"></div>
      <div className="background-orb orb-two"></div>
      <div className="background-orb orb-three"></div>

      <div
        className={`onboarding-card onboarding-card-tedious ${
          onboardingError ? 'onboarding-card-error' : ''
        }`}
      >
        {onboardingError && (
          <div className="onboarding-warning" aria-hidden="true">
            ⚠️
          </div>
        )}

        <div className="onboarding-topbar">
          <div className="onboarding-status">
            <span>
              Etapa {onboardingStep + 1} de {totalSteps}
            </span>
            <strong>Madurez burocrática: {onboardingProgress}%</strong>
          </div>

          <div className="onboarding-progress-track">
            <div
              className="onboarding-progress-fill"
              style={{ width: `${Math.min(onboardingProgress, 100)}%` }}
            ></div>
          </div>
        </div>

        {onboardingStep === 0 && (
          <div className="onboarding-step onboarding-step-welcome">
            <div className="onboarding-badge">Inducción obligatoria fase 0.1</div>
            <h1>Bienvenido a SynergiFlow™</h1>
            <p>
              Antes de usar la plataforma, debemos confirmar que tu espíritu
              corporativo está suficientemente alineado con el comité de comités.
            </p>

            <div className="onboarding-bureaucracy-stack" aria-hidden="true">
              <span>Gobernanza</span>
              <span>Comité</span>
              <span>Acta</span>
              <span>Sinergia</span>
              <span>Excel</span>
            </div>
          </div>
        )}

        {onboardingStep === 1 && (
          <div className="onboarding-step">
            <div className="onboarding-badge">Formulario emocional 14-B</div>
            <h1>Alineación cultural</h1>
            <p>
              Selecciona la emoción que mejor representa tu compromiso con la
              burocracia. Todas serán archivadas con la misma prioridad.
            </p>

            <div className="onboarding-emotion-grid onboarding-emotion-grid-tedious">
              {emotions.map((emotion, index) => (
                <button
                  key={emotion.icon}
                  className={`onboarding-emotion onboarding-emotion-${index + 1} ${
                    selectedEmotion === emotion.icon ? 'onboarding-emotion-selected' : ''
                  }`}
                  type="button"
                  onClick={() => setSelectedEmotion(emotion.icon)}
                  aria-label={emotion.label}
                >
                  <span>{emotion.icon}</span>
                  <small>{emotion.label}</small>
                </button>
              ))}
            </div>
          </div>
        )}

        {onboardingStep === 2 && (
          <div className="onboarding-step">
            <div className="onboarding-badge">Política invisible activa</div>
            <h1>Aceptación de políticas</h1>
            <p>
              Para continuar, revisa el documento operativo no vinculante y
              acepta las políticas que no puedes modificar.
            </p>

            <div className="onboarding-policy-layout">
              <div className="onboarding-policy-scroll" onScroll={handlePolicyScroll}>
                <p>Cláusula 1. El usuario reconoce que la eficiencia puede ser interpretada como falta de profundidad organizacional.</p>
                <p>Cláusula 2. Todo botón podrá cambiar de intención según criterio del subcomité de navegación.</p>
                <p>Cláusula 3. La palabra “rápido” será reemplazada por “estratégicamente asincrónico”.</p>
                <p>Cláusula 4. La plataforma podrá solicitar autorizaciones para solicitar autorizaciones.</p>
                <p>Cláusula 5. El silencio operacional será considerado aceptación emocional.</p>
                <p>Cláusula 6. Cualquier productividad accidental debe reportarse al área de cumplimiento.</p>
                <p>Cláusula 7. El presente documento termina exactamente cuando el usuario pierde la esperanza.</p>
              </div>

              <button
                className={`onboarding-policy-switch onboarding-policy-switch-tedious ${
                  policyAccepted ? 'onboarding-policy-switch-active' : ''
                }`}
                type="button"
                onClick={() => setPolicyAccepted((current) => !current)}
                aria-pressed={policyAccepted}
                aria-label="Aceptar políticas invisibles"
              >
                <span className="onboarding-policy-knob"></span>
                <span className="onboarding-policy-stamp">{policyAccepted ? '✓' : '?'}</span>
              </button>
            </div>

            <div className="onboarding-check-row" aria-hidden="true">
              <span className={policyScrolled ? 'onboarding-check-active' : ''}>▣</span>
              <span className={policyAccepted ? 'onboarding-check-active' : ''}>▣</span>
            </div>
          </div>
        )}

        {onboardingStep === 3 && (
          <div className="onboarding-step">
            <div className="onboarding-badge">Calibración de paciencia ISO-404</div>
            <h1>Tolerancia a fricción</h1>
            <p>
              Ajusta tu tolerancia exactamente cerca del punto corporativo
              recomendado por consultoría externa.
            </p>

            <div className="onboarding-calibration-panel">
              <div className="onboarding-calibration-target">
                <span>Objetivo</span>
                <strong>87%</strong>
              </div>

              <input
                className="onboarding-calibration-slider"
                type="range"
                min="0"
                max="100"
                value={tolerance}
                onChange={(event) => setTolerance(Number(event.target.value))}
                style={{
                  background: `linear-gradient(to right, var(--color-primary) ${tolerance}%, rgba(255,255,255,0.14) ${tolerance}%)`,
                }}
                aria-label="Calibrar tolerancia a fricción"
              />

              <div className="onboarding-calibration-value">{tolerance}%</div>
              <div className="onboarding-calibration-scale" aria-hidden="true">
                <span>Ágil</span>
                <span>Gobernable</span>
                <span>Inauditable</span>
              </div>
            </div>
          </div>
        )}

        {onboardingStep === 4 && (
          <div className="onboarding-step">
            <div className="onboarding-badge">Firma declarativa no contractual</div>
            <h1>Protocolización</h1>
            <p>
              Escribe la palabra institucional que resume todo lo que nadie
              puede explicar en una reunión de seguimiento.
            </p>

            <div className="onboarding-signature-panel">
              <input
                className="onboarding-signature-input"
                value={signature}
                onChange={(event) => setSignature(event.target.value.toUpperCase())}
                placeholder="Concepto institucional"
                aria-label="Firma declarativa"
              />

              <div className="onboarding-signature-cells" aria-hidden="true">
                {'SINERGIA'.split('').map((letter, index) => (
                  <span
                    key={`${letter}-${index}`}
                    className={signature[index] === letter ? 'onboarding-cell-active' : ''}
                  >
                    {signature[index] || '•'}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {onboardingStep === 5 && (
          <div className="onboarding-step">
            <div className="onboarding-badge">Sello corporativo provisional</div>
            <h1>Validación final</h1>
            <p>
              Tu alineación fue calculada exitosamente con un margen de error
              emocional del 87% y una confianza administrativa del 113%.
            </p>

            <div className="onboarding-final-panel onboarding-final-panel-tedious">
              <div className="onboarding-meter">
                <div className="onboarding-meter-fill"></div>
              </div>
              <div className="onboarding-percentage">113%</div>
              <div className="onboarding-audit-grid" aria-hidden="true">
                <span>✓</span>
                <span>✓</span>
                <span>?</span>
                <span>✓</span>
                <span>✓</span>
                <span>∞</span>
              </div>
              <div className="onboarding-seal">APROBADO</div>
            </div>
          </div>
        )}

        <button className="onboarding-button" type="button" onClick={nextOnboardingStep}>
          {currentButton}
        </button>
      </div>
    </div>
  );
}
