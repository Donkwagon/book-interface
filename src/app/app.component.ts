import { Component, OnInit } from '@angular/core';

import { Book } from './@core/classes/book';

import { ImportService } from './@core/services/import.service';
import { BookService } from './@core/services/book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ ImportService, BookService ]
})

export class AppComponent implements OnInit {

  books: Book[];

  constructor(private importService: ImportService, private bookService: BookService) {}

  ngOnInit() {
    this.getBooks();
  }
  
  importLibrary = () => {
    this.importService.importLibrary().then(res => {
      console.log(res);
    });
  }
  
  getBooks = () => {
    console.log("?");
    this.bookService.getBooks().then(res => {
      console.log(res);
      if(res){
        this.books = res.splice(0,20);
      }
    });
  }

}
