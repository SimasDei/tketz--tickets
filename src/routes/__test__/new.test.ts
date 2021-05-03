import request from 'supertest';

import { app } from '../../app';
import { Ticket } from '../../models';
import { signin } from '../../test';
import { mockTicket } from '../__mocks__';

it('should have a route handler that is listening to route /api/tickets for post requests', async () => {
  const response = await request(app).post('/api/tickets').send({});

  expect(response.status).not.toEqual(404);
});

it('should only be accessible if user is authenticated', async () => {
  await request(app).post('/api/tickets').send({}).expect(401);
});

it('should return status other then 401 if the user is singed in', async () => {
  const response = await request(app).post('/api/tickets').set('Cookie', signin()).send({});

  expect(response.status).not.toEqual(401);
});

it('should return an error if invalid title is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({
      title: '',
      price: mockTicket.price,
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({
      price: mockTicket.price,
    })
    .expect(400);
});

it('should return an error if invalid price is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({
      title: mockTicket.title,
      price: -10,
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({
      title: mockTicket.title,
    })
    .expect(400);
});

it('should create a ticker with valid parameters', async () => {
  let tickets = await Ticket.find({});
  expect(tickets).toHaveLength(0);

  await request(app).post('/api/tickets').set('Cookie', signin()).send(mockTicket).expect(201);

  tickets = await Ticket.find({});
  expect(tickets).toHaveLength(1);
});
