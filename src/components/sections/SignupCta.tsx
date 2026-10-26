import type { ReactNode } from "react"
import { Container } from "@/components/layout/Container"
import { CtaLink } from "@/components/ui/CtaLink"

/** Dark closing CTA of the brand/influencer pages (anchor target #signup). */
export function SignupCta({
  title,
  lead,
  cta,
  note,
}: {
  title: ReactNode
  lead: string
  cta: { label: string; to: string }
  note: string
}) {
  return (
    <section id="signup" className="bg-ink text-white">
      <Container
        narrow
        className="flex flex-col items-center gap-6 py-24 text-center"
      >
        <h2 className="text-[clamp(30px,3.8vw,46px)] leading-[1.3] font-black tracking-[-0.03em]">
          {title}
        </h2>
        <p className="text-[17px] leading-[1.7] text-gray-4">{lead}</p>
        <CtaLink
          to={cta.to}
          className="flex min-h-[58px] w-full max-w-[360px] items-center justify-center rounded-xl bg-accent text-[18px] font-bold text-white"
        >
          {cta.label}
        </CtaLink>
        <p className="text-[13px] text-gray-5">{note}</p>
      </Container>
    </section>
  )
}
