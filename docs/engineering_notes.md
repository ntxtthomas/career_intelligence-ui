### INITIAL INSTRUCTIONS

I am building a react ui to call on a fully CRUD Rails app I've already deployed. That Rails app does not have a RESTFUL API yet.

This app will not be replacing the exisiting front end but will be a seperate frontend better for learning because it forces me to confront API boundaries, CORS, authentication, client-side routing, caching, and state management. I will keep the deployed Rails monolith running and treat this UI as a separate frontend consuming the Rails API.

---

## STRATEGY

Build → Get Stuck → Learn → Improve
Work in coach mode. Allow me to suffer, but not struggle.

---

## APPROACH

Start with one vertical slice:
Opportunities list → opportunity details → create/edit opportunity → loading/error/empty states.

Then add:

- Filtering and search
- Pagination
- Companies and contacts
- Dashboard metrics
- Authentication
- TanStack Query
- Optimistic updates
- Reusable forms
- Error boundaries

---

## TECH STACK

**Frontend**
React
TypeScript
Vite
Tailwind CSS
TanStack Query

**Backend**
Ruby on Rails API
PostgreSQL

**Authentication**
Devise JWT

**Testing**
RSpec
React Testing Library

**Deployment**
Render
(or Fly.io)

---

## MASTERY GOAL PROGRESSION

- React
- TypeScript
- Tailwind
- REST APIs
- TanStack Query
- React Router
- Authentication
- Testing

---

## RULES

1. update TIL daily
2. Explain verbally, what I did today (include ADR's)

## TIL JOURNAL

**MAJOR TAKEAWAYS**

Data fetching and shaping should live separately from rendering

- the API helper in opportunities.ts is the adapter
- App.tsx is the place that renders what the UI needs

State was split into meaningful pieces

- opportunities
- loading - error

The UI was shaped into a table for the index view

- this made the list easier to read and prepares the app for pagination

Date formatting was moved into the presentation layer

- the raw API value remains intact
- the UI decides how to display it

**TIL SUMMARY**

- Separated API fetching from UI rendering
- Introduced explicit state for loading and error
- Mapped backend fields into a simpler frontend shape
- Formatted date values in the presentation layer
- Built a first table-based opportunities index
- Learned that auth is not yet truly implemented; the app is only conditionally attaching a token if one exists in storage

**ADR-001**

- I chose a simple adapter and a minimal table first instead of building a full component architecture too early
- this keeps the learning loop focused on data flow and rendering, but it means the UI is still intentionally basic

---

**MAJOR TAKEAWAYS**

- The UI now supports a list view for opportunities with basic pagination and a detail panel that appears when a row is selected.
- The app is still using a simple, separated architecture: the API layer handles fetching, and the component handles rendering and state.
- The current implementation is a “detail view” experience, not a dedicated show page or route.
- A successful API response does not guarantee the UI will display it unless the component state is correctly wired to the JSX.

**TIL SUMMARY**

- React state is the bridge between async fetches and what the user sees.
- try/catch/finally is a straightforward pattern for async data loading.
- Loading and error states should be managed explicitly so the UI can respond clearly.
- “Detail” and “show page” are different patterns; the former is an inline panel, while the latter usually requires routing.

**ADR-002**

- Decision: Keep the opportunity detail experience as an inline detail panel for now instead of introducing a dedicated show page.
- Rationale: This keeps the scope small, preserves the current list-first flow, and makes it easier to validate the data flow before adding routing.
- Consequences: The experience is simpler to build and understand now, and a proper show-page flow can be added later if needed.

---

**MAJOR TAKEAWAYS**

**TIL SUMMARY**

**ADR-00X**
