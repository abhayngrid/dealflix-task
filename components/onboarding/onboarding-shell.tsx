import { ReactNode } from "react";

import { OnboardingHeader } from "./onboarding-header";
import { OnboardingProgress } from "./onboarding-progress";

interface Props {
  step: number;
  children: ReactNode;
}

export function OnboardingShell({ step, children }: Props) {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <OnboardingHeader step={step} />

      <OnboardingProgress step={step} />

      <main className="flex min-h-[calc(100vh-62px)] items-center justify-center px-5 py-12">
        <div className="w-full max-w-[480px]">{children}</div>
      </main>
    </div>
  );
}
