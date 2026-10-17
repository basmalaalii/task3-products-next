'use client'

import { use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Package,
  Tag,
  RefreshCw,
} from 'lucide-react'
import { fetchProductById } from '@/lib/api'

// ── Star Rating ───────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.floor(rating)
        const half   = !filled && i < rating
        return (
          <Star
            key={i}
            size={18}
            strokeWidth={1.5}
            className={
              filled || half
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-200 fill-gray-200'
            }
          />
        )
      })}
      <span className="text-[14px] font-medium text-[#3B3B3B] ml-1">
        {rating.toFixed(1)}
      </span>
    </div>
  )
}

// ── Badge ─────────────────────────────────────────────────────────────────────

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#F6F6F6] text-[12px] font-medium text-[#3B3B3B] uppercase tracking-wider">
      {label}
    </span>
  )
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function ProductDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* image */}
        <div className="w-full lg:w-[480px] h-[480px] rounded-[16px] bg-gray-200 shrink-0" />
        <div className="flex-1 flex flex-col gap-4 pt-2">
          <div className="h-5 w-24 rounded bg-gray-200" />
          <div className="h-10 w-3/4 rounded bg-gray-200" />
          <div className="h-4 w-1/3 rounded bg-gray-200" />
          <div className="h-8 w-28 rounded bg-gray-200" />
          <div className="space-y-2 mt-4">
            {[80, 95, 70, 90, 60].map((w, i) => (
              <div key={i} className={`h-3 w-[${w}%] rounded bg-gray-200`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main Client Component ─────────────────────────────────────────────────────

interface ProductDetailViewProps {
  paramsPromise: Promise<{ id: string }>
}

export default function ProductDetailView({ paramsPromise }: ProductDetailViewProps) {
  const { id } = use(paramsPromise)
  const productId = Number(id)

  const { data: product, isLoading, isError, refetch } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
    enabled: !isNaN(productId),
  })

  return (
    <div className="min-h-screen bg-[#F6F6F6] px-6 py-6">
      {/* ── Back Button ──────────────────────────────────────────────────────── */}
      <Link
        href="/"
        className="
          inline-flex items-center gap-2 mb-8
          h-[44px] px-[20px]
          bg-white border border-[#D9D9D9] text-[#3B3B3B]
          text-[14px] font-medium rounded-[12px]
          hover:bg-gray-50 transition-colors
        "
      >
        <ArrowLeft size={16} strokeWidth={1.8} />
        Back to Products
      </Link>

      {/* ── Card ─────────────────────────────────────────────────────────────── */}
      <div className="w-full bg-white rounded-[12px] p-6 md:p-10 border border-gray-100 shadow-sm">

        {/* Loading */}
        {isLoading && <ProductDetailSkeleton />}

        {/* Error */}
        {isError && !isLoading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <p className="text-[16px] font-medium text-red-500">
              Failed to load product details.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="
                flex items-center gap-2
                h-[44px] px-[20px]
                bg-[#2B662D] text-white
                text-[14px] font-medium rounded-[8px]
                hover:bg-[#245526] transition-colors
              "
            >
              <RefreshCw size={16} />
              Retry
            </button>
          </div>
        )}

        {/* Content */}
        {!isLoading && !isError && product && (
          <div className="flex flex-col lg:flex-row gap-10 xl:gap-16">

            {/* ── Left — Image Gallery ─────────────────────────────────────── */}
            <div className="w-full lg:w-[480px] shrink-0">
              {/* Main image */}
              <div className="relative w-full h-[420px] bg-[#F6F6F6] rounded-[16px] overflow-hidden">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 1024px) 100vw, 480px"
                  priority
                />
              </div>

              {/* Thumbnail strip */}
              {product.images.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
                  {product.images.slice(0, 5).map((img, i) => (
                    <div
                      key={i}
                      className="
                        relative w-[80px] h-[80px] shrink-0
                        bg-[#F6F6F6] rounded-[10px] overflow-hidden
                        border-2 border-transparent
                        hover:border-[#2B662D] transition-colors cursor-pointer
                      "
                    >
                      <Image
                        src={img}
                        alt={`${product.title} view ${i + 1}`}
                        fill
                        className="object-contain p-1"
                        sizes="80px"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Right — Details ──────────────────────────────────────────── */}
            <div className="flex-1 flex flex-col justify-start pt-2">

              {/* Badges row */}
              <div className="flex items-center gap-2 flex-wrap mb-4">
                <Badge label={product.category} />
                {product.brand && <Badge label={product.brand} />}
              </div>

              {/* Title */}
              <h1 className="
                text-[28px] md:text-[36px] font-bold text-[#1a1a1a]
                leading-[1.15] tracking-tight uppercase mb-3
              ">
                {product.title}
              </h1>

              {/* Brand line */}
              {product.brand && (
                <div className="flex items-center gap-1.5 mb-4">
                  <Tag size={14} className="text-[#989898]" />
                  <span className="text-[14px] text-[#989898] font-medium">
                    {product.brand}
                  </span>
                </div>
              )}

              {/* Rating */}
              <div className="mb-5">
                <StarRating rating={product.rating} />
              </div>

              {/* Price */}
              <p className="text-[40px] font-bold text-[#2B662D] leading-none mb-6">
                ${product.price}
              </p>

              {/* Description */}
              <p className="text-[15px] font-medium text-[#3B3B3B] leading-relaxed mb-8 max-w-[560px]">
                {product.description}
              </p>

              {/* Stock indicator */}
              <div className="flex items-center gap-2 mb-8">
                <Package size={16} className={product.stock > 0 ? 'text-[#2B662D]' : 'text-red-400'} />
                <span className={`text-[13px] font-medium ${product.stock > 0 ? 'text-[#2B662D]' : 'text-red-400'}`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>

              {/* CTA */}
              <button
                type="button"
                disabled={product.stock === 0}
                className="
                  w-full max-w-[360px]
                  h-[56px] flex items-center justify-center gap-3
                  bg-[#2B662D] text-white
                  text-[15px] font-semibold uppercase tracking-wider
                  rounded-[12px]
                  hover:bg-[#245526] active:bg-[#1e4a1f]
                  disabled:opacity-40 disabled:cursor-not-allowed
                  transition-colors
                "
              >
                <ShoppingCart size={20} strokeWidth={1.8} />
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
