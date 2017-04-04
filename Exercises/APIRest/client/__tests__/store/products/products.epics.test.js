import { Observable } from 'rxjs';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import * as ApiModule from '../../../src/app/store/products/products.api';
import productsEpics from '../../../src/app/store/products/products.epics';
import actionCreators from '../../../src/app/store/products/products.actionCreators';

const rootEpic = combineEpics(productsEpics.fetchProductsEpic);
const epicMiddleware = createEpicMiddleware(rootEpic);
const mockStore = configureMockStore([epicMiddleware]);

describe('Products epics: fetchProducts', function () {
  test('fulfilled', function () {
    const response = {
      data: []
    };
    const requestObservable = Observable.of(response);
    sinon.stub(ApiModule.default, 'fetchProducts').returns(requestObservable);

    const store = mockStore({});
    store.dispatch(actionCreators.fetchProducts());

    expect(store.getActions()).toEqual([
      actionCreators.fetchProducts(),
      actionCreators.fetchProductsFulfilled(response)
    ]);

    ApiModule.default.fetchProducts.restore();
  });

  test('rejected', function () {
    const response = {
      message: 'ErrorMessage'
    };
    const errorResponse = {
      xhr: {
        response
      }
    };
    const requestObservable = Observable.throw(errorResponse);
    sinon.stub(ApiModule.default, 'fetchProducts').returns(requestObservable);

    const store = mockStore({});
    store.dispatch(actionCreators.fetchProducts());

    expect(store.getActions()).toEqual([
      actionCreators.fetchProducts(),
      actionCreators.fetchProductsRejected(response)
    ]);

    ApiModule.default.fetchProducts.restore();
  });
});
