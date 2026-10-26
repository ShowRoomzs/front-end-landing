// Building blocks of the 「화면 예시」 cards (fictional product screens).
import type { ReactNode } from "react"

/** White rounded card with the soft drop shadow used by most examples. */
export function ExampleCard({
  className = "",
  row = false,
  borderClass = "border-gray-2",
  children,
}: {
  className?: string
  /** Lay children out horizontally instead of stacked. */
  row?: boolean
  borderClass?: string
  children: ReactNode
}) {
  return (
    <div
      className={`box-border flex rounded-[20px] border bg-white shadow-card ${
        row ? "flex-row" : "flex-col"
      } ${borderClass} ${className}`}
    >
      {children}
    </div>
  )
}

const CHIP_TONES = {
  info: "bg-info-bg text-info",
  success: "bg-success-bg text-success",
  accent: "bg-accent text-white",
  soft: "bg-accent-soft text-accent-text",
} as const

/** Status label such as 「협의 중」, 「체결 완료」, 「지급 예정」. */
export function Chip({
  tone,
  className = "",
  children,
}: {
  tone: keyof typeof CHIP_TONES
  className?: string
  children: ReactNode
}) {
  return (
    <span className={`rounded-md ${CHIP_TONES[tone]} ${className}`}>
      {children}
    </span>
  )
}

/** 「화면 예시 · 가상 데이터」 note under or inside an example. */
export function DemoNote({ className = "" }: { className?: string }) {
  return (
    <span className={`text-[10.5px] text-gray-5 ${className}`}>
      화면 예시 · 가상 데이터
    </span>
  )
}

/** Small swatch + label row used in legends and status lists. */
export function Dot({
  color,
  className = "",
}: {
  color: string
  className?: string
}) {
  return (
    <span
      className={`h-2 w-2 flex-none rounded-full ${className}`}
      style={{ background: color }}
    />
  )
}

/** Horizontal stacked bar from flex weights, e.g. [[87, "#1A1B1F"], …]. */
export function StackedBar({
  parts,
  className,
}: {
  parts: [number, string][]
  className: string
}) {
  return (
    <div className={`flex overflow-hidden ${className}`}>
      {parts.map(([flex, color], i) => (
        <span key={i} style={{ flex, background: color }} />
      ))}
    </div>
  )
}

/** Mini KPI tile: label over value. */
export function StatTile({
  label,
  value,
  highlight = false,
  className = "",
  valueClassName = "",
}: {
  label: string
  value: string
  highlight?: boolean
  className?: string
  valueClassName?: string
}) {
  return (
    <div
      className={`flex flex-col gap-[3px] rounded-[10px] px-2.5 py-2 ${
        highlight ? "bg-accent-soft" : "bg-gray-0"
      } ${className}`}
    >
      <span
        className={`text-[10.5px] ${highlight ? "text-accent-text" : "text-gray-6"}`}
      >
        {label}
      </span>
      <span
        className={`text-[13px] font-extrabold whitespace-nowrap ${
          highlight ? "text-accent-text" : "text-ink"
        } ${valueClassName}`}
      >
        {value}
      </span>
    </div>
  )
}

/** Labelled progress row: 「20대 ▇▇▇ 44%」. */
export function BarRow({
  label,
  percent,
  value,
  color = "#1A1B1F",
  labelWidth,
  valueWidth,
  className,
  trackColor = "#F1F3F5",
}: {
  label: string
  percent: string
  value: string
  color?: string
  labelWidth: string
  valueWidth: string
  className: string
  trackColor?: string
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span style={{ width: labelWidth }}>{label}</span>
      <span
        className="flex h-2 flex-1 overflow-hidden rounded"
        style={{ background: trackColor }}
      >
        <span style={{ width: percent, background: color }} />
      </span>
      <span className="text-right" style={{ width: valueWidth }}>
        {value}
      </span>
    </div>
  )
}

/** Legend entry for a stacked bar. */
export function LegendItem({
  color,
  children,
}: {
  color: string
  children: ReactNode
}) {
  return (
    <span className="flex items-center gap-[5px]">
      <span className="h-2 w-2 rounded-[2px]" style={{ background: color }} />
      {children}
    </span>
  )
}

/** 「브랜드 서명 ✓ · 인플루언서 서명 ✓」 row of the contract examples. */
export function SignatureRow() {
  return (
    <div className="flex gap-2">
      <span className="flex-1 rounded-lg bg-gray-0 p-2 text-center text-[12px] font-semibold">
        브랜드 서명 ✓
      </span>
      <span className="flex-1 rounded-lg bg-gray-0 p-2 text-center text-[12px] font-semibold">
        인플루언서 서명 ✓
      </span>
    </div>
  )
}
