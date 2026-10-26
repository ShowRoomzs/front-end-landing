// CSS-3D iPhone mockups from the design boards
// "아이폰 2대 3D 목업 (히어로 삽입용)" (600×780) and
// "아이폰 1대 3D 목업 (쇼룸 섹션용)" (420×760).
import type { CSSProperties, ReactNode } from "react"
import { ShowroomFeedScreen, ShowroomScreen } from "./ShowroomScreens"

type Facing = "left" | "right"

const FRAME: Record<Facing, CSSProperties> = {
  // Phone turned to the left (its right edge visible).
  left: {
    background:
      "linear-gradient(160deg, #F2F3F5 0%, #B9BBC1 30%, #E4E5E9 60%, #9C9EA5 100%)",
    boxShadow:
      "9px 2px 0 #8C8E95, 10px 3px 0 #74767C, 60px 80px 90px rgba(26,27,31,0.28)",
  },
  // Phone turned to the right (its left edge visible).
  right: {
    background:
      "linear-gradient(200deg, #F2F3F5 0%, #B9BBC1 30%, #E4E5E9 60%, #9C9EA5 100%)",
    boxShadow:
      "-9px 2px 0 #8C8E95, -10px 3px 0 #74767C, -30px 90px 100px rgba(26,27,31,0.30)",
  },
}

const GLARE: Record<Facing, string> = {
  left: "linear-gradient(120deg, rgba(255,255,255,0) 55%, rgba(255,255,255,0.16) 70%, rgba(255,255,255,0) 85%)",
  right:
    "linear-gradient(120deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 30%)",
}

function PhoneFrame({
  facing,
  children,
}: {
  facing: Facing
  children: ReactNode
}) {
  return (
    <div
      className="relative box-border h-[868px] w-[414px] rounded-[68px] p-1"
      style={FRAME[facing]}
    >
      {facing === "left" ? (
        <div className="absolute top-[250px] -right-[11px] h-[110px] w-[5px] rounded-[0_3px_3px_0] bg-[#9C9EA5]" />
      ) : (
        <>
          <div className="absolute top-[180px] -left-[11px] h-[34px] w-[5px] rounded-[3px_0_0_3px] bg-[#9C9EA5]" />
          <div className="absolute top-[240px] -left-[11px] h-16 w-[5px] rounded-[3px_0_0_3px] bg-[#9C9EA5]" />
          <div className="absolute top-[316px] -left-[11px] h-16 w-[5px] rounded-[3px_0_0_3px] bg-[#9C9EA5]" />
        </>
      )}
      <div className="relative box-border h-[860px] w-[406px] rounded-[64px] bg-[#0B0B0D] p-2">
        <div className="relative h-[844px] w-[390px] overflow-hidden rounded-[56px] bg-white">
          {children}
          <div className="absolute top-[11px] left-[135px] h-[35px] w-[120px] rounded-[20px] bg-black" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: GLARE[facing] }}
          />
        </div>
      </div>
    </div>
  )
}

/** Positions a 414×868 phone and tilts it in 3D like the design. */
function Tilted({
  style,
  children,
}: {
  style: CSSProperties
  children: ReactNode
}) {
  return (
    <div className="absolute h-[868px] w-[414px] origin-center" style={style}>
      {children}
    </div>
  )
}

function Glow({ className }: { className: string }) {
  return (
    <div
      className={`absolute rounded-full ${className}`}
      style={{
        background:
          "radial-gradient(closest-side, #FFE3EA 0%, rgba(255,240,243,0.6) 55%, rgba(255,255,255,0) 100%)",
      }}
    />
  )
}

/** Hero mockup: showroom profile (front) and post feed (back). 600×780. */
export function PhoneDuo() {
  return (
    <div
      role="img"
      aria-label="아이폰 두 대에 표시된 쇼룸 화면 예시 — 왼쪽은 프로필과 진행 중인 공구, 오른쪽은 게시물 피드"
      className="relative h-[780px] w-[600px] font-sans"
    >
      <Glow className="top-[150px] left-[90px] h-[440px] w-[440px]" />
      <Tilted
        style={{
          left: 233,
          top: -74,
          zIndex: 1,
          transform:
            "perspective(2200px) rotateY(-18deg) rotateX(6deg) rotateZ(7deg) scale(0.66)",
        }}
      >
        <PhoneFrame facing="left">
          <ShowroomFeedScreen />
        </PhoneFrame>
      </Tilted>
      <Tilted
        style={{
          left: -42,
          top: 36,
          zIndex: 2,
          transform:
            "perspective(2200px) rotateY(16deg) rotateX(6deg) rotateZ(-6deg) scale(0.66)",
        }}
      >
        <PhoneFrame facing="right">
          <ShowroomScreen />
        </PhoneFrame>
      </Tilted>
    </div>
  )
}

/** Showroom-section mockup: the post feed. 420×760. */
export function PhoneSingle() {
  return (
    <div
      role="img"
      aria-label="아이폰에 표시된 쇼룸 게시물 피드 화면 예시"
      className="relative h-[760px] w-[420px] font-sans"
    >
      <Glow className="top-[170px] left-[30px] h-[360px] w-[360px]" />
      <Tilted
        style={{
          left: 3,
          top: -54,
          transform:
            "perspective(2200px) rotateY(-16deg) rotateX(6deg) rotateZ(5deg) scale(0.7)",
        }}
      >
        <PhoneFrame facing="left">
          <ShowroomFeedScreen />
        </PhoneFrame>
      </Tilted>
    </div>
  )
}
