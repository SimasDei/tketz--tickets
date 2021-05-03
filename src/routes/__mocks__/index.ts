import mongoose from 'mongoose';

export const mockTicket = {
  title: 'Foo Fighters',
  price: 20,
};

export const mockId = new mongoose.Types.ObjectId().toHexString();
