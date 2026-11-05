import { useEffect, useRef, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"
import {
  EMPTY_INQUIRY,
  INQUIRY_MAIL,
  isEmailValid,
  isInquiryReady,
  isPhoneValid,
  sendInquiry,
  type InquiryFields,
  type InquiryPage,
} from "@/features/inquiry/inquiry"

type Status = "form" | "sending" | "error" | "done"

const LABEL = "mb-2 block text-[14px] font-semibold text-ink"
const INPUT =
  "box-border w-full rounded-[10px] border bg-white px-3.5 text-[16px] text-ink outline-none placeholder:text-gray-5"
const INPUT_OK = "border-gray-3 focus:border-ink"
const INPUT_ERR = "border-danger"
const FIELD_ERROR = "mt-1.5 text-[13px] text-danger"

/**
 * 문의하기 — PC는 가운데 520px 모달, 모바일(≤720px)은 하단 바텀시트(최대 92dvh · 버튼 영역 고정).
 * 필수 미입력 · 형식 오류 · 미동의면 버튼만 회색으로 막고, 오류 문구는 이메일 · 연락처 형식만 칸을 벗어날 때 띄운다.
 * 닫으면(X · 배경 · ESC) 이 컴포넌트가 내려가 입력값이 초기화된다. 보내는 중에는 닫히지 않는다.
 */
export function InquiryModal({
  page,
  onClose,
}: {
  page: InquiryPage
  onClose: () => void
}) {
  const [fields, setFields] = useState<InquiryFields>(EMPTY_INQUIRY)
  const [status, setStatus] = useState<Status>("form")
  const [emailError, setEmailError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [sentTo, setSentTo] = useState("")
  const panelRef = useRef<HTMLDivElement>(null)
  const pressedOnBackdrop = useRef(false)

  const sending = status === "sending"
  const ready = isInquiryReady(fields)
  const active = ready && !sending

  const close = () => {
    if (!sending) {
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
      if (e.key === "Escape" && !sending) {
        onClose()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [sending, onClose])

  const update = <K extends keyof InquiryFields>(
    key: K,
    value: InquiryFields[K]
  ) => {
    setFields(prev => ({ ...prev, [key]: value }))
    if (key === "email" && emailError && isEmailValid(value as string)) {
      setEmailError(false)
    }
    if (key === "phone" && phoneError && isPhoneValid(value as string)) {
      setPhoneError(false)
    }
  }

  const submit = () => {
    if (!active) {
      return
    }
    const email = fields.email.trim()
    if (fields.website) {
      setSentTo(email)
      setStatus("done")
      return
    }
    setStatus("sending")
    sendInquiry(page, fields)
      .then(() => {
        setSentTo(email)
        setStatus("done")
      })
      .catch(() => setStatus("error"))
  }

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
        aria-labelledby="inquiry-title"
        tabIndex={-1}
        className="relative flex max-h-[calc(100vh-48px)] w-full max-w-[520px] flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_24px_64px_rgba(26,27,31,0.24)] outline-none max-pc:max-h-[92dvh] max-pc:max-w-none max-pc:rounded-b-none"
      >
        <div className="flex flex-none items-start gap-3 px-6 pt-6 pb-4">
          <div className="min-w-0 flex-1">
            <h2
              id="inquiry-title"
              className="text-[22px] font-bold tracking-[-0.4px]"
            >
              문의하기
            </h2>
            <p className="mt-1.5 text-[14px] leading-[1.6] text-gray-7">
              남겨주신 내용은 영업일 기준 3일 안에 이메일로 답변드릴게요.
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

        {status === "done" ? (
          <div
            role="status"
            className="flex flex-col items-center px-6 pt-6 pb-[calc(28px+env(safe-area-inset-bottom))] text-center"
          >
            <div className="flex size-16 items-center justify-center rounded-full bg-accent-soft text-accent">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </div>
            <div className="mt-[18px] text-[20px] font-bold tracking-[-0.3px]">
              문의가 접수됐어요
            </div>
            <p className="mt-2 text-[15px] leading-[1.7] text-gray-7">
              영업일 기준 3일 안에
              <br />
              <b className="break-all text-ink">{sentTo}</b>로 답변드릴게요.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-6 min-h-[54px] w-full cursor-pointer rounded-xl bg-ink text-[16px] font-bold text-white"
            >
              닫기
            </button>
          </div>
        ) : (
          <>
            <div className="flex min-h-0 flex-[1_1_auto] flex-col gap-[18px] overflow-y-auto px-6 pt-1 pb-2">
              <Field id="inquiry-brand" label="브랜드명 / 인플루언서 활동명">
                <input
                  id="inquiry-brand"
                  name="brand"
                  className={`${INPUT} ${INPUT_OK} h-12`}
                  placeholder="예) 퓨어블리, 지유의 데일리 라이프"
                  autoComplete="organization"
                  maxLength={100}
                  value={fields.brand}
                  onChange={e => update("brand", e.target.value)}
                />
              </Field>
              <Field id="inquiry-name" label="이름(담당자명)">
                <input
                  id="inquiry-name"
                  name="name"
                  className={`${INPUT} ${INPUT_OK} h-12`}
                  placeholder="이름을 입력해 주세요"
                  autoComplete="name"
                  maxLength={50}
                  value={fields.name}
                  onChange={e => update("name", e.target.value)}
                />
              </Field>
              <Field id="inquiry-email" label="이메일(업무용)">
                <input
                  id="inquiry-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  className={`${INPUT} ${emailError ? INPUT_ERR : INPUT_OK} h-12`}
                  placeholder="name@company.com"
                  autoComplete="email"
                  maxLength={120}
                  value={fields.email}
                  onChange={e => update("email", e.target.value)}
                  onBlur={e =>
                    setEmailError(
                      !!e.target.value.trim() && !isEmailValid(e.target.value)
                    )
                  }
                />
                {emailError && (
                  <div role="alert" className={FIELD_ERROR}>
                    이메일 형식을 확인해 주세요.
                  </div>
                )}
              </Field>
              <Field id="inquiry-phone" label="연락처">
                <input
                  id="inquiry-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  className={`${INPUT} ${phoneError ? INPUT_ERR : INPUT_OK} h-12`}
                  placeholder="010-0000-0000"
                  autoComplete="tel"
                  maxLength={20}
                  value={fields.phone}
                  onChange={e => update("phone", e.target.value)}
                  onBlur={e =>
                    setPhoneError(
                      !!e.target.value.trim() && !isPhoneValid(e.target.value)
                    )
                  }
                />
                {phoneError && (
                  <div role="alert" className={FIELD_ERROR}>
                    연락처 형식을 확인해 주세요.
                  </div>
                )}
              </Field>
              <Field
                id="inquiry-partner"
                label={
                  <>
                    공동구매를 진행할 브랜드/인플루언서{" "}
                    <span className="font-medium text-gray-6">(선택)</span>
                  </>
                }
              >
                <input
                  id="inquiry-partner"
                  name="partner"
                  className={`${INPUT} ${INPUT_OK} h-12`}
                  placeholder="생각해 둔 대상이 있다면 적어주세요"
                  maxLength={200}
                  value={fields.partner}
                  onChange={e => update("partner", e.target.value)}
                />
              </Field>
              <Field id="inquiry-message" label="문의 내용">
                <textarea
                  id="inquiry-message"
                  name="message"
                  className={`${INPUT} ${INPUT_OK} h-[132px] resize-y py-3 leading-[1.6]`}
                  placeholder="궁금한 점을 자유롭게 적어주세요"
                  maxLength={1000}
                  value={fields.message}
                  onChange={e => update("message", e.target.value)}
                />
                <div className="mt-1.5 text-right text-[12px] text-gray-6">
                  최대 1,000자
                </div>
              </Field>
              <div
                aria-hidden="true"
                className="absolute -left-[9999px] h-px w-px overflow-hidden"
              >
                <label htmlFor="inquiry-website">웹사이트</label>
                <input
                  id="inquiry-website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={fields.website}
                  onChange={e => update("website", e.target.value)}
                />
              </div>
              <div className="rounded-xl border border-gray-2 py-1 pr-1 pl-3">
                <div className="flex items-center gap-2">
                  <label className="flex min-h-11 min-w-0 flex-1 cursor-pointer items-center gap-2.5 text-[14px] font-semibold">
                    <input
                      type="checkbox"
                      name="agree"
                      checked={fields.agree}
                      onChange={e => update("agree", e.target.checked)}
                      className="m-0 size-5 flex-none accent-accent"
                    />
                    <span>[필수] 개인정보 수집·이용 동의</span>
                  </label>
                  <button
                    type="button"
                    aria-expanded={privacyOpen}
                    onClick={() => setPrivacyOpen(v => !v)}
                    className="min-h-11 flex-none cursor-pointer px-2.5 text-[13px] font-semibold text-gray-7 underline"
                  >
                    {privacyOpen ? "접기" : "보기"}
                  </button>
                </div>
                {privacyOpen && (
                  <div className="mr-2 mb-2.5 rounded-lg bg-gray-0 px-3.5 py-3 text-[13px] leading-[1.7] text-gray-7">
                    <div>
                      <b className="text-ink">수집 항목</b> 브랜드명 또는
                      인플루언서 활동명, 이름, 이메일, 연락처, 문의 내용,
                      공동구매 희망 대상(선택)
                    </div>
                    <div>
                      <b className="text-ink">이용 목적</b> 문의 확인 및 답변
                    </div>
                    <div>
                      <b className="text-ink">보유 기간</b> 문의 처리 완료 후
                      1년
                    </div>
                    <div className="mt-1.5">
                      동의를 거부할 수 있으며, 거부하면 문의 접수가 어렵습니다.
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-none border-t border-gray-1 bg-white px-6 pt-3 pb-[calc(20px+env(safe-area-inset-bottom))]">
              {status === "error" && (
                <div
                  role="alert"
                  className="mb-3 rounded-[10px] bg-danger-bg px-3.5 py-3 text-[13px] leading-[1.6] text-danger-text"
                >
                  전송하지 못했어요. 잠시 후 다시 보내거나{" "}
                  <a
                    href={`mailto:${INQUIRY_MAIL}`}
                    className="font-bold text-danger-text underline"
                  >
                    {INQUIRY_MAIL}
                  </a>
                  로 보내주세요.
                </div>
              )}
              <button
                type="button"
                aria-disabled={!active}
                onClick={submit}
                className={`flex min-h-[54px] w-full items-center justify-center gap-2 rounded-xl text-[16px] font-bold ${
                  active || sending
                    ? "bg-accent text-white"
                    : "bg-gray-2 text-gray-5"
                } ${active ? "cursor-pointer" : "cursor-default"}`}
              >
                {sending && (
                  <span
                    aria-hidden="true"
                    className="size-4 animate-[spin_0.8s_linear_infinite] rounded-full border-2 border-white/50 border-t-white"
                  />
                )}
                <span>
                  {sending
                    ? "보내는 중…"
                    : status === "error"
                      ? "다시 보내기"
                      : "문의 보내기"}
                </span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  )
}

function Field({
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
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
      {children}
    </div>
  )
}
