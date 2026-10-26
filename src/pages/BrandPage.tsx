import { Container } from "@/components/layout/Container"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { MobileCtaBar } from "@/components/layout/MobileCtaBar"
import { BenefitList } from "@/components/sections/BenefitList"
import { Faq } from "@/components/sections/Faq"
import { SignupCta } from "@/components/sections/SignupCta"
import { Stepper } from "@/components/stepper/Stepper"
import { CtaLink } from "@/components/ui/CtaLink"
import { Eyebrow, HeroBadge, SectionTitle } from "@/components/ui/Typography"
import { BRAND_SIGNUP_URL } from "@/config/links"
import { PLACEHOLDER as P } from "@/constants/placeholders"
import { BrandConsoleExample } from "@/features/brand/BrandConsoleExample"
import { BrandHeroVisual } from "@/features/brand/BrandHeroVisual"
import { BRAND_STEPS } from "@/features/brand/brandSteps"
import { usePageTitle } from "@/hooks/usePageTitle"

const CTA_LABEL = "브랜드 입점 신청하기"

const BENEFITS = [
  {
    title: "공구 현황을 한눈에",
    desc: "인플루언서에게 매번 묻지 않아도, 공구별 진행 상태와 주문을 한 목록에서 봅니다.",
  },
  {
    title: "협의부터 계약까지 플랫폼 안에서",
    desc: "소통 스레드, 표준 계약서, 전자서명까지 한 곳에서 끝납니다.",
  },
  {
    title: "대행사 없이도 직접",
    desc: "공구에 필요한 일이 파트너센터 안에서 이어져, 대행사 없이 브랜드가 직접 운영할 수 있습니다.",
  },
  {
    title: "공동구매별 성과 분석",
    desc: "공구가 끝나면 공동구매 단위로 매출·전환율·유입 경로·구매 소비자를 분석합니다.",
  },
]

const FAQ = [
  {
    q: "입점 비용과 수수료는 어떻게 되나요?",
    a: `베타 기간에는 거래 수수료 0%입니다(PG 결제 수수료 별도). 정식 오픈 후 정책은 ${P.feePolicy}`,
  },
  {
    q: "어떤 브랜드가 입점할 수 있나요?",
    a: `현재는 뷰티 카테고리 브랜드를 대상으로 운영합니다. ${P.brandReviewCriteria}`,
  },
  { q: "함께할 인플루언서는 어떻게 구하나요?", a: P.brandMatching },
]

export function BrandPage() {
  usePageTitle("SHOWROOMZ 브랜드 입점")

  return (
    <>
      <Header>
        <CtaLink
          to={BRAND_SIGNUP_URL}
          className="flex min-h-11 items-center rounded-[10px] bg-accent px-[18px] text-[15px] font-bold text-white"
        >
          입점 신청
        </CtaLink>
      </Header>

      <main>
        <Container
          as="section"
          className="flex flex-wrap items-center gap-14 pt-24 pb-20"
        >
          <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-6">
            <HeroBadge>뷰티 브랜드 전용 · 파트너센터</HeroBadge>
            <h1 className="text-[clamp(36px,4.8vw,62px)] leading-[1.22] font-black tracking-[-0.035em]">
              인플루언서 공동구매,
              <br />
              <span className="max-pc:hidden">운영은 </span>쇼룸즈에서 한 번에
            </h1>
            <p className="max-w-[540px] text-[19px] leading-[1.65] text-gray-7">
              인플루언서 제안부터 계약, 판매, 정산, 성과 분석까지. 대행사 없이도
              파트너센터 하나로 공동구매를 운영하세요.
            </p>
            <div className="flex flex-col gap-2.5 pt-2 max-pc:items-center max-pc:text-center">
              <CtaLink
                to={BRAND_SIGNUP_URL}
                className="flex min-h-[58px] max-w-[320px] items-center justify-center rounded-xl bg-accent text-[18px] font-bold text-white max-pc:w-full"
              >
                {CTA_LABEL}
              </CtaLink>
              <p className="text-[14px] text-muted">
                베타 기간 거래 수수료 0% (PG 결제 수수료 별도)
              </p>
            </div>
          </div>
          <div className="flex min-w-0 flex-[1_1_400px] justify-center">
            <BrandHeroVisual />
          </div>
        </Container>

        <section className="bg-gray-0">
          <Container className="flex flex-col gap-12 py-24">
            <div className="flex max-w-[720px] flex-col gap-3">
              <Eyebrow>파트너센터</Eyebrow>
              <SectionTitle>
                <span className="max-pc:hidden">여러 </span>인플루언서와의
                공동구매,
                <br />한 화면에서 운영하세요
              </SectionTitle>
            </div>
            <div className="flex flex-wrap items-center gap-12">
              <BenefitList items={BENEFITS} />
              <BrandConsoleExample />
            </div>
          </Container>
        </section>

        <Container as="section" className="flex flex-col gap-12 py-24">
          <SectionTitle>입점부터 첫 공구까지</SectionTitle>
          <Stepper ariaLabel="입점 단계" steps={BRAND_STEPS} />
        </Container>

        <Faq title="브랜드 FAQ" items={FAQ} size="small" />

        <SignupCta
          title={
            <>
              공동구매는
              <br />
              쇼룸즈에서 운영하세요
            </>
          }
          lead={`베타 기간 거래 수수료 0% (PG 결제 수수료 별도) · ${P.brandBetaPeriod}`}
          cta={{ label: CTA_LABEL, to: BRAND_SIGNUP_URL }}
          note={`버튼 링크: ${P.brandSignupUrlNote}`}
        />
      </main>

      <Footer />
      <MobileCtaBar
        ctas={[{ label: CTA_LABEL, to: BRAND_SIGNUP_URL, tone: "accent" }]}
      />
    </>
  )
}
