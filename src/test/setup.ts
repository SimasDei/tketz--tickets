import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = 'test-jwt-key';
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
