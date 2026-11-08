import { useEffect, useRef, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"

/** 문의하기 · 소개서 받기가 같이 쓰는 입력칸 모양 */
export const LEAD_INPUT =
  "box-border w-full rounded-[10px] border bg-white px-3.5 text-[16px] text-ink outline-none placeholder:text-gray-5"
export const LEAD_INPUT_OK = "border-gray-3 focus:border-ink"
export const LEAD_INPUT_ERR = "border-danger"
export const LEAD_FIELD_ERROR = "mt-1.5 text-[13px] text-danger"

/**
 * 랜딩 모달 틀 — PC는 가운데 모달, 모바일(≤720px)은 하단 바텀시트(최대 92dvh).
 * 닫기는 X · 배경 · ESC. `busy`(보내는 중)인 동안은 닫히지 않는다.
 * 닫으면 부모가 이 컴포넌트를 내려 입력값이 초기화된다.
 */
export function LeadModal({
  titleId,
  title,
  description,
  badge,
  widthClass,
  busy,
  onClose,
  children,
}: {
  titleId: string
  title: string
  description: string
  /** 제목 위 로즈 칩(소개서 받기) */
  badge?: string
  /** PC 모달 최대 폭 — 문의하기 520 · 소개서 480 */
  widthClass: string
  busy: boolean
  onClose: () => void
  children: ReactNode
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const pressedOnBackdrop = useRef(false)

  const close = () => {
    if (!busy) {
      onClose()
    }
  }

  // 열린 동안 뒤 페이지 스크롤을 막는다
  useEffect(() => {
    panelRef.current?.focus()
    const { overflow } = document.body.style
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = overflow
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !busy) {
        onClose()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [busy, onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-[60] box-border flex items-center justify-center bg-[rgba(26,27,31,0.5)] p-6 text-ink [word-break:keep-all] max-pc:items-end max-pc:p-0"
      // 배경을 누르고 배경에서 뗐을 때만 닫는다 — click은 누른 곳과 뗀 곳의 공통 조상에서 나므로,
      // 입력칸에서 드래그(글자 선택 등)를 시작해 배경에서 떼도 target이 배경이 되어 닫혀 버렸다
      onPointerDown={e => {
        pressedOnBackdrop.current = e.target === e.currentTarget
      }}
      onClick={e => {
        if (pressedOnBackdrop.current && e.target === e.currentTarget) {
          close()
        }
        pressedOnBackdrop.current = false
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`relative flex max-h-[calc(100vh-48px)] w-full flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_24px_64px_rgba(26,27,31,0.24)] outline-none max-pc:max-h-[92dvh] max-pc:max-w-none max-pc:rounded-b-none ${widthClass}`}
      >
        <div className="flex flex-none items-start gap-3 px-6 pt-6 pb-4">
          <div className="min-w-0 flex-1">
            {badge && (
              <p className="mb-2 inline-block rounded-full bg-accent-soft px-2.5 py-1 text-[12px] font-bold text-accent-text">
                {badge}
              </p>
            )}
            <h2
              id={titleId}
              className="text-[22px] font-bold tracking-[-0.4px]"
            >
              {title}
            </h2>
            <p className="mt-1.5 text-[14px] leading-[1.6] text-gray-7">
              {description}
            </p>
          </div>
          <button
            type="button"
            aria-label="닫기"
            onClick={close}
            className="-mt-2 -mr-2.5 flex size-11 flex-none cursor-pointer items-center justify-center rounded-full text-gray-7"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  )
}

export function LeadField({
  id,
  label,
  children,
}: {
  id: string
  label: ReactNode
  children: ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[14px] font-semibold text-ink"
      >
        {label}
      </label>
      {children}
    </div>
  )
}

/** 스팸 방지 숨김 칸 — 사람은 못 보고 봇만 채운다. 값이 있으면 보내지 않는다 */
export function HoneypotField({
  id,
  value,
  onChange,
}: {
  id: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div
      aria-hidden="true"
      className="absolute -left-[9999px] h-px w-px overflow-hidden"
    >
      <label htmlFor={id}>웹사이트</label>
      <input
        id={id}
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}

/** [필수] 개인정보 수집·이용 동의 — [보기]로 수집 항목 · 목적 · 보유 기간을 펼친다 */
export function ConsentBox({
  checked,
  onChange,
  details,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  details: ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-xl border border-gray-2 py-1 pr-1 pl-3">
      <div className="flex items-center gap-2">
        <label className="flex min-h-11 min-w-0 flex-1 cursor-pointer items-center gap-2.5 text-[14px] font-semibold">
          <input
            type="checkbox"
            name="agree"
            checked={checked}
            onChange={e => onChange(e.target.checked)}
            className="m-0 size-5 flex-none accent-accent"
          />
          <span>[필수] 개인정보 수집·이용 동의</span>
        </label>
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
          className="min-h-11 flex-none cursor-pointer px-2.5 text-[13px] font-semibold text-gray-7 underline"
        >
          {open ? "접기" : "보기"}
        </button>
      </div>
      {open && (
        <div className="mr-2 mb-2.5 rounded-lg bg-gray-0 px-3.5 py-3 text-[13px] leading-[1.7] text-gray-7">
          {details}
        </div>
      )}
    </div>
  )
}

/** 하단 고정 버튼 영역 — 실패 안내 + 보내기 버튼(준비 전엔 회색, 보내는 중엔 스피너) */
export function SubmitBar({
  active,
  sending,
  label,
  error,
  onSubmit,
}: {
  active: boolean
  sending: boolean
  label: string
  error?: ReactNode
  onSubmit: () => void
}) {
  return (
    <div className="flex-none border-t border-gray-1 bg-white px-6 pt-3 pb-[calc(20px+env(safe-area-inset-bottom))]">
      {error && (
        <div
          role="alert"
          className="mb-3 rounded-[10px] bg-danger-bg px-3.5 py-3 text-[13px] leading-[1.6] text-danger-text"
        >
          {error}
        </div>
      )}
      <button
        type="button"
        aria-disabled={!active}
        onClick={onSubmit}
        className={`flex min-h-[54px] w-full items-center justify-center gap-2 rounded-xl text-[16px] font-bold ${
          active || sending ? "bg-accent text-white" : "bg-gray-2 text-gray-5"
        } ${active ? "cursor-pointer" : "cursor-default"}`}
      >
        {sending && (
          <span
            aria-hidden="true"
            className="size-4 animate-[spin_0.8s_linear_infinite] rounded-full border-2 border-white/50 border-t-white"
          />
        )}
        <span>{label}</span>
      </button>
    </div>
  )
}
