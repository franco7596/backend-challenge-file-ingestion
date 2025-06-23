import { Router } from 'express';
import { startProcessingController } from './processor.controller';

export const processorRouter = Router();

processorRouter.post('/', startProcessingController);