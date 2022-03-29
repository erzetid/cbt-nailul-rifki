import mongoose from 'mongoose';

export default class Database {
  constructor(mongoUri) {
    this.mongoUri = mongoUri;
  }
  async connect() {
    try {
      const options = {
        autoIndex: true,
        autoCreate: true
      };
      const connecting = await mongoose.connect(this.mongoUri, options);
      console.log('Mongoose connected... ');
      return connecting;
    } catch (err) {
      console.log(err);
      throw new Error('Connecting database failed!');
    }
  }

  async disconnect() {
    const disconnecting = await mongoose.connection.close();
    console.log('Mongoose disconnected...');
    return disconnecting;
  }

  async drop() {
    return await mongoose.connection.dropDatabase();
  }
}
