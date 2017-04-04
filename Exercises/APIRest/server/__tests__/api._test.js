import chai from 'chai';
import chaiHTTP from 'chai-http';
import sinon from 'sinon';
import { ObjectId } from 'mongodb';

import createApp from '../createApp';
import { createServer, closeServer } from '../createServer';
import * as dbConnectionModule from '../dbConnection';
import * as ProductModelModule from '../modules/product/product.model';
import operationTypes from '../modules/product/lib/operationTypes.enum';

chai.use(chaiHTTP);

test('How tests are written', function () {
  /**
    * Each api endpoint should call an external function.
    * Using chai and chai-http in conjunction with sinon, it will be checked if
    * each api endpoint calls the correct function (with right arguments).
    * Each api function will be tested separately, with each possible combination
    * of parameters to make sure api works as it should.
   */
  expect(true).toBe(true);
});

describe('API', function () {
  test('product list', async function (done) {
    const app = createApp();

    const db = await dbConnectionModule.default();
    sinon.stub(dbConnectionModule, 'default').returns(new Promise(resolve => resolve(db)));

    const server = await createServer(app);
    const expectedResponse = [
      { _id: 1, stock: 100 },
      { _id: 2, stock: 200 }
    ];

    const stub = sinon.stub(ProductModelModule, 'list').returns(new Promise(resolve => {
      resolve(expectedResponse);
    }));

    const response = await chai.request(server).get('/api/products');
    expect(stub.calledOnce).toBe(true);
    expect(response.body).toEqual(expectedResponse);

    dbConnectionModule.default.restore();
    closeServer();
    done();
  });

  test('subtract', async function (done) {
    const app = createApp();

    const db = await dbConnectionModule.default();
    sinon.stub(dbConnectionModule, 'default').returns(new Promise(resolve => resolve(db)));

    const server = await createServer(app);
    const id = '58b9b47faa4b3c4650a4351d';
    const quantity = 100;
    const expectedResponse = {
      _id: id,
      quantity: 200
    };

    const stub = sinon.stub(ProductModelModule, 'subtractStock').returns(new Promise(resolve => {
      resolve(expectedResponse);
    }));

    const response = await chai.request(server)
      .patch(`/api/products/${id}/stock`)
      .send({
        operationType: operationTypes.SUBTRACT,
        quantity
      });

    expect(stub.calledOnce).toBe(true);
    expect(stub.getCall(0).args[1]).toEqual(ObjectId(id));
    expect(stub.getCall(0).args[2]).toBe(quantity);
    expect(response.body).toEqual(expectedResponse);

    dbConnectionModule.default.restore();
    ProductModelModule.subtractStock.restore();

    closeServer();
    done();
  });

  test('add', async function (done) {
    const app = createApp();
    const db = await dbConnectionModule.default();
    const server = await createServer(app);
    const id = '58b9b47faa4b3c4650a4351d';
    const quantity = 100;
    const expectedResponse = {
      _id: id,
      quantity: 200
    };
    const stub = sinon.stub(ProductModelModule, 'addStock').returns(new Promise(resolve => {
      resolve(expectedResponse);
    }));

    sinon.stub(dbConnectionModule, 'default').returns(new Promise(resolve => resolve(db)));

    const response = await chai.request(server)
      .patch(`/api/products/${id}/stock`)
      .send({
        operationType: operationTypes.ADD,
        quantity
      });

    expect(stub.calledOnce).toBe(true);
    expect(stub.getCall(0).args[1]).toEqual(ObjectId(id));
    expect(stub.getCall(0).args[2]).toBe(quantity);
    expect(response.body).toEqual(expectedResponse);

    dbConnectionModule.default.restore();
    ProductModelModule.addStock.restore();

    closeServer();
    done();
  });

  test('set', async function (done) {
    const app = createApp();
    const db = await dbConnectionModule.default();
    const server = await createServer(app);
    const id = '58b9b47faa4b3c4650a4351d';
    const quantity = 100;
    const expectedResponse = {
      _id: id,
      quantity: 200
    };
    const stub = sinon.stub(ProductModelModule, 'setStock').returns(new Promise(resolve => {
      resolve(expectedResponse);
    }));

    sinon.stub(dbConnectionModule, 'default').returns(new Promise(resolve => resolve(db)));

    const response = await chai.request(server)
      .patch(`/api/products/${id}/stock`)
      .send({
        operationType: operationTypes.SET,
        quantity
      });

    expect(stub.calledOnce).toBe(true);
    expect(stub.getCall(0).args[1]).toEqual(ObjectId(id));
    expect(stub.getCall(0).args[2]).toBe(quantity);
    expect(response.body).toEqual(expectedResponse);

    dbConnectionModule.default.restore();
    ProductModelModule.setStock.restore();

    closeServer();
    done();
  });
});


