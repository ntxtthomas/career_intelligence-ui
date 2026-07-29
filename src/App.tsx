import { useEffect, useState } from 'react'
import './App.css'
import { fetchOpportunitiesPage, type OpportunityListItem } from './api/opportunities'

function App() {
  const [opportunities, setOpportunities] = useState<OpportunityListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
                <tr key={opportunity.id}>
                  <td>{opportunity.title}</td>
                  <td>{opportunity.status}</td>
                  <td>{formatDate(opportunity.created_at)}</td>
                </tr>
              ))}
            </tbody>
        </table>
      )}
    </main>
  )
}

export default App