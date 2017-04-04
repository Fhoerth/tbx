import { connect } from 'react-redux';
import actionCreators from '../../store/products/products.actionCreators';

export default connect(
  (store) => ({
    products: store.products.products,
    fetchingProducts: store.products.fetchingProducts,
    fetchProductsFulfilled: store.products.fetchProductsFulfilled,
    fetchProductsRejected: store.products.fetchProductsRejected,
    fetchProductsError: store.products.fetchProductsError,
    productsHasBeenFetched: store.products.productsHasBeenFetched
  }),
  (dispatch) => ({
    fetchProducts () {
      return dispatch(actionCreators.fetchProducts());
    }
  })
);
