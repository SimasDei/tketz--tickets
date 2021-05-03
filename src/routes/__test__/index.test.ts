import { response } from 'express';
import request from 'supertest';

import { app } from '../../app';
import { signin } from '../../test';

const mockTicket = {
  title: 'Foo Fighters',
  price: 20,
};

const createTicket = () => {
  return request(app).post('/api/tickets').set('Cookie', signin()).send(mockTicket).expect(201);
};

it('should fetch a list of tickets', async () => {
  await Promise.all([createTicket(), createTicket(), createTicket()]);

  const response = await request(app).get('/api/tickets').send().expect(200);

  expect(response.body).toHaveLength(3);
});
