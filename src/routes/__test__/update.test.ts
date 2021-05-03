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

it('should return status 401 if the user does not own the ticket', async () => {});

it('should return status 400 if the user provides invalid title and/or price', async () => {});

it('should should update the ticket if valid information provided', async () => {});
