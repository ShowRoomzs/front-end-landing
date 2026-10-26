import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
  type TouchEvent,
} from "react"

export type StepperStep = {
  title: string
  /** One line under the tab title. */
  desc: string
  /** Longer copy in the detail panel. */
  detail: string
  /** Marks steps that run automatically after the contract (「자동」 badge). */
  auto?: boolean
  /** The 「화면 예시」 card shown on the right of the detail panel. */
  example: ReactNode
}

type StepperProps = {
  ariaLabel: string
  steps: StepperStep[]
  /**
   * `compact` is the home page flow (6 narrower tabs with 「자동」 badges);
   * `regular` is the brand/influencer onboarding flow (5 tabs).
   */
  variant?: "compact" | "regular"
}

const SWIPE_THRESHOLD = 40

/**
 * Step tabs + detail panel from the design. Selection changes on tab click,
 * the prev/next buttons, arrow keys on the tabs, or a horizontal swipe on
 * the panel. The design has no auto-advance or transition, so neither does
 * this component.
 */
export function Stepper({
  ariaLabel,
  steps,
  variant = "regular",
}: StepperProps) {
  const [current, setCurrent] = useState(0)
  const tabListRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const touchX = useRef<number | null>(null)
  const interacted = useRef(false)
  const baseId = useId()
  const compact = variant === "compact"
  const step = steps[current]

  const go = (index: number, focusTab = false) => {
    const next = (index + steps.length) % steps.length
    interacted.current = true
    setCurrent(next)
    if (focusTab) tabRefs.current[next]?.focus()
  }

  // On narrow screens the tabs scroll sideways; keep the selected one in
  // view without moving the page vertically.
  useEffect(() => {
    if (!interacted.current) return
    const list = tabListRef.current
    const tab = tabRefs.current[current]
    if (!list || !tab) return
    const left = tab.offsetLeft - list.offsetLeft
    if (left < list.scrollLeft) {
      list.scrollTo({ left })
    } else if (left + tab.offsetWidth > list.scrollLeft + list.clientWidth) {
      list.scrollTo({ left: left + tab.offsetWidth - list.clientWidth })
    }
  }, [current])

  const onTabKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = {
      ArrowRight: current + 1,
      ArrowLeft: current - 1,
      Home: 0,
      End: steps.length - 1,
    }
    if (!(e.key in keys)) return
    e.preventDefault()
    go(keys[e.key], true)
  }

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null
  }
  const onTouchEnd = (e: TouchEvent) => {
    const end = e.changedTouches[0]?.clientX
    if (touchX.current == null || end == null) return
    const dx = end - touchX.current
    touchX.current = null
    if (dx < -SWIPE_THRESHOLD) go(current + 1)
    else if (dx > SWIPE_THRESHOLD) go(current - 1)
  }

  const label =
    `STEP ${current + 1}` + (compact && step.auto ? " · 계약 후 자동" : "")

  return (
    <>
      <div
        ref={tabListRef}
        role="tablist"
        aria-label={ariaLabel}
        onKeyDown={onTabKeyDown}
        className="flex gap-4 overflow-x-auto pb-1"
      >
        {steps.map((s, i) => {
          const selected = i === current
          return (
            <button
              key={s.title}
              ref={el => {
                tabRefs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => go(i)}
              className={`flex min-w-0 flex-col gap-2 border-t-[3px] bg-transparent pt-5 pb-2 text-left font-[inherit] text-ink ${
                compact ? "flex-[1_0_170px]" : "flex-[1_0_200px]"
              } ${selected ? "border-accent" : "border-gray-3"}`}
            >
              <span
                className={`flex items-center gap-1.5 text-[14px] font-bold ${
                  selected ? "text-accent-text" : "text-gray-6"
                }`}
              >
                STEP {i + 1}
                {compact && s.auto && (
                  <span className="rounded-md bg-accent-soft px-1.5 py-0.5 text-[11px] text-accent-text">
                    자동
                  </span>
                )}
              </span>
              <span
                className={`font-bold ${compact ? "text-[19px]" : "text-[20px]"} ${
                  selected ? "text-ink" : "text-gray-6"
                }`}
              >
                {s.title}
              </span>
              <span
                className={`text-gray-7 ${
                  compact
                    ? "text-[14px] leading-[1.65]"
                    : "text-[15px] leading-[1.7]"
                } ${selected ? "opacity-100" : "opacity-60"}`}
              >
                {s.desc}
              </span>
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${current}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="box-border flex flex-wrap items-center gap-10 rounded-3xl bg-gray-0 p-10"
      >
        <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-3.5">
          <div aria-live="polite" className="flex flex-col gap-3.5">
            <p className="text-[14px] font-bold text-accent-text">{label}</p>
            <h3 className="text-[28px] leading-[1.35] font-extrabold tracking-[-0.02em] whitespace-nowrap">
              {step.title}
            </h3>
            <p className="min-h-[82px] text-[16px] leading-[1.7] text-gray-7">
              {step.detail}
            </p>
          </div>
          <div className="flex items-center gap-3 pt-3">
            <ArrowButton
              label="이전 단계"
              path="M15 5l-7 7 7 7"
              onClick={() => go(current - 1)}
            />
            <ArrowButton
              label="다음 단계"
              path="M9 5l7 7-7 7"
              onClick={() => go(current + 1)}
            />
            <span className="text-[14px] text-gray-6">
              {current + 1} / {steps.length}
            </span>
          </div>
        </div>
        <div className="flex h-[380px] min-w-0 flex-[1_1_380px] items-center justify-center overflow-hidden">
          {step.example}
        </div>
      </div>
    </>
  )
}

function ArrowButton({
  label,
  path,
  onClick,
}: {
  label: string
  path: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-3 bg-white"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1A1B1F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={path} />
      </svg>
    </button>
  )
}
