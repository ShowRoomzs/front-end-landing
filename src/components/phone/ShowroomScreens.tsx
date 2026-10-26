// Static rebuilds of the design's 390×844 showroom screens
// ("쇼룸 화면 — 상단" and "쇼룸 화면 — 게시물"), shown inside phone frames.
import type { ReactNode } from "react"
import { IMAGES } from "@/assets/images"
import { AppBar, HeartIcon, PostAuthor, StatusBar } from "./AppChrome"

const NAME = "지유의 데일리 라이프"

function Screen({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-[844px] w-[390px] flex-col overflow-hidden bg-white font-sans text-[#0F0F0F]">
      {children}
    </div>
  )
}

/** 쇼룸 화면 — 상단: profile, follow button and the running group buy. */
export function ShowroomScreen() {
  return (
    <Screen>
      <StatusBar />
      <AppBar />

      <div className="px-3.5 pt-5 pb-[18px]">
        <div className="flex items-center gap-3.5">
          <div className="box-border h-[72px] w-[72px] flex-none rounded-full border-[1.5px] border-accent p-[3px]">
            <img
              src={IMAGES.avatarJiyoo}
              alt=""
              className="block h-full w-full rounded-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[16px] font-bold tracking-[-0.4px]">
              {NAME}
            </div>
            <div className="mt-1 text-[12.5px] text-[#737373]">
              @daily_jiyoo
            </div>
            <div className="mt-2 flex items-center gap-2.5 text-[12.5px] text-[#3C3C3C]">
              <span>
                게시물 <b className="font-semibold">1,248</b>
              </span>
              <span className="h-2.5 w-px bg-[#DEDEE0]" />
              <span>
                팔로워 <b className="font-semibold">27.5만</b>
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3.5 text-[13.5px] leading-[1.7] text-[#3C3C3C]">
          좋은 건 같이 나누고 싶은 마음으로 일상 속 작은 행복을 기록해요 :)
        </div>
        <div className="mt-3.5 flex gap-2">
          <div className="flex h-11 flex-1 items-center justify-center rounded-lg bg-accent text-[14px] font-semibold text-white">
            팔로우
          </div>
          <div className="box-border flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-[#E3E3E5]">
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#3C3C3C"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" />
              <circle cx="12" cy="12" r="4.1" />
              <circle cx="16.8" cy="7.2" r="0.6" fill="#3C3C3C" />
            </svg>
          </div>
        </div>
      </div>

      <div className="h-[5px] flex-none bg-[#F7F7F8]" />

      <div className="px-3.5 pt-[18px] pb-3 text-[15px] font-bold tracking-[-0.2px]">
        진행 중인 공구
      </div>

      <PostAuthor
        avatar={IMAGES.avatarJiyoo}
        name={NAME}
        time="2시간"
        className="px-3.5 pb-2.5"
      />
      <div className="flex gap-1.5 px-3.5 pb-2">
        <span className="rounded-lg bg-accent px-2 py-1 text-[11px] font-semibold text-white">
          공동구매 D-3
        </span>
      </div>
      <div className="px-3.5">
        <div className="text-[16px] leading-[1.45] font-bold tracking-[-0.4px]">
          요즘 제일 잘 쓰는 퓨어블리 진정 라인
        </div>
        <div className="mt-1 text-[13.5px] leading-[1.6] text-[#3C3C3C]">
          한 달 동안 토너부터 크림까지 써본 조합이에요. 예민할 때 제일 먼저 손이
          가요. <span className="text-[#8E8E8E]">더 보기</span>
        </div>
      </div>
      <div className="mt-3.5 flex items-center gap-3 px-[22px]">
        <img
          src={IMAGES.productSet}
          alt=""
          className="h-[90px] w-[90px] flex-none rounded object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="text-[13.5px] leading-[1.45] text-[#2E2E2E]">
            퓨어블리 티트리 진정 3종 세트 (토너·세럼·크림)
          </div>
          <div className="mt-2 text-[12px] text-[#B5B5B5] line-through">
            68,000
          </div>
          <div className="mt-[5px] flex items-baseline gap-1.5 text-[15px] font-bold">
            <span className="text-accent">32%</span>
            <span>45,900원</span>
          </div>
        </div>
      </div>
      <div className="mx-[22px] mt-3 flex h-[38px] items-center justify-center rounded-lg border border-[#E3E3E5] text-[12.5px] font-semibold text-[#3C3C3C]">
        상품 2개 더보기
      </div>
      <div className="flex items-center gap-[7px] px-3.5 pt-3.5">
        <HeartIcon filled />
        <span className="text-[13.5px] font-semibold">1,284</span>
      </div>

      <div className="mt-4 h-[5px] flex-none bg-[#F7F7F8]" />
      <PostAuthor
        avatar={IMAGES.avatarJiyoo}
        name={NAME}
        time="어제"
        className="px-3.5 pt-3.5 pb-2.5"
      />
      <img
        src={IMAGES.postToner}
        alt=""
        className="block min-h-0 w-full flex-1 object-cover object-top"
      />
    </Screen>
  )
}

/** 쇼룸 화면 — 게시물: the showroom's post feed. */
export function ShowroomFeedScreen() {
  return (
    <Screen>
      <StatusBar />
      <AppBar title={NAME} />

      <PostAuthor
        avatar={IMAGES.avatarJiyoo}
        name={NAME}
        time="어제"
        className="px-3.5 pt-3.5 pb-2.5"
        more
      />
      <img
        src={IMAGES.postToner}
        alt="퓨어블리 토너를 든 인플루언서 사진"
        className="block h-[462px] w-[390px] flex-none object-cover"
      />
      <div className="flex items-center justify-center gap-[5px] pt-[11px] pb-[3px]">
        <span className="h-1.5 w-1.5 rounded-[100px] bg-[#0F0F0F]" />
        <span className="h-1.5 w-1.5 rounded-[100px] bg-[#DEDEE0]" />
        <span className="h-1.5 w-1.5 rounded-[100px] bg-[#DEDEE0]" />
        <span className="h-1 w-1 rounded-[100px] bg-[#EAEAEC]" />
      </div>
      <div className="flex items-center gap-[7px] px-3.5 pt-1">
        <HeartIcon />
        <span className="text-[13.5px] font-semibold">862</span>
      </div>
      <div className="px-3.5 pt-[9px] text-[13.5px] leading-[1.55]">
        아침저녁 루틴 정리했어요. 세안하고 토너로 결 정리하는 게 시작이에요{" "}
        <span className="text-[#8E8E8E]">더 보기</span>
      </div>

      <PostAuthor
        avatar={IMAGES.avatarJiyoo}
        name={NAME}
        time="3일 전"
        className="mt-4 border-t-[0.5px] border-[#EFEFEF] px-3.5 pt-3.5 pb-2.5"
      />
      <img
        src={IMAGES.postRoutine}
        alt=""
        className="block min-h-0 w-full flex-1 object-cover object-[center_30%]"
      />
    </Screen>
  )
}
