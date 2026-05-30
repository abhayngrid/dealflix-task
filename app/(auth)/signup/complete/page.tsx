"use client";

import { useRouter } from "next/navigation";

import { ROUTES } from "@/constants/routes";

import { useCurrentUser } from "@/features/auth/hooks/use-current-user";

export default function CompletePage() {
  const router = useRouter();

  const { data: user } = useCurrentUser();

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
            <span className="font-bold text-black">6</span> of 6
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="h-[2px] bg-black/5">
        <div className="h-full w-full bg-black" />
      </div>

      <main className="flex min-h-[calc(100vh-62px)] items-center justify-center px-6 py-12">
        <div
          className="
            w-full
            max-w-[540px]
            rounded-[24px]
            border
            border-black/10
            bg-white
            p-8
            text-center
          "
        >
          {/* Avatar */}
          <div
            className="
              mx-auto
              mb-4
              h-[88px]
              w-[88px]
              overflow-hidden
              rounded-full
              border-[3px]
              border-white
              shadow-sm
              ring-1
              ring-black/10
            "
          >
            <img
              src="/avatar-placeholder.jpg"
              alt="profile"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Name */}
          <h2
            className="
              text-[28px]
              font-bold
              tracking-[-0.025em]
            "
          >
            {user?.full_name ?? "Cameron Free"}
          </h2>

          {/* Signature */}
          <div className="mt-2 flex justify-center">
            <div className="h-[3px] w-[72px] rounded-full bg-[#7ac943]" />
          </div>

          {/* Brokerage */}
          <div className="mt-4 text-sm text-zinc-500">
            {user?.brokerage_name
              ? `at ${user.brokerage_name}`
              : "Independent Broker"}
          </div>

          {/* URL Pill */}
          <div
            className="
              mx-auto
              mt-8
              inline-flex
              items-center
              rounded-full
              border
              border-black/10
              bg-[#fafafa]
              px-6
              py-3
            "
          >
            <span className="text-zinc-500">dealflix.ai/</span>

            <span className="font-bold">{user?.handle}</span>
          </div>

          {/* Heading */}
          <h1
            className="
              mt-8
              text-[42px]
              font-bold
              leading-none
              tracking-[-0.04em]
            "
          >
            Your page is{" "}
            <span
              className="
                font-serif
                italic
                font-medium
                text-[#a88b48]
              "
            >
              live.
            </span>
          </h1>

          {/* Description */}
          <p
            className="
              mx-auto
              mt-4
              max-w-[380px]
              font-serif
              text-[16px]
              italic
              leading-relaxed
              text-zinc-600
            "
          >
            Now make it yours. You can add deals, photos, and payouts whenever
            you're ready.
          </p>

          {/* Actions */}
          <div
            className="
              mt-10
              flex
              flex-col
              gap-3
              sm:flex-row
              sm:justify-center
            "
          >
            <button
              onClick={() => router.push(ROUTES.DASHBOARD)}
              disabled={!user}
              className="
                rounded-full
                bg-black
                px-7
                py-4
                text-sm
                font-bold
                text-white
                transition
                hover:bg-zinc-800
                disabled:cursor-not-allowed
                disabled:bg-zinc-400
              "
            >
              Setup my marketplace →
            </button>

            <button
              onClick={() => {
                if (user?.handle) router.push(`/${user.handle}`);
              }}
              disabled={!user?.handle}
              className="
                rounded-full
                border
                border-black/15
                bg-white
                px-7
                py-4
                text-sm
                font-semibold
                transition
                hover:border-black
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              See my page
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
