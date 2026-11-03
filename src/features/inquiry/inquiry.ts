// 문의하기 — 연동 가이드 v0.1(2026.11). Google Apps Script 웹앱이 시트에 적고 회사 메일로 알린다.

/** Apps Script 웹앱 배포 URL (official.showroomz@gmail.com · 시트 「SHOWROOMZ 랜딩 문의」) */
export const INQUIRY_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzI4TATOC7tnllSecg_ydqJdVJNq-iUT6gh4O7m67Tn3T_8LCC7za31OlPAQC1LsfBJ3w/exec"

/** 전송 실패 안내에 보여 줄 회사 메일 */
export const INQUIRY_MAIL = "official.showroomz@gmail.com"

/** 유입 페이지 — 모바일 레이아웃(≤720px)에서는 `-m`을 붙여 보낸다 */
export type InquiryPage = "main" | "brand" | "influencer"

export type InquiryFields = {
  brand: string
  name: string
  email: string
  phone: string
  partner: string
  message: string
  agree: boolean
  /** 스팸 방지 숨김 칸 — 값이 있으면 보내지 않는다 */
  website: string
}

export const EMPTY_INQUIRY: InquiryFields = {
  brand: "",
  name: "",
  email: "",
  phone: "",
  partner: "",
  message: "",
  agree: false,
  website: "",
}

export const isEmailValid = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())

export const isPhoneValid = (value: string) =>
  /^0\d{8,10}$/.test(value.replace(/[-\s]/g, ""))

/** (선택) 칸 말고 전부 채웠고 형식이 맞고 동의했는가 — 버튼 활성 조건 */
export function isInquiryReady(f: InquiryFields) {
  return (
    [f.brand, f.name, f.email, f.phone, f.message].every(v => v.trim()) &&
    isEmailValid(f.email) &&
    isPhoneValid(f.phone) &&
    f.agree
  )
}

/**
 * Apps Script는 CORS 응답을 주지 않아 `no-cors` + text/plain으로 보낸다. 응답 본문을 읽을 수 없으니
 * 네트워크 오류만 실패로 본다(서버 검증 규칙은 위 프론트 검증과 같다).
 */
export async function sendInquiry(page: InquiryPage, f: InquiryFields) {
  const mobile = window.matchMedia("(max-width: 720px)").matches
  await fetch(INQUIRY_ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      page: mobile ? `${page}-m` : page,
      brand: f.brand.trim(),
      name: f.name.trim(),
      email: f.email.trim(),
      phone: f.phone.trim(),
      partner: f.partner.trim(),
      message: f.message.trim(),
      agree: true,
      website: "",
      submittedAt: new Date().toISOString(),
    }),
  })
}
