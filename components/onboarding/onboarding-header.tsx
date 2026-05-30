interface Props {
  step: number;
}

export function OnboardingHeader({ step }: Props) {
  return (
    <header className="h-[60px] border-b bg-white">
      <div className="mx-auto flex h-full max-w-7xl items-center px-6">
        <div className="flex items-end">
          <div className="mb-[2px] mr-1 h-2.5 w-2.5 rounded-full bg-[#7ac943]" />

          <span className="text-[26px] font-bold tracking-[-0.045em]">
            dealflix
          </span>
        </div>

        <div className="ml-auto text-xs text-zinc-500">
          <span className="font-bold text-black">{step}</span> of 6
        </div>
      </div>
    </header>
  );
}
