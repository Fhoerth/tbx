import { ObjectId } from 'mongodb';

import { list, addStock, subtractStock, setStock } from './product.model';
import operationTypes from './lib/operationTypes.enum';
import quantityTypeCheck from './lib/quantityTypeCheck';
import {
  quantityParamNotDefinedError,
  operationTypeNotDefinedError,
  badQuantityInputError,
  negativeStockError,
  genericHandledError,
  badOperationTypeInputError,
  documentNotFoundError,
  badIdInputError
} from './lib/errors';

export const updateDocumentStockResolver = async (req, res) => {
  const params = req.body;

  if (typeof params.quantity === 'undefined') {
    return res.status(400).json({ errors: [{ message: quantityParamNotDefinedError }] });
  }

  if (typeof params.operationType === 'undefined') {
    return res.status(400).json({ errors: [{ message: operationTypeNotDefinedError }] });
  }

  const quantity = parseInt(params.quantity);

  if (isNaN(quantity) || quantity < 0) {
    return res.status(400).json({ errors: [{ message: badQuantityInputError }] });
  }

  quantityTypeCheck(quantity);

  const db = req.app.locals.db;
  const operationType = parseInt(params.operationType);

  if (req.params.id === null) {
    return res.status(400).json({ errors: [{ message: badIdInputError }] });
  }

  let _id = null;
  try {
    _id = ObjectId(req.params.id);
  } catch (e) {
    return res.status(400).json({ errors: [{ message: badIdInputError }] });
  }

  switch (operationType) {
    case operationTypes.ADD: {
      try {
        await addStock(db, _id, quantity);
        return res.status(204).json({});

      } catch (e) {
        return res.status(400).json({ errors: [{ message: genericHandledError }] });
      }
    }
    case operationTypes.SUBTRACT: {
      try {
        await subtractStock(db, _id, quantity);
        return res.status(204).json({});

      } catch (e) {
        if (e.message === negativeStockError) {
          return res.status(400).json({ errors: [{ message: negativeStockError }] });

        } else {
          return res.status(400).json({ errors: [{ message: documentNotFoundError }] });
        }
      }
    }
    case operationTypes.SET: {
      try {
        await setStock(db, _id, quantity);
        return res.status(204).json({});

      } catch (e) {
        return res.status(400).json({ errors: [{ message: genericHandledError }] });
      }
    }
    default:
      return res.status(400).json({ errors: [{ message: badOperationTypeInputError }] });
  }
};

export const listResolver = async (req, res) => {
  const db = req.app.locals.db;
  const response = await list(db);
  return res.status(200).json(response);
};

export default {
  updateDocumentStockResolver, listResolver
};
