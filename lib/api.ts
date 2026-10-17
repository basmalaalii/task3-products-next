import type {
  Product,
  ProductsResponse,
  ProductsSearchResponse,
} from '@/types/product'

const BASE_URL = 'https://dummyjson.com'

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`)

  if (!res.ok) {
    throw new Error(
      `API request failed: ${res.status} ${res.statusText} — ${path}`
    )
  }

  return res.json() as Promise<T>
}

// ─── Query Functions ───────────────────────────────────────────────────────────

/**
 * Fetch a paginated list of products.
 * @param limit  Number of products per page (default 30)
 * @param skip   Number of products to skip for pagination (default 0)
 */
export async function fetchProducts(
  limit = 30,
  skip = 0
): Promise<ProductsResponse> {
  return apiFetch<ProductsResponse>(
    `/products?limit=${limit}&skip=${skip}`
  )
}

/**
 * Search products by keyword.
 * @param query  The search keyword
 * @param limit  Number of results per page (default 30)
 * @param skip   Number of results to skip (default 0)
 */
export async function searchProducts(
  query: string,
  limit = 30,
  skip = 0
): Promise<ProductsSearchResponse> {
  const q = encodeURIComponent(query.trim())
  return apiFetch<ProductsSearchResponse>(
    `/products/search?q=${q}&limit=${limit}&skip=${skip}`
  )
}

/**
 * Fetch a single product by its ID.
 * @param id  The product's numeric ID
 */
export async function fetchProductById(id: number): Promise<Product> {
  return apiFetch<Product>(`/products/${id}`)
}
