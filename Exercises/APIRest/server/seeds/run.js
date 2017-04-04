import dbConnection from '../dbConnection';
import productsSeed from './products.seed';

const run = async () => {
  const db = await dbConnection();
  await productsSeed(db);
  db.close();
};

run();
