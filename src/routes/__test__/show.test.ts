import request from 'supertest';

import { app } from '../../app';
import { signin } from '../../test';

it('Should return 404 status code if ticket is not found', async () => {
  const mockId = 'mockId123';
  await request(app).get(`/api/tickets/${mockId}`).send().expect(404);
});

it('Should return the ticket, if one is found', async () => {
  const mockTicket = {
    title: 'Foo Fighters',
    price: 20,
  };

  const response = await request(app).post('/api/tickets').set('Cookie', signin()).send(mockTicket).expect(201);

  const ticketResponse = await request(app).get(`/api/tickets/${response.body.id}`).send().expect(200);

  expect(ticketResponse.body.title).toEqual(mockTicket.title);
  expect(ticketResponse.body.price).toEqual(mockTicket.price);
});
