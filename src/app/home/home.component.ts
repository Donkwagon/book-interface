import { Component, OnInit } from '@angular/core';

import { Book } from './../@core/classes/book';
import { BookService } from './../@core/services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ BookService ]
})
export class HomeComponent implements OnInit {
  
    books: Book[];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.getBooks();
  }
  
  getBooks = () => {
    console.log("?");
    this.bookService.getBooks().then(res => {
      console.log(res);
      if(res){
        this.books = res;
      }
    });
  }


}
