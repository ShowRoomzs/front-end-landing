import { Link } from "react-router-dom"
import { Container } from "@/components/layout/Container"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { MobileCtaBar } from "@/components/layout/MobileCtaBar"
import { PhoneDuo, PhoneSingle } from "@/components/phone/PhoneMockups"
import { Faq } from "@/components/sections/Faq"
import { Stepper } from "@/components/stepper/Stepper"
import { CtaLink } from "@/components/ui/CtaLink"
import {
  Eyebrow,
  HeroBadge,
  MobileBreak,
  SectionTitle,
} from "@/components/ui/Typography"
import { BRAND_SIGNUP_URL, INFLUENCER_SIGNUP_URL, ROUTES } from "@/config/links"
import { PLACEHOLDER as P } from "@/constants/placeholders"
import { HOME_FLOW_STEPS } from "@/features/home/flowSteps"
import { usePageTitle } from "@/hooks/usePageTitle"

const PAIN_POINTS = [
  {
    who: "브랜드는",
    items: [
      "인플루언서 섭외와 조건 협의를 DM으로 반복하고",
      "인플루언서마다 조건과 계약서를 따로 주고받고",
      "공구가 어떻게 진행되는지 매번 물어봐야 하고",
      "정산과 성과 정리를 수작업으로 합니다",
    ],
  },
  {
    who: "인플루언서는",
    items: [
      "브랜드마다 진행 방식과 판매 링크가 다르고",
      "계약과 분쟁을 혼자 검토하고 대응해야 하고",
      "팔로워의 배송·환불 문의가 모두 내 DM으로 오고",
      "정산이 언제, 얼마나 들어오는지 확인하기 어렵습니다",
    ],
  },
]

const AUDIENCES = [
  {
    label: "브랜드 · 파트너센터",
    title: (
      <>
        제안부터 계약, 정산까지
        <br />한 곳에서
      </>
    ),
    desc: "브랜드를 위한 공동구매 운영 도구, 파트너센터.",
    cta: "브랜드 입점 알아보기",
    to: ROUTES.brand,
    ctaClass: "bg-accent text-white",
  },
  {
    label: "인플루언서 · 쇼룸 스튜디오",
    title: (
      <>
        혼자서도
        <br />
        쉽고 안전하게 공동구매
      </>
    ),
    desc: "표준 계약, 전자서명, 정산까지. 나만의 쇼룸과 쇼룸 스튜디오로.",
    cta: "인플루언서 신청 알아보기",
    to: ROUTES.influencer,
    ctaClass: "bg-white text-ink",
  },
]

const FAQ = [
  {
    q: "이용 수수료가 있나요?",
    a: `베타 기간에는 거래 수수료가 없습니다(PG 결제 수수료 별도). 정식 오픈 후 수수료는 ${P.feePolicy}`,
  },
  {
    q: "어떤 카테고리가 참여할 수 있나요?",
    a: "현재는 뷰티 카테고리 브랜드와 인플루언서를 대상으로 운영합니다.",
  },
  { q: "언제부터 이용할 수 있나요?", a: P.launchSchedule },
]

const HERO_CTA =
  "flex min-h-14 max-w-[260px] flex-[1_1_200px] items-center justify-center rounded-xl text-[17px] font-bold text-white"
const BANNER_CTA =
  "flex min-h-[52px] items-center rounded-xl px-6 text-[16px] font-bold text-white max-pc:min-w-0 max-pc:flex-[1_1_0] max-pc:justify-center max-pc:px-2.5 max-pc:whitespace-nowrap"

