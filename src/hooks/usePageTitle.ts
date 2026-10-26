import { useEffect } from "react"

/** Sets document.title for the current route. */
export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title
  }, [title])
}
