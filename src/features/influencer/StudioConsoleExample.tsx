// /influencer 「혼자 감당하지 마세요」: 쇼룸 스튜디오 · 공구 관리 window with
// a proposal toast and a reward card.
import {
  ConsoleStatus,
  ConsoleTabs,
  ConsoleWindow,
} from "@/components/examples/ConsoleWindow"
import { DemoNote } from "@/components/examples/ExampleParts"

// The 「내 게시물」 column hides on mobile but the 4-column track stays.
const GRID = "grid grid-cols-[1.7fr_1fr_0.8fr_0.8fr] gap-2.5"

const ROWS = [
  {
    name: "퓨어블리 진정 3종 세트 공구",
    brand: "퓨어블리",
    post: "노출중",
    status: { kind: "liveStudio", label: "진행중" },
  },
  {
    name: "여름 수분 세럼 공구",
    todo: "내 게시물 작성 필요",
    brand: "□□ 뷰티랩",
    post: "미작성",
    status: { kind: "prepStudio", label: "준비중" },
  },
  {
    name: "수분 크림 리필 공구",
    brand: "△△ 코스메틱",
    post: "예약",
    status: { kind: "ready", label: "준비완료" },
  },
  {
    name: "봄 클렌저 공구",
    brand: "□□ 뷰티랩",
    post: "종료",
    status: { kind: "liveStudio", label: "정산완료" },
  },
] as const

export function StudioConsoleExample() {
  return (
    <div className="relative min-w-0 flex-[1.4_1_520px] pt-11 pb-[52px]">
      <ConsoleWindow tone="studio" title="쇼룸 스튜디오 · 공구 관리">
        <div className="flex flex-col gap-3.5 px-5 py-[18px]">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 flex-col gap-1">
              <span className="text-[16px] font-bold text-ink">공구 관리</span>
              <span className="text-[12px] text-gray-6">
                공구 게시물을 쓰고, 준비 상황과 내 리워드를 확인합니다.
              </span>
            </div>
            <span className="flex-none rounded-lg bg-accent-soft px-[9px] py-[5px] text-[12px] font-bold text-accent-text">
              내 조치 필요 1
            </span>
          </div>
          <ConsoleTabs tone="studio" />
          <div className="flex flex-col text-[12px] text-gray-8">
            <div
              className={`${GRID} border-b border-gray-2 px-1 py-2 font-semibold text-gray-6`}
            >
              <span>공구명</span>
              <span>브랜드</span>
              <span className="max-pc:hidden">내 게시물</span>
              <span>상태</span>
            </div>
            {ROWS.map((row, i) => (
              <div
                key={row.name}
                className={`${GRID} items-center px-1 py-[11px] ${
                  i < ROWS.length - 1 ? "border-b border-gray-1" : ""
                } ${"todo" in row ? "bg-accent-row" : ""}`}
              >
                {"todo" in row ? (
                  <span className="flex min-w-0 flex-col gap-[3px]">
                    <span className="truncate font-semibold">{row.name}</span>
                    <span className="text-[11px] font-semibold text-accent-text">
                      {row.todo}
                    </span>
                  </span>
                ) : (
                  <span className="truncate font-semibold">{row.name}</span>
                )}
                <span className="truncate">{row.brand}</span>
                <span className="text-gray-7 max-pc:hidden">{row.post}</span>
                <ConsoleStatus kind={row.status.kind}>
                  {row.status.label}
                </ConsoleStatus>
              </div>
            ))}
          </div>
        </div>
      </ConsoleWindow>

      <div className="absolute top-0 -left-2 flex max-w-[280px] items-center gap-2.5 rounded-[14px] border border-gray-2 bg-white px-3.5 py-3 shadow-float">
        <span className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full bg-accent-soft text-[12px] font-extrabold text-accent-text">
          P
        </span>
        <span className="text-[12.5px] leading-[1.45] text-gray-8">
          <b>퓨어블리</b>에서 새 공구 제안이 도착했어요
        </span>
      </div>

      <div className="absolute -right-2 bottom-0 flex flex-col gap-1 rounded-[14px] bg-ink px-4 py-3 text-white shadow-float-dark">
        <span className="text-[11px] text-gray-5">봄 클렌저 공구 · 리워드</span>
        <span className="text-[18px] font-extrabold text-accent-on-dark">
          1,003,600원{" "}
          <span className="text-[12px] font-semibold text-white">
            지급 완료
          </span>
        </span>
      </div>
      <DemoNote className="absolute bottom-3.5 left-0" />
    </div>
  )
}
