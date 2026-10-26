import { Container } from "@/components/layout/Container"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { MobileCtaBar } from "@/components/layout/MobileCtaBar"
import { PhoneDuo, PhoneSingle } from "@/components/phone/PhoneMockups"
import { BenefitList } from "@/components/sections/BenefitList"
import { Faq } from "@/components/sections/Faq"
import { SignupCta } from "@/components/sections/SignupCta"
import { Stepper } from "@/components/stepper/Stepper"
import { CtaLink } from "@/components/ui/CtaLink"
import {
  Eyebrow,
  HeroBadge,
  MobileBreak,
  SectionTitle,
} from "@/components/ui/Typography"
import { INFLUENCER_SIGNUP_URL } from "@/config/links"
import { PLACEHOLDER as P } from "@/constants/placeholders"
import { StudioConsoleExample } from "@/features/influencer/StudioConsoleExample"
import { INFLUENCER_STEPS } from "@/features/influencer/influencerSteps"
import { usePageTitle } from "@/hooks/usePageTitle"

const CTA_LABEL = "인플루언서 신청하기"

const BENEFITS = [
  {
    title: "제안부터 협의까지 한 곳에서",
    desc: "브랜드 제안을 받고, DM 대신 소통 스레드에서 조건을 맞춥니다.",
  },
  {
    title: "계약서, 혼자 검토하지 않아도",
    desc: "협의한 조건으로 표준 계약서가 만들어지고, 전자서명으로 체결합니다.",
  },
  {
    title: "배송·반품 문의는 운영팀이",
    desc: "상품 문의는 브랜드가, 주문·배송·반품 문의는 운영팀이 맡아 혼자 감당하던 문의 부담이 줄어듭니다.",
  },
  {
    title: "리워드와 성과를 한눈에",
    desc: "공구별 리워드와 판매 성과를 쇼룸 스튜디오에서 바로 확인합니다.",
  },
]

const FAQ = [
  { q: "팔로워가 많지 않아도 신청할 수 있나요?", a: P.influencerEligibility },
  { q: "정산은 언제, 어떻게 받나요?", a: P.influencerSettlement },
  { q: "사업자가 없어도 참여할 수 있나요?", a: P.influencerTax },
]

export function InfluencerPage() {
  usePageTitle("SHOWROOMZ 인플루언서 신청")

  return (
    <>
      <Header>
        <CtaLink
          to={INFLUENCER_SIGNUP_URL}
          className="flex min-h-11 items-center rounded-[10px] bg-accent px-[18px] text-[15px] font-bold text-white"
        >
          신청하기
        </CtaLink>
      </Header>

      <main>
        <Container
          as="section"
          className="flex flex-wrap items-center gap-14 pt-24 pb-20"
        >
          <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-6">
            <HeroBadge>뷰티 인플루언서 · 쇼룸 스튜디오</HeroBadge>
            <h1 className="text-[clamp(36px,4.8vw,62px)] leading-[1.22] font-black tracking-[-0.035em]">
              나만의 쇼룸에서
              <br />
              팔로워와 공동구매
            </h1>
            <p className="max-w-[540px] text-[19px] leading-[1.65] text-gray-7">
              소속사 없이도 표준 계약과 전자서명으로 안전하게. 배송·환불 문의는
              운영팀이 대신 응대하니, 콘텐츠와 판매에만 집중하세요.
            </p>
            <div className="flex flex-col gap-2.5 pt-2 max-pc:items-center max-pc:text-center">
              <CtaLink
                to={INFLUENCER_SIGNUP_URL}
                className="flex min-h-[58px] max-w-[320px] items-center justify-center rounded-xl bg-accent text-[18px] font-bold text-white max-pc:w-full"
              >
                {CTA_LABEL}
              </CtaLink>
              <p className="text-[14px] text-muted">{P.influencerTarget}</p>
            </div>
          </div>
          <div className="flex min-w-0 flex-[1_1_600px] justify-center">
            <figure className="flex max-w-full flex-col items-center gap-3">
              <div className="h-[780px] w-[600px] max-pc:[zoom:0.55]">
                <PhoneDuo />
              </div>
              <figcaption className="text-[13px] text-gray-6">
                쇼룸 화면 예시
              </figcaption>
            </figure>
          </div>
        </Container>

        <section className="bg-gray-0">
          <Container className="flex flex-col gap-12 py-24">
            <div className="flex max-w-[720px] flex-col gap-3">
              <Eyebrow>쇼룸 스튜디오</Eyebrow>
              <SectionTitle>
                공동구매, <MobileBreak />
                혼자 감당하지 마세요
              </SectionTitle>
            </div>
            <div className="flex flex-wrap items-center gap-12">
              <BenefitList items={BENEFITS} />
              <StudioConsoleExample />
            </div>
          </Container>
        </section>

        <Container
          as="section"
          className="flex flex-wrap items-center gap-14 py-24"
        >
          <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-5">
            <Eyebrow>쇼룸</Eyebrow>
            <SectionTitle>
              SNS처럼 운영하는
              <br />
              나만의 페이지
            </SectionTitle>
            <p className="text-[17px] leading-[1.7] text-gray-7">
              내 콘텐츠를 본 팔로워가 그 자리에서 바로 삽니다. 링크를 타고
              외부몰로 넘어갈 필요 없이, 쇼룸 안에서 콘텐츠, 상품 확인부터
              결제까지 끝나요. 나를 팔로우한 팔로워에게는 새 공구 소식이
              알림으로 갑니다.
            </p>
          </div>
          <div className="flex min-w-0 flex-[1_1_420px] justify-center">
            <div className="h-[760px] w-[420px] max-pc:[zoom:0.75]">
              <PhoneSingle />
            </div>
          </div>
        </Container>

        <Container as="section" className="flex flex-col gap-12 pb-24">
          <SectionTitle>시작은 이렇게</SectionTitle>
          <Stepper ariaLabel="시작 단계" steps={INFLUENCER_STEPS} />
        </Container>

        <Faq title="인플루언서 FAQ" items={FAQ} size="small" />

        <SignupCta
          title={
            <>
              공동구매는
              <br />
              쇼룸에서 시작하세요
            </>
          }
          lead={P.influencerBetaLine}
          cta={{ label: CTA_LABEL, to: INFLUENCER_SIGNUP_URL }}
          note={`버튼 링크: ${P.influencerSignupUrlNote}`}
        />
      </main>

      <Footer />
      <MobileCtaBar
        ctas={[{ label: CTA_LABEL, to: INFLUENCER_SIGNUP_URL, tone: "accent" }]}
      />
    </>
  )
}
