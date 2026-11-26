// Every link target on the site lives here.
// Main-page CTAs go to the in-site brand/influencer pages; the brand and
// influencer pages send applicants to the login page of the partner/studio
// web apps (연동 가이드 3-1, 2026.11). In-site links use react-router paths.

export const ROUTES = {
  home: "/",
  brand: "/brand",
  influencer: "/influencer",
  /** 구글 플레이 「계정 삭제 URL」 — 로그인 없이 열리는 안내 페이지 */
  accountDeletion: "/account-deletion",
  /** 공개 약관 — 서버의 시행 중인 소비자 문서(스토어 심사용 방침 주소) */
  privacy: "/privacy",
  terms: "/terms",
} as const

/** 소비자 웹의 회원 탈퇴 화면(로그인 후 열림) */
export const WEB_WITHDRAWAL_URL =
  "https://m.showroomz.co.kr/my/settings/withdrawal"

/** 파트너센터 로그인 — 브랜드 페이지의 입점 신청 · 브랜드 입점 신청하기 · 모바일 하단 버튼 */
export const PARTNER_CENTER_LOGIN_URL = "https://seller.showroomz.co.kr/login"

/** 쇼룸 스튜디오 로그인 — 인플루언서 페이지의 신청하기 · 인플루언서 신청하기 · 모바일 하단 버튼 */
export const STUDIO_LOGIN_URL = "https://front-end-studio-one.vercel.app/login"
