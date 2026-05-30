"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ROUTES } from "@/constants/routes";
import {
  emailSchema,
  EmailInput,
} from "@/features/auth/validations/email.schema";
import { useSendMagicLink } from "@/features/auth/hooks/use-send-magic-link";

import { OnboardingShell } from "@/components/onboarding/onboarding-shell";
import { FormInput } from "@/components/ui/form-field";
import { OnboardingButton } from "@/components/ui/onboarding-button";

export default function SignupPage() {
  const router = useRouter();

  const mutation = useSendMagicLink();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailInput>({
    resolver: zodResolver(emailSchema),
  });

  function onSubmit(data: EmailInput) {
    // Navigate immediately — sending the magic link is a background task.
    // If it fails, the user can hit "resend" on the check-email page.
    router.push(
      `${ROUTES.SIGNUP_CHECK_EMAIL}?email=${encodeURIComponent(data.email)}`,
    );
    mutation.mutate(data.email);
  }

  return (
    <OnboardingShell step={1}>
      <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
        Welcome to Dealflix
      </div>

      <h1 className="text-[36px] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[42px]">
        Get paid for the deals you used to{" "}
        <span className="font-serif italic font-medium text-[#a88b48]">
          email out for free.
        </span>
      </h1>

      <p className="mt-4 mb-8 font-serif text-[16px] italic leading-relaxed text-zinc-600">
        Start with your brokerage email. We&apos;ll never ask you to make a
        password.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <FormInput
            {...register("email")}
            type="email"
            placeholder="cameron@maz.com"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <OnboardingButton type="submit" className="mt-2">
          Continue →
        </OnboardingButton>
      </form>

      <div className="mt-6 text-center text-[13px] text-zinc-500">
        Already on Dealflix?{" "}
        <button
          type="button"
          className="font-semibold text-black hover:underline"
        >
          Sign in
        </button>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-[11px] text-zinc-500">
        <span>✓ Free forever</span>
        <span>✓ No password</span>
        <span>✓ Verified brokers only</span>
      </div>
    </OnboardingShell>
  );
}
