import { Router } from 'express';
import { getHealthStatusController } from './health.controller';

export const healthRouter = Router();

healthRouter.get('/', getHealthStatusController);
