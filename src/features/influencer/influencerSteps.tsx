// /influencer 「시작은 이렇게」 stepper: step copy (example cards live in InfluencerStepExamples).
import type { StepperStep } from "@/components/stepper/Stepper"
import {
  ShowroomSetupExample,
  ProposalExample,
  ContractOpenExample,
  RewardExample,
  ResultExample,
} from "./InfluencerStepExamples"

export const INFLUENCER_STEPS: StepperStep[] = [
  {
    title: "신청 · 쇼룸 개설",
    desc: "가입하고 내 쇼룸을 꾸밉니다.",
    detail:
      "가입 후 인스타그램 계정을 연결하고, 쇼룸 이름과 소개를 정하면 나만의 쇼룸이 열립니다.",
    example: <ShowroomSetupExample />,
  },
  {
    title: "제안 · 협의",
    desc: "브랜드 제안을 확인하고 조건을 협의합니다.",
    detail:
      "브랜드가 보낸 공구 제안에서 기간·공구가·내 수익 조건을 확인하고, 소통 스레드에서 조건을 맞춥니다.",
    example: <ProposalExample />,
  },
  {
    title: "계약 · 공구 오픈",
    desc: "전자서명하면 쇼룸에 공구가 세팅됩니다.",
    detail:
      "협의한 조건으로 만들어진 표준 계약서에 전자서명하면, 계약 내용대로 내 쇼룸에 공구가 세팅됩니다.",
    example: <ContractOpenExample />,
  },
  {
    title: "판매 · 정산",
    desc: "공구가 끝나면 계약대로 리워드가 정산됩니다.",
    detail:
      "공구가 끝나면 계약 조건대로 판매 리워드가 정산되고, 고정 지급비와 합친 총 리워드를 쇼룸 스튜디오에서 확인합니다.",
    example: <RewardExample />,
  },
  {
    title: "성과 관리",
    desc: "내 공구가 얼마나 팔렸고 누가 샀는지 확인합니다.",
    detail:
      "정산이 끝난 공구마다 내 리워드와 구매전환율, 팔로워 증감, 쇼룸 유입 경로를 확인하고, 다시 함께하고 싶은 브랜드에 재협업을 제안합니다.",
    example: <ResultExample />,
  },
]
