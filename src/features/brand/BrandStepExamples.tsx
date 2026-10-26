// /brand 「입점부터 첫 공구까지」 stepper — 「화면 예시」 cards.
import { IMAGES } from "@/assets/images"
import {
  BarRow,
  Chip,
  ExampleCard,
  LegendItem,
  SignatureRow,
  StackedBar,
} from "@/components/examples/ExampleParts"
import { PLACEHOLDER as P } from "@/constants/placeholders"

function Field({
  label,
  value,
  muted,
}: {
  label: string
  value: string
  muted?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[12px] font-semibold text-gray-7">{label}</span>
      <div
        className={`flex h-10 items-center rounded-lg border border-gray-3 px-3 text-[14px] ${
          muted ? "text-gray-5" : "text-gray-8"
        }`}
      >
        {value}
      </div>
    </div>
  )
}

export function SignupExample() {
  return (
    <ExampleCard className="w-full max-w-[420px] gap-3.5 p-6">
      <p className="text-[16px] font-extrabold">파트너센터 가입</p>
      <Field label="브랜드명" value="퓨어블리" />
      <Field label="사업자등록번호" value="000-00-00000" muted />
      <Field label="담당자 연락처" value="010-0000-0000" muted />
      <div className="flex h-11 items-center justify-center rounded-[10px] bg-ink text-[14px] font-bold text-white">
        가입하기
      </div>
    </ExampleCard>
  )
}

export function ProposalExample() {
  return (
    <ExampleCard className="w-full max-w-[420px] gap-2.5 p-5">
      <div className="flex items-center gap-2.5 border-b border-gray-1 pb-2.5">
        <img
          src={IMAGES.avatarJiyoo}
          alt=""
          className="h-8 w-8 rounded-full object-cover"
        />
        <span className="text-[14px] font-bold">지유의 데일리 라이프</span>
        <Chip
          tone="info"
          className="ml-auto px-2 py-[3px] text-[11px] font-bold"
        >
          협의 중
        </Chip>
      </div>
      <div className="max-w-[82%] self-end rounded-[14px_14px_4px_14px] bg-ink px-3.5 py-2.5 text-[14px] leading-[1.5] text-white">
        진정 라인 공구 제안드려요. 다음 달 첫 주 가능하실까요?
      </div>
      <div className="max-w-[82%] self-start rounded-[14px_14px_14px_4px] bg-gray-1 px-3.5 py-2.5 text-[14px] leading-[1.5] text-gray-8">
        좋아요. 공구가랑 기간 조건 확인할게요.
      </div>
      <div className="self-end rounded-xl border border-dashed border-accent bg-accent-soft px-3.5 py-2.5 text-[13px] leading-[1.5] text-gray-8">
        <b className="text-accent-text">조건 제안</b> · 기간 {P.period} · 공구가{" "}
        {P.price}
      </div>
    </ExampleCard>
  )
}

export function ContractExample() {
  return (
    <div className="flex w-full max-w-[420px] flex-col gap-3">
      <ExampleCard className="gap-3 p-[22px]">
        <div className="flex items-center justify-between text-[15px] font-extrabold">
          <span>표준 공동구매 계약서</span>
          <Chip tone="success" className="px-2 py-1 text-[12px]">
            체결 완료
          </Chip>
        </div>
        <div className="flex flex-col gap-1.5 text-[13px] text-gray-7">
          <div className="flex justify-between">
            <span>공구 기간</span>
            <span>{P.period}</span>
          </div>
          <div className="flex justify-between">
            <span>공구가 · 수량</span>
            <span>{P.terms}</span>
          </div>
          <div className="flex justify-between">
            <span>인플루언서 수익 조건</span>
            <span>{P.terms}</span>
          </div>
        </div>
        <SignatureRow />
      </ExampleCard>
      <div className="self-end rounded-xl bg-ink px-4 py-3 text-[13px] font-semibold text-white shadow-toast">
        공구 게시물 · 판매 · 정산이 계약대로 세팅됐어요
      </div>
    </div>
  )
}

