import defaultState from './products.defaultState';
import actionTypes from './products.actionTypes';

const productsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS: {
      return { ...state, fetchingProducts: true, productsHasBeenFetched: true };
    }

    case actionTypes.FETCH_PRODUCTS_FULFILLED: {
      return {
        ...state,
        fetchingProducts: false,
        fetchProductsFulfilled: true,
        fetchProductsRejected: false,
        fetchProductsError: null,
        products: action.payload
      };
    }

    case actionTypes.FETCH_PRODUCTS_REJECTED: {
      return {
        ...state,
        fetchingProducts: false,
        fetchProductsFulfilled: false,
        fetchProductsRejected: true,
        fetchProductsError: action.payload
      };
    }

    default: {
      return state;
    }
  }
};

export default productsReducer;
