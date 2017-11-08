import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';

@Injectable()
export class HttpService {

  private readonly requestOptions = new RequestOptions();

  constructor(private http: Http) {
    const headers = new Headers();
    // headers.append('Authorization', btoa('username:password'));
    this.requestOptions.headers = headers;
  }

  get(url: string, searchItems?: object) {
    this.loadSearchToRequestOptions(searchItems);
    return this.http.get(url, this.requestOptions).map(res => res.json());
  }

  post(url: string, data: object) {
    return this.http.post(url, data, this.requestOptions).map(res => res.json());
  }

  put(url: string, data: object) {
    return this.http.put(url, data, this.requestOptions).map(res => res.json());
  }

  delete(url: string) {
    return this.http.delete(url, this.requestOptions).map(res => res.json());
  }


  private loadSearchToRequestOptions(searchItems: object) {
    const search = new URLSearchParams();
    for (const key in searchItems) {
      if (searchItems.hasOwnProperty(key)) {
        const value = searchItems[key];
        search.set(key, value);
      }
    }
    this.requestOptions.search = search;
  }

}
