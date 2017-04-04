import sinon from 'sinon';
import { ObjectId } from 'mongodb';

import * as updateDocumentStockModule from '../modules/product/lib/updateDocumentStock';
import * as ProductModelModule from '../modules/product/product.model';
import { listResolver, updateDocumentStockResolver } from '../modules/product/product.resolvers';
import {
  badQuantityInputError,
  quantityParamNotDefinedError,
  operationTypeNotDefinedError,
  negativeStockError,
  documentNotFoundError,
  badIdInputError,
  badOperationTypeInputError
} from '../modules/product/lib/errors';
import operationTypes from '../modules/product/lib/operationTypes.enum';
import dbConnection from '../dbConnection';

const error = message => ({ errors: [{ message }] });
const createResMock = () => ({
  __code: null,

  json (response) {
    return response;
  },

  status (code) {
    this.__code = code;
    return this;
  }
});

describe('updateDocumentStockResolver Parameters', function () {
  test('undefined param operationType', async function (done) {
    const reqMock = {body: {
      quantity: 25
    }};
    const resMock = createResMock();
    const spy = sinon.spy(resMock, 'status');
    const result = await updateDocumentStockResolver(reqMock, resMock);

    expect(spy.getCall(0).args[0]).toBe(400);
    expect(result).toEqual(error(operationTypeNotDefinedError));
    done();
  });

  test('undefined param quantity', async function (done) {
    const reqMock = {body: {
      operationType: operationTypes.ADD
    }};
    const resMock = createResMock();
    const spy = sinon.spy(resMock, 'status');
    const result = await updateDocumentStockResolver(reqMock, resMock);

    expect(spy.getCall(0).args[0]).toBe(400);
    expect(result).toEqual(error(quantityParamNotDefinedError));
    done();
  });

  test('negative param quantity', async function (done) {
    const reqMock = {body: {
      operationType: operationTypes.ADD,
      quantity: -25
    }};
    const resMock = createResMock();
    const spy = sinon.spy(resMock, 'status');
    const result = await updateDocumentStockResolver(reqMock, resMock);

    expect(spy.getCall(0).args[0]).toBe(400);
    expect(result).toEqual(error(badQuantityInputError));
    done();
  });

  test('error thrown for negative stock', async function (done) {
    const db = await dbConnection();
    const reqMock = {body: {
      operationType: operationTypes.SUBTRACT,
      quantity: 1
    }, params: {
      id: ObjectId()
    }, app: {
      locals: {
        db
      }
    }};
    const resMock = createResMock();
    const spy = sinon.spy(resMock, 'status');

    sinon.stub(updateDocumentStockModule, 'default').throws(new Error(negativeStockError));

    const result = await updateDocumentStockResolver(reqMock, resMock);
    expect(result).toEqual(error(negativeStockError));
    expect(spy.getCall(0).args[0]).toBe(400);

    db.close();
    updateDocumentStockModule.default.restore();
    done();
  });

  test('error thrown for unexistant document', async function (done) {
    const db = await dbConnection();
    const reqMock = {body: {
      operationType: operationTypes.SUBTRACT,
      quantity: 1
    }, params: {
      id: ObjectId()
    }, app: {
      locals: {
        db
      }
    }};
    const resMock = createResMock();
    const spy = sinon.spy(resMock, 'status');

    sinon.stub(updateDocumentStockModule, 'default').throws(new Error(documentNotFoundError));

    const result = await updateDocumentStockResolver(reqMock, resMock);
    expect(result).toEqual(error(documentNotFoundError));
    expect(spy.getCall(0).args[0]).toBe(400);

    db.close();
    updateDocumentStockModule.default.restore();
    done();
  });

  test('error thrown for bad id input', async function (done) {
    const db = await dbConnection();
    const reqMock = {body: {
      operationType: operationTypes.SUBTRACT,
      quantity: 1
    }, params: {
      id: 'badId'
    }, app: {
      locals: {
        db
      }
    }};
    const resMock = createResMock();
    const spy = sinon.spy(resMock, 'status');
    const result = await updateDocumentStockResolver(reqMock, resMock);

    expect(result).toEqual(error(badIdInputError));
    expect(spy.getCall(0).args[0]).toBe(400);

    const _reqMock = {body: {
      operationType: operationTypes.SUBTRACT,
      quantity: 1
    }, params: {
      id: null
    }, app: {
      locals: {
        db
      }
    }};
    const _resMock = createResMock();

    const _result = await updateDocumentStockResolver(_reqMock, _resMock);
    expect(_result).toEqual(error(badIdInputError));

    db.close();
    done();
  });

  test('bad operationType param (default switch case)', async function (done) {
    const db = await dbConnection();
    const id = ObjectId();
    const quantity = 1;
    const reqMock = {body: {
      operationType: 'Bad',
      quantity
    }, params: {
      id
    }, app: {
      locals: {
        db
      }
    }};
    const resMock = createResMock();
    const spy = sinon.spy(resMock, 'status');
    const result = await updateDocumentStockResolver(reqMock, resMock);

    expect(spy.getCall(0).args[0]).toBe(400);
    expect(result).toEqual(error(badOperationTypeInputError));
    done();
  });
});

