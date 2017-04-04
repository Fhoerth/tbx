import { Observable } from 'rxjs';
import actionTypes from './products.actionTypes';
import api from './products.api';
import actionCreators from './products.actionCreators';

const fetchProductsEpic = action$ => {
  return action$.ofType(actionTypes.FETCH_PRODUCTS).mergeMap(() => {
    return api.fetchProducts()
      .map(actionCreators.fetchProductsFulfilled)
      .catch(error => {
        return Observable.of(
          actionCreators.fetchProductsRejected(error.xhr.response)
        );
      });
  });
};

export default { fetchProductsEpic };
