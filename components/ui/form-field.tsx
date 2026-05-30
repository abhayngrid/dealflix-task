import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ─── FormInput ─────────────────────────────────────────────────────────────
// The standard text input used across every onboarding step.
// Accepts all native <input> props so it works with react-hook-form's register().

export const FormInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "h-14 w-full rounded-xl border border-black/10 bg-white px-4",
        "text-base outline-none transition placeholder:text-zinc-400",
        "focus:border-black",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
});

FormInput.displayName = "FormInput";

// ─── FormField ─────────────────────────────────────────────────────────────
// Wraps a label + input + optional error message + optional hint text.
// Pass `error` to show a red validation message below the input.
// Pass `hint` to show a grey helper text below the input.

interface FormFieldProps {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

export function FormField({ label, error, hint, children }: FormFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-500">
        {label}
      </label>

      {children}

      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}

      {hint && !error && (
        <p className="mt-2 text-xs text-zinc-500">{hint}</p>
      )}
    </div>
  );
}
