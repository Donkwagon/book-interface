import { Injectable } from '@angular/core';
import { Provider } from '../classes/provider';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProviderService {
    private ProvidersUrl = '/apis/provider';

    constructor (private http: Http) {}

    getProviders(): Promise<Provider[] | void> {
      return this.http.get(this.ProvidersUrl)
                 .toPromise()
                 .then(response => response.json() as Provider[])
                 .catch(this.handleError);
    }

    getProvidersByType(type: String): Promise<Provider[] | void> {
      return this.http.get(this.ProvidersUrl + '/type/' + type)
                 .toPromise()
                 .then(response => response.json() as Provider[])
                 .catch(this.handleError);
    }

    getProvider(ProviderId: String): Promise<Provider | void> {
      return this.http.get(this.ProvidersUrl + '/' + ProviderId)
                 .toPromise()
                 .then(response => response.json() as Provider)
                 .catch(this.handleError);
    }

    createProvider(newProvider: Provider): Promise<Provider | void> {
      let data = newProvider;
      return this.http.post(this.ProvidersUrl, data)
                 .toPromise()
                 .then(response => response.json() as Provider)
                 .catch(this.handleError);
    }

    deleteProvider(deleteProviderId: String): Promise<String | void> {
      return this.http.delete(this.ProvidersUrl + '/' + deleteProviderId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    updateProvider(putProvider: Provider): Promise<Provider | void> {
      let putUrl = this.ProvidersUrl + '/' + putProvider._id;
      return this.http.put(putUrl, putProvider)
                 .toPromise()
                 .then(response => response.json() as Provider)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}