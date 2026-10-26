// Home 「계약만 하면, 판매부터 정산까지 이어집니다」 stepper — the
// 「화면 예시」 card for each step (협의 → 계약 → 공구 → 주문 현황 → 정산 → 성과).
import { IMAGES } from "@/assets/images"
import {
  BarRow,
  Chip,
  DemoNote,
  ExampleCard,
  SignatureRow,
  StackedBar,
  StatTile,
} from "@/components/examples/ExampleParts"

export function NegotiationExample() {
  return (
    <ExampleCard className="w-full max-w-[420px] gap-2.5 p-5">
      <div className="flex items-center gap-2.5 border-b border-gray-1 pb-2.5">
        <img
          src={IMAGES.avatarJiyoo}
          alt=""
          className="h-8 w-8 rounded-full object-cover"
        />
        <span className="text-[14px] font-bold">
          퓨어블리 × 지유의 데일리 라이프
        </span>
        <Chip
          tone="info"
          className="ml-auto px-2 py-[3px] text-[11px] font-bold"
        >
          협의 중
        </Chip>
      </div>
      <div className="max-w-[82%] self-start rounded-[14px_14px_14px_4px] bg-gray-1 px-3.5 py-2.5 text-[14px] leading-[1.5] text-gray-8">
        <b className="mb-0.5 block text-[12px] text-muted">브랜드</b>진정 라인
        공구 제안드려요. 다음 달 첫 주 가능하실까요?
      </div>
      <div className="max-w-[82%] self-end rounded-[14px_14px_4px_14px] bg-accent-soft px-3.5 py-2.5 text-[14px] leading-[1.5] text-gray-8">
        <b className="mb-0.5 block text-[12px] text-accent-text">인플루언서</b>
        좋아요. 공구가랑 기간 조건 확인할게요.
      </div>
      <div className="self-start rounded-xl border border-dashed border-gray-5 bg-white px-3.5 py-2.5 text-[13px] leading-[1.5] text-gray-8">
        <b>조건 제안</b> · 10.27 ~ 11.03 · 공구가 45,900원
      </div>
    </ExampleCard>
  )
}

export function ContractExample() {
  return (
    <ExampleCard className="w-full max-w-[420px] gap-3 p-[22px]">
      <div className="flex items-center justify-between text-[15px] font-extrabold">
        <span>표준 공동구매 계약서</span>
        <Chip tone="success" className="px-2 py-1 text-[12px]">
          체결 완료
        </Chip>
      </div>
      <div className="flex flex-col gap-1.5 text-[13px] text-gray-7">
        <div className="flex justify-between">
          <span>공구 기간</span>
          <span>10.27 ~ 11.03</span>
        </div>
        <div className="flex justify-between">
          <span>공구가 · 최소 물량</span>
          <span>45,900원 · 300개</span>
        </div>
        <div className="flex justify-between">
          <span>인플루언서 리워드율</span>
          <span>10%</span>
        </div>
      </div>
      <SignatureRow />
    </ExampleCard>
  )
}

export function OpenExample() {
  return (
    <div className="flex w-full max-w-[420px] flex-col gap-3">
      <div className="self-start rounded-xl bg-ink px-3.5 py-2.5 text-[13px] font-semibold text-white shadow-toast">
        계약 내용대로 공구가 만들어졌어요
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
            공동구매 D-3
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
        <div className="flex h-10 items-center justify-center rounded-[10px] bg-accent text-[13px] font-bold text-white">
          쇼룸에서 바로 구매
        </div>
      </ExampleCard>
    </div>
  )
}

const ORDER_STAGES = [
  { label: "결제 완료", count: "312", state: "done" },
  { label: "배송 준비", count: "24", state: "done" },
  { label: "배송 중", count: "188", state: "current" },
  { label: "구매 확정", count: "96", state: "todo" },
] as const

const ORDER_EVENTS = [
  {
    color: "#F2456E",
    text: "주문 23642 · 배송 시작",
    time: "방금",
    pad: "pt-2 pb-1.5",
  },
  {
    color: "#1A1B1F",
    text: "주문 23638 · 구매 확정",
    time: "11분 전",
    pad: "py-1.5",
  },
  {
    color: "#ADB5BD",
    text: "주문 23641 · 결제 완료",
    time: "14분 전",
    pad: "pt-1.5",
  },
]

