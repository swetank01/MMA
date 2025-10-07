## User Story Template

Use this template to define user stories that deliver clear customer value, with testable acceptance criteria and links to roadmap milestones.

### Context
- Why this matters: <brief business/technical rationale>
- Links: Roadmap milestone (Phase/Sprint), design/docs, related issues/PRs

### User story (INVEST)
As a <user/persona>, I want <capability>, so that <benefit/outcome>.

### Acceptance criteria
Use Gherkin-style or bullet checks. Aim for 3–7 crisp criteria.
```
Given <initial state>
When <action>
Then <observable outcome>
```
- [ ] <criterion 1>
- [ ] <criterion 2>
- [ ] <criterion 3>

### Non-functional requirements
- Performance/SLO: <e.g., P95 latency < 200ms>
- Security/Privacy: <authz, PII handling, scopes>
- Observability: <metrics, logs, traces to add>

### Dependencies & risks
- Dependencies: <services, schemas, feature flags>
- Risks/mitigations: <brief bullets>

### Out of scope
- <explicitly excluded aspects to avoid scope creep>

### Implementation notes (optional)
- High-level approach, API changes, data model, flags

### Tracking fields
- Labels: `type/story`, `area/<service>`, `prio/p?`
- Milestone: `Sprint N` (per Roadmap)
- Epic/Phase: `Phase X <name>`
- Project fields: Story Points, Owner, Target Sprint

### Definition of Ready (DoR)
- [ ] User value clear; scope understood
- [ ] Acceptance criteria defined and testable
- [ ] Dependencies identified; blockers addressed or planned
- [ ] Designs/API specs linked (if applicable)
- [ ] Test/monitoring approach noted

### Definition of Done (DoD)
- [ ] Code merged to `main`; CI green; feature flag if risky
- [ ] Acceptance tests and contract/E2E updated/passing
- [ ] Metrics/logs/traces added; dashboards/alerts updated if needed
- [ ] Docs/runbooks updated; rollout/rollback documented

### Estimation
- Story points (Fibonacci 1,2,3,5,8): <value>
- If >5–8, split into smaller stories.

### Demo notes
- What to show to confirm acceptance criteria are met


