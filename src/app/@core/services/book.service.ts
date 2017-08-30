import { Injectable } from '@angular/core';
import { Book } from '../classes/Book';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BookService {
    private BooksUrl = '/apis/book';

    constructor (private http: Http) {}

    getBooks(): Promise<Book[] | void> {
      return this.http.get(this.BooksUrl)
                 .toPromise()
                 .then(response => response.json() as Book[])
                 .catch(this.handleError);
    }

    getBooksByType(type: String): Promise<Book[] | void> {
      return this.http.get(this.BooksUrl + '/type/' + type)
                 .toPromise()
                 .then(response => response.json() as Book[])
                 .catch(this.handleError);
    }

    getBook(BookId: String): Promise<Book | void> {
      return this.http.get(this.BooksUrl + '/' + BookId)
                 .toPromise()
                 .then(response => response.json() as Book)
                 .catch(this.handleError);
    }

    createBook(newBook: Book): Promise<Book | void> {
      let data = newBook;
      return this.http.post(this.BooksUrl, data)
                 .toPromise()
                 .then(response => response.json() as Book)
                 .catch(this.handleError);
    }

    deleteBook(deleteBookId: String): Promise<String | void> {
      return this.http.delete(this.BooksUrl + '/' + deleteBookId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    updateBook(putBook: Book): Promise<Book | void> {
      let putUrl = this.BooksUrl + '/' + putBook._id;
      return this.http.put(putUrl, putBook)
                 .toPromise()
                 .then(response => response.json() as Book)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}