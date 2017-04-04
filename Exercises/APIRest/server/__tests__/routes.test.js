import sinon from 'sinon';
import request from 'supertest';
// import MockExpressResponse from 'mock-express-response';
import httpMocks from 'express-mocks-http';
import createApp, { closeApp } from '../createApp';
import * as ProductResolversModule from '../modules/product/product.resolvers';

describe('Routes', function () {
  test('/api/products', async function (done) {
    const app = await createApp();
    const stub = sinon.stub(ProductResolversModule, 'listResolver', (req, res) => {
      res.json({});
    });

    request(app)
      .get('/api/products')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(() => {
        expect(stub.calledOnce).toBe(true);
        ProductResolversModule.listResolver.restore();
        closeApp();
        done();
      });
  });

  test('/api/products/:id/stock', async function (done) {
    const app = await createApp();
    const stub = sinon.stub(ProductResolversModule, 'updateDocumentStockResolver', (req, res) => {
      res.json({});
    });
    request(app)
      .patch('/api/products/25/stock')
      .expect('Content-Type', /json/)
      .then(() => {
        expect(stub.calledOnce).toBe(true);
        ProductResolversModule.updateDocumentStockResolver.restore();
        closeApp();
        done();
      });
  });
});
