import { collectionName } from '../modules/product/product.model';
import casual from 'casual';
import { append } from 'ramda';

const seed = async (db) => {
  console.log(collectionName);
  const collection = db.collection(collectionName);
  await collection.remove();

  let documents = [];
  for (let x = 0; x <= casual.integer(20, 30); x++) {
    documents = append({
      stock: casual.integer(1, 200)
    }, documents);
  }

  return collection.insertMany(documents);
};

export default seed;
