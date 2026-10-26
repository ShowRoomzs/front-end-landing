// /brand 「입점부터 첫 공구까지」 stepper: step copy (example cards live in BrandStepExamples).
import type { StepperStep } from "@/components/stepper/Stepper"
import {
  SignupExample,
  ProposalExample,
  ContractExample,
  SalesExample,
  ResultExample,
} from "./BrandStepExamples"

export const BRAND_STEPS: StepperStep[] = [
  {
    title: "입점 신청",
    desc: "브랜드 정보를 입력하고 파트너센터에 가입합니다.",
    detail:
      "브랜드명과 사업자 정보, 담당자 연락처를 입력하면 파트너센터 계정이 만들어집니다.",
    example: <SignupExample />,
  },
  {
    title: "제안 · 협의",
    desc: "인플루언서에게 공구를 제안하고 소통 스레드에서 조건을 협의합니다.",
    detail:
      "DM 대신 소통 스레드에서 공구를 제안하고, 기간과 공구가 같은 조건을 주고받습니다.",
    example: <ProposalExample />,
  },
  {
    title: "계약 · 전자서명",
    desc: "표준 계약서로 체결하면 공구 판매가 세팅됩니다.",
    detail:
      "협의한 조건으로 표준 계약서가 만들어지고, 양쪽이 전자서명하면 공구 게시물과 판매가 계약대로 세팅됩니다.",
    example: <ContractExample />,
  },
  {
    title: "판매 · 정산",
    desc: "쇼룸에서 판매가 시작되고, 종료 후 계약대로 정산됩니다.",
    detail:
      "인플루언서의 쇼룸에서 공구가 진행되고, 공구가 끝나면 계약 조건대로 정산됩니다.",
    example: <SalesExample />,
  },
  {
    title: "성과 관리",
    desc: "정산이 끝난 공구의 성과를 공동구매 단위로 분석합니다.",
    detail:
      "공동구매마다 확정 거래액·전환율·ROAS·재구매율과 쇼룸 유입 경로를 분석하고, 다음 공구를 기획하거나 같은 인플루언서에게 재협업을 제안하는 근거로 씁니다.",
    example: <ResultExample />,
  },
]
