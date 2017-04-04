import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import dbConnection from './dbConnection';
import { listResolver, updateDocumentStockResolver } from './modules/product/product.resolvers';

let db = null;

export const closeApp = () => {
  db.close();
};

const createApp = async () => {
  const router = express.Router();
  const app = express();
  db = await dbConnection();

  const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if (req.method === 'OPTIONS') {
      res.send(200);
    } else {
      next();
    }
  };

  app.use(allowCrossDomain);
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.locals.db = db; // See http://expressjs.com/en/4x/api.html#app.locals

  process.on('exit', function () {
    db.close();
  });

  process.on('SIGINT', function () {
    console.log('\nCtrl+C, closing db.');
    db.close();
  });


  // Routes
  router.get('/products', async (req, res) => {
    return await listResolver(req, res);
  });

  router.patch('/products/:id/stock', async (req, res) => {
    return await updateDocumentStockResolver(req, res);
  });

  app.use('/api', router);

  return app;
};

export default createApp;