describe('updateDocumentStockResolver: ADD case', function () {
  test('it should call addStock model function with correct arguments', async function (done) {
    const db = await dbConnection();
    const id = ObjectId();
    const quantity = 1;
    const reqMock = {body: {
      operationType: operationTypes.ADD,
      quantity
    }, params: {
      id
    }, app: {
      locals: {
        db
      }
    }};
    const resMock = createResMock();
    const spy = sinon.spy(resMock, 'status');

    const stub = sinon.stub(ProductModelModule, 'addStock').returns(new Promise(resolve => {
      resolve({});
    }));

    await updateDocumentStockResolver(reqMock, resMock);

    expect(spy.getCall(0).args[0]).toBe(204);
    expect(stub.calledOnce).toBe(true);
    expect(stub.getCall(0).args).toEqual([
      db, id, quantity
    ]);

    ProductModelModule.addStock.restore();
    db.close();
    done();
  });
});

describe('updateDocumentStockResolver: SUBTRACT case', function () {
  test('it should call subtractStock model function with correct arguments', async function (done) {
    const db = await dbConnection();
    const id = ObjectId();
    const quantity = 1;
    const reqMock = {body: {
      operationType: operationTypes.SUBTRACT,
      quantity
    }, params: {
      id
    }, app: {
      locals: {
        db
      }
    }};
    const resMock = createResMock();
    const spy = sinon.spy(resMock, 'status');

    const stub = sinon.stub(ProductModelModule, 'subtractStock').returns(new Promise(resolve => {
      resolve({});
    }));

    await updateDocumentStockResolver(reqMock, resMock);

    expect(spy.getCall(0).args[0]).toBe(204);
    expect(stub.calledOnce).toBe(true);
    expect(stub.getCall(0).args).toEqual([
      db, id, quantity
    ]);

    ProductModelModule.subtractStock.restore();
    db.close();
    done();
  });
});

describe('updateDocumentStockResolver: SET Case', function () {
  test('it should call setStock model function with correct arguments', async function (done) {
    const db = await dbConnection();
    const id = ObjectId();
    const quantity = 1;
    const reqMock = {body: {
      operationType: operationTypes.SET,
      quantity
    }, params: {
      id
    }, app: {
      locals: {
        db
      }
    }};
    const resMock = createResMock();
    const spy = sinon.spy(resMock, 'status');

    const stub = sinon.stub(ProductModelModule, 'setStock').returns(new Promise(resolve => {
      resolve({});
    }));

    await updateDocumentStockResolver(reqMock, resMock);

    expect(spy.getCall(0).args[0]).toBe(204);
    expect(stub.calledOnce).toBe(true);
    expect(stub.getCall(0).args).toEqual([
      db, id, quantity
    ]);

    ProductModelModule.setStock.restore();
    db.close();
    done();
  });
});

describe('listResolver', function () {
  test('it should call list model function with correct arguments', async function (done) {
    const db = await dbConnection();
    const reqMock = {app: {
      locals: {
        db
      }
    }};
    const resMock = createResMock();
    const spy = sinon.spy(resMock, 'status');

    const stub = sinon.stub(ProductModelModule, 'list').returns(new Promise(resolve => {
      resolve({});
    }));

    await listResolver(reqMock, resMock);

    expect(stub.calledOnce).toBe(true);
    expect(stub.getCall(0).args).toEqual([
      db
    ]);
    expect(spy.getCall(0).args[0]).toBe(200);

    ProductModelModule.list.restore();
    db.close();
    done();
  });
});
