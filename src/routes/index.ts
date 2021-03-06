import express, { Request, Response } from 'express';

import { Ticket } from '../models';

const router = express.Router();

router.get('/api/tickets', async (req: Request, res: Response) => {
  const tickets = await Ticket.find({});

  res.send(tickets);
});

export { router as ticketRouter };
export * from './new';
export * from './update';
export * from './show';