export function SalesExample() {
  return (
    <div className="flex w-full max-w-[420px] flex-col gap-3">
      <ExampleCard row className="items-center gap-3.5 p-4">
        <img
          src={IMAGES.productSet}
          alt=""
          className="h-[72px] w-[72px] flex-none rounded-[10px] object-cover"
        />
        <div className="flex min-w-0 flex-col gap-1">
          <Chip
            tone="accent"
            className="self-start px-1.5 py-[3px] text-[11px] font-semibold"
          >
            공동구매 진행 중
          </Chip>
          <span className="text-[13px] text-gray-8">
            지유의 데일리 라이프 쇼룸
          </span>
          <span className="text-[14px] font-bold">퓨어블리 진정 3종 세트</span>
        </div>
      </ExampleCard>
      <ExampleCard className="gap-2.5 p-[18px] text-[13px]">
        {[
          { color: "#2F9E44", label: "공구 종료", value: "완료" },
          { color: "#1C7ED6", label: "정산", value: P.settlementDate },
          { color: "#CED4DA", label: "정산 금액", value: P.amount },
        ].map(row => (
          <div key={row.label} className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: row.color }}
            />
            <span className="flex-1">{row.label}</span>
            <span className="text-gray-6">{row.value}</span>
          </div>
        ))}
      </ExampleCard>
    </div>
  )
}

const FUNNEL = [
  { flex: 38, color: "#1A1B1F", label: "쇼룸 내부 탐색 38%" },
  { flex: 33, color: "#F2456E", label: "프로필 쇼룸 링크 33%" },
  { flex: 15, color: "#FF9DB3", label: "공구 게시물 링크 15%" },
  { flex: 14, color: "#C7C9D1", label: "상품 직접 링크 14%" },
]

export function ResultExample() {
  return (
    <ExampleCard
      borderClass="border-console-line"
      className="w-full max-w-[440px] gap-3.5 px-5 py-[18px]"
    >
      <div className="flex items-start gap-2.5">
        <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
          <span className="text-[11px] text-console-text">
            성과 관리 / 공구 성과
          </span>
          <span className="truncate text-[15px] font-extrabold text-ink">
            퓨어블리 진정 3종 세트 공구
          </span>
          <span className="text-[12px] text-console-text-2">
            daily_jiyoo · 10.27 ~ 11.03
          </span>
        </div>
        <Chip
          tone="info"
          className="flex-none px-2 py-[3px] text-[11px] font-bold"
        >
          지급 예정
        </Chip>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {[
          ["확정 거래액", "548만원"],
          ["전환율", "5.8%"],
          ["ROAS", "578%"],
          ["재구매율", "30.2%"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="flex flex-col gap-[3px] rounded-[10px] border border-console-bg bg-console-side px-2.5 py-2"
          >
            <span className="text-[10.5px] text-console-text">{label}</span>
            <span className="text-[13px] font-extrabold whitespace-nowrap text-ink">
              {value}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-[7px]">
        <span className="text-[12px] font-bold text-console-text-3">
          주문에서 구매확정까지
        </span>
        {[
          ["주문", "100%", "100%"],
          ["배송완료", "96.8%", "96.8%"],
          ["구매확정", "93%", "93.0%"],
        ].map(([label, percent, value]) => (
          <BarRow
            key={label}
            label={label}
            percent={percent}
            value={value}
            labelWidth="52px"
            valueWidth="40px"
            trackColor="#F1F2F4"
            className="text-[11.5px] text-console-text-2"
          />
        ))}
      </div>
      <div className="flex flex-col gap-[7px]">
        <span className="text-[12px] font-bold text-console-text-3">
          쇼룸 유입 경로
        </span>
        <StackedBar
          className="h-2.5 rounded-[5px]"
          parts={FUNNEL.map(f => [f.flex, f.color])}
        />
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-console-text-2">
          {FUNNEL.map(f => (
            <LegendItem key={f.label} color={f.color}>
              {f.label}
            </LegendItem>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="flex-1 text-[10.5px] text-console-faint">
          화면 예시 · 가상 데이터
        </span>
        <span className="rounded-lg bg-accent px-3 py-[7px] text-[12px] font-bold text-white">
          이 인플루언서와 재협업 제안
        </span>
      </div>
    </ExampleCard>
  )
}
