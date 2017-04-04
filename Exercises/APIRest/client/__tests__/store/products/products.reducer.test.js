import productsReducer from '../../../src/app/store/products/products.reducer';
import actionCreators from '../../../src/app/store/products/products.actionCreators';
import defaultState from '../../../src/app/store/products/products.defaultState';

describe('products reducer', function () {
  test('FETCH_PRODUCTS case', function () {
    let state = productsReducer(defaultState, '@@INIT@@');
    expect(state.fetchingProducts).toBe(false);
    expect(state.productsHasBeenFetched).toBe(false);

    state = productsReducer(state, actionCreators.fetchProducts());
    expect(state.fetchingProducts).toBe(true);
    expect(state.productsHasBeenFetched).toBe(true);
  });


  test('FETCH_PRODUCTS_FULFILLED case', function () {
    const response = {
      data: []
    };
    let state = productsReducer(defaultState, '@@INIT@@');
    expect(state.fetchingProducts).toBe(false);

    // Simulate a failed request rejection.
    state = productsReducer(state, actionCreators.fetchProducts());
    state = productsReducer(state, actionCreators.fetchProductsRejected());

    state = productsReducer(state, actionCreators.fetchProducts());
    state = productsReducer(state, actionCreators.fetchProductsFulfilled(response));

    expect(state.products).toEqual(response);
    expect(state.fetchingProducts).toBe(false);
    expect(state.fetchProductsFulfilled).toBe(true);
    expect(state.fetchProductsError).toEqual(null);
  });


  test('FETCH_PRODUCTS_REJECTED case', function () {
    const response = {
      data: []
    };
    const error = {
      error: 'Error'
    };
    let state = productsReducer(defaultState, '@@INIT@@');
    expect(state.fetchingProducts).toBe(false);

    // Simulate a success request.
    state = productsReducer(state, actionCreators.fetchProducts());
    state = productsReducer(state, actionCreators.fetchProductsFulfilled(response));

    state = productsReducer(state, actionCreators.fetchProducts());
    state = productsReducer(state, actionCreators.fetchProductsRejected(error));

    expect(state.products).toEqual(response);
    expect(state.fetchingProducts).toBe(false);
    expect(state.fetchProductsFulfilled).toBe(false);
    expect(state.fetchProductsRejected).toBe(true);
    expect(state.fetchProductsError).toEqual(error);
  });
});
