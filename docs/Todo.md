# Modular microservices blueprint

This is a practical, opinionated blueprint for building a modular, scalable, and extensible microservice platform. It includes a decision playbook, checklists, and copy‑pasteable structures you can adopt. Use it as a living document.

### How to use this doc
- Decide your first scope (Auth, User, Product, Order, Gateway).
- Use the Decision Guides to pick tech choices fast.
- Follow Quickstart to scaffold and run locally.
- Apply the Checklists to reach production‑readiness.

### Goals (non‑negotiables)
- Modular: single responsibility per service, explicit API contracts.
- Scalable: horizontal scale per service; resource limits and autoscaling.
- Extensible: add/replace services without coupling.
- Observable & Reliable: metrics, logs, traces, health checks, SLOs.
- Secure by default: centralized auth, least privilege, secrets hygiene.

### Architecture overview
+------------+        +-----------+         +----------------+
|  Clients   | <-----> | API GW    | <-----> | Backend Services|
+------------+        +-----------+         +----------------+
                            |  \
                            |   +--> Auth Service
                            |   +--> User Profile
                            |   +--> Product Service
                            |   +--> Order Service
                            |   +--> Notifications
                            +---> Event Bus (Kafka/NATS)

### Core components (at a glance)
- API Gateway: Traefik/Envoy/NGINX. TLS, routing, rate‑limit, auth verify, circuit breaking.
- Auth Server: OAuth2/OIDC. Keycloak, Ory Hydra+Kratos, or JWT service with refresh.
- Service Mesh (optional): Istio/Linkerd for mTLS, traffic shaping, telemetry.
- Event Bus: Kafka / NATS / RabbitMQ for async decoupling.
- Datastores: per‑service Postgres/MongoDB/Redis.
- Shared Infra: Logging (ELK/Loki), Metrics (Prometheus+Grafana), Tracing (Jaeger/Tempo), Secrets (Vault/K8s).

### Service catalog (starter set)
- API Gateway — reverse proxy, validation, auth enforcement
- Auth — login, token mint/rotation, sessions
- User Profile — metadata, preferences, avatars
- Product/Catalog — product models, search indices
- Order — ordering, payment orchestration
- Notification — email, push, SMS via adapters
- Billing (optional) — invoices, subscriptions
- BFF (optional) — web/mobile backend‑for‑frontend

### Communication patterns
- Synchronous: HTTP/REST or gRPC. Keep payloads small. Version APIs.
- Asynchronous: domain events on the bus for eventual consistency (OrderCreated → PaymentRequested → NotificationQueued).
- Idempotency: enforce where needed (payments, order creation).

### API design & contracts
- Use OpenAPI for REST, protobuf for gRPC.
- Maintain a versioned API registry in `api-specs/`.
- Enforce request validation at the gateway and run contract tests in CI.
- Example REST paths:
  - GET /v1/users/{userId}
  - POST /v1/orders

### Data ownership & patterns
- Database‑per‑service to minimize coupling.
- Postgres for relational, MongoDB for document‑heavy, Redis for cache/ephemeral state.
- Per‑service migrations (Flyway/Liquibase/sqitch/Prisma Migrate).

### Security baseline checklist
- [ ] Centralized identity (short‑lived JWT access + refresh tokens)
- [ ] mTLS or signed service tokens for service‑to‑service calls
- [ ] Secrets in Vault or K8s secrets with strict RBAC
- [ ] Rate limiting and WAF at the gateway
- [ ] Rotate credentials and tokens; audit trails enabled

### Observability & reliability checklist
- [ ] Prometheus metrics with Grafana dashboards (service + platform)
- [ ] Structured JSON logs shipped to Elasticsearch/Loki
- [ ] OpenTelemetry tracing to Jaeger/Tempo
- [ ] Readiness/liveness endpoints wired to rolling restarts
- [ ] SLOs/SLIs for latency and error rate on critical endpoints

