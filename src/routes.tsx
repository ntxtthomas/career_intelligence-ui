import { createBrowserRouter } from 'react-router-dom'
import { OpportunityShowPage } from './OpportunityShowPage'
import App from './App'

export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/opportunities/:id', element: <OpportunityShowPage /> },
])