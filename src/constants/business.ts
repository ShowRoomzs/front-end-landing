// Business information shown in the footer (사업자등록증명 2026.10.01 발급 기준).
// 카드사 본인인증(KCP) 심사가 사이트 하단의 상호 · 사업자등록번호 · 대표자명 · 대표연락처를 확인한다.

export const BUSINESS = {
  companyName: "쇼룸즈",
  ceoName: "소병서",
  businessNumber: "791-12-03353",
  phone: "010-3325-6416",
  address:
    "경기도 용인시 수지구 죽전로 152, 글로컬산학협력단 B211-3호(죽전동, 단국대학교)",
  // 민원 책임 고지 — 중개위탁판매라 거래 책임과 배송 · 교환 · 환불 · 민원 처리를 쇼룸즈가 진다 (2026-11-20 지시 문구 그대로).
  // 소비자 앱 · 웹(front-end BUSINESS_INFO.responsibilityNotice)과 같은 문장이다.
  responsibilityNotice:
    '"쇼룸즈"는 모든 거래에 대한 책임과 배송/교환/환불/민원 등의 처리는 "쇼룸즈"에서 진행합니다. 민원담당자: 소병서 · 연락처: 010-3325-6416',
} as const
