import mongoose from 'mongoose';

import { app } from './app';

const init = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY env variable must be set 🐼');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('Connected to db 🦀🦀');
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log('listening on port 🐋 3000 🐋');
  });
};

init();
