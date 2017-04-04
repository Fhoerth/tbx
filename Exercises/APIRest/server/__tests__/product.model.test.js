import Promise from 'bluebird';
import sinon from 'sinon';
import casual from 'casual';
import { append } from 'ramda';
import { ObjectId, MongoClient } from 'mongodb';

import dbSettings from '../settings/db.settings';
import operationTypes from '../modules/product/lib/operationTypes.enum';
import * as updateDocumentStockModule from '../modules/product/lib/updateDocumentStock';
import * as ProductModelModule from '../modules/product/product.model';

const connect = async () => MongoClient.connect(
  `mongodb://${dbSettings.host}:${dbSettings.port}/${dbSettings.db}`,
  { promiseLibrary: Promise }
);

const collectionName = ProductModelModule.collectionName;

describe('list', function () {
  test('list', async function () {
    const db = await connect();
    const collection = db.collection(collectionName);

    // Delete Collection Documents.
    await collection.remove();

    // Insert some documents.
    let documents = [];
    const documentsToInsert = casual.integer(5, 10);
    for (let x = 0; x < documentsToInsert; x++) {
      documents = append({
        _id: ObjectId(),
        stock: casual.integer(2, 100)
      }, documents);
    }

    await collection.insertMany(documents);
    const result = await ProductModelModule.list(db);

    expect(result).toEqual(documents);
  });

  test('addStock', async function (done) {
    const db = await connect();
    const collection = db.collection(collectionName);
    const spy = sinon.spy(updateDocumentStockModule, 'default');
    const _id = ObjectId();
    const qt = 5;
    await ProductModelModule.addStock(db, _id, qt);

    expect(spy.calledOnce).toBe(true);
    expect(spy.getCall(0).args).toEqual([
      collection, _id, qt, operationTypes.ADD
    ]);

    updateDocumentStockModule.default.restore();
    done();
  });

  test('subtractStock', async function (done) {
    const id = ObjectId();
    const qt = 5;

    const stub = sinon.stub(updateDocumentStockModule, 'default');
    stub.onFirstCall().returns(new Promise(resolve => resolve()));

    const db = await connect();
    const collection = db.collection(collectionName);

    await ProductModelModule.subtractStock(db, id, qt);

    expect(stub.calledOnce).toBe(true);
    expect(stub.getCall(0).args).toEqual([
      collection, id, qt, operationTypes.SUBTRACT
    ]);

    updateDocumentStockModule.default.restore();
    done();
  });

  test('setStock', async function (done) {
    const id = ObjectId();
    const qt = 5;

    const stub = sinon.stub(updateDocumentStockModule, 'default');
    stub.onFirstCall().returns(new Promise(resolve => resolve()));

    const db = await connect();
    const collection = db.collection(collectionName);

    await ProductModelModule.setStock(db, id, qt);

    expect(stub.calledOnce).toBe(true);
    expect(stub.getCall(0).args).toEqual([
      collection, id, qt, operationTypes.SET
    ]);

    updateDocumentStockModule.default.restore();
    done();
  });
});
