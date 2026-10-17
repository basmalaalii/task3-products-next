import type { Metadata } from 'next'
import ProductDetailView from './ProductDetailView'

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Product Details | Beauty Products',
  description: 'View detailed information about this beauty product.',
}

// ── Page — Server Component ───────────────────────────────────────────────────
// params is a Promise in Next.js 16 — passed directly to the Client Component
// which unwraps it with React.use()

export default function ProductPage(props: PageProps<'/products/[id]'>) {
  return <ProductDetailView paramsPromise={props.params} />
}
