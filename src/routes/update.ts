import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest, NotFoundError, NotAuthorizedError, requireAuth } from '@tketz/common';

import { Ticket } from '../models';

const router = express.Router();

router.put(
  '/api/tickets/:id',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      params: { id },
      body: { title, price },
      currentUser,
    } = req;

    const ticket = await Ticket.findById(id);
    if (!ticket) throw new NotFoundError();

    if (ticket.userId !== currentUser!.id) throw new NotAuthorizedError();

    ticket.set({ title, price });
    await ticket.save();

    res.send(ticket);
  }
);

export { router as updateTicketRouter };
