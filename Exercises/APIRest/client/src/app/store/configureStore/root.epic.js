import { combineEpics } from 'redux-observable';

import productsEpics from '../products/products.epics';

const rootEpic = combineEpics(productsEpics.fetchProductsEpic);

export default rootEpic;
