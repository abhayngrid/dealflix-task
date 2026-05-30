"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/constants/routes";

import { generateHandle } from "@/lib/handle";
import { useDebounce } from "@/hooks/use-debounce";

import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { useCheckHandle } from "@/features/auth/hooks/use-check-handle";
import { useUpdateHandle } from "@/features/auth/hooks/use-update-handle";

export default function HandlePage() {
  const router = useRouter();

  const { data: user } = useCurrentUser();

  const [handle, setHandle] = useState("");

  const updateHandleMutation = useUpdateHandle();

  const debouncedHandle = useDebounce(handle, 400);

  const { data: availability, isFetching } = useCheckHandle(debouncedHandle);

  useEffect(() => {
    if (!user?.full_name) return;

    setHandle(generateHandle(user.full_name));
  }, [user?.full_name]);

  async function onSubmit() {
    if (!availability?.available) return;

    await updateHandleMutation.mutateAsync(handle);

    router.push(ROUTES.SIGNUP_COMPLETE);
  }

  const brokerageCard = useMemo(() => {
    if (!user) {
      return (
        <div className="mb-6 h-[72px] animate-pulse rounded-xl bg-zinc-200" />
      );
    }

    if (user.brokerage_name) {
      return (
        <div
          className="
            mb-6
            flex
            items-center
            rounded-xl
            border
            border-black
            bg-white
            px-4
            py-4
          "
        >
          <div>
            <div className="font-semibold">{user.brokerage_name}</div>

            <div className="text-sm text-zinc-500">Selected Brokerage</div>
          </div>

          <button
            type="button"
            onClick={() => router.push(ROUTES.SIGNUP_BROKERAGE)}
            className="
              ml-auto
              text-sm
              font-medium
              text-zinc-500
              hover:text-black
            "
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
          mb-6
          flex
          w-full
          items-center
          rounded-xl
          border
          border-dashed
          border-black/20
          bg-white
          px-4
          py-4
          text-left
          transition
          hover:border-black
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

          <div className="ml-auto text-xs text-zinc-500">
            <span className="font-bold text-black">5</span> of 6
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="h-[2px] bg-black/5">
        <div className="h-full w-[83.33%] bg-black" />
      </div>

      <main className="flex min-h-[calc(100vh-62px)] items-center justify-center px-5 py-12">
        <div className="w-full max-w-[480px]">
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

          <div className="rounded-xl border border-black/10 bg-white p-2">
            <div className="flex items-center">
              <span className="pl-3 text-sm text-zinc-500">dealflix.ai/</span>

              <input
                value={handle}
                onChange={(e) =>
                  setHandle(
                    e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
                  )
                }
                disabled={!user}
                className="
                  h-12
                  flex-1
                  border-none
                  bg-transparent
                  px-2
                  font-semibold
                  outline-none
                "
              />
            </div>
          </div>

          <div className="mt-3">
            {!user && (
              <span className="text-sm text-zinc-400">
                Preparing your URL...
              </span>
            )}

            {user && isFetching && (
              <span className="text-sm text-zinc-400">
                Checking availability...
              </span>
            )}

            {user && availability?.available && (
              <span className="text-sm font-medium text-green-600">
                ✓ Available
              </span>
            )}

            {user && availability && !availability.available && (
              <span className="text-sm font-medium text-red-600">
                ✕ Already taken
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onSubmit}
            disabled={
              !user ||
              !availability?.available ||
              updateHandleMutation.isPending
            }
            className="
              mt-8
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
            {updateHandleMutation.isPending ? "Saving..." : "Claim My Handle →"}
          </button>
        </div>
      </main>
    </div>
  );
}
