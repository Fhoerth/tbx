import invariant from 'invariant';
import { ObjectId } from 'mongodb';
import quantityTypeCheck from './quantityTypeCheck';
import operationTypes from './operationTypes.enum';
import { checkPositiveNumber } from './quantityTypeCheck';
import { negativeStockError, idObjectIdTypeError, documentNotFoundError } from './errors';

export default async (collection, _id, quantity, operationType) => {
  quantityTypeCheck(quantity);
  invariant(_id instanceof ObjectId, idObjectIdTypeError);

  switch (operationType) {
    case operationTypes.ADD: {
      return collection.update({ _id }, { $inc: { stock: quantity } });
    }

    case operationTypes.SUBTRACT: {
      const document = await collection.findOne({ _id });
      invariant(document !== null, documentNotFoundError);
      invariant(document.stock - quantity >= 0, negativeStockError);
      return collection.update({ _id }, { $inc: { stock: -quantity } });
    }

    case operationTypes.SET:
    default: {
      return collection.update({ _id }, { $set: { stock: quantity } });
    }

  }

};
