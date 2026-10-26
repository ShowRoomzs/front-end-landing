// /brand hero: 「파트너센터 홈」 live group-buy card with two floating notes.
import { IMAGES } from "@/assets/images"
import { DemoNote } from "@/components/examples/ExampleParts"

const HOURLY = [
  { h: 14 },
  { h: 8 },
  { h: 8 },
  { h: 14 },
  { h: 30 },
  { h: 58 },
  { h: 44 },
  { h: 66 },
  { h: 86 },
  { h: 72 },
  { h: 100, now: true },
  { h: 40, now: true, partial: true },
]

const KPIS = [
  { label: "쇼룸 방문 · 오늘", value: "1,184명", sub: "누적 5,010명" },
  { label: "오늘 주문", value: "24건", sub: "어제 이 시각 19건" },
  { label: "오늘 결제", value: "49.8만원", sub: "누적 624만원", hot: true },
]

export function BrandHeroVisual() {
  return (
    <div
      role="img"
      aria-label="파트너센터 홈의 진행 중 공구 실시간 화면 예시"
      className="relative box-border w-full max-w-[540px] pt-16 pb-[72px] pl-7"
    >
      <div
        className="absolute top-[120px] right-2.5 bottom-[60px] left-[50px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, #FFE3EA, rgba(255,255,255,0))",
        }}
      />

      <div className="relative box-border flex flex-col gap-4 rounded-[20px] border border-gray-2 bg-white p-5 shadow-[0_30px_70px_rgba(26,27,31,0.14)]">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_0_4px_#FFE3EA]" />
          <span className="text-[13px] font-bold text-gray-8">
            진행 중 공구 · 실시간
          </span>
          <span className="ml-auto text-[12px] text-gray-6">파트너센터 홈</span>
        </div>
        <div className="flex items-center gap-3">
          <img
            src={IMAGES.productSet}
            alt=""
            className="h-[52px] w-[52px] flex-none rounded-[10px] object-cover"
          />
          <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
            <span className="truncate text-[15px] font-extrabold text-ink">
              퓨어블리 진정 3종 세트 공구
            </span>
            <span className="text-[12px] text-gray-7">daily_jiyoo</span>
          </div>
          <span className="flex-none rounded-lg bg-accent-soft px-[9px] py-[5px] text-[12px] font-bold whitespace-nowrap text-accent-text">
            마감까지 2일 13시간
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {KPIS.map(kpi => (
            <div
              key={kpi.label}
              className={`flex min-w-0 flex-col gap-1 rounded-xl p-3 ${
                kpi.hot ? "bg-accent-soft" : "bg-gray-0"
              }`}
            >
              <span
                className={`text-[11px] ${kpi.hot ? "text-accent-text" : "text-gray-6"}`}
              >
                {kpi.label}
              </span>
              <span
                className={`text-[18px] font-extrabold whitespace-nowrap ${
                  kpi.hot ? "text-accent-text" : "text-ink"
                }`}
              >
                {kpi.value}
              </span>
              <span
                className={`text-[11px] whitespace-nowrap ${
                  kpi.hot ? "text-accent-text" : "text-gray-6"
                }`}
              >
                {kpi.sub}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[12px] font-bold text-gray-8">
            오늘 시간대별 주문
          </span>
          <div className="flex h-[72px] items-end gap-[5px]">
            {HOURLY.map((bar, i) => (
              <span
                key={i}
                className="flex-1 rounded-[3px_3px_0_0]"
                style={{
                  height: `${bar.h}%`,
                  background: bar.now ? "#F2456E" : "#FFD1DC",
                  opacity: bar.partial ? 0.45 : undefined,
                }}
              />
            ))}
          </div>
          <div className="flex justify-between text-[10.5px] text-gray-5">
            <span>00시</span>
            <span>06시</span>
            <span>12시</span>
            <span>18시</span>
            <span className="font-bold text-accent-text">지금</span>
          </div>
        </div>
        <DemoNote />
      </div>

      <div className="absolute top-0 left-0 flex flex-col gap-2 rounded-2xl border border-gray-2 bg-white px-3.5 py-3 shadow-float">
        <span className="text-[12px] font-extrabold text-ink">
          오늘 처리할 일
        </span>
        <div className="flex flex-wrap gap-1.5 text-[11.5px]">
          <span className="rounded-full bg-gray-1 px-2 py-1 text-gray-8">
            송장 등록 <b>8</b>
          </span>
          <span className="rounded-full bg-gray-1 px-2 py-1 text-gray-8">
            내 서명 필요 <b>1</b>
          </span>
          <span className="rounded-full bg-gray-1 px-2 py-1 text-gray-8">
            미답변 문의 <b>3</b>
          </span>
        </div>
      </div>

      <div className="absolute right-0 bottom-2 flex max-w-[290px] items-center gap-2.5 rounded-[14px] bg-ink px-3.5 py-3 text-white shadow-float-dark">
        <span className="h-7 w-7 flex-none rounded-full bg-[#E3DDD6]" />
        <span className="text-[12.5px] leading-[1.45]">
          <b>뷰티_소연</b>님이 「진정 세럼 단독 공구」 계약서에 서명했습니다
        </span>
        <span className="flex-none text-[11px] text-gray-5">방금</span>
      </div>
    </div>
  )
}
