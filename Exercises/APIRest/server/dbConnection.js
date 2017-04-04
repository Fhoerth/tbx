import Promise from 'bluebird';
import { MongoClient } from 'mongodb';
import dbSettings from './settings/db.settings';

export default async () => MongoClient.connect(
  `mongodb://${dbSettings.host}:${dbSettings.port}/${dbSettings.db}`,
  { promiseLibrary: Promise }
);
