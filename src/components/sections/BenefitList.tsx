export type Benefit = { title: string; desc: string }

/** Numbered benefit rows (1–2 ink badges, 3–4 accent badges, as designed). */
export function BenefitList({ items }: { items: Benefit[] }) {
  return (
    <ol className="flex min-w-0 flex-[1_1_340px] flex-col gap-1">
      {items.map((item, i) => (
        <li
          key={item.title}
          className={`flex gap-4 py-[18px] ${
            i < items.length - 1 ? "border-b border-gray-2" : ""
          }`}
        >
          <span
            aria-hidden="true"
            className={`flex h-9 w-9 flex-none items-center justify-center rounded-[10px] text-[14px] font-extrabold text-white ${
              i < 2 ? "bg-ink" : "bg-accent"
            }`}
          >
            {i + 1}
          </span>
          <div className="flex flex-col gap-1">
            <h3 className="text-[18px] font-bold">{item.title}</h3>
            <p className="text-[15px] leading-[1.65] text-gray-7">
              {item.desc}
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}
