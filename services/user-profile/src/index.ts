import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pino from 'pino';
import client from 'prom-client';

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const app = express();
app.use(cors());
app.use(express.json());

// Metrics
const register = new client.Registry();
client.collectDefaultMetrics({ register });
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'path', 'status'] as const,
  buckets: [0.025, 0.05, 0.1, 0.2, 0.5, 1, 2, 5]
});
register.registerMetric(httpRequestDuration);

app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer({ method: req.method, path: req.path });
  res.on('finish', () => {
    end({ status: String(res.statusCode) });
  });
  next();
});

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/metrics', async (_req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Minimal users stub
app.get('/v1/users/:userId', (req, res) => {
  const { userId } = req.params;
  res.json({ userId, name: 'Stub User', preferences: {} });
});

const port = Number(process.env.PORT || 8080);
app.listen(port, () => {
  logger.info({ port }, 'user-profile service listening');
});


