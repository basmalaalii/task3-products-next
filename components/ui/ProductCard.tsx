import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types/product'
import { Card, CardContent } from '@/components/ui/card'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="block w-full h-full">
      {/*
       * shadcn <Card> — root wrapper
       * h-full + flex flex-col + justify-between → uniform card heights in grid
       */}
      <Card
        className="
          h-full flex flex-col items-center justify-between
          bg-[#F6F6F6] rounded-[12px] p-[16px]
          cursor-pointer w-full
          hover:shadow-md transition-shadow duration-200
        "
      >
        {/* ── Image area ─────────────────────────────────────────────────── */}
        <div
          className="
            flex items-center justify-center
            relative overflow-hidden
            w-[182.48px] h-[180px] shrink-0
          "
        >
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-contain"
            sizes="182px"
          />
        </div>

        {/*
         * shadcn <CardContent> — text block
         * p-0 removes the default 24px padding so Figma spacing wins.
         */}
        <CardContent className="w-full text-center p-0 mt-3">
          {/* Title — line-clamp-1 keeps all cards at the same height */}
          <p
            className="
              font-bold text-[18px] text-[#3B3B3B]
              leading-[140%] tracking-[-0.02em]
              text-center uppercase
              line-clamp-1
            "
          >
            {product.title}
          </p>

          {/* Category */}
          <p
            className="
              font-normal text-[14px] text-[#989898]
              text-center mt-[4px]
            "
          >
            {product.category}
          </p>

          {/* Price */}
          <p
            className="
              font-medium text-[18px] text-[#3B3B3B]
              text-center mt-[12px]
            "
          >
            ${product.price}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
