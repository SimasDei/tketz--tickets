import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@tketz/common';

import { Ticket, TicketAttrs } from '../models';

const router = express.Router();

router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { price, title }: TicketAttrs = req.body;

    const newTicket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });
    await newTicket.save();
    res.status(201).send(newTicket);
  }
);

export { router as createTickerRouter };
