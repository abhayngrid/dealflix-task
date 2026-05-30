"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import { useSendMagicLink } from "@/features/auth/hooks/use-send-magic-link";

const COOLDOWN_SECONDS = 60;

export default function CheckEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const sendMagicLinkMutation = useSendMagicLink();

  // Seconds remaining in the cooldown (0 = button is active).
  // Starts at COOLDOWN_SECONDS because the email was just sent by the
  // previous page — the user should wait before resending.
  const [cooldown, setCooldown] = useState(COOLDOWN_SECONDS);
  const [justSent, setJustSent] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startCooldown() {
    setCooldown(COOLDOWN_SECONDS);
    setJustSent(true);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setJustSent(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  // Start the cooldown as soon as the page mounts — the email was just sent.
  useEffect(() => {
    startCooldown();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleResend() {
    if (!email || cooldown > 0 || sendMagicLinkMutation.isPending) return;

    sendMagicLinkMutation.mutate(email, {
      onSuccess: () => {
        startCooldown();
      },
    });
  }

  const isDisabled = cooldown > 0 || sendMagicLinkMutation.isPending || !email;

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
            <span className="font-bold text-black">2</span> of 6
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="h-[2px] bg-black/5">
        <div className="h-full w-[33.33%] bg-black" />
      </div>

      {/* Content */}
      <main className="flex min-h-[calc(100vh-62px)] items-center justify-center px-5 py-12">
        <div className="w-full max-w-[480px] text-center">
          {/* Icon */}
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#7ac943]/10">
            <svg
              viewBox="0 0 24 24"
              className="h-9 w-9 text-[#6ab534]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <rect x="3" y="6" width="18" height="13" rx="2" />
              <path d="M3 8l9 6 9-6" />
            </svg>
          </div>

          <h1 className="text-[36px] font-bold tracking-[-0.035em] sm:text-[42px]">
            Check your inbox.
          </h1>

          <p className="mt-3 font-serif text-[16px] italic text-zinc-600">
            We sent a one-tap sign-in link to:
          </p>

          {/* Email Pill */}
          <div className="mt-8 inline-flex rounded-full bg-zinc-100 px-5 py-2 text-sm font-semibold text-black">
            {email}
          </div>

          {/* Trust Row */}
          <div className="mt-8 flex justify-center">
            <span className="text-xs text-zinc-500">
              ✓ Link expires in 15 minutes
            </span>
          </div>

          {/* Help Text */}
          <p className="mt-8 font-serif text-[14px] italic leading-relaxed text-zinc-500">
            Didn't get it? Check spam, or{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={isDisabled}
              className="font-sans not-italic font-semibold text-black hover:underline disabled:cursor-not-allowed disabled:text-zinc-400"
            >
              {sendMagicLinkMutation.isPending
                ? "sending…"
                : cooldown > 0
                  ? `resend in ${cooldown}s`
                  : "resend the link"}
            </button>
            .
          </p>

          {/* Success feedback */}
          {justSent && cooldown > 0 && (
            <p className="mt-4 text-xs font-medium text-[#6ab534]">
              ✓ New link sent — check your inbox
            </p>
          )}

          {/* Error feedback */}
          {sendMagicLinkMutation.isError && (
            <p className="mt-4 text-xs font-medium text-red-500">
              {sendMagicLinkMutation.error instanceof Error
                ? sendMagicLinkMutation.error.message
                : "Something went wrong. Please try again."}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

