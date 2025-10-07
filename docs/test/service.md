Here are curl commands you can run after docker compose up:

- Health
```bash
curl -i http://localhost/health
```

- Get user by ID
```bash
curl -i http://localhost/v1/users/123
```

- Metrics (Prometheus text format)
```bash
curl -s http://localhost/metrics
```

- Traefik dashboard (HTML; better in a browser)
```bash
curl -I http://localhost:8081
# or open in browser: http://localhost:8081
```

Optional: pretty-print JSON responses
```bash
curl -s http://localhost/v1/users/123 | jq
```