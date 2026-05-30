import { ReactNode } from "react";

import { OnboardingHeader } from "./onboarding-header";
import { OnboardingProgress } from "./onboarding-progress";

interface Props {
  step: number;
  children: ReactNode;
  /** Use for pages with long content (e.g. brokerage list) — aligns to top instead of center */
  scrollable?: boolean;
}

export function OnboardingShell({ step, children, scrollable = false }: Props) {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <OnboardingHeader step={step} />

      <OnboardingProgress step={step} />

      <main
        className={`
          flex min-h-[calc(100vh-62px)] px-5 py-12
          ${scrollable ? "justify-center" : "items-center justify-center"}
        `}
      >
        <div className="w-full max-w-[480px]">{children}</div>
      </main>
    </div>
  );
}
