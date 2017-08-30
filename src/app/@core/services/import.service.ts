import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ImportService {
    private securitiesUrl = '/apis/import';

    constructor (private http: Http) {}

    importLibrary(): Promise<any> {
      return this.http.get(this.securitiesUrl + "/library")
                 .toPromise()
                 .then(response => response.json() as any)
                 .catch(this.handleError);
    }


    private handleError (error: any) {
      const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}