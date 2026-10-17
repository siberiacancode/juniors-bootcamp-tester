import { MongoClient } from 'mongodb';
import process from 'node:process';

const databaseURL = process.env.E2E_DATABASE_URL;

if (!databaseURL) {
  throw new Error('E2E_DATABASE_URL is required');
}
export const mongoClient = new MongoClient(databaseURL);

// eslint-disable-next-line antfu/no-top-level-await
await mongoClient.connect();

export const mongoDatabase = mongoClient.db('juniors-bootcamp');
