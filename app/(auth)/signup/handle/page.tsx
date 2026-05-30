"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { ROUTES } from "@/constants/routes";
import { generateHandle } from "@/lib/handle";
import { useDebounce } from "@/hooks/use-debounce";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { useCheckHandle } from "@/features/auth/hooks/use-check-handle";
import { useUpdateHandle } from "@/features/auth/hooks/use-update-handle";

import { OnboardingShell } from "@/components/onboarding/onboarding-shell";
import { OnboardingButton } from "@/components/ui/onboarding-button";

export default function HandlePage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: user } = useCurrentUser();

  const [handle, setHandle] = useState("");
  // Tracks whether the user has manually edited the handle.
  // When true, cache updates to full_name no longer auto-regenerate the handle.
  const [isManuallyEdited, setIsManuallyEdited] = useState(false);

  const updateHandleMutation = useUpdateHandle();

  const debouncedHandle = useDebounce(handle, 400);

  const { data: availability, isFetching } = useCheckHandle(debouncedHandle);

  useEffect(() => {
    if (!user?.full_name) return;
    // Only auto-generate if the user hasn't touched the field themselves.
    // This fires correctly when the cache refreshes after the async profile save.
    if (isManuallyEdited) return;
    setHandle(generateHandle(user.full_name));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.full_name, isManuallyEdited]);

  function onSubmit() {
    if (!availability?.available) return;

    // Write the new handle into the cache immediately so the complete page
    // shows the correct URL pill without waiting for the DB round-trip.
    queryClient.setQueryData(["current-user"], (old: any) =>
      old ? { ...old, handle } : old,
    );

    // Navigate first — the save and cache invalidation happen in background.
    router.push(ROUTES.SIGNUP_COMPLETE);
    updateHandleMutation.mutate(handle);
  }

  const brokerageCard = useMemo(() => {
    if (!user) {
      return (
        <div className="mb-6 h-[72px] animate-pulse rounded-xl bg-zinc-200" />
      );
    }

    if (user.brokerage_name) {
      return (
        <div className="mb-6 flex items-center rounded-xl border border-black bg-white px-4 py-4">
          <div>
            <div className="font-semibold">{user.brokerage_name}</div>
            <div className="text-sm text-zinc-500">Selected Brokerage</div>
          </div>

          <button
            type="button"
            onClick={() => router.push(ROUTES.SIGNUP_BROKERAGE)}
            className="ml-auto text-sm font-medium text-zinc-500 hover:text-black"
          >
            Change
          </button>
        </div>
      );
    }

    return (
      <button
        type="button"
        onClick={() => router.push(ROUTES.SIGNUP_BROKERAGE)}
        className="
          mb-6 flex w-full items-center rounded-xl border border-dashed
          border-black/20 bg-white px-4 py-4 text-left transition hover:border-black
        "
      >
        <div>
          <div className="font-semibold">Add Brokerage</div>
          <div className="text-sm text-zinc-500">Optional</div>
        </div>
        <span className="ml-auto text-xl">+</span>
      </button>
    );
  }, [user, router]);

  return (
    <OnboardingShell step={5}>
      {brokerageCard}

      <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
        Claim Your Handle
      </div>

      <h1 className="text-[36px] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[42px]">
        Claim your{" "}
        <span className="font-serif italic font-medium text-[#a88b48]">
          URL.
        </span>
      </h1>

      <p className="mb-8 mt-4 font-serif text-[16px] italic leading-relaxed text-zinc-600">
        This becomes your permanent Dealflix page. You keep it even if you
        switch brokerages.
      </p>

      {/* Handle input */}
      <div className="rounded-xl border border-black/10 bg-white p-2">
        <div className="flex items-center">
          <span className="pl-3 text-sm text-zinc-500">dealflix.ai/</span>

          <input
            value={handle}
            onChange={(e) => {
              setIsManuallyEdited(true);
              setHandle(
                e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
              );
            }}
            disabled={!user}
            className="
              h-12 flex-1 border-none bg-transparent px-2
              font-semibold outline-none
            "
          />
        </div>
      </div>

      {/* Availability status */}
      <div className="mt-3 h-5">
        {!user && (
          <span className="text-sm text-zinc-400">Preparing your URL...</span>
        )}

        {user && isFetching && (
          <span className="text-sm text-zinc-400">Checking availability...</span>
        )}

        {user && !isFetching && availability?.available && (
          <span className="text-sm font-medium text-green-600">✓ Available</span>
        )}

        {user && !isFetching && availability && !availability.available && (
          <span className="text-sm font-medium text-red-600">✕ Already taken</span>
        )}
      </div>

      <OnboardingButton
        type="button"
        onClick={onSubmit}
        disabled={!user || !availability?.available}
        className="mt-8"
      >
        Claim My Handle →
      </OnboardingButton>
    </OnboardingShell>
  );
}
