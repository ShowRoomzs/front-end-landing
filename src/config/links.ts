// Every link target on the site lives here.
// External CTAs go to the sign-up pages of the partner/studio web apps;
// in-site links use react-router paths.

export const ROUTES = {
  home: "/",
  brand: "/brand",
  influencer: "/influencer",
} as const

/** 파트너센터 회원가입 — 브랜드로 시작하기 · 브랜드 입점 신청하기 · 입점 신청 · 브랜드 신청 */
export const BRAND_SIGNUP_URL =
  "https://front-end-partners-one.vercel.app/register"

/** 쇼룸 스튜디오 회원가입 — 인플루언서로 시작하기 · 인플루언서 신청하기 · 신청하기 · 인플루언서 신청 */
export const INFLUENCER_SIGNUP_URL =
  "https://front-end-studio-one.vercel.app/signup"

/** Footer legal links. The pages do not exist yet; the design links to these anchors. */
export const PRIVACY_URL = "#privacy"
export const TERMS_URL = "#terms"
