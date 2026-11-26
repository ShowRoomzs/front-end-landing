// 약관 · 정책 원문 — 서버의 시행 중인 버전만 받는다(GET /v1/common/terms, 백엔드 e316f423).
// 시행 예정 버전은 시행일 00:00 배치가 전환하기 전까지 내려오지 않는다. 그래서 목록이 비면 「시행 전」이다.

const API_BASE = "https://api.showroomz.co.kr/v1"

export type TermsType = "TERMS_OF_SERVICE" | "PRIVACY_POLICY"

type TermsTarget = "ALL" | "USER" | "BRAND" | "INFLUENCER"

type TermsDocument = {
  documentId: number
  name: string
  target: TermsTarget
  version: string
  effectiveDate: string
}

export type TermsDocumentDetail = TermsDocument & { content: string }

async function getJson<T>(path: string, signal: AbortSignal): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, { signal })
  if (!response.ok) throw new Error(`terms ${response.status}`)
  return (await response.json()) as T
}

/**
 * 소비자(USER) 문서를 먼저 고르고, 없으면 전체(ALL) 문서를 쓴다 — 소비자 앱 뷰어와 같은 규칙.
 * 시행 중인 문서가 없으면 null.
 */
export async function getEffectiveTerms(
  type: TermsType,
  signal: AbortSignal
): Promise<TermsDocumentDetail | null> {
  const list = await getJson<TermsDocument[]>(
    `/common/terms?type=${type}&target=USER`,
    signal
  )
  const picked =
    list.find(doc => doc.target === "USER") ??
    list.find(doc => doc.target === "ALL")
  if (!picked) return null
  return getJson<TermsDocumentDetail>(
    `/common/terms/${picked.documentId}`,
    signal
  )
}

/** 조 제목 — 「제1조 (목적)」처럼 시작하는 줄 */
const ARTICLE_HEADING = /^제\s*\d+\s*조/

/** 원문은 빈 줄로 조를 나눈 평문이다. 블록 첫 줄이 조 제목이면 떼어 낸다. */
export function splitArticles(content: string) {
  return content
    .split(/\n\s*\n/)
    .map(block => block.trim())
    .filter(Boolean)
    .map(block => {
      const [first, ...rest] = block.split("\n")
      return ARTICLE_HEADING.test(first.trim())
        ? { heading: first.trim(), body: rest.join("\n").trim() }
        : { heading: null, body: block }
    })
}

/** "2026-11-27" → "2026.11.27" */
export function formatDate(date: string) {
  return date.replaceAll("-", ".")
}
