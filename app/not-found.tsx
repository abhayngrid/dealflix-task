"use client";

import Link from "next/link";

import { ROUTES } from "@/constants/routes";

export default function NotFound() {
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
        </div>
      </header>

      <main className="flex min-h-[calc(100vh-60px)] items-center justify-center px-6">
        <div className="w-full max-w-[600px] text-center">
          <div
            className="
              mb-6
              text-[120px]
              font-bold
              leading-none
              tracking-[-0.08em]
              text-black/10
              sm:text-[180px]
            "
          >
            404
          </div>

          <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
            Page Not Found
          </div>

          <h1
            className="
              text-[36px]
              font-bold
              leading-[1.05]
              tracking-[-0.035em]
              sm:text-[48px]
            "
          >
            This page doesn't{" "}
            <span className="font-serif italic font-medium text-[#a88b48]">
              exist.
            </span>
          </h1>

          <p
            className="
              mx-auto
              mt-5
              max-w-[460px]
              font-serif
              text-[16px]
              italic
              leading-relaxed
              text-zinc-600
            "
          >
            The page may have been moved, deleted, or the URL might be
            incorrect.
          </p>

          <div
            className="
              mt-10
              flex
              flex-col
              justify-center
              gap-3
              sm:flex-row
            "
          >
            <Link
              href={ROUTES.DASHBOARD}
              className="
                inline-flex
                items-center
                justify-center
                rounded-full
                bg-black
                px-7
                py-4
                text-sm
                font-bold
                text-white
                transition
                hover:bg-zinc-800
              "
            >
              Go To Dashboard →
            </Link>

            <Link
              href={ROUTES.SIGNUP}
              className="
                inline-flex
                items-center
                justify-center
                rounded-full
                border
                border-black/15
                bg-white
                px-7
                py-4
                text-sm
                font-semibold
                transition
                hover:bg-zinc-50
              "
            >
              Back To Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
