import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

// ─── OnboardingButton ───────────────────────────────────────────────────────
// The large black pill "Continue →" / "Claim My Handle →" button used on
// every onboarding step. Accepts all native <button> props.

export const OnboardingButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "flex h-14 w-full items-center justify-center rounded-full",
        "bg-black text-[15px] font-bold text-white",
        "transition hover:bg-zinc-800",
        "disabled:cursor-not-allowed disabled:bg-zinc-400",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});

OnboardingButton.displayName = "OnboardingButton";