// describe('params checking', async function () {
//   test('undefined param operationType', async function (done) {
//     const app = createApp();
//     const server = await createServer(app);
//     const id = '58b9b47faa4b3c4650a4351d';
//     const quantity = 100;
//
//     chai.request(server).patch(`/api/products/${id}/stock`).send({
//       quantity
//     }).then(r => {
//       expect(r.body).toEqual({
//         errors: [ { message: operationTypeNotDefinedError } ]
//       });
//       closeServer();
//       done();
//     });
//   });
//
//   test('undefined param quantity', async function (done) {
//     const app = createApp();
//     const server = await createServer(app);
//     const id = '58b9b47faa4b3c4650a4351d';
//     const operationType = operationTypes.ADD;
//
//     chai.request(server).patch(`/api/products/${id}/stock`).send({
//       operationType
//     }).then(r => {
//       expect(r.body).toEqual({
//         errors: [ { message: quantityParamNotDefinedError } ]
//       });
//       closeServer();
//       done();
//     });
//   });
//
//   test('negative param quantity', async function (done) {
//     const app = createApp();
//     const server = await createServer(app);
//     const id = '58b9b47faa4b3c4650a4351d';
//     const quantity = -1;
//     const operationType = operationTypes.ADD;
//
//     chai.request(server).patch(`/api/products/${id}/stock`).send({
//       operationType,
//       quantity
//     }).then(r => {
//       expect(r.body).toEqual({
//         errors: [ { message: badQuantityInputError } ]
//       });
//       closeServer();
//       done();
//     });
//   });
//
//   test('error thrown for negative stock', async function (done) {
//     const app = createApp();
//     const server = await createServer(app);
//     const id = '58b9b47faa4b3c4650a4351d';
//     const quantity = 100;
//     const operationType = operationTypes.SUBTRACT;
//
//     sinon.stub(updateDocumentStockModule, 'default').throws(new Error(negativeStockError));
//
//     chai.request(server).patch(`/api/products/${id}/stock`).send({
//       operationType,
//       quantity
//     }).then(response => {
//       expect(response.body).toEqual({
//         errors: [ { message: negativeStockError } ]
//       });
//       updateDocumentStockModule.default.restore();
//       closeServer();
//       done();
//     });
//   });
//
//   test('error thrown for unexistant document', async function (done) {
//     const app = createApp();
//     const server = await createServer(app);
//     const id = '58b9b47faa4b3c4650a4351d';
//     const quantity = 100;
//     const operationType = operationTypes.SUBTRACT;
//
//     sinon.stub(updateDocumentStockModule, 'default').throws(new Error(documentNotFoundError));
//
//     chai.request(server).patch(`/api/products/${id}/stock`).send({
//       operationType,
//       quantity
//     }).then(response => {
//       expect(response.body).toEqual({
//         errors: [ { message: documentNotFoundError } ]
//       });
//
//       updateDocumentStockModule.default.restore();
//       closeServer();
//       done();
//     });
//   });
//
//   test('error thrown for bad id input', async function (done) {
//     const app = createApp();
//     const server = await createServer(app);
//     const id = 'badId';
//     const quantity = 100;
//     const operationType = operationTypes.SUBTRACT;
//
//     chai.request(server).patch(`/api/products/${id}/stock`).send({
//       operationType,
//       quantity
//     }).then(response => {
//       expect(response.body).toEqual({
//         errors: [
//           { message: badIdInputError }
//         ]
//       });
//       closeServer();
//       done();
//     });
//
//   });
// });
