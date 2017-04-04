import invariant from 'invariant';
import { quantityIntTypeError, quantityPositiveError } from './errors';

export const checkNumberType = quantity => {
  invariant(typeof quantity === 'number', quantityIntTypeError);
};

export const checkPositiveNumber = quantity => {
  invariant(quantity >= 0, quantityPositiveError);
};

export default quantity => {
  checkNumberType(quantity);
  checkPositiveNumber(quantity);
};
