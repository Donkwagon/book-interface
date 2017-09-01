import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ImportService {
    private importUrl = '/apis/import';

    constructor (private http: Http) {}

    importLibrary(): Promise<any> {
      return this.http.get(this.importUrl + "/library")
                  .toPromise()
                  .then(response => response.json() as any)
                  .catch(this.handleError);
    }


    importBook(): Promise<any> {
      return this.http.get(this.importUrl + "/book")
                  .toPromise()
                  .then(response => response.json() as any)
                  .catch(this.handleError);
    }
    
    rakeData(): Promise<any> {
      return this.http.get(this.importUrl + "/rake")
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