import sinon from 'sinon';
import * as ApiModule from '../../../src/app/store/products/products.api';

describe('Products api', function () {
  test('fetchProducts fulfilled', function (done) {
    const server = sinon.fakeServer.create();
    const response = {
      data: {
        products: []
      }
    };
    const url = `${ApiModule.default.baseUrl}/products`;
    const requestObservable = ApiModule.default.fetchProducts();

    server.respondWith('GET', url, [
      200, { 'Content-Type': 'application/json' }, JSON.stringify(response)
    ]);

    requestObservable.subscribe(x => {
      expect(x).toEqual(response);

      server.restore();
      done();
    });

    server.respond();
  });
});
