import { Container } from "@/components/layout/Container"

export type FaqItem = { q: string; a: string }

/** FAQ list: question/answer rows between hairlines (always open, as designed). */
export function Faq({
  title,
  items,
  size = "large",
}: {
  title: string
  items: FaqItem[]
  /** `large` is the home FAQ; `small` the brand/influencer FAQ that follows a stepper. */
  size?: "large" | "small"
}) {
  const large = size === "large"
  return (
    <Container
      as="section"
      narrow
      className={`flex flex-col gap-8 ${large ? "py-24" : "pb-24"}`}
    >
      <h2
        className={`font-black tracking-[-0.03em] ${
          large
            ? "text-[clamp(28px,3.2vw,40px)]"
            : "text-[clamp(26px,3vw,36px)]"
        }`}
      >
        {title}
      </h2>
      <div className="flex flex-col border-t border-gray-3">
        {items.map(item => (
          <div
            key={item.q}
            className="flex flex-col gap-2 border-b border-gray-3 py-6"
          >
            <h3 className="text-[18px] font-bold">{item.q}</h3>
            <p className="text-[16px] leading-[1.7] text-gray-7">{item.a}</p>
          </div>
        ))}
      </div>
    </Container>
  )
}
