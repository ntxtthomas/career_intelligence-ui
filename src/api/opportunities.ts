
const BASE_URL = 'http://localhost:3000'
const API_V1 = `${BASE_URL}/api/v1`
const OPPORTUNITIES_URL = `${API_V1}/opportunities`

const TOKEN_KEY = 'token'

export interface OpportunityListItem {
  id: number
  title: string
  company_name: string | null
  status: string | null
  created_at: string
}

export interface OpportunitiesPaginationMeta {
  next_cursor: string | null
  has_more: boolean
  returned_count: number
}

export interface OpportunitiesResponse {
  opportunities: OpportunityListItem[]
  meta: OpportunitiesPaginationMeta
}

const getToken = () => localStorage.getItem(TOKEN_KEY)

const getAuthHeaders = () => {
  const headers: Record<string, string> = {
    Accept: 'application/json',
  }

  const token = getToken()
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

export const fetchOpportunitiesPage = async (
  cursor?: string | null,
): Promise<OpportunitiesResponse> => {
  const query = cursor ? `?cursor=${encodeURIComponent(cursor)}` : ''

  const response = await fetch(`${OPPORTUNITIES_URL}${query}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch opportunities: ${response.status}`)
  }

  const payload = (await response.json()) as {
    data?: unknown[]
    meta?: {
      next_cursor?: string | null
      has_more?: boolean
      limit?: number
    }
  }

  const rawOpportunities = Array.isArray(payload.data) ? payload.data : []

  const opportunities = rawOpportunities.map((item) => {
    const opportunity = item as {
      id: number
      position_title?: string | null
      status?: string | null
      created_at?: string | null
    }

    return {
      id: opportunity.id,
      title: opportunity.position_title ?? 'Untitled',
      company_name: null,
      status: opportunity.status ?? null,
      created_at: opportunity.created_at ?? '',
    }
  })

  return {
    opportunities,
    meta: {
      next_cursor: payload.meta?.next_cursor ?? null,
      has_more: payload.meta?.has_more ?? false,
      returned_count: payload.meta?.limit ?? opportunities.length,
    },
  }
}