export function HomePage() {
  usePageTitle("SHOWROOMZ 소개")

  return (
    <>
      <Header>
        <nav className="flex flex-wrap items-center gap-1">
          <Link
            to={ROUTES.brand}
            className="px-3.5 py-3 text-[15px] font-medium text-gray-7 no-underline"
          >
            브랜드
          </Link>
          <Link
            to={ROUTES.influencer}
            className="px-3.5 py-3 text-[15px] font-medium text-gray-7 no-underline"
          >
            인플루언서
          </Link>
        </nav>
      </Header>

      <main>
        <Container
          as="section"
          className="flex flex-wrap items-center gap-14 pt-24 pb-20"
        >
          <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-6">
            <HeroBadge>인플루언서 공동구매 통합 운영 플랫폼</HeroBadge>
            <h1 className="text-[clamp(38px,5.2vw,66px)] leading-[1.2] font-black tracking-[-0.035em]">
              공동구매 운영,
              <br />
              하나로 통합합니다
            </h1>
            <p className="max-w-[560px] text-[19px] leading-[1.65] text-gray-7">
              브랜드는 계약부터 정산까지 한 곳에서 운영하고, 인플루언서는 내
              쇼룸에서 팔로워와의 공동구매에만 집중합니다.
            </p>
            <div className="flex flex-wrap gap-3 pt-2 max-pc:justify-center">
              <CtaLink
                to={BRAND_SIGNUP_URL}
                className={`${HERO_CTA} bg-accent`}
              >
                브랜드로 시작하기
              </CtaLink>
              <CtaLink
                to={INFLUENCER_SIGNUP_URL}
                className={`${HERO_CTA} bg-ink`}
              >
                인플루언서로 시작하기
              </CtaLink>
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
              <Eyebrow>지금의 공동구매</Eyebrow>
              <SectionTitle>
                DM으로 협의하고, <MobileBreak />
                외부몰로 보내고,
                <br />
                수동으로 정산하고.
              </SectionTitle>
              <p className="text-[17px] leading-[1.7] text-gray-7">
                공동구매 한 번에 여러 도구와 창구가 필요합니다. 기준 없는 계약,
                불분명한 책임, 확인하기 어려운 진행 상황은 브랜드와 인플루언서
                모두의 부담입니다.
              </p>
            </div>
            <div className="flex flex-wrap gap-5">
              {PAIN_POINTS.map(group => (
                <div
                  key={group.who}
                  className="box-border flex min-w-0 flex-[1_1_340px] flex-col gap-4 rounded-2xl border border-gray-2 bg-white p-9"
                >
                  <h3 className="text-[15px] font-bold text-muted">
                    {group.who}
                  </h3>
                  <ul className="flex list-disc flex-col gap-2.5 pl-5 text-[17px] leading-[1.6] text-gray-8">
                    {group.items.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <Container as="section" className="flex flex-col gap-10 py-24">
          <div className="flex max-w-[760px] flex-col gap-3">
            <Eyebrow>쇼룸즈에서는</Eyebrow>
            <SectionTitle>
              계약만 하면,
              <br />
              판매부터 정산까지 이어집니다
            </SectionTitle>
          </div>
          <Stepper
            ariaLabel="공동구매 진행 단계"
            steps={HOME_FLOW_STEPS}
            variant="compact"
          />
        </Container>

        <section className="bg-gray-0">
          <Container className="flex flex-wrap items-center gap-14 py-24">
            <div className="flex min-w-0 flex-[1_1_420px] justify-center">
              <div className="h-[760px] w-[420px] max-pc:[zoom:0.75]">
                <PhoneSingle />
              </div>
            </div>
            <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-5">
              <Eyebrow>쇼룸</Eyebrow>
              <SectionTitle>
                인플루언서의 개인 페이지에서
                <MobileBreak /> 공동구매 진행
              </SectionTitle>
              <p className="text-[17px] leading-[1.7] text-gray-7">
                쇼룸은 쇼룸즈 안에 있는 인플루언서의 개인 페이지입니다. 팔로워는
                콘텐츠를 확인하고 공구 상품을 구매하고, 팔로우한 인플루언서의
                공구 소식을 알림으로 받습니다.
              </p>
              <ul className="flex list-disc flex-col gap-2 pl-5 text-[16px] leading-[1.6] text-gray-8">
                <li>쇼룸 → 상품 상세 → 결제까지 앱 안에서 진행</li>
                <li>쇼룸 하나로 여러 브랜드의 공구를 진행</li>
              </ul>
            </div>
          </Container>
        </section>

        <section className="bg-ink text-white">
          <Container className="flex flex-col gap-10 py-24">
            <SectionTitle>누구로 시작하시나요?</SectionTitle>
            <div className="flex flex-wrap gap-5">
              {AUDIENCES.map(card => (
                <div
                  key={card.label}
                  className="box-border flex min-w-0 flex-[1_1_340px] flex-col gap-4 rounded-[20px] bg-ink-card p-10"
                >
                  <p className="text-[15px] font-bold text-accent-on-dark">
                    {card.label}
                  </p>
                  <h3 className="text-[28px] leading-[1.35] font-bold">
                    {card.title}
                  </h3>
                  <p className="text-[16px] leading-[1.7] text-gray-4">
                    {card.desc}
                  </p>
                  <CtaLink
                    to={card.to}
                    className={`mt-3 flex min-h-[52px] items-center self-start rounded-xl px-7 text-[16px] font-bold max-pc:self-center ${card.ctaClass}`}
                  >
                    {card.cta}
                  </CtaLink>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <Container as="section" className="pt-20">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-[20px] bg-accent-soft p-10">
            <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-2">
              <Eyebrow>베타 오픈</Eyebrow>
              <h2 className="text-[clamp(24px,2.6vw,32px)] leading-[1.35] font-black tracking-[-0.02em]">
                베타 기간 거래 수수료 0%
              </h2>
              <p className="text-[16px] leading-[1.7] text-gray-7">
                PG 결제 수수료는 별도입니다.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 max-pc:flex-[1_1_100%] max-pc:flex-nowrap max-pc:justify-center max-pc:gap-2">
              <CtaLink
                to={BRAND_SIGNUP_URL}
                className={`${BANNER_CTA} bg-accent`}
              >
                브랜드 신청
              </CtaLink>
              <CtaLink
                to={INFLUENCER_SIGNUP_URL}
                className={`${BANNER_CTA} bg-ink`}
              >
                인플루언서 신청
              </CtaLink>
            </div>
          </div>
        </Container>

        <Faq title="자주 묻는 질문" items={FAQ} />
      </main>

      <Footer />
      <MobileCtaBar
        ctas={[
          { label: "브랜드로 시작하기", to: BRAND_SIGNUP_URL, tone: "accent" },
          {
            label: "인플루언서로 시작하기",
            to: INFLUENCER_SIGNUP_URL,
            tone: "ink",
          },
        ]}
      />
    </>
  )
}
