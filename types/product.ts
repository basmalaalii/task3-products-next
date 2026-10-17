/**
 * Product type — matches the shape returned by dummyjson.com/products
 */
export interface Product {
  id: number
  title: string
  description: string
  price: number
  /** Average rating out of 5 */
  rating: number
  /** Cover / thumbnail image URL */
  thumbnail: string
  /** Full-size image gallery URLs */
  images: string[]
  stock: number
  category: string
  /** Brand name (optional — not all dummyjson products have one) */
  brand?: string
}

/**
 * Paginated list response from GET /products
 */
export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

/**
 * Search response from GET /products/search?q=…
 * Shares the same shape as the paginated list response.
 */
export type ProductsSearchResponse = ProductsResponse
