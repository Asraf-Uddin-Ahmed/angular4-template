import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';

@Injectable()
export class HttpService {

  protected readonly requestOptions = new RequestOptions();

  constructor(protected http: Http) { }

  get(url: string, searchItems?: object) {
    this.loadSearchToRequestOptions(searchItems);
    return this.http.get(url, this.requestOptions).map(res => (res.text() ? res.json() : {}));
  }

  post(url: string, data: object) {
    return this.http.post(url, data, this.requestOptions).map(res => (res.text() ? res.json() : {}));
  }

  put(url: string, data: object) {
    return this.http.put(url, data, this.requestOptions).map(res => (res.text() ? res.json() : {}));
  }

  delete(url: string) {
    return this.http.delete(url, this.requestOptions).map(res => (res.text() ? res.json() : {}));
  }


  private loadSearchToRequestOptions(searchItems: object) {
    const search = new URLSearchParams();
    for (const key in searchItems) {
      if (searchItems.hasOwnProperty(key)) {
        const value = searchItems[key];
        Array.isArray(value) ? value.forEach(elem => search.append(key, elem)) : search.set(key, value);
      }
    }
    this.requestOptions.search = search;
  }

}
