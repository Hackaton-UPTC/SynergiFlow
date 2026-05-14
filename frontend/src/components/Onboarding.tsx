import { useEffect } from 'react';

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, 1200);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#020617] text-white text-4xl font-black tracking-[0.4em] uppercase">
      onboarding
    </div>
  );
}
