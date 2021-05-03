import request from 'supertest';

import { app } from '../../app';
import { signin } from '../../test';
import { mockTicket, mockId } from '../__mocks__';

it('Should return 404 status code if ticket is not found', async () => {
  await request(app).get(`/api/tickets/${mockId}`).send().expect(404);
});

it('Should return the ticket, if one is found', async () => {
  const response = await request(app).post('/api/tickets').set('Cookie', signin()).send(mockTicket).expect(201);

  const ticketResponse = await request(app).get(`/api/tickets/${response.body.id}`).send().expect(200);

  expect(ticketResponse.body.title).toEqual(mockTicket.title);
  expect(ticketResponse.body.price).toEqual(mockTicket.price);
});
