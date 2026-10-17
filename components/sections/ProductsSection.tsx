'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Sparkles,
  Wind,
  Palette,
  Bath,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  PackageSearch,
} from 'lucide-react'
import ProductCard from '@/components/ui/ProductCard'
import { fetchProducts, searchProducts } from '@/lib/api'
import type { Product } from '@/types/product'

// ─── Constants ────────────────────────────────────────────────────────────────

const LIMIT = 8

const CATEGORIES = [
  { label: 'Skincare',   icon: Sparkles, apiSlug: 'skin-care'   },
  { label: 'Haircare',   icon: Wind,     apiSlug: 'hair-care'   },
  { label: 'Makeup',     icon: Palette,  apiSlug: 'makeup'      },
  { label: 'Bath & Body',icon: Bath,     apiSlug: 'fragrances'  },
] as const

// ─── Skeleton Card ────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-[#F6F6F6] rounded-[12px] p-[16px] flex flex-col items-center gap-4 animate-pulse">
      {/* image placeholder */}
      <div className="w-[182px] h-[180px] rounded-[8px] bg-gray-200" />
      {/* title */}
      <div className="h-4 w-3/4 rounded bg-gray-200" />
      {/* category */}
      <div className="h-3 w-1/2 rounded bg-gray-200" />
      {/* price */}
      <div className="h-4 w-1/3 rounded bg-gray-200" />
    </div>
  )
}

// ─── Filter Button ────────────────────────────────────────────────────────────

interface FilterBtnProps {
  label: string
  active: boolean
  onClick: () => void
  icon?: React.ElementType
}

function FilterBtn({ label, active, onClick, icon: Icon }: FilterBtnProps) {
  if (active && !Icon) {
    // "All Products" active style
    return (
      <button
        type="button"
        onClick={onClick}
        className="
          h-[44px] px-[16px] py-[8px]
          bg-[#F3F3F3] text-[#3B3B3B]
          font-medium text-[14px] italic
          rounded-[8px] flex items-center justify-center
          cursor-pointer transition-colors
        "
      >
        {label}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        h-[44px] px-[16px] py-[8px]
        font-medium text-[14px] rounded-[8px]
        flex items-center gap-[8px] cursor-pointer
        transition-colors
        ${active
          ? 'bg-[#2B662D] text-white border border-[#2B662D]'
          : 'bg-white border border-[#D9D9D9] text-[#3B3B3B] hover:bg-gray-50'
        }
      `}
    >
      {Icon && <Icon size={20} strokeWidth={1.6} />}
      {label}
    </button>
  )
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface ProductsSectionProps {
  searchQuery: string
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProductsSection({ searchQuery }: ProductsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [skip, setSkip] = useState(0)

  // Reset to first page on filter/search change
  const handleCategory = (slug: string | null) => {
    setActiveCategory(slug)
    setSkip(0)
  }

  // ── Data Fetching ──────────────────────────────────────────────────────────
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['products', searchQuery, activeCategory, skip],
    queryFn: () => {
      if (searchQuery.trim()) {
        return searchProducts(searchQuery, LIMIT, skip)
      }
      return fetchProducts(LIMIT, skip)
    },
  })

  const products: Product[] = data?.products ?? []
  const total: number       = data?.total    ?? 0
  const totalPages          = Math.ceil(total / LIMIT)
  const currentPage         = Math.floor(skip / LIMIT) + 1

  const canPrev = skip > 0
  const canNext = skip + LIMIT < total

  // ── Filtered client-side by category (dummyjson free tier has limited category endpoints) ──
  const displayed = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <section
      aria-label="Products listing"
      className="
        w-full bg-white rounded-[12px]
        p-6 md:p-8 my-6
        border border-gray-100 shadow-sm
      "
    >
      {/* ── Section Title ────────────────────────────────────────────────── */}
      <h2 className="text-[20px] font-bold text-[#3B3B3B] mb-6 uppercase tracking-wide">
        {searchQuery ? `Results for "${searchQuery}"` : 'All Products'}
      </h2>

      {/* ── Category Filter Bar ──────────────────────────────────────────── */}
      <div
        role="group"
        aria-label="Filter by category"
        className="flex items-center gap-[8px] flex-wrap mb-8"
      >
        {/* All Products */}
        <FilterBtn
          label="All Products"
          active={activeCategory === null}
          onClick={() => handleCategory(null)}
        />

        {/* Category buttons */}
        {CATEGORIES.map(({ label, icon, apiSlug }) => (
          <FilterBtn
            key={apiSlug}
            label={label}
            icon={icon}
            active={activeCategory === apiSlug}
            onClick={() => handleCategory(apiSlug)}
          />
        ))}
      </div>

      {/* ── Loading State — 8 Skeletons ──────────────────────────────────── */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: LIMIT }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* ── Error State ──────────────────────────────────────────────────── */}
      {isError && !isLoading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <p className="text-[16px] font-medium text-red-500">
            Something went wrong while loading products.
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

      {/* ── Empty State ───────────────────────────────────────────────────── */}
      {!isLoading && !isError && displayed.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <PackageSearch size={48} strokeWidth={1.2} className="text-gray-300" />
          <p className="text-[16px] font-medium text-[#989898]">
            No products found.
          </p>
          <p className="text-[13px] text-gray-400">
            Try a different search term or category.
          </p>
        </div>
      )}

      {/* ── Products Grid ────────────────────────────────────────────────── */}
      {!isLoading && !isError && displayed.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayed.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* ── Pagination Controls ─────────────────────────────────────── */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-10">
              {/* Previous */}
              <button
                type="button"
                disabled={!canPrev}
                onClick={() => setSkip((s) => Math.max(0, s - LIMIT))}
                className="
                  flex items-center gap-2
                  h-[44px] px-[20px]
                  bg-white border border-[#D9D9D9] text-[#3B3B3B]
                  text-[14px] font-medium rounded-[8px]
                  hover:bg-gray-50 disabled:opacity-40
                  disabled:cursor-not-allowed transition-colors
                "
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              {/* Page counter */}
              <span className="text-[14px] font-medium text-[#3B3B3B] min-w-[80px] text-center">
                {currentPage} / {totalPages}
              </span>

              {/* Next */}
              <button
                type="button"
                disabled={!canNext}
                onClick={() => setSkip((s) => s + LIMIT)}
                className="
                  flex items-center gap-2
                  h-[44px] px-[20px]
                  bg-[#2B662D] text-white
                  text-[14px] font-medium rounded-[8px]
                  hover:bg-[#245526] disabled:opacity-40
                  disabled:cursor-not-allowed transition-colors
                "
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}