export function OrderStatusExample() {
  return (
    <div className="flex w-full max-w-[440px] flex-col gap-2.5">
      <div className="flex items-center justify-center gap-2">
        <span className="rounded-full bg-ink px-3 py-1.5 text-[12px] font-bold text-white">
          브랜드 · 파트너센터
        </span>
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#CF3D61"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 9h14l-3-3" />
          <path d="M20 15H6l3 3" />
        </svg>
        <span className="rounded-full bg-accent-soft px-3 py-1.5 text-[12px] font-bold text-accent-text">
          인플루언서 · 쇼룸 스튜디오
        </span>
      </div>
      <ExampleCard className="gap-3.5 px-5 py-[18px]">
        <div className="flex items-center gap-2.5">
          <img
            src={IMAGES.productSet}
            alt=""
            className="h-9 w-9 flex-none rounded-lg object-cover"
          />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="truncate text-[14px] font-extrabold">
              퓨어블리 진정 3종 세트 공구
            </span>
            <span className="text-[11.5px] text-gray-6">
              주문 진행 현황 · 10:42 기준
            </span>
          </div>
          <span className="flex flex-none items-center gap-[5px] text-[11px] font-bold text-accent-text">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            실시간
          </span>
        </div>
        <div className="grid grid-cols-4 gap-1.5 text-center">
          {ORDER_STAGES.map(stage => (
            <div
              key={stage.label}
              className="flex flex-col items-center gap-1.5"
            >
              {stage.state === "done" && (
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-[13px] text-white">
                  ✓
                </span>
              )}
              {stage.state === "current" && (
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent shadow-[0_0_0_4px_#FFE3EA]">
                  <span className="h-2 w-2 rounded-full bg-white" />
                </span>
              )}
              {stage.state === "todo" && (
                <span className="box-border h-7 w-7 rounded-full border-[1.5px] border-gray-3 bg-gray-1" />
              )}
              <span
                className={`text-[11px] ${
                  stage.state === "current"
                    ? "font-bold text-accent-text"
                    : "text-gray-6"
                }`}
              >
                {stage.label}
              </span>
              <span
                className={`text-[15px] font-extrabold ${
                  stage.state === "current" ? "text-accent-text" : ""
                }`}
              >
                {stage.count}
              </span>
            </div>
          ))}
        </div>
        <StackedBar
          className="h-2 rounded bg-gray-1"
          parts={[
            [24, "#ADB5BD"],
            [188, "#F2456E"],
            [96, "#1A1B1F"],
          ]}
        />
        <div className="flex flex-col border-t border-gray-1 text-[12px]">
          {ORDER_EVENTS.map(event => (
            <div
              key={event.text}
              className={`flex items-center gap-2 ${event.pad}`}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: event.color }}
              />
              <span className="flex-1 text-gray-8">{event.text}</span>
              <span className="text-gray-5">{event.time}</span>
            </div>
          ))}
        </div>
      </ExampleCard>
      <DemoNote className="self-end" />
    </div>
  )
}

const SETTLEMENT_ROWS = [
  {
    color: "#1A1B1F",
    label: "브랜드 정산액",
    value: "4,775,800원",
    valueClass: "text-ink",
  },
  {
    color: "#F2456E",
    label: "인플루언서 리워드 (부가세 포함)",
    value: "602,800원",
    valueClass: "text-accent-text",
  },
  {
    color: "#CED4DA",
    label: "PG 결제 수수료",
    value: "101,400원",
    valueClass: "text-ink",
  },
]

export function SettlementExample() {
  return (
    <div className="flex w-full max-w-[420px] flex-col gap-2.5">
      <ExampleCard className="gap-3.5 px-[22px] py-5">
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-extrabold">공구 정산</span>
          <Chip tone="info" className="px-2 py-1 text-[12px] font-bold">
            지급 예정
          </Chip>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-[13px] text-gray-7">확정 거래액</span>
          <span className="text-[20px] font-extrabold">5,480,000원</span>
        </div>
        <StackedBar
          className="h-3 rounded-md"
          parts={[
            [87, "#1A1B1F"],
            [11, "#F2456E"],
            [2, "#CED4DA"],
          ]}
        />
        <div className="flex flex-col gap-2 text-[13px] text-gray-7">
          {SETTLEMENT_ROWS.map(row => (
            <div key={row.label} className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-[2px]"
                style={{ background: row.color }}
              />
              <span className="flex-1">{row.label}</span>
              <b className={row.valueClass}>{row.value}</b>
            </div>
          ))}
        </div>
        <div className="rounded-[10px] bg-accent-soft px-3 py-2.5 text-[12.5px] font-bold text-accent-text">
          베타 기간 쇼룸즈 거래 수수료 0원
        </div>
      </ExampleCard>
      <DemoNote className="self-end" />
    </div>
  )
}

const DAILY_SALES = [85, 62, 48, 40, 44, 52, 70, 90]

export function PerformanceExample() {
  return (
    <div className="flex w-full max-w-[440px] flex-col gap-2.5">
      <ExampleCard className="gap-3.5 px-5 py-[18px]">
        <div className="flex items-start gap-2.5">
          <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
            <span className="text-[11px] text-gray-6">
              성과 관리 / 공구 성과
            </span>
            <span className="truncate text-[15px] font-extrabold">
              퓨어블리 진정 3종 세트 공구
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
          <StatTile label="확정 거래액" value="548만원" />
          <StatTile label="판매 수량" value="274개" />
          <StatTile label="전환율" value="5.8%" highlight />
          <StatTile label="재구매율" value="30.2%" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[12px] font-bold text-gray-8">일별 판매</span>
          <div className="flex h-14 items-end gap-1.5">
            {DAILY_SALES.map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-[4px_4px_0_0]"
                style={{
                  height: `${h}%`,
                  background:
                    i === 0 || i === DAILY_SALES.length - 1
                      ? "#F2456E"
                      : "#FFD1DC",
                }}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-[12px] font-bold text-gray-8">
            구매 소비자 연령대
          </span>
          {[
            ["20대", "100%", "44%"],
            ["30대", "70%", "31%"],
            ["40대", "32%", "14%"],
          ].map(([label, percent, value]) => (
            <BarRow
              key={label}
              label={label}
              percent={percent}
              value={value}
              labelWidth="32px"
              valueWidth="32px"
              className="text-[12px] text-gray-7"
            />
          ))}
        </div>
      </ExampleCard>
      <DemoNote className="self-end" />
    </div>
  )
}
