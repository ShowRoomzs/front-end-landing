import type { ReactNode } from "react"

export type ConsoleTone = "partner" | "studio"

// The partner-center mock uses its own cool grays; the studio mock reuses
// the site's Open Color grays (both as in the design).
export const CONSOLE_COLORS = {
  partner: {
    line: "#E4E5E9",
    bar: "#F1F2F4",
    dot: "#C7C9D1",
    muted: "#7B7F89",
    body: "#3A3D45",
    rowLine: "#F1F2F4",
  },
  studio: {
    line: "#E9ECEF",
    bar: "#F1F3F5",
    dot: "#CED4DA",
    muted: "#868E96",
    body: "#343A40",
    rowLine: "#F1F3F5",
  },
} as const

/** Desktop app window chrome (traffic lights + title) around a mock screen. */
export function ConsoleWindow({
  tone,
  title,
  children,
}: {
  tone: ConsoleTone
  title: string
  children: ReactNode
}) {
  const c = CONSOLE_COLORS[tone]
  return (
    <div
      className="overflow-hidden rounded-2xl border bg-white shadow-window"
      style={{ borderColor: c.line }}
    >
      <div
        className="flex h-9 items-center gap-1.5 border-b px-3.5"
        style={{ background: c.bar, borderColor: c.line }}
      >
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: c.dot }}
          />
        ))}
        <span className="ml-3 text-[12px]" style={{ color: c.muted }}>
          {title}
        </span>
      </div>
      {children}
    </div>
  )
}

/** Filter tabs row: 「전체 4 · 준비중 1 · …」 with the first one selected. */
export function ConsoleTabs({ tone }: { tone: ConsoleTone }) {
  const c = CONSOLE_COLORS[tone]
  const tabs = ["전체 4", "준비중 1", "준비완료 1", "진행중 1", "종료·정산 1"]
  return (
    <div
      className="flex gap-4 overflow-hidden border-b text-[12px] whitespace-nowrap"
      style={{ borderColor: c.line, color: c.muted }}
    >
      {tabs.map((tab, i) => (
        <span
          key={tab}
          className={
            i === 0 ? "border-b-2 border-ink pb-2 font-bold text-ink" : "pb-2"
          }
        >
          {tab}
        </span>
      ))}
    </div>
  )
}

const STATUS = {
  live: "bg-[#E4F1EA] text-[#1F7A54]",
  liveStudio: "bg-success-bg text-success",
  ready: "bg-info-bg text-info",
  prep: "bg-console-bg text-console-text-2",
  prepStudio: "bg-gray-1 text-gray-7",
} as const

/** Status chip in a console table row. */
export function ConsoleStatus({
  kind,
  children,
}: {
  kind: keyof typeof STATUS
  children: ReactNode
}) {
  return (
    <span
      className={`justify-self-start rounded-md px-[7px] py-[3px] text-[11px] font-bold whitespace-nowrap ${STATUS[kind]}`}
    >
      {children}
    </span>
  )
}
