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

/**
 * 문의하기 — PC는 가운데 520px 모달, 모바일은 하단 바텀시트(버튼 영역 고정).
 * 필수 미입력 · 형식 오류 · 미동의면 버튼만 회색으로 막고, 오류 문구는 이메일 · 연락처 형식만 칸을 벗어날 때 띄운다.
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
  const [sentTo, setSentTo] = useState("")

  const sending = status === "sending"
  const active = isInquiryReady(fields) && !sending

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

  return (
    <LeadModal
      titleId="inquiry-title"
      title="문의하기"
      description="남겨주신 내용은 영업일 기준 3일 안에 이메일로 답변드릴게요."
      widthClass="max-w-[520px]"
      busy={sending}
      onClose={onClose}
    >
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
            onClick={onClose}
            className="mt-6 min-h-[54px] w-full cursor-pointer rounded-xl bg-ink text-[16px] font-bold text-white"
          >
            닫기
          </button>
        </div>
      ) : (
        <>
          <div className="flex min-h-0 flex-[1_1_auto] flex-col gap-[18px] overflow-y-auto px-6 pt-1 pb-2">
            <LeadField id="inquiry-brand" label="브랜드명 / 인플루언서 활동명">
              <input
                id="inquiry-brand"
                name="brand"
                className={`${LEAD_INPUT} ${LEAD_INPUT_OK} h-12`}
                placeholder="예) 퓨어블리, 지유의 데일리 라이프"
                autoComplete="organization"
                maxLength={100}
                value={fields.brand}
                onChange={e => update("brand", e.target.value)}
              />
            </LeadField>
            <LeadField id="inquiry-name" label="이름(담당자명)">
              <input
                id="inquiry-name"
                name="name"
                className={`${LEAD_INPUT} ${LEAD_INPUT_OK} h-12`}
                placeholder="이름을 입력해 주세요"
                autoComplete="name"
                maxLength={50}
                value={fields.name}
                onChange={e => update("name", e.target.value)}
              />
            </LeadField>
            <LeadField id="inquiry-email" label="이메일(업무용)">
              <input
                id="inquiry-email"
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
            <LeadField id="inquiry-phone" label="연락처">
              <input
                id="inquiry-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                className={`${LEAD_INPUT} ${phoneError ? LEAD_INPUT_ERR : LEAD_INPUT_OK} h-12`}
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
                <div role="alert" className={LEAD_FIELD_ERROR}>
                  연락처 형식을 확인해 주세요.
                </div>
              )}
            </LeadField>
            <LeadField
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
                className={`${LEAD_INPUT} ${LEAD_INPUT_OK} h-12`}
                placeholder="생각해 둔 대상이 있다면 적어주세요"
                maxLength={200}
                value={fields.partner}
                onChange={e => update("partner", e.target.value)}
              />
            </LeadField>
            <LeadField id="inquiry-message" label="문의 내용">
              <textarea
                id="inquiry-message"
                name="message"
                className={`${LEAD_INPUT} ${LEAD_INPUT_OK} h-[132px] resize-y py-3 leading-[1.6]`}
                placeholder="궁금한 점을 자유롭게 적어주세요"
                maxLength={1000}
                value={fields.message}
                onChange={e => update("message", e.target.value)}
              />
              <div className="mt-1.5 text-right text-[12px] text-gray-6">
                최대 1,000자
              </div>
            </LeadField>
            <HoneypotField
              id="inquiry-website"
              value={fields.website}
              onChange={value => update("website", value)}
            />
            <ConsentBox
              checked={fields.agree}
              onChange={checked => update("agree", checked)}
              details={
                <>
                  <div>
                    <b className="text-ink">수집 항목</b> 브랜드명 또는
                    인플루언서 활동명, 이름, 이메일, 연락처, 문의 내용, 공동구매
                    희망 대상(선택)
                  </div>
                  <div>
                    <b className="text-ink">이용 목적</b> 문의 확인 및 답변
                  </div>
                  <div>
                    <b className="text-ink">보유 기간</b> 문의 처리 완료 후 1년
                  </div>
                  <div className="mt-1.5">
                    동의를 거부할 수 있으며, 거부하면 문의 접수가 어렵습니다.
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
                ? "보내는 중…"
                : status === "error"
                  ? "다시 보내기"
                  : "문의 보내기"
            }
            error={
              status === "error" && (
                <>
                  전송하지 못했어요. 잠시 후 다시 보내거나{" "}
                  <a
                    href={`mailto:${INQUIRY_MAIL}`}
                    className="font-bold text-danger-text underline"
                  >
                    {INQUIRY_MAIL}
                  </a>
                  로 보내주세요.
                </>
              )
            }
            onSubmit={submit}
          />
        </>
      )}
    </LeadModal>
  )
}
