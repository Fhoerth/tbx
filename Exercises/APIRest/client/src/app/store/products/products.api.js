import { Observable } from 'rxjs';
import { AjaxObservable } from 'rxjs/observable/dom/AjaxObservable';
import { api } from '../../../../config/config';

export const baseUrl = `${api.protocol}://${api.host}:${api.port}/${api.endPoint}`;

const fetchProducts = () => {
  const requestObservable = new AjaxObservable({ url: `${baseUrl}/products`, crossDomain: true, method: 'GET', timeout: 5000 });
  return requestObservable.map(x => x.response);
};

export default { baseUrl, fetchProducts };
