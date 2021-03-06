import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { HttpService } from 'app/services/http.service';

@Injectable()
export class AppHttpService extends HttpService {

  private readonly baseUrl = 'https://testapi.konnectedtechnology.com/';

  constructor(protected http: Http) {
    super(http);
    const headers = new Headers();
    // headers.append('Authorization', btoa('username:password'));
    this.requestOptions.headers = headers;
  }

  get(pathOrUrl: string, searchItems?: object) {
    return super.get(this.getUrl(pathOrUrl), searchItems);
  }

  post(pathOrUrl: string, data: object) {
    return super.post(this.getUrl(pathOrUrl), data);
  }

  put(pathOrUrl: string, data: object) {
    return super.put(this.getUrl(pathOrUrl), data);
  }

  delete(pathOrUrl: string) {
    return super.delete(this.getUrl(pathOrUrl));
  }


  private getUrl(pathOrUrl: string) {
    return pathOrUrl.indexOf(this.baseUrl) === 0 ? pathOrUrl : (this.baseUrl + pathOrUrl);
  }
}
