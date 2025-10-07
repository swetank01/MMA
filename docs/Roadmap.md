## Roadmap

This roadmap translates the blueprint in `Todo.md` into phases, milestones, and a sprint plan with concrete deliverables and acceptance criteria. Assumes 2-week sprints and an initial small team (2–4 engineers, 1 DevOps, 1 PM/EM). Adjust capacity as needed.

## Principles
- Deliver thin vertical slices per milestone (working software over exhaustive setup).
- Production-readiness checklists accompany each milestone.
- Trunk-based development with CI from Sprint 1, CD by Sprint 3.
- Observability and security from day one (not a bolt-on later).

## Phase 0 — Foundations (Sprints 1–2)
### Milestone 0.1: Repo, CI skeleton, local dev
- Deliverables:
  - Monorepo layout created (`services/`, `infra/`, `api-specs/`, `tools/`).
  - CI pipeline (lint, unit tests, build container images).
  - Local dev via Docker Compose; one sample service builds and runs.
- Acceptance criteria:
  - `main` branch green on CI; images built and cached.
  - Developers can run `docker compose up` and hit a health endpoint.

### Milestone 0.2: Observability & security baselines
- Deliverables:
  - Prometheus + Grafana stack (local), JSON logging, OpenTelemetry SDK integrated.
  - Basic dashboards (service latency, error rate, CPU/mem) and trace export (local Jaeger/Tempo).
  - Secret management approach defined (K8s secrets or Vault) and documented.
- Acceptance criteria:
  - Health, metrics, and trace spans visible for the sample service locally.
  - Secrets not committed; repo pre-commit checks in place.

## Phase 1 — Core platform services (Sprints 3–4)
### Milestone 1.1: API Gateway and Auth (MVP)
- Deliverables:
  - API Gateway configured (routing, TLS locally, request validation stubs).
  - Auth service integrated (Keycloak/Ory) or lightweight JWT issuer with refresh.
  - Service-to-service auth pattern defined (mTLS or signed service tokens).
- Acceptance criteria:
  - Protected endpoint requires valid access token; 401/403 paths covered.
  - Contract tests validate gateway request schemas.

### Milestone 1.2: User Profile service (CRUD + OpenAPI)
- Deliverables:
  - `user-profile` service with OpenAPI spec, migrations, and CRUD endpoints.
  - Postgres provisioned locally; migrations automated on startup.
  - Contract tests and golden API examples committed in `api-specs/`.
- Acceptance criteria:
  - Create/read/update/delete user works end-to-end via gateway with auth.
  - Service exposes metrics, logs, and traces visible in dashboards.

## Phase 2 — Product and Order (Sprints 5–6)
### Milestone 2.1: Product/Catalog service (read-heavy)
- Deliverables:
  - `product` service with search-ready schema and read APIs.
  - Caching strategy defined (Redis) for hot reads.
  - API versioning policy documented; pagination and filters implemented.
- Acceptance criteria:
  - P95 read latency meets agreed SLO locally under basic load.
  - Cache hit ratio observable; cache fallback safe.

### Milestone 2.2: Order service + async events
- Deliverables:
  - `order` service with create/read endpoints and idempotent order creation.
  - Event bus integrated (Kafka or NATS). Domain events: OrderCreated, PaymentRequested.
  - Basic saga/process manager documented for order/payment flow.
- Acceptance criteria:
  - Duplicate order requests do not double-create (idempotency key).
  - Events published and consumed are visible in metrics/logs.

## Phase 3 — Notifications and Production hardening (Sprints 7–8)
### Milestone 3.1: Notification adapters
- Deliverables:
  - `notification` service with email/SMS/push adapters (provider mocked for non-prod).
  - Dead-letter handling and retry policy documented and implemented.
- Acceptance criteria:
  - NotificationQueued events create provider requests; failures retried; DLQ observable.

### Milestone 3.2: Production hardening
- Deliverables:
  - Kubernetes manifests/Helm charts for all services; HPA and PDB configured.
  - Canary or blue/green deployment strategy implemented for at least one service.
  - Runbooks and on-call docs started; synthetic smoke tests added.
- Acceptance criteria:
  - Staging environment deploys on merge; smoke tests gate promotion.
  - Rollback procedure verified in staging.

## Phase 4 — Scale, SLOs, and Compliance (Sprints 9–10)
### Milestone 4.1: Performance & cost
- Deliverables:
  - Load test suite with targets per service; autoscaling tuned.
  - Resource requests/limits sized; caching tuned; indices validated.
- Acceptance criteria:
  - Services meet SLOs under target load; cost per request tracked.

### Milestone 4.2: Security & compliance
- Deliverables:
  - Secrets rotation playbook; token rotation scheduled.
  - Audit logging for sensitive actions; backup/restore drills performed.
- Acceptance criteria:
  - Passing security checklist; last restore test < 30 days.

## Sprint plan (2-week cadence)
### Sprint 1
- Repo layout, CI lint/test/build
- Local Compose stack, sample service with health/metrics/traces
- Docs: contribution guide, runbook skeleton

### Sprint 2
- Observability dashboards, tracing exporter
- Secrets approach, pre-commit and license checks
- Risk register v1

### Sprint 3
- API Gateway baseline (routing + validation stubs)
- Auth provider integration (login, token mint)
- Contract test harness

### Sprint 4
- User Profile service (CRUD, OpenAPI, migrations)
- Gateway auth enforcement; e2e happy path

### Sprint 5
- Product service (read APIs, pagination, cache)
- API versioning and golden examples

### Sprint 6
- Order service (idempotent create)
- Event bus integration and domain events

### Sprint 7
- Notification service and adapters
- DLQ + retry policy; provider mocks

### Sprint 8
- Helm charts, HPA, PDB; staging CD
- Canary/blue-green for one service; smoke tests

### Sprint 9
- Load tests; autoscaling/cost tuning
- Index/caching improvements

### Sprint 10
- Secrets/token rotation; audit logging
- Backup/restore drills; compliance checklist

## Dependencies
- Gateway depends on Auth readiness for protected routes.
- Order depends on Product and User for references and on Event bus.
- Notification depends on event flow from Order.

## Risks & mitigations
- Over-engineering early: enforce thin vertical slices, defer mesh until needed.
- Vendor lock-in: abstract providers behind adapters; maintain golden contracts.
- Operational surprises: smoke tests + runbooks + regular restore/fire drills.

## Definitions of done (per milestone)
- Code merged to `main`, CI green, images built and tagged.
- Dashboards/alerts updated; runbook entries added.
- Security and observability checklists ticked for the scope.


