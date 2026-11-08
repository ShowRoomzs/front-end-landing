// 소개서 받기 — 연동 가이드 v0.2 §3-2(2026.11.05).
// 브랜드명/활동명과 이메일을 받아 시트 「소개서」 탭에 적고(메일 알림 없음), 정적 PDF를 내려받게 한다.
import {
  INQUIRY_ENDPOINT,
  pageParam,
  type InquiryPage,
} from "@/features/inquiry/inquiry"

export type DeckAudience = "brand" | "influencer"

type Deck = {
  /** 랜딩 정적 파일(public/files) — 개정하면 v2로 올리고 경로만 바꾼다 */
  file: string
  fileName: string
  badge: string
  title: string
  sub: string
  orgLabel: string
  orgPlaceholder: string
  emailLabel: string
}

export const DECKS: Record<DeckAudience, Deck> = {
  brand: {
    file: "/files/showroomz-brand-v1.pdf",
    fileName: "SHOWROOMZ_브랜드_소개서.pdf",
    badge: "브랜드 · 파트너센터",
    title: "브랜드 소개서 받기",
    sub: "파트너센터로 공동구매를 운영하는 방법을 한 번에 정리했어요.",
    orgLabel: "브랜드명",
    orgPlaceholder: "예) 퓨어블리",
    emailLabel: "이메일(업무용)",
  },
  influencer: {
    file: "/files/showroomz-influencer-v1.pdf",
    fileName: "SHOWROOMZ_인플루언서_소개서.pdf",
    badge: "인플루언서 · 쇼룸 스튜디오",
    title: "인플루언서 소개서 받기",
    sub: "쇼룸과 쇼룸 스튜디오로 공동구매를 진행하는 방법을 정리했어요.",
    orgLabel: "인플루언서 활동명",
    orgPlaceholder: "예) 지유의 데일리 라이프",
    emailLabel: "이메일",
  },
}

export type DeckFields = {
  org: string
  email: string
  agree: boolean
  /** 스팸 방지 숨김 칸 — 값이 있으면 보내지 않는다 */
  website: string
}

export const EMPTY_DECK: DeckFields = {
  org: "",
  email: "",
  agree: false,
  website: "",
}

/** 문의하기와 같은 이유로 `no-cors` — 응답을 읽을 수 없어 네트워크 오류만 실패로 본다 */
export async function requestDeck(
  page: InquiryPage,
  audience: DeckAudience,
  f: DeckFields
) {
  await fetch(INQUIRY_ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      kind: "deck",
      audience,
      page: pageParam(page),
      org: f.org.trim(),
      email: f.email.trim(),
      agree: true,
      website: "",
      submittedAt: new Date().toISOString(),
    }),
  })
}

/** 완료 화면에 들어서면 한 번 자동으로 내려받기를 시도한다(막히면 [소개서 다운로드] 버튼) */
export function downloadDeck(audience: DeckAudience) {
  const { file, fileName } = DECKS[audience]
  const a = document.createElement("a")
  a.href = file
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  a.remove()
}
