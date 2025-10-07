## GitHub Operating Guide

Standards and workflows for planning and executing work in GitHub: issues, user stories, labels, milestones, projects, and PRs. Aligned with `Roadmap.md` (phases/sprints) and `Todo.md` (architecture).

## Core concepts
- Work item types:
  - User Story — customer value, INVEST, acceptance criteria.
  - Task — engineering work not directly user-facing.
  - Bug — defect with steps to reproduce and expected/actual behavior.
  - Spike — timeboxed research with clear exit criteria.
- Timeboxes:
  - 2-week sprints mapped to milestones (Sprint N) per `Roadmap.md`.
  - Phases map to long-running milestones as epics.

## Labels (standard set)
- Type: `type/story`, `type/task`, `type/bug`, `type/spike`, `type/chore`
- Area: `area/gateway`, `area/auth`, `area/user`, `area/product`, `area/order`, `area/notification`, `area/infra`, `area/observability`
- Priority: `prio/p0`, `prio/p1`, `prio/p2`
- Status: `status/blocked`, `status/needs-spec`, `status/needs-design`, `status/ready`, `status/in-progress`, `status/review`, `status/qa`
- Security/Compliance: `sec/privacy`, `sec/secret`, `sec/authz`
- Good-first: `good-first-issue`

## Milestones and projects
- Create milestones per sprint: `Sprint 1`, `Sprint 2`, ... aligned to `Roadmap.md`.
- Create epic milestones per phase: `Phase 0 Foundations`, `Phase 1 Core`, ...
- Use Projects (classic or v2) as the kanban/board:
  - Columns: Backlog → Ready → In Progress → In Review → Done
  - Fields: Story Points (1,2,3,5,8), Target Sprint, Owner, Risk

## Issue templates (copy into .github/ISSUE_TEMPLATE/)

### User Story
```
name: User Story
description: Template for user stories (INVEST, acceptance criteria)
title: "[Story] <concise outcome>"
labels: [type/story]
body:
  - type: textarea
    attributes:
      label: Context
      description: Why this matters; link to Roadmap.md milestone
  - type: textarea
    attributes:
      label: User story
      description: As a <user>, I want <capability>, so that <benefit>.
  - type: textarea
    attributes:
      label: Acceptance criteria
      description: Gherkin-style Given/When/Then or bullet list
  - type: input
    attributes:
      label: Definition of Ready checklist URL
  - type: input
    attributes:
      label: Definition of Done checklist URL
```

### Bug
```
name: Bug Report
description: Report a bug with steps to reproduce
title: "[Bug] <summary>"
labels: [type/bug, prio/p1]
body:
  - type: textarea
    attributes:
      label: Summary
  - type: textarea
    attributes:
      label: Steps to reproduce
  - type: textarea
    attributes:
      label: Expected behavior
  - type: textarea
    attributes:
      label: Actual behavior
  - type: textarea
    attributes:
      label: Logs / screenshots
```

### Task
```
name: Engineering Task
description: Non-user-facing work
title: "[Task] <summary>"
labels: [type/task]
body:
  - type: textarea
    attributes:
      label: Goal
  - type: textarea
    attributes:
      label: Plan / subtasks
  - type: textarea
    attributes:
      label: Risks / rollbacks
```

### Spike
```
name: Spike
description: Timeboxed research item
title: "[Spike] <question to answer>"
labels: [type/spike]
body:
  - type: textarea
    attributes:
      label: Hypothesis / questions
  - type: input
    attributes:
      label: Timebox (hours)
  - type: textarea
    attributes:
      label: Exit criteria / artifacts
```

## User Story guidance
- INVEST: Independent, Negotiable, Valuable, Estimable, Small, Testable.
- Acceptance criteria: concrete, testable; prefer Given/When/Then.
- Link to `Roadmap.md` milestone and Project field `Target Sprint`.
- Split stories that exceed 5–8 points; avoid spanning multiple sprints.

## Definitions
### Definition of Ready (DoR)
- Clear user value and scope; acceptance criteria defined
- Dependencies identified and unblocked or planned
- Design/API docs linked if applicable
- Test approach understood; monitoring requirements captured

### Definition of Done (DoD)
- Code merged to `main`, CI green; feature flagged if risky
- Logs/metrics/traces added; dashboards/alerts updated if needed
- Contract/E2E tests updated; docs/runbooks updated

## Estimation
- Story points: Fibonacci (1,2,3,5,8). Use 1–3 for most stories.
- Calibration examples:
  - 1: Small refactor, one file, no tests changed
  - 2: Add one endpoint with tests
  - 3: New small feature across service + gateway
  - 5: Multi-service change or new service skeleton
  - 8: Epic chunk, split if possible

## Sprint workflow
1) Triage: label, assign area/type/priority, add to Backlog.
2) Grooming: ensure DoR, estimate, set Target Sprint.
3) Planning: pull Ready stories into sprint milestone.
4) Execution: move across board columns; keep PRs small.
5) Review: demo against acceptance criteria.
6) Retro: capture improvements; adjust WIP limits.

## Pull requests
- Branch naming: `feature/<area>-<short-desc>` or `fix/<area>-<short-desc>`
- Require at least 1 review; CI checks must pass; link issue with `Fixes #<id>`
- PR template includes: problem, solution, screenshots/logs, test plan, risk/rollback

## Milestone mapping to Roadmap
- Sprint milestones: `Sprint 1` .. `Sprint 10`
- Epic milestones: `Phase 0 Foundations` .. `Phase 4 Scale & Compliance`
- Example linkage:
  - Story: "As a user, I can authenticate" → Sprint 3, Phase 1.1
  - Task: "Add gateway request validation" → Sprint 3, Phase 1.1
  - Bug: "Token refresh fails after 15m" → Sprint 4, Phase 1.1

## Automation tips
- Use GitHub Actions to auto-apply labels based on paths (`area/*`).
- Auto-move cards by status label to the correct project column.
- Enforce PR title conventions and changelog generation with Actions.

## References
- `Roadmap.md` — phases, sprints, acceptance criteria
- `Todo.md` — architecture and service catalog


