import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class HttpService {

  constructor(private http: Http) { }

  get(url) {
    return this.http.get(url).map(res => res.json());
  }
}
