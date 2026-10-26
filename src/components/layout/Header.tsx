import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { ROUTES } from "@/config/links"

/** Sticky top bar: SHOWROOMZ wordmark on the left, `children` on the right. */
export function Header({ children }: { children: ReactNode }) {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-2 bg-[rgba(255,255,255,0.94)]">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-6">
        <Link
          to={ROUTES.home}
          className="font-logo text-[24px] font-semibold tracking-[0.01em] text-ink no-underline"
        >
          SHOWROOMZ
        </Link>
        {children}
      </div>
    </header>
  )
}
