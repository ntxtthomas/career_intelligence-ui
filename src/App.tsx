import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import { fetchOpportunitiesPage, type OpportunityListItem } from './api/opportunities'

function App() {
  const [opportunities, setOpportunities] = useState<OpportunityListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [nextCursor, setNextCursor] = useState<string | null>(null)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  
  
  const navigate = useNavigate()

  useEffect(() => {
    const loadOpportunities = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchOpportunitiesPage()
        setOpportunities(data.opportunities)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    void loadOpportunities()
  }, [])

  if (loading) {
    return <p>Loading opportunities...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  const handleLoadMore = async () => {
    if (!hasMore || loadingMore) return

    setLoadingMore(true)

    try {
    const data = await fetchOpportunitiesPage(nextCursor)
    setOpportunities((prev) => [...prev, ...data.opportunities])
    setNextCursor(data.meta.next_cursor)
    setHasMore(data.meta.has_more)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoadingMore(false)
    }
  }

  const handleSelectOpportunity = (id: number) => {
    navigate(`/opportunities/${id}`)
  }

  const formatDate = (value: string) => {
    const date = new Date(value)
    return new Intl.DateTimeFormat('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: '2-digit',
    }).format(date)
  }

  return (
    <main>
      {opportunities.length === 0 ? (
        <p>No opportunities found.</p>
      ) : (
        <table>
          <caption>Opportunities</caption>
            <thead>
              <tr>
                <th>Position</th>
                <th>Status</th>
                <th>Application Date</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map((opportunity: any) => (
                <tr key={opportunity.id} onClick={() => handleSelectOpportunity(opportunity.id)}>
                  <td>{opportunity.title}</td>
                  <td>{opportunity.status}</td>
                  <td>{formatDate(opportunity.created_at)}</td>
                </tr>
              ))}
            </tbody>
        </table>
      )}
      {hasMore && (
        <button onClick={handleLoadMore} disabled={loadingMore}>
          {loadingMore ? 'Loading...' : 'Load More'}
        </button>
      )}
    </main>
  )
}

export default App