### Deployment & infrastructure
- Target: Kubernetes (GKE/EKS/AKS).
- Use Deployments, HPA (Horizontal Pod Autoscaler), PodDisruptionBudgets.
- Package with Helm per service; provide an umbrella chart for the platform.
- CI/CD (GitHub Actions/GitLab CI): build → test → push image → deploy to staging → smoke tests → promote.
- Tag images with semver + commit SHA. Prefer canary or blue/green for critical paths.

### Local development workflow
- Docker Compose for small teams; Skaffold/Tilt for iterative K8s dev.
- Dev conveniences: hot reload, seed scripts, test fixtures, localstack‑style emulators when useful.

### Repository layout (monorepo friendly)
Option A: Monorepo (recommended for small‑medium teams)
repo/
├─ services/
│  ├─ auth/
│  ├─ user-profile/
│  ├─ product/
│  └─ order/
├─ infra/
│  ├─ k8s/ (helm charts)
│  └─ terraform/
├─ api-specs/
└─ tools/

Option B: Polyrepo for larger orgs; keep a central infra repo and API spec repo.

### Opinionated tech stack (sane defaults)
- Language: Go for services (low latency, simple static binaries). Node/TS for BFFs.
- API: gRPC internal, REST (OpenAPI) external.
- Auth: Keycloak or Ory.
- Event Bus: Kafka (throughput) or NATS (lightweight, simple ops).
- Databases: Postgres primary; Redis for caching.
- Infra: Kubernetes, Helm, Prometheus, Grafana, Jaeger, ELK/Loki.

### Testing strategy
- Unit tests per service.
- Consumer‑driven contract tests (Pact or similar).
- Integration tests with ephemeral infra (testcontainers) or K8s test namespace.
- End‑to‑end tests in staging before production promotion.

### CI/CD pipeline (concrete steps)
1) Lint + unit tests
2) Build + containerize (multi‑stage Dockerfile)
3) Push image to registry
4) Run integration/contract tests against staging
5) Deploy to staging (helm)
6) Run smoke tests
7) Promote to production (manual approval or automated canary)

### Operations
- Backups & disaster recovery for databases; test restores regularly.
- Capacity planning and chaos experiments.
- Cost control: autoscaling, right‑sized requests/limits.

### Decision guides (pick fast, with guardrails)
- Language:
  - Go if you need low latency, concurrency, simple deploys.
  - Node/TS if team familiarity and BFF needs dominate.
- API protocol:
  - REST for external/public; gRPC for internal service‑to‑service.
- Event bus:
  - Kafka for high throughput and durable streams.
  - NATS for simplicity, small ops footprint, request‑reply patterns.
- Database:
  - Postgres default. MongoDB for document‑heavy, flexible schemas. Redis for cache/queues.
- Auth:
  - Managed (Auth0/Cognito) for speed, self‑host (Keycloak/Ory) for control.
- Orchestration:
  - Compose for local; Kubernetes for staging/prod.

### Quickstart (choose → scaffold → run)
1) Pick initial services: Auth, User Profile, Product, Order, Gateway.
2) Choose stack: Go+Postgres+Kafka or Node+Postgres+NATS.
3) Generate starter artifacts (ask for: service scaffold, k8s manifests, CI templates).
4) Run locally with Compose or Tilt; wire metrics/logs from day one.

### Starter artifacts you can request
- Multi‑stage Dockerfile template
- Kubernetes Deployment + Service + HPA manifests
- Example OpenAPI spec for `user-profile`
- Example Helm chart layout
- CI pipeline templates (GitHub Actions/GitLab CI)

### Next steps (actionable)
- [ ] Pick initial surface area (Auth/User/Gateway/Product/Order)
- [ ] Choose tech stack (Go+Postgres+Kafka or Node+Postgres+NATS)
- [ ] Request: service boilerplate OR k8s manifests OR CI templates
- [ ] Define SLOs for first two critical endpoints
- [ ] Stand up basic observability (metrics, logs, traces)