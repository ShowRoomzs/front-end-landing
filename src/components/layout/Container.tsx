import type { ReactNode } from "react"

/**
 * Centered content column: max 1200px of content plus 24px gutters
 * (content-box, as in the design). `narrow` is the 880px FAQ/CTA column.
 */
export function Container({
  as: Tag = "div",
  narrow = false,
  className = "",
  id,
  children,
}: {
  as?: "div" | "section"
  narrow?: boolean
  className?: string
  id?: string
  children: ReactNode
}) {
  return (
    <Tag
      id={id}
      className={`mx-auto px-6 ${narrow ? "max-w-[880px]" : "max-w-[1200px]"} ${className}`}
    >
      {children}
    </Tag>
  )
}
