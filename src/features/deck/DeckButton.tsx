import { useState } from "react"
import { DeckModal, DownloadIcon } from "@/features/deck/DeckModal"
import type { DeckAudience } from "@/features/deck/deck"
import { InquiryModal } from "@/features/inquiry/InquiryModal"
import type { InquiryPage } from "@/features/inquiry/inquiry"

const VARIANT = {
  /** 메인 「누구로 시작하시나요?」 카드 — 어두운 카드 위 밑줄 글자 */
  link: "min-h-11 self-start px-1 text-[15px] font-semibold text-gray-4 underline underline-offset-[3px] max-pc:self-center",
  /** 브랜드 · 인플루언서 히어로 — 신청 버튼 아래 회색 테두리 */
  outline:
    "flex min-h-[52px] max-w-[320px] items-center justify-center gap-2 rounded-xl border border-gray-3 bg-white text-[16px] font-bold text-ink max-pc:w-full",
  /** 하단 신청 섹션 — 검은 바탕 위 흰 테두리 */
  "outline-dark":
    "flex min-h-[52px] w-full max-w-[360px] items-center justify-center gap-2 rounded-xl border border-white/32 bg-transparent text-[16px] font-bold text-white",
} as const

/**
 * [브랜드 · 인플루언서 소개서 받기] + 모달. 완료 화면의 [문의하기]를 누르면
 * 같은 자리에서 문의 모달로 바꿔 연다(헤더 문의 버튼과 따로 상태를 갖는다).
 */
export function DeckButton({
  page,
  audience,
  variant,
}: {
  page: InquiryPage
  audience: DeckAudience
  variant: keyof typeof VARIANT
}) {
  const [modal, setModal] = useState<"deck" | "inquiry" | null>(null)
  const close = () => setModal(null)

  return (
    <>
      <button
        type="button"
        onClick={() => setModal("deck")}
        className={`cursor-pointer ${VARIANT[variant]}`}
      >
        {variant !== "link" && <DownloadIcon />}
        {audience === "brand" ? "브랜드 소개서 받기" : "인플루언서 소개서 받기"}
      </button>
      {modal === "deck" && (
        <DeckModal
          page={page}
          audience={audience}
          onClose={close}
          onContact={() => setModal("inquiry")}
        />
      )}
      {modal === "inquiry" && <InquiryModal page={page} onClose={close} />}
    </>
  )
}
