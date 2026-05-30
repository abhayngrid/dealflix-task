"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { BROKERAGES } from "@/constants/brokerages";

import { useDebounce } from "@/hooks/use-debounce";
import { ROUTES } from "@/constants/routes";
import { useUpdateBrokerage } from "@/features/auth/hooks/use-update-brokerage";
import { useQueryClient } from "@tanstack/react-query";
export default function BrokeragePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useUpdateBrokerage();

  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search);

  const results = useMemo(() => {
    if (!debouncedSearch) return BROKERAGES;

    return BROKERAGES.filter((brokerage) =>
      brokerage.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [debouncedSearch]);

  async function handleSelect(brokerage: (typeof BROKERAGES)[number]) {
    await mutation.mutateAsync({
      brokerage_id: brokerage.id,
      brokerage_name: brokerage.name,
      is_independent: false,
    });

    queryClient.setQueryData(["current-user"], (old: any) => ({
      ...old,
      brokerage_id: brokerage.id,
      brokerage_name: brokerage.name,
      is_independent: false,
    }));

    router.push(ROUTES.SIGNUP_HANDLE);
  }

  async function handleSkip() {
    await mutation.mutateAsync({
      brokerage_id: null,
      brokerage_name: null,
      is_independent: true,
    });

    queryClient.setQueryData(["current-user"], (old: any) => ({
      ...old,
      brokerage_id: null,
      brokerage_name: null,
      is_independent: true,
    }));

    router.push(ROUTES.SIGNUP_HANDLE);
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="h-[60px] border-b bg-white">
        <div className="mx-auto flex h-full max-w-7xl items-center px-6">
          <span className="text-[26px] font-bold">dealflix</span>

          <div className="ml-auto text-xs">
            <span className="font-bold">4</span> of 6
          </div>
        </div>
      </header>

      <div className="h-[2px] bg-black/5">
        <div className="h-full w-[66.66%] bg-black" />
      </div>

      <main className="flex justify-center px-5 py-12">
        <div className="w-full max-w-[480px]">
          <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
            Your Brokerage
          </div>

          <h1 className="text-[42px] font-bold">Where do you work?</h1>

          <p className="mt-4 mb-8 font-serif italic text-zinc-600">
            Pick your brokerage so your page inherits its branding.
          </p>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search brokerage..."
            className="mb-4 h-14 w-full rounded-xl border border-black/10 px-4"
          />

          <div className="space-y-2">
            {results.map((brokerage) => (
              <button
                key={brokerage.id}
                type="button"
                onClick={() => handleSelect(brokerage)}
                className="flex w-full items-center rounded-xl border bg-white p-4 text-left hover:bg-zinc-50"
              >
                <div>
                  <div className="font-semibold">{brokerage.name}</div>

                  <div className="text-sm text-zinc-500">
                    {brokerage.location}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleSkip}
            className="mt-6 w-full text-sm text-zinc-500 underline"
          >
            I work independently
          </button>
        </div>
      </main>
    </div>
  );
}
