'use client'

import { Search, ShoppingCart } from 'lucide-react'

interface HeaderProps {
  searchQuery: string
  onSearchChange: (val: string) => void
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="flex items-center justify-between gap-3 w-full py-2">

      {/* ── Logo Card ──────────────────────────────────────────────────────── */}
      <div className="w-[200px] h-[60px] bg-white rounded-[12px] flex items-center justify-center p-2 shrink-0">
        {/* Logo mark — crystal diamond shape matching the screenshot */}
        <div className="w-[98px] h-[24px] flex items-center justify-center gap-1.5">
          {/* Diamond icon (inline SVG to avoid external image dependency) */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M9 1L1 7l8 10 8-10L9 1z"
              fill="#1a1a1a"
              stroke="#1a1a1a"
              strokeWidth="0.5"
            />
          </svg>
          <span className="text-[14px] font-semibold text-[#1a1a1a] tracking-widest uppercase">
            crystal.
          </span>
        </div>
      </div>

      {/* ── Navigation Cards ────────────────────────────────────────────────── */}
      <nav className="flex items-center gap-3" aria-label="Primary navigation">

        {/* SHOP — active indicator */}
        <div
          role="button"
          tabIndex={0}
          className="w-[140px] h-[60px] bg-white rounded-[12px] px-[8px] py-[16px]
                     flex flex-col items-center justify-center relative cursor-pointer
                     hover:shadow-sm transition-shadow"
          aria-current="page"
        >
          <span className="text-[14px] font-medium text-[#3B3B3B] uppercase tracking-wider">
            Shop
          </span>
          {/* Active dot */}
          <span className="w-[6px] h-[6px] rounded-full bg-[#3B3B3B] absolute bottom-2" />
        </div>

        {/* COLLECTIONS */}
        <div
          role="button"
          tabIndex={0}
          className="w-[140px] h-[60px] bg-white rounded-[12px] px-[8px] py-[16px]
                     flex flex-col items-center justify-center relative cursor-pointer
                     hover:shadow-sm transition-shadow"
        >
          <span className="text-[14px] font-medium text-[#3B3B3B] uppercase tracking-wider">
            Collections
          </span>
        </div>

        {/* CONTACT */}
        <div
          role="button"
          tabIndex={0}
          className="w-[140px] h-[60px] bg-white rounded-[12px] px-[8px] py-[16px]
                     flex flex-col items-center justify-center relative cursor-pointer
                     hover:shadow-sm transition-shadow"
        >
          <span className="text-[14px] font-medium text-[#3B3B3B] uppercase tracking-wider">
            Contact
          </span>
        </div>

        {/* ABOUT */}
        <div
          role="button"
          tabIndex={0}
          className="w-[140px] h-[60px] bg-white rounded-[12px] px-[8px] py-[16px]
                     flex flex-col items-center justify-center relative cursor-pointer
                     hover:shadow-sm transition-shadow"
        >
          <span className="text-[14px] font-medium text-[#3B3B3B] uppercase tracking-wider">
            About
          </span>
        </div>
      </nav>

      {/* ── Search Card ─────────────────────────────────────────────────────── */}
      <div
        className="w-[356px] h-[60px] bg-white rounded-[12px] px-[16px] py-[8px]
                   flex items-center justify-between
                   border border-gray-100 shrink-0"
      >
        <input
          id="product-search"
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products…"
          aria-label="Search products"
          className="flex-1 bg-transparent text-[14px] text-[#3B3B3B]
                     placeholder:text-[#C0C0C0] outline-none border-none"
        />
        <Search
          size={18}
          strokeWidth={1.8}
          className="text-[#3B3B3B] shrink-0 ml-2"
          aria-hidden="true"
        />
      </div>

      {/* ── View Cart Button ─────────────────────────────────────────────────── */}
      <button
        type="button"
        className="w-[200px] h-[60px] bg-[#2B662D] rounded-[12px] px-[8px] py-[16px]
                   flex items-center justify-center gap-[8px]
                   cursor-pointer shrink-0
                   hover:bg-[#245526] active:bg-[#1e4a1f]
                   transition-colors"
        aria-label="View cart"
      >
        <ShoppingCart size={18} strokeWidth={1.8} className="text-white" aria-hidden="true" />
        <span className="text-[14px] font-medium text-white uppercase">
          View Cart
        </span>
      </button>

    </header>
  )
}
