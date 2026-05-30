interface Props {
  step: number;
}

export function OnboardingProgress({ step }: Props) {
  return (
    <div className="h-[2px] bg-black/5">
      <div
        className="h-full bg-black transition-all duration-500"
        style={{
          width: `${(step / 6) * 100}%`,
        }}
      />
    </div>
  );
}
