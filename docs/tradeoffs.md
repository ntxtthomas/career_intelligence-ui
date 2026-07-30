### ADR's

**ADR-001**

- I chose a simple adapter and a minimal table first instead of building a full component architecture too early
- this keeps the learning loop focused on data flow and rendering, but it means the UI is still intentionally basic

**ADR-002**

- Decision: Keep the opportunity detail experience as an inline detail panel for now instead of introducing a dedicated show page.
- Rationale: This keeps the scope small, preserves the current list-first flow, and makes it easier to validate the data flow before adding routing.
- Consequences: The experience is simpler to build and understand now, and a proper show-page flow can be added later if needed.

**ADR-003**
