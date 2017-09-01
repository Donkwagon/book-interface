import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { Book } from './../@core/classes/book';
import { BookService } from './../@core/services/book.service'

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  providers: [ BookService ]
})
export class BookComponent implements OnInit {
    
  sub: any;
  bookId: String;
  book: Book;

  constructor(private bookService: BookService, private route: ActivatedRoute) {}

  ngOnInit() {
    
    this.sub = this.route.params.subscribe(params => {
      this.bookId = params['bookId'];
      this.getBook();
    });

  }

  getBook = () => {
    this.bookService.getBook(this.bookId).then(res => {
      console.log(res);
      if(res){
        this.book = res;
      }
    })
  }

}
