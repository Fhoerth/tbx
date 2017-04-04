import Promise from 'bluebird';
import { ObjectId, MongoClient } from 'mongodb';

import dbSettings from '../settings/db.settings';
import operationTypes from '../modules/product/lib/operationTypes.enum';
import * as ProductModelModule from '../modules/product/product.model';
import updateDocumentStock from '../modules/product/lib/updateDocumentStock';
import {
  documentNotFoundError,
  idObjectIdTypeError,
  quantityPositiveError,
  negativeStockError
} from '../modules/product/lib/errors';

const connect = async () => MongoClient.connect(
  `mongodb://${dbSettings.host}:${dbSettings.port}/${dbSettings.db}`,
  { promiseLibrary: Promise }
);

const collectionName = ProductModelModule.collectionName;

describe('updateDocumentStock', function () {
  test('Input Check', async function (done) {
    const db = await connect();
    const collection = db.collection(collectionName);
    // Delete Collection Documents.
    await collection.remove();

    // Test if error thrown for unexistant documents.
    let errorThrown = false;
    try {
      await updateDocumentStock(collection, ObjectId(), 1, operationTypes.SUBTRACT);
    } catch (e) {
      errorThrown = true;
      expect(e.message).toBe(documentNotFoundError);
    }
    expect(errorThrown).toBe(true);

    // Test if error thrown for null _id.
    errorThrown = false;
    try {
      await updateDocumentStock(collection, null, 1, operationTypes.SUBTRACT);
    } catch (e) {
      errorThrown = true;
      expect(e.message).toEqual(idObjectIdTypeError);
    }
    expect(errorThrown).toBe(true);

    // Test if error thrown for negative quantity.
    const insert = await collection.insertOne({ stock: 100 });
    errorThrown = false;
    try {
      await updateDocumentStock(collection, insert.insertedId, -1, operationTypes.SUBTRACT);
    } catch (e) {
      errorThrown = true;
      expect(e.message).toBe(quantityPositiveError);
    }
    expect(errorThrown).toBe(true);
    await collection.remove();

    // Test if negative stock is not allowed.
    const _insert = await collection.insertOne({ stock: 1 });
    errorThrown = false;
    try {
      await updateDocumentStock(collection, _insert.insertedId, 2, operationTypes.SUBTRACT);
    } catch (e) {
      errorThrown = true;
      expect(e.message).toEqual(negativeStockError);
    }
    expect(errorThrown).toBe(true);
    await collection.remove();

    // Invalid _id type.
    errorThrown = false;
    try {
      await updateDocumentStock(collection, 'FakeId', 1, null);
    } catch (e) {
      errorThrown = true;
      expect(e.message).toEqual(idObjectIdTypeError);
    }
    expect(errorThrown).toBe(true);

    done();
  });

  test('ADD', async function (done) {
    const db = await connect();
    const collection = db.collection(collectionName);
    // Delete Collection Documents.
    await collection.remove();

    // Insert new document
    const insert = await collection.insertOne({ stock: 1 });

    // Update twice to ensure funcionality
    await updateDocumentStock(collection, insert.insertedId, 1, operationTypes.ADD);
    let newDocument = await collection.findOne({ _id: insert.insertedId });
    expect(newDocument.stock).toBe(2);

    await updateDocumentStock(collection, insert.insertedId, 1, operationTypes.ADD);
    newDocument = await collection.findOne({ _id: insert.insertedId });
    expect(newDocument.stock).toBe(3);

    done();
  });

  test('SUBTRACT', async function (done) {
    const db = await connect();
    const collection = db.collection(collectionName);
    // Delete Collection Documents.
    await collection.remove();

    // Insert new document
    const insert = await collection.insertOne({ stock: 2 });

    // Update twice to ensure funcionality
    await updateDocumentStock(collection, insert.insertedId, 1, operationTypes.SUBTRACT);
    let newDocument = await collection.findOne({ _id: insert.insertedId });
    expect(newDocument.stock).toBe(1);

    await updateDocumentStock(collection, insert.insertedId, 1, operationTypes.SUBTRACT);
    newDocument = await collection.findOne({ _id: insert.insertedId });
    expect(newDocument.stock).toBe(0);

    // It should throw error: Doesn't make any sense to allow having negative stock.
    let errorThrown = false;
    try {
      await updateDocumentStock(collection, insert.insertedId, 1, operationTypes.SUBTRACT);
    } catch (e) { errorThrown = true; }
    expect(errorThrown).toBe(true);

    done();
  });

  test('SET', async function (done) {
    const db = await connect();
    const collection = db.collection(collectionName);

    // Delete Collection Documents.
    await collection.remove();

    // Insert new document
    const insert = await collection.insertOne({ stock: 0 });

    // Update twice to ensure funcionality
    await updateDocumentStock(collection, insert.insertedId, 10, operationTypes.SET);
    let newDocument = await collection.findOne({ _id: insert.insertedId });
    expect(newDocument.stock).toBe(10);

    await updateDocumentStock(collection, insert.insertedId, 100, operationTypes.SET);
    newDocument = await collection.findOne({ _id: insert.insertedId });
    expect(newDocument.stock).toBe(100);

    // It should throw error: Doesn't make any sense to allow having negative stock.
    let errorThrown = false;
    try {
      await updateDocumentStock(collection, insert.insertedId, -100, operationTypes.SET);
    } catch (e) { expect(e.message).toBe(quantityPositiveError); errorThrown = true; }
    expect(errorThrown).toBe(true);

    done();
  });
});
