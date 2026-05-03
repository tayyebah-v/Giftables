"use client";

export function BudgetSlider({
  valueCents,
  onChange,
  min = 1500,
  max = 12000,
}: {
  valueCents: number;
  onChange: (cents: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="rounded-2xl border-2 border-[#0f172a] bg-white p-4">
      <div className="flex items-center justify-between text-xs font-medium text-slate-700">
        <span>Budget guide</span>
        <span className="text-slate-900">
          {new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(valueCents / 100)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={100}
        value={valueCents}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-green-500"
        aria-label="Budget slider"
      />
      <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
        Soft cap for “Within your budget” — you can still add splurge pieces.
      </p>
    </div>
  );
}
