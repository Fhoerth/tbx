import operationTypes from './lib/operationTypes.enum';
import updateDocumentStock from './lib/updateDocumentStock';

export const collectionName = 'Product';

export const list = async (db) => {
  const collection = db.collection(collectionName);
  return collection.find().toArray();
};

export const addStock = async (db, _id, quantity) => {
  const collection = db.collection(collectionName);
  return updateDocumentStock(collection, _id, quantity, operationTypes.ADD);
};

export const subtractStock = async (db, _id, quantity) => {
  const collection = db.collection(collectionName);
  return updateDocumentStock(collection, _id, quantity, operationTypes.SUBTRACT);
};

export const setStock = async (db, _id, quantity) => {
  const collection = db.collection(collectionName);
  return updateDocumentStock(collection, _id, quantity, operationTypes.SET);
};

export default { list, addStock, subtractStock, setStock };
