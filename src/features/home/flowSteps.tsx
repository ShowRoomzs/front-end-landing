// Home 「계약만 하면, 판매부터 정산까지 이어집니다」 stepper: step copy
// (협의 → 계약 → 공구 → 주문 현황 → 정산 → 성과); cards live in FlowExamples.
import type { StepperStep } from "@/components/stepper/Stepper"
import {
  NegotiationExample,
  ContractExample,
  OpenExample,
  OrderStatusExample,
  SettlementExample,
  PerformanceExample,
} from "./FlowExamples"

export const HOME_FLOW_STEPS: StepperStep[] = [
  {
    title: "연결 · 협의",
    desc: "인플루언서와 연결하고 소통 스레드에서 조건을 협의합니다.",
    detail:
      "쇼룸명 검색이나 연결 코드로 인플루언서와 연결하고, DM 대신 소통 스레드에서 기간·공구가 같은 조건을 맞춥니다.",
    example: <NegotiationExample />,
  },
  {
    title: "표준 계약 · 전자서명",
    desc: "협의한 조건으로 표준 계약서를 만들고 서명합니다.",
    detail:
      "협의한 조건으로 표준 계약서가 만들어지고, 브랜드와 인플루언서가 전자서명으로 체결합니다.",
    example: <ContractExample />,
  },
  {
    title: "쇼룸에 공구 오픈",
    desc: "계약 내용대로 공구가 만들어지고 쇼룸에서 판매됩니다.",
    detail:
      "계약이 체결되면 계약 내용대로 공구가 만들어지고, 준비가 끝나면 인플루언서의 쇼룸에 공구가 열립니다. 팔로워는 외부몰 이동 없이 구매합니다.",
    auto: true,
    example: <OpenExample />,
  },
  {
    title: "진행 상황 공유",
    desc: "같은 진행 상황을 각자의 화면에서 확인합니다.",
    detail:
      "주문과 배송 진행 상황을 브랜드는 파트너센터에서, 인플루언서는 쇼룸 스튜디오에서 똑같이 확인합니다. 배송·반품 문의는 운영팀이 응대합니다.",
    auto: true,
    example: <OrderStatusExample />,
  },
  {
    title: "계약대로 정산",
    desc: "공구가 끝나면 계약 조건대로 정산됩니다.",
    detail:
      "공구가 끝나면 확정 거래액에서 인플루언서 리워드와 PG 결제 수수료를 뺀 금액이 브랜드에 정산됩니다. 베타 기간 거래 수수료는 0%입니다.",
    auto: true,
    example: <SettlementExample />,
  },
  {
    title: "성과 관리",
    desc: "정산이 끝난 공구의 판매·전환·소비자를 분석합니다.",
    detail:
      "정산이 끝난 공구마다 확정 거래액과 전환율, 재구매율, 구매 소비자 연령대를 확인합니다. 다음 공구를 기획하는 근거가 됩니다.",
    auto: true,
    example: <PerformanceExample />,
  },
]
