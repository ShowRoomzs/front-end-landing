// /influencer 「시작은 이렇게」 stepper — 「화면 예시」 cards.
import { IMAGES } from "@/assets/images"
import {
  BarRow,
  Chip,
  ExampleCard,
  LegendItem,
  StackedBar,
  StatTile,
} from "@/components/examples/ExampleParts"
import { PLACEHOLDER as P } from "@/constants/placeholders"

export function ShowroomSetupExample() {
  return (
    <ExampleCard className="w-full max-w-[420px] gap-3.5 p-[22px]">
      <p className="text-[16px] font-extrabold">내 쇼룸 만들기</p>
      <div className="flex items-center gap-3.5">
        <div className="box-border h-[60px] w-[60px] flex-none rounded-full border-[1.5px] border-accent p-[3px]">
          <img
            src={IMAGES.avatarJiyoo}
            alt=""
            className="block h-full w-full rounded-full object-cover"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <span className="text-[12px] font-semibold text-gray-7">
            쇼룸 이름
          </span>
          <div className="flex h-[38px] items-center rounded-lg border border-gray-3 px-3 text-[14px]">
            지유의 데일리 라이프
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2.5 rounded-[10px] bg-gray-0 px-3 py-2.5 text-[13px]">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#3C3C3C"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" />
          <circle cx="12" cy="12" r="4.1" />
        </svg>
        <span className="flex-1">@daily_jiyoo</span>
        <Chip tone="success" className="px-2 py-[3px] text-[11px] font-bold">
          연결됨
        </Chip>
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="text-[12px] font-semibold text-gray-7">소개</span>
        <div className="flex h-[38px] items-center rounded-lg border border-gray-3 px-3 text-[13px] text-gray-7">
          일상 속 작은 행복을 기록해요 :)
        </div>
      </div>
      <div className="flex h-11 items-center justify-center rounded-[10px] bg-ink text-[14px] font-bold text-white">
        쇼룸 열기
      </div>
    </ExampleCard>
  )
}

export function ProposalExample() {
  return (
    <div className="flex w-full max-w-[420px] flex-col gap-3">
      <ExampleCard className="gap-3 p-[18px]">
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-extrabold">새 공구 제안</span>
          <Chip tone="soft" className="px-2 py-[3px] text-[11px] font-bold">
            퓨어블리
          </Chip>
        </div>
        <div className="flex items-center gap-3">
          <img
            src={IMAGES.productSet}
            alt=""
            className="h-16 w-16 flex-none rounded-[10px] object-cover"
          />
          <div className="flex min-w-0 flex-1 flex-col gap-1 text-[13px] text-gray-7">
            <span className="text-[14px] font-bold text-ink">
              진정 3종 세트 공구
            </span>
            <span>
              기간 {P.period} · 공구가 {P.price}
            </span>
            <span>내 수익 조건 {P.terms}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="flex h-10 flex-1 items-center justify-center rounded-[10px] border border-gray-3 text-[13px] font-bold">
            거절
          </span>
          <span className="flex h-10 flex-[2] items-center justify-center rounded-[10px] bg-accent text-[13px] font-bold text-white">
            스레드에서 협의하기
          </span>
        </div>
      </ExampleCard>
      <div className="max-w-[82%] self-end rounded-[14px_14px_4px_14px] border border-gray-2 bg-white px-3.5 py-2.5 text-[13px] leading-[1.5] text-gray-8">
        공구 기간을 하루만 늘릴 수 있을까요?
      </div>
    </div>
  )
}

export function ContractOpenExample() {
  return (
    <div className="flex w-full max-w-[420px] flex-col gap-3">
      <div className="flex items-center gap-2.5 rounded-2xl border border-gray-2 bg-white px-4 py-3.5 shadow-[0_10px_24px_rgba(26,27,31,0.06)]">
        <span className="flex-1 text-[14px] font-bold">
          표준 공동구매 계약서
        </span>
        <Chip tone="success" className="px-2 py-1 text-[12px] font-bold">
          서명 완료
        </Chip>
      </div>
      <ExampleCard className="gap-3 p-4">
        <div className="flex items-center gap-2">
          <img
            src={IMAGES.avatarJiyoo}
            alt=""
            className="h-7 w-7 rounded-full object-cover"
          />
          <span className="text-[13px] font-semibold">
            지유의 데일리 라이프
          </span>
          <Chip
            tone="accent"
            className="ml-auto px-1.5 py-[3px] text-[11px] font-semibold"
          >
            공동구매 오픈
          </Chip>
        </div>
        <div className="flex items-center gap-3">
          <img
            src={IMAGES.productSet}
            alt=""
            className="h-[72px] w-[72px] flex-none rounded-[10px] object-cover"
          />
          <div className="flex min-w-0 flex-col gap-1">
            <span className="text-[13px] text-gray-8">
              퓨어블리 진정 3종 세트
            </span>
            <span className="text-[15px] font-bold">
              <span className="text-accent">32%</span> 45,900원
            </span>
          </div>
        </div>
      </ExampleCard>
      <div className="self-start rounded-xl bg-ink px-3.5 py-2.5 text-[13px] font-semibold text-white">
        내 쇼룸에 공구가 세팅됐어요
      </div>
    </div>
  )
}

