import express from 'express';
import { healthRouter } from './health/health.routes';
import { processorRouter } from './processor/processor.routes';

export function createApp() {
  const app = express();

  // Middlewares
  app.use(express.json());

  app.use('/health', healthRouter);
  app.use('/processor', processorRouter);

  return app;
}
