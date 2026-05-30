"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { BROKERAGES } from "@/constants/brokerages";
import { useDebounce } from "@/hooks/use-debounce";
import { ROUTES } from "@/constants/routes";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { useUpdateBrokerage } from "@/features/auth/hooks/use-update-brokerage";

import { OnboardingShell } from "@/components/onboarding/onboarding-shell";
import { FormInput } from "@/components/ui/form-field";

export default function BrokeragePage() {
  const router = useRouter();
  const { data: user } = useCurrentUser();
  const mutation = useUpdateBrokerage();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const results = useMemo(() => {
    if (!debouncedSearch) return BROKERAGES;

    return BROKERAGES.filter((brokerage) =>
      brokerage.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [debouncedSearch]);

  function handleSelect(brokerage: (typeof BROKERAGES)[number]) {
    // Navigate immediately — DB save runs in background.
    router.push(ROUTES.SIGNUP_HANDLE);
    mutation.mutate({
      brokerage_id: brokerage.id,
      brokerage_name: brokerage.name,
      is_independent: false,
    });
  }

  function handleSkip() {
    // Navigate immediately — DB save runs in background.
    router.push(ROUTES.SIGNUP_HANDLE);
    mutation.mutate({
      brokerage_id: null,
      brokerage_name: null,
      is_independent: true,
    });
  }

  return (
    <OnboardingShell step={4} scrollable>
      <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
        Your Brokerage
      </div>

      <h1 className="text-[42px] font-bold leading-[1.05] tracking-[-0.035em]">
        Where do you work?
      </h1>

      <p className="mt-4 mb-8 font-serif italic text-zinc-600">
        Pick your brokerage so your page inherits its branding.
      </p>

      <FormInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search brokerage..."
        className="mb-4"
      />

      <div className="space-y-2">
        {results.map((brokerage) => {
          const isSelected = user?.brokerage_id === brokerage.id;

          return (
            <button
              key={brokerage.id}
              type="button"
              onClick={() => handleSelect(brokerage)}
              className={`
                flex w-full items-center rounded-xl border p-4 text-left transition
                ${
                  isSelected
                    ? "border-black bg-black text-white"
                    : "border-black/10 bg-white hover:bg-zinc-50"
                }
              `}
            >
              <div>
                <div className="font-semibold">{brokerage.name}</div>

                <div
                  className={`text-sm ${isSelected ? "text-white/70" : "text-zinc-500"}`}
                >
                  {brokerage.location}
                </div>
              </div>

              {isSelected && (
                <span className="ml-auto text-sm font-medium">✓</span>
              )}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleSkip}
        className={`
          mt-6 w-full rounded-full border px-4 py-3 text-sm transition
          ${
            user?.is_independent
              ? "border-black bg-black font-semibold text-white"
              : "border-black/10 text-zinc-500 hover:border-black hover:text-black"
          }
        `}
      >
        {user?.is_independent ? "✓ Working independently" : "I work independently"}
      </button>
    </OnboardingShell>
  );
}
