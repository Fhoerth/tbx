import actionTypes from './products.actionTypes';

const fetchProducts = () => ({
  type: actionTypes.FETCH_PRODUCTS
});

const fetchProductsFulfilled = response => ({
  type: actionTypes.FETCH_PRODUCTS_FULFILLED,
  payload: response
});

const fetchProductsRejected = errorResponse => ({
  type: actionTypes.FETCH_PRODUCTS_REJECTED,
  payload: errorResponse
});

export default {
  fetchProducts,
  fetchProductsFulfilled,
  fetchProductsRejected
};
