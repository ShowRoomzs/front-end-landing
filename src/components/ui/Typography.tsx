import type { ReactNode } from "react"

/** Pink pill above a hero headline. */
export function HeroBadge({ children }: { children: ReactNode }) {
  return (
    <p className="self-start rounded-full bg-accent-soft px-3 py-1.5 text-[14px] font-bold text-accent-text">
      {children}
    </p>
  )
}

/** Small accent label above a section title. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-[15px] font-bold text-accent-text">{children}</p>
}

/** Section headline used across the pages (clamp 30–44px, black weight). */
export function SectionTitle({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <h2
      className={`text-[clamp(30px,3.6vw,44px)] leading-[1.3] font-black tracking-[-0.03em] ${className}`}
    >
      {children}
    </h2>
  )
}

/** Line break that only applies in the mobile layout (≤720px). */
export function MobileBreak() {
  return <br className="pc:hidden" />
}
