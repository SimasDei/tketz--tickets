import mongoose from 'mongoose';

import { app } from './app';

const init = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY env variable must be set 🐼');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI env variable must be set 🐼');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('Connected to db 🐸🐸');
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log('listening on port 🐝 3000 🐝');
  });
};

init();
