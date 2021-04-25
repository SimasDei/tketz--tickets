import jwt from 'jsonwebtoken';

const DEFAULT_USER = { email: 'mahalau@bruddha.com', password: '1234' };

export const signin = () => {
  const payload = {
    id: '121omdm0a9sfJASF10m1dasc',
    ...DEFAULT_USER,
    password: undefined,
  };

  const token = jwt.sign(payload, process.env.JWT_KEY || 'jwt-secret');

  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString('base64');

  return [`express:sess=${base64}`];
};
