import { cn } from '@/lib/utils'

interface HeroSectionProps {
  className?: string
}

export default function HeroSection({ className }: HeroSectionProps) {
  return (
    <section
      aria-label="Hero banner"
      className={cn(
        'w-full min-h-[260px]',
        'bg-white rounded-[12px]',
        'px-[24px] py-[32px]',
        'flex flex-col justify-between',
        'gap-4',
        'shadow-sm border border-gray-100',
        className
      )}
    >
      {/* ── Title — top-left ──────────────────────────────────────────────── */}
      <h1
        className="
          text-[40px] md:text-[72px]
          font-bold text-black
          leading-[1.1] tracking-tight
          self-start
        "
      >
        Explore Our Shop
      </h1>

      {/* ── Paragraph — shifts right with ml-auto ────────────────────────── */}
      <p
        className="
          text-[16px] font-medium text-[#3B3B3B]
          max-w-[550px] leading-relaxed text-left
          ml-auto
        "
      >
        From skincare to makeup, our platform features a wide range of products
        that cater to all your beauty needs. We strive to provide our customers
        with a luxury shopping experience, from browsing through our carefully
        selected products to receiving them in our signature packaging. Shop
        with us for the ultimate in beauty luxury.
      </p>
    </section>
  )
}
