import request from 'supertest';

import { app } from '../../app';
import { signin } from '../../test';
import { mockId, mockTicket } from '../__mocks__';

it('should return status 404 if the provided id does not exist', async () => {
  await request(app).put(`/api/tickets/${mockId}`).set('Cookie', signin()).send(mockTicket).expect(404);
});

it('should return status 401 if the user is not authenticated', async () => {
  await request(app).put(`/api/tickets/${mockId}`).send(mockTicket).expect(401);
});

it('should return status 401 if the user does not own the ticket', async () => {
  const response = await request(app).post('/api/tickets').set('Cookie', signin()).send(mockTicket).expect(201);

  await request(app).put(`/api/tickets/${response.body.id}`).set('Cookie', signin()).send(mockTicket).expect(401);
});

it('should return status 400 if the user provides invalid title and/or price', async () => {
  const cookie = signin();
  const response = await request(app).post('/api/tickets').set('Cookie', cookie).send(mockTicket).expect(201);
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({ ...mockTicket, title: '' })
    .expect(400);
});

it('should should update the ticket if valid information provided', async () => {
  const cookie = signin();
  const mockTitle = mockTicket.title.split('').reverse().join('');

  const response = await request(app).post('/api/tickets').set('Cookie', cookie).send(mockTicket).expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({ ...mockTicket, title: mockTitle })
    .expect(200);

  const ticketResponse = await request(app).get(`/api/tickets/${response.body.id}`).send();

  expect(ticketResponse.body.title).toEqual(mockTitle);
  expect(ticketResponse.body.price).toEqual(mockTicket.price);
});
