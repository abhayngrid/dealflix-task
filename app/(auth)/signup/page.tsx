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

  async function onSubmit(data: EmailInput) {
    await mutation.mutateAsync(data.email);

    router.push(
      `${ROUTES.SIGNUP_CHECK_EMAIL}?email=${encodeURIComponent(data.email)}`,
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="h-[60px] border-b border-black/10 bg-white">
        <div className="mx-auto flex h-full max-w-7xl items-center px-6">
          <div className="flex items-end">
            <div className="mb-[2px] mr-1 h-[10px] w-[10px] rounded-full bg-[#7ac943]" />

            <span className="text-[26px] font-bold tracking-[-0.045em]">
              dealflix
            </span>
          </div>

          <div className="ml-auto text-xs font-medium text-zinc-500">
            <span className="font-bold text-black">1</span> of 6
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="h-[2px] bg-black/5">
        <div className="h-full w-[16.66%] bg-black" />
      </div>

      {/* Content */}
      <main className="flex min-h-[calc(100vh-62px)] items-center justify-center px-5 py-12">
        <div className="w-full max-w-[480px]">
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
            <input
              {...register("email")}
              placeholder="cameron@maz.com"
              className="
              h-14
              w-full
              rounded-xl
              border
              border-black/10
              bg-white
              px-4
              text-base
              outline-none
              transition
              focus:border-black
            "
            />

            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}

            <button
              type="submit"
              disabled={mutation.isPending}
              className="
              mt-2
              flex
              h-14
              w-full
              items-center
              justify-center
              rounded-full
              bg-black
              text-[15px]
              font-bold
              text-white
              transition
              hover:bg-zinc-800
              disabled:cursor-not-allowed
              disabled:bg-zinc-400
            "
            >
              {mutation.isPending ? "Sending..." : "Continue →"}
            </button>
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
        </div>
      </main>
    </div>
  );
}
