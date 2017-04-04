import actionCreators from '../../../src/app/store/products/products.actionCreators';
import actionTypes from '../../../src/app/store/products/products.actionTypes';

describe('products action types', function () {
  test('fetchProducts', function () {
    expect(actionCreators.fetchProducts()).toEqual({
      type: actionTypes.FETCH_PRODUCTS
    });
  });

  test('fetchProductsFulfilled', function () {
    const response = {
      key: 'value'
    };

    expect(actionCreators.fetchProductsFulfilled(response)).toEqual({
      type: actionTypes.FETCH_PRODUCTS_FULFILLED,
      payload: response
    });
  });

  test('fetchProductsRejected', function () {
    const errorResponse = {
      errorKey: 'errorValue'
    };

    expect(actionCreators.fetchProductsRejected(errorResponse)).toEqual({
      type: actionTypes.FETCH_PRODUCTS_REJECTED,
      payload: errorResponse
    });
  });
});
