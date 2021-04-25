import request from 'supertest';
import { app } from '../app';

const DEFAULT_USER = { email: 'mahalau@bruddha.com', password: '1234' };

export const signin = async () => {
  const response = await request(app).post('/api/users/signup').send(DEFAULT_USER);
  const cookie = response.get('Set-Cookie');

  return cookie;
};
