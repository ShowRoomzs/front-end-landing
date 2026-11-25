import type { ReactNode } from "react"
import { Container } from "@/components/layout/Container"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { WEB_WITHDRAWAL_URL } from "@/config/links"
import { BUSINESS as B } from "@/constants/business"
import { PLACEHOLDER as P } from "@/constants/placeholders"
import { usePageTitle } from "@/hooks/usePageTitle"

/*
 * 계정 삭제 안내 — 구글 플레이 「계정 삭제 URL」로 등록하는 페이지.
 * 플레이 요건: 로그인 없이 열리고, 스토어의 앱 · 개발자 이름이 보이고, 삭제 요청 방법과
 * 삭제 · 보관되는 데이터를 적는다. 삭제 · 보관 문구는 앱의 탈퇴 확인 화면(C15-4)과 같게 둔다.
 */

const DELETED = [
  "닉네임 · 프로필 사진 등 회원 정보",
  "팔로잉 · 좋아요 · 장바구니 등 활동 기록",
]

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3 border-t border-gray-2 pt-8">
      <h2 className="text-[20px] font-bold tracking-[-0.02em]">{title}</h2>
      <div className="flex flex-col gap-2 text-[16px] leading-[1.75] text-gray-8">
        {children}
      </div>
    </section>
  )
}

export function AccountDeletionPage() {
  usePageTitle("SHOWROOMZ 계정 삭제 안내")
  const retentionDecided = !P.accountRetention.startsWith("[")

  return (
    <>
      <Header>
        <span />
      </Header>

      <main>
        <Container narrow className="flex flex-col gap-10 py-16 max-pc:py-10">
          <div className="flex flex-col gap-3">
            <h1 className="text-[clamp(28px,3.2vw,36px)] leading-[1.3] font-black tracking-[-0.03em]">
              쇼룸즈(SHOWROOMZ) 계정 삭제 안내
            </h1>
            <p className="text-[16px] leading-[1.75] text-gray-7">
              쇼룸즈 앱 계정과 관련 데이터를 삭제하는 방법입니다. 서비스 운영자:{" "}
              {B.companyName}
            </p>
          </div>

          <Section title="1. 앱에서 삭제하기">
            <ol className="list-decimal pl-5">
              <li>쇼룸즈 앱에 로그인합니다.</li>
              <li>하단의 [마이] → [설정] → [회원 탈퇴]를 누릅니다.</li>
              <li>
                탈퇴 사유를 고르고, 안내를 확인한 뒤 [탈퇴하기]를 누릅니다.
              </li>
            </ol>
          </Section>

          <Section title="2. 웹에서 삭제하기">
            <p>
              앱이 없어도 웹에서 같은 방법으로 삭제할 수 있습니다. 앱과 같은
              계정으로 로그인한 뒤 회원 탈퇴를 진행해 주세요.
            </p>
            <p>
              <a
                href={WEB_WITHDRAWAL_URL}
                className="font-bold text-accent-text underline"
              >
                웹에서 회원 탈퇴하기
              </a>
            </p>
          </Section>

          <Section title="3. 메일로 요청하기">
            <p>
              로그인할 수 없다면{" "}
              <a
                href={`mailto:${B.email}?subject=${encodeURIComponent("계정 삭제 요청")}`}
                className="font-bold text-ink underline"
              >
                {B.email}
              </a>
              로 「계정 삭제 요청」을 보내 주세요. 가입할 때 쓴 로그인
              방식(카카오 · 네이버 · 구글 · 애플)과 닉네임을 함께 적어 주시면
              본인 확인 후 삭제하고 결과를 메일로 알려 드립니다.
            </p>
          </Section>

          <Section title="삭제되는 데이터">
            <ul className="list-disc pl-5">
              {DELETED.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>삭제한 계정과 기록은 되돌릴 수 없습니다.</p>
          </Section>

          <Section title="보관되는 데이터">
            <p>
              주문 · 결제 기록은 전자상거래법에 따라 법정 기간 동안 분리 보관한
              뒤 파기합니다.
            </p>
            {retentionDecided && <p>{P.accountRetention}</p>}
          </Section>

          <Section title="탈퇴 전에 확인해 주세요">
            <ul className="list-disc pl-5">
              <li>
                진행 중인 주문 · 반품 · 교환이 있으면 끝난 뒤에 탈퇴할 수
                있습니다.
              </li>
              <li>
                같은 계정으로 다시 가입할 수 있지만, 이전 활동 기록은 복구되지
                않습니다.
              </li>
            </ul>
          </Section>
        </Container>
      </main>

      <Footer />
    </>
  )
}
