import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchOpportunityById, type OpportunityShowItem } from './api/opportunities'

export function OpportunityShowPage() {
    const { id } = useParams()
    const [opportunity, setOpportunity] = useState<OpportunityShowItem | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!id) return

        const loadOpportunity = async () => {
            setLoading(true)
            setError(null)
            try {
                const data = await fetchOpportunityById(Number(id))
                setOpportunity(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch opportunity') 
            } finally {
                setLoading(false)
            }
        }

        void loadOpportunity()
    }, [id])

    if (loading) return <p>Loading opportunity...</p>
    if (error) return <p>{error}</p>
    if (!opportunity) return <p>Opportunity not found.</p>

    return (
        <main>
            <Link to="/" style={{ display: 'inline-block', marginBottom: '16px' }}>
                &larr; Back to Opportunities
            </Link>
            <h2>{opportunity.title}</h2>
            <p>{opportunity.status}</p>
            <p>{opportunity.created_at}</p>
        </main>
    )
}

