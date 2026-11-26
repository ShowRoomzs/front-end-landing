import { Link } from "react-router-dom"
import { ROUTES } from "@/config/links"
import { BUSINESS as B } from "@/constants/business"
import { PLACEHOLDER as P } from "@/constants/placeholders"

/** A value still in its "[...]" placeholder form is left out of the footer until it is decided. */
function decided(value: string) {
  return !value.startsWith("[")
}

/** Joins the label-value pairs that are decided with " · ". */
function line(items: [label: string, value: string][]) {
  return items
    .filter(([, value]) => decided(value))
    .map(([label, value]) => `${label} ${value}`)
    .join(" · ")
}

export function Footer() {
  return (
    <footer className="border-t border-gray-2 bg-gray-0">
      <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-6 px-6 py-12 text-[14px] leading-[1.8] text-gray-7">
        <div className="flex flex-col gap-1">
          <p className="font-logo text-[20px] font-semibold text-ink">
            SHOWROOMZ
          </p>
          <p>
            {line([
              ["상호", B.companyName],
              ["대표", B.ceoName],
              ["사업자등록번호", B.businessNumber],
              ["통신판매업신고", B.mailOrderNumber],
            ])}
          </p>
          <p>
            {line([
              ["주소", B.address],
              ["대표번호", B.phone],
              ["문의", B.email],
            ])}
          </p>
          <p>
            {B.responsibilityNotice}
            {decided(P.legalNotice) && ` ${P.legalNotice}`}
          </p>
        </div>
        <nav aria-label="약관" className="flex flex-wrap items-start gap-5">
          <Link to={ROUTES.privacy} className="font-bold text-ink underline">
            개인정보처리방침
          </Link>
          <Link to={ROUTES.terms} className="text-gray-7 underline">
            이용약관
          </Link>
          <Link to={ROUTES.accountDeletion} className="text-gray-7 underline">
            계정 삭제
          </Link>
        </nav>
      </div>
    </footer>
  )
}
