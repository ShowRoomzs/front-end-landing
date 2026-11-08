import { useState } from "react"
import {
  ConsentBox,
  HoneypotField,
  LEAD_FIELD_ERROR,
  LEAD_INPUT,
  LEAD_INPUT_ERR,
  LEAD_INPUT_OK,
  LeadField,
  LeadModal,
  SubmitBar,
} from "@/features/lead/LeadModal"
import { isEmailValid, type InquiryPage } from "@/features/inquiry/inquiry"
import {
  DECKS,
  EMPTY_DECK,
  downloadDeck,
  requestDeck,
  type DeckAudience,
  type DeckFields,
} from "@/features/deck/deck"

type Status = "form" | "sending" | "error" | "done"

/**
 * 소개서 받기 — PC는 가운데 480px 모달, 모바일은 하단 바텀시트.
 * 이름(브랜드명/활동명) · 이메일 · 동의가 다 맞아야 버튼이 켜진다. 접수되면 PDF를 바로 내려받고,
 * 완료 화면에 [소개서 다운로드]와 [궁금한 점이 있다면 문의하기](문의 모달로 전환)를 둔다.
 */
export function DeckModal({
  page,
  audience,
  onClose,
  onContact,
}: {
  page: InquiryPage
  audience: DeckAudience
  onClose: () => void
  onContact: () => void
}) {
  const deck = DECKS[audience]
  const [fields, setFields] = useState<DeckFields>(EMPTY_DECK)
  const [status, setStatus] = useState<Status>("form")
  const [emailError, setEmailError] = useState(false)

  const sending = status === "sending"
  const ready =
    !!fields.org.trim() && isEmailValid(fields.email) && fields.agree
  const active = ready && !sending

  const update = <K extends keyof DeckFields>(key: K, value: DeckFields[K]) => {
    setFields(prev => ({ ...prev, [key]: value }))
    if (key === "email" && emailError && isEmailValid(value as string)) {
      setEmailError(false)
    }
  }

  const finish = () => {
    setStatus("done")
    downloadDeck(audience)
  }

  const submit = () => {
    if (!active) {
      return
    }
    if (fields.website) {
      finish()
      return
    }
    setStatus("sending")
    requestDeck(page, audience, fields)
      .then(finish)
      .catch(() => setStatus("error"))
  }

  return (
    <LeadModal
      titleId="deck-title"
      title={deck.title}
      description={deck.sub}
      badge={deck.badge}
      widthClass="max-w-[480px]"
      busy={sending}
      onClose={onClose}
    >
      {status === "done" ? (
        <div
          role="status"
          className="flex flex-col items-center px-6 pt-2 pb-[calc(28px+env(safe-area-inset-bottom))] text-center"
        >
          <div className="flex size-16 items-center justify-center rounded-full bg-accent-soft text-accent">
            <DownloadIcon size={28} strokeWidth={2.2} />
          </div>
          <div className="mt-[18px] text-[20px] font-bold tracking-[-0.3px]">
            소개서가 준비됐어요
          </div>
          <p className="mt-2 text-[15px] leading-[1.7] text-gray-7">
            다운로드가 시작되지 않으면 아래 버튼을 눌러주세요.
          </p>
          <a
            href={deck.file}
            download={deck.fileName}
            className="mt-6 box-border flex min-h-[54px] w-full items-center justify-center rounded-xl bg-ink text-[16px] font-bold text-white no-underline"
          >
            소개서 다운로드 (PDF)
          </a>
          <button
            type="button"
            onClick={onContact}
            className="mt-3.5 min-h-11 cursor-pointer px-2 text-[14px] font-semibold text-gray-7 underline"
          >
            궁금한 점이 있다면 문의하기
          </button>
        </div>
      ) : (
        <>
          <div className="flex min-h-0 flex-[1_1_auto] flex-col gap-[18px] overflow-y-auto px-6 pt-1 pb-2">
            <LeadField id="deck-org" label={deck.orgLabel}>
              <input
                id="deck-org"
                name="org"
                className={`${LEAD_INPUT} ${LEAD_INPUT_OK} h-12`}
                placeholder={deck.orgPlaceholder}
                autoComplete="organization"
                maxLength={100}
                value={fields.org}
                onChange={e => update("org", e.target.value)}
              />
            </LeadField>
            <LeadField id="deck-email" label={deck.emailLabel}>
              <input
                id="deck-email"
                name="email"
                type="email"
                inputMode="email"
                className={`${LEAD_INPUT} ${emailError ? LEAD_INPUT_ERR : LEAD_INPUT_OK} h-12`}
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
                <div role="alert" className={LEAD_FIELD_ERROR}>
                  이메일 형식을 확인해 주세요.
                </div>
              )}
            </LeadField>
            <HoneypotField
              id="deck-website"
              value={fields.website}
              onChange={value => update("website", value)}
            />
            <ConsentBox
              checked={fields.agree}
              onChange={checked => update("agree", checked)}
              details={
                <>
                  <div>
                    <b className="text-ink">수집 항목</b> {deck.orgLabel},
                    이메일
                  </div>
                  <div>
                    <b className="text-ink">이용 목적</b> 서비스 소개서 제공
                  </div>
                  <div>
                    <b className="text-ink">보유 기간</b> 수집일로부터 1년
                  </div>
                  <div className="mt-1.5">
                    동의를 거부할 수 있으며, 거부하면 소개서를 받을 수 없습니다.
                  </div>
                </>
              }
            />
          </div>

          <SubmitBar
            active={active}
            sending={sending}
            label={
              sending
                ? "준비하는 중…"
                : status === "error"
                  ? "다시 시도하기"
                  : "소개서 받기"
            }
            error={
              status === "error" &&
              "요청을 보내지 못했어요. 잠시 후 다시 시도해 주세요."
            }
            onSubmit={submit}
          />
        </>
      )}
    </LeadModal>
  )
}

export function DownloadIcon({
  size = 18,
  strokeWidth = 2,
}: {
  size?: number
  strokeWidth?: number
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 4v11" />
      <path d="M7 10.5l5 5 5-5" />
      <path d="M5 19.5h14" />
    </svg>
  )
}
