import { Request, Response } from 'express';
import { getHealthStatus } from './health.service';

export function getHealthStatusController(req: Request, res: Response) {
  const status = getHealthStatus();
  res.json(status);
}
