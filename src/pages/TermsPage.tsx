import { useEffect, useState } from "react"
import { Container } from "@/components/layout/Container"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { BUSINESS as B } from "@/constants/business"
import {
  formatDate,
  getEffectiveTerms,
  splitArticles,
  type TermsDocumentDetail,
  type TermsType,
} from "@/features/terms/terms"
import { usePageTitle } from "@/hooks/usePageTitle"

/*
 * 공개 약관 페이지(/terms · /privacy) — 스토어 심사가 요구하는 로그인 없이 열리는 방침 주소.
 * 원문은 어드민 약관 관리에 등록된 소비자 문서를 서버에서 받아 그린다.
 */

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "empty" }
  | { status: "ready"; doc: TermsDocumentDetail }

const TITLE: Record<TermsType, string> = {
  TERMS_OF_SERVICE: "이용약관",
  PRIVACY_POLICY: "개인정보처리방침",
}

export function TermsPage({ type }: { type: TermsType }) {
  const title = TITLE[type]
  usePageTitle(`SHOWROOMZ ${title}`)
  const [state, setState] = useState<State>({ status: "loading" })

  useEffect(() => {
    const controller = new AbortController()
    setState({ status: "loading" })
    getEffectiveTerms(type, controller.signal)
      .then(doc =>
        setState(doc ? { status: "ready", doc } : { status: "empty" })
      )
      .catch(() => {
        if (!controller.signal.aborted) setState({ status: "error" })
      })
    return () => controller.abort()
  }, [type])

  return (
    <>
      <Header>
        <span />
      </Header>

      <main>
        <Container narrow className="flex flex-col gap-8 py-16 max-pc:py-10">
          <div className="flex flex-col gap-2 border-b border-gray-2 pb-6">
            <h1 className="text-[clamp(28px,3.2vw,36px)] leading-[1.3] font-black tracking-[-0.03em]">
              {state.status === "ready" ? state.doc.name : title}
            </h1>
            {state.status === "ready" && (
              <p className="text-[15px] text-gray-7">
                시행일 {formatDate(state.doc.effectiveDate)} · 버전{" "}
                {state.doc.version}
              </p>
            )}
          </div>

          {state.status === "loading" && (
            <p className="text-[16px] text-gray-6">불러오는 중입니다…</p>
          )}

          {state.status === "empty" && (
            <p className="text-[16px] leading-[1.75] text-gray-8">
              {title}은 시행 전입니다. 시행일부터 이 페이지에서 확인할 수
              있습니다. 문의: {B.email}
            </p>
          )}

          {state.status === "error" && (
            <p className="text-[16px] leading-[1.75] text-gray-8">
              {title}을 불러오지 못했습니다. 잠시 뒤 다시 열어 주세요. 문의:{" "}
              {B.email}
            </p>
          )}

          {state.status === "ready" && (
            <div className="flex flex-col gap-6">
              {splitArticles(state.doc.content).map((article, index) => (
                <section key={index} className="flex flex-col gap-2">
                  {article.heading && (
                    <h2 className="text-[17px] font-bold text-ink">
                      {article.heading}
                    </h2>
                  )}
                  {article.body && (
                    <p className="text-[15px] leading-[1.85] whitespace-pre-line text-gray-8">
                      {article.body}
                    </p>
                  )}
                </section>
              ))}
            </div>
          )}
        </Container>
      </main>

      <Footer />
    </>
  )
}