export function RewardExample() {
  return (
    <ExampleCard className="w-full max-w-[420px] gap-3.5 p-5">
      <div className="flex items-center justify-between">
        <span className="text-[15px] font-extrabold">
          쇼룸 스튜디오 · 내 리워드
        </span>
        <Chip tone="info" className="px-2 py-1 text-[12px] font-bold">
          정산 예정
        </Chip>
      </div>
      <div className="flex flex-col gap-2.5 text-[13px] text-gray-7">
        <div className="flex justify-between">
          <span>판매 리워드</span>
          <span>{P.amount}</span>
        </div>
        <div className="flex justify-between">
          <span>
            고정 지급비 <span className="text-gray-5">· 브랜드 직접 지급</span>
          </span>
          <span>{P.amount}</span>
        </div>
        <div className="flex justify-between border-t border-gray-1 pt-2.5 text-[15px] font-extrabold text-ink">
          <span>총 리워드</span>
          <span className="text-accent-text">{P.amount}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2.5 border-t border-gray-1 pt-1 text-[13px]">
        <div className="flex items-center gap-2 pt-2.5">
          <span className="h-2 w-2 rounded-full bg-dot-green" />
          <span className="flex-1">공구 종료</span>
          <span className="text-gray-6">완료</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-dot-blue" />
          <span className="flex-1">정산</span>
          <span className="text-gray-6">{P.settlementDate}</span>
        </div>
      </div>
    </ExampleCard>
  )
}

const FUNNEL = [
  { flex: 37, color: "#F2456E", label: "내 공구 게시물 37%" },
  { flex: 29, color: "#1A1B1F", label: "쇼룸 내부 탐색 29%" },
  { flex: 25, color: "#FF9DB3", label: "프로필 쇼룸 링크 25%" },
  { flex: 9, color: "#CED4DA", label: "상품 직접 링크 9%" },
]

export function ResultExample() {
  return (
    <ExampleCard className="w-full max-w-[440px] gap-3.5 px-5 py-[18px]">
      <div className="flex items-start gap-2.5">
        <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
          <span className="text-[11px] text-gray-6">성과 관리 / 공구 성과</span>
          <span className="truncate text-[15px] font-extrabold text-ink">
            퓨어블리 진정 3종 세트 공구
          </span>
          <span className="text-[12px] text-gray-7">
            퓨어블리 · 10.27 ~ 11.03
          </span>
        </div>
        <Chip
          tone="success"
          className="flex-none px-2 py-[3px] text-[11px] font-bold"
        >
          정산 완료
        </Chip>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        <StatTile label="내 리워드" value="100만원" highlight />
        <StatTile label="확정 거래액" value="548만원" />
        <StatTile label="구매전환율" value="5.8%" />
        <StatTile label="팔로워 증감" value="+312" />
      </div>
      <div className="flex flex-col gap-[7px]">
        <span className="text-[12px] font-bold text-gray-8">
          팔로워가 더 많이 샀어요
        </span>
        <BarRow
          label="팔로워"
          percent="100%"
          value="8.3%"
          color="#F2456E"
          labelWidth="52px"
          valueWidth="36px"
          className="text-[11.5px] text-gray-7"
        />
        <BarRow
          label="비팔로워"
          percent="57%"
          value="4.7%"
          labelWidth="52px"
          valueWidth="36px"
          className="text-[11.5px] text-gray-7"
        />
      </div>
      <div className="flex flex-col gap-[7px]">
        <span className="text-[12px] font-bold text-gray-8">
          쇼룸 유입 경로
        </span>
        <StackedBar
          className="h-2.5 rounded-[5px]"
          parts={FUNNEL.map(f => [f.flex, f.color])}
        />
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-gray-7">
          {FUNNEL.map(f => (
            <LegendItem key={f.label} color={f.color}>
              {f.label}
            </LegendItem>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="flex-1 text-[10.5px] text-gray-5">
          화면 예시 · 가상 데이터
        </span>
        <span className="rounded-lg bg-accent px-3 py-[7px] text-[12px] font-bold text-white">
          이 브랜드와 재협업 제안
        </span>
      </div>
    </ExampleCard>
  )
}
