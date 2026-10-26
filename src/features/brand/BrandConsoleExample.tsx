// /brand 「한 화면에서 운영하세요」: 파트너센터 · 공구 관리 window + 공구 성과 card.
import { IMAGES } from "@/assets/images"
import {
  ConsoleStatus,
  ConsoleTabs,
  ConsoleWindow,
} from "@/components/examples/ConsoleWindow"
import { StackedBar } from "@/components/examples/ExampleParts"

const MENU = [
  "홈",
  "연결·소통",
  "계약 관리",
  "공구 관리",
  "판매 관리",
  "정산 관리",
]

const ROWS = [
  {
    name: "퓨어블리 진정 3종 세트 공구",
    who: "daily_jiyoo",
    avatar: "photo",
    period: "10.27 ~ 11.03",
    status: { kind: "live", label: "진행중" },
  },
  {
    name: "진정 세럼 단독 공구",
    who: "뷰티_하윤",
    avatar: "#E3DDD6",
    period: "11.05 ~ 11.12",
    status: { kind: "ready", label: "준비완료" },
  },
  {
    name: "수분 크림 리필 공구",
    who: "글로우_지민",
    avatar: "#EBCFD6",
    period: "11.10 ~ 11.17",
    status: { kind: "prep", label: "준비중" },
  },
  {
    name: "티트리 토너 앵콜 공구",
    who: "뷰티_소연",
    avatar: "#D9E3DA",
    period: "10.06 ~ 10.13",
    status: { kind: "ready", label: "종료" },
  },
] as const

// The period column hides on mobile but the 4-column track stays (as designed).
const GRID = "grid grid-cols-[1.7fr_1.2fr_1fr_0.7fr] gap-2.5"

const FUNNEL: [number, string][] = [
  [38, "#1A1B1F"],
  [33, "#F2456E"],
  [15, "#FF9DB3"],
  [14, "#CED4DA"],
]

const RESULT_TILES = [
  { label: "전환율", value: "5.8%", hot: false },
  { label: "ROAS", value: "578%", hot: false },
  { label: "재구매율", value: "30.2%", hot: true },
]

export function BrandConsoleExample() {
  return (
    <div className="relative min-w-0 flex-[1.4_1_520px] pb-10">
      <ConsoleWindow tone="partner" title="파트너센터 · 공구 관리">
        <div className="flex min-h-[360px]">
          {/* The design marks this sidebar `.pc-side` (hidden ≤720px), but its
              inline display:flex overrides that rule, so the mobile board
              shows it. Kept visible to match the board; add
              `max-pc:hidden` here to hide it on mobile instead. */}
          <div className="box-border flex w-[148px] flex-none flex-col gap-0.5 border-r border-console-line bg-console-side px-2.5 py-4 text-[12px] text-console-text-2">
            <span className="px-2 pt-0.5 pb-3.5 font-logo text-[15px] font-semibold text-ink">
              SHOWROOMZ
            </span>
            {MENU.map(item => (
              <span
                key={item}
                className={`rounded-md p-2 ${
                  item === "공구 관리"
                    ? "bg-accent-soft font-bold text-accent-text"
                    : ""
                }`}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-3.5 px-5 py-[18px]">
            <div className="flex flex-col gap-1">
              <span className="text-[16px] font-bold text-ink">공구 관리</span>
              <span className="text-[12px] leading-[1.5] text-console-text">
                체결된 계약에서 생성된 공구의 준비 상황과 판매 실적을
                확인합니다.
              </span>
            </div>
            <ConsoleTabs tone="partner" />
            <div className="flex flex-col text-[12px] text-console-text-3">
              <div
                className={`${GRID} border-b border-console-line px-1 py-2 font-semibold text-console-text`}
              >
                <span>공구명</span>
                <span>인플루언서</span>
                <span className="max-pc:hidden">공구 기간</span>
                <span>상태</span>
              </div>
              {ROWS.map((row, i) => (
                <div
                  key={row.name}
                  className={`${GRID} items-center px-1 py-[11px] ${
                    i < ROWS.length - 1 ? "border-b border-console-bg" : ""
                  }`}
                >
                  <span className="truncate font-semibold">{row.name}</span>
                  <span className="flex min-w-0 items-center gap-1.5">
                    {row.avatar === "photo" ? (
                      <img
                        src={IMAGES.avatarJiyoo}
                        alt=""
                        className="h-5 w-5 flex-none rounded-full object-cover"
                      />
                    ) : (
                      <span
                        className="h-5 w-5 flex-none rounded-full"
                        style={{ background: row.avatar }}
                      />
                    )}
                    <span className="truncate">{row.who}</span>
                  </span>
                  <span className="whitespace-nowrap text-console-text-2 max-pc:hidden">
                    {row.period}
                  </span>
                  <ConsoleStatus kind={row.status.kind}>
                    {row.status.label}
                  </ConsoleStatus>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ConsoleWindow>

      <div className="absolute -right-3 bottom-0 box-border flex w-60 flex-col gap-2.5 rounded-2xl border border-gray-2 bg-white p-4 shadow-[0_20px_44px_rgba(26,27,31,0.14)]">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[13px] font-extrabold">공구 성과</span>
          <span className="rounded-md bg-info-bg px-1.5 py-0.5 text-[10.5px] font-bold text-info">
            종료
          </span>
        </div>
        <span className="truncate text-[11.5px] text-gray-7">
          티트리 토너 앵콜 공구
        </span>
        <div className="grid grid-cols-3 gap-1.5">
          {RESULT_TILES.map(({ label, value, hot }) => (
            <div
              key={label}
              className={`flex flex-col gap-0.5 rounded-lg px-2 py-1.5 ${
                hot ? "bg-accent-soft" : "bg-gray-0"
              }`}
            >
              <span
                className={`text-[10px] ${hot ? "text-accent-text" : "text-gray-6"}`}
              >
                {label}
              </span>
              <span
                className={`text-[12.5px] font-extrabold ${hot ? "text-accent-text" : ""}`}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10.5px] text-gray-6">유입 경로</span>
          <StackedBar className="h-2 rounded" parts={FUNNEL} />
        </div>
      </div>
    </div>
  )
}
