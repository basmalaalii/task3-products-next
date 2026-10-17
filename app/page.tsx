'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import HeroSection from '@/components/sections/HeroSection'
import ProductsSection from '@/components/sections/ProductsSection'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <div className="px-6 pt-4">
        {/* ── Navigation Header ── */}
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* ── Hero Banner ── */}
        <HeroSection className="mt-6" />

        {/* ── Products Grid + Filters ── */}
        <ProductsSection searchQuery={searchQuery} />
      </div>
    </div>
  )
}
