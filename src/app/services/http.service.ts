import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class HttpService {

  private readonly requestOptions = new RequestOptions();

  constructor(private http: Http) {
    const headers = new Headers();
    // headers.append('Authorization', btoa('username:password'));
    this.requestOptions.headers = headers;
  }

  get(url) {
    return this.http.get(url, this.requestOptions).map(res => res.json());
  }

  post(url, data) {
    return this.http.post(url, data, this.requestOptions).map(res => res.json());
  }

  put(url, data) {
    return this.http.put(url, data, this.requestOptions).map(res => res.json());
  }

  delete(url) {
    return this.http.delete(url, this.requestOptions).map(res => res.json());
  }

}
