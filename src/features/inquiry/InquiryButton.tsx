import { useState } from "react"
import { InquiryModal } from "@/features/inquiry/InquiryModal"
import type { InquiryPage } from "@/features/inquiry/inquiry"

/** 헤더 우측 [문의하기] 아웃라인 버튼 + 모달. 모바일 헤더에서는 한 단계 작게 줄어든다. */
export function InquiryButton({
  page,
  className = "",
}: {
  page: InquiryPage
  className?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`min-h-11 cursor-pointer rounded-[10px] border border-gray-3 bg-white px-4 text-[15px] font-semibold whitespace-nowrap text-ink max-pc:min-h-10 max-pc:px-3 max-pc:text-[14px] ${className}`}
      >
        문의하기
      </button>
      {open && <InquiryModal page={page} onClose={() => setOpen(false)} />}
    </>
  )
}
