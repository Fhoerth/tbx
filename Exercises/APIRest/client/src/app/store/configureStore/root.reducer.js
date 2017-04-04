import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import products from '../products/products.reducer';

const rootReducer = combineReducers({
  routing,
  products
});

export default rootReducer;
