import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
``
@Injectable()
export class UserService {
    private UsersUrl = '/apis/User';

    constructor (private http: Http) {}

    getUsers(): Promise<User[] | void> {
      return this.http.get(this.UsersUrl)
                 .toPromise()
                 .then(response => response.json() as User[])
                 .catch(this.handleError);
    }

    getUsersByType(type: String): Promise<User[] | void> {
      return this.http.get(this.UsersUrl + '/type/' + type)
                 .toPromise()
                 .then(response => response.json() as User[])
                 .catch(this.handleError);
    }

    getUser(UserId: String): Promise<User | void> {
      return this.http.get(this.UsersUrl + '/' + UserId)
                 .toPromise()
                 .then(response => response.json() as User)
                 .catch(this.handleError);
    }

    createUser(newUser: any): Promise<User | void> {
      let data = newUser;
      return this.http.post(this.UsersUrl, data)
                 .toPromise()
                 .then(response => response.json() as User)
                 .catch(this.handleError);
    }


    loginUser(user: any): Promise<User | void> {
        let data = user;
        return this.http.post(this.UsersUrl + "/login", data)
                   .toPromise()
                   .then(response => response.json() as User)
                   .catch(this.handleError);
    }
  

    deleteUser(deleteUserId: String): Promise<String | void> {
      return this.http.delete(this.UsersUrl + '/' + deleteUserId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    updateUser(putUser: User): Promise<User | void> {
      let putUrl = this.UsersUrl + '/' + putUser._id;
      return this.http.put(putUrl, putUser)
                 .toPromise()
                 .then(response => response.json() as User)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}