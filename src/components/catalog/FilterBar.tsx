"use client";

import type { SortId } from "@/lib/gifts/sortAndFilter";

const SORTS: { id: SortId; label: string }[] = [
  { id: "recommended", label: "For this event" },
  { id: "popular", label: "Popular" },
  { id: "price-asc", label: "Price ↑" },
  { id: "price-desc", label: "Price ↓" },
];

export function FilterBar({
  category,
  onCategory,
  sort,
  onSort,
  categories,
}: {
  category: string | "all";
  onCategory: (c: string | "all") => void;
  sort: SortId;
  onSort: (s: SortId) => void;
  categories: string[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <Chip active={category === "all"} onClick={() => onCategory("all")}>
          All
        </Chip>
        {categories.map((c) => (
          <Chip key={c} active={category === c} onClick={() => onCategory(c)}>
            {c}
          </Chip>
        ))}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {SORTS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onSort(s.id)}
            className={[
              "whitespace-nowrap rounded-full border-2 px-3 py-1.5 text-xs font-semibold transition",
              sort === s.id
                ? "border-[#0f172a] bg-[#22c55e] text-[#052e16]"
                : "border-[#0f172a] bg-white text-slate-700",
            ].join(" ")}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full border-2 px-3 py-1 text-xs font-semibold capitalize transition",
        active
          ? "border-[#0f172a] bg-[#22c55e] text-[#052e16]"
          : "border-[#0f172a] bg-white text-slate-700",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
