import express, { json } from 'express';
import 'express-async-errors';
import { NotFoundError, errorHandler, currentUser } from '@tketz/common';
import cookieSession from 'cookie-session';

import { createTickerRouter, showTicketRouter, ticketRouter } from './routes';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUser);

app.use(ticketRouter);
app.use(createTickerRouter);
app.use(showTicketRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
