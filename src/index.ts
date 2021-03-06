import mongoose from 'mongoose';

import { app } from './app';

const init = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY env variable must be set πΌ');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI env variable must be set πΌ');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('Connected to db πΈπΈ');
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log('listening on port π 3000 π');
  });
};

init();
