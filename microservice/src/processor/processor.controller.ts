import { Request, Response } from 'express';
import { startProcessing } from './processor.service';

export function startProcessingController(req: Request, res: Response) {
  startProcessing();
  res.status(200).send('Processing started');
}
