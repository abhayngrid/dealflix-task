"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Something went wrong</h1>

        <button
          onClick={reset}
          className="mt-4 rounded-full bg-black px-6 py-3 text-white"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
