import type { ReactNode } from "react"
import { Link } from "react-router-dom"

type CtaLinkProps = {
  /** In-site path ("/brand") or an absolute/hash URL. */
  to: string
  className?: string
  children: ReactNode
}

/** A link styled as a button: router <Link> for in-site paths, <a> otherwise. */
export function CtaLink({ to, className = "", children }: CtaLinkProps) {
  const classes = `no-underline ${className}`
  if (to.startsWith("/")) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }
  return (
    <a href={to} className={classes}>
      {children}
    </a>
  )
}
