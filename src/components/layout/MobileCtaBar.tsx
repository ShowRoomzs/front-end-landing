import { CtaLink } from "@/components/ui/CtaLink"

export type MobileCta = { label: string; to: string; tone: "accent" | "ink" }

/**
 * Bottom-fixed CTA bar shown only in the mobile layout (≤720px), plus the
 * spacer that keeps the footer from hiding underneath it.
 */
export function MobileCtaBar({ ctas }: { ctas: MobileCta[] }) {
  return (
    <>
      <div className="hidden h-[84px] max-pc:block" />
      <div className="fixed inset-x-0 bottom-0 z-20 hidden gap-2 border-t border-gray-2 bg-[rgba(255,255,255,0.96)] px-4 pt-2.5 pb-3.5 max-pc:flex">
        {ctas.map(cta => (
          <CtaLink
            key={cta.label}
            to={cta.to}
            className={`flex min-h-[50px] min-w-0 flex-[1_1_0] items-center justify-center rounded-xl font-bold text-white ${
              cta.tone === "accent" ? "bg-accent" : "bg-ink"
            } ${ctas.length > 1 ? "text-[15px]" : "text-[16px]"}`}
          >
            {cta.label}
          </CtaLink>
        ))}
      </div>
    </>
  )
}
