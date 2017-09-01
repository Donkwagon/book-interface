import { Component, OnInit } from '@angular/core';

import { Book } from './../@core/classes/book';
import { BookService } from './../@core/services/book.service';

import { Provider } from './../@core/classes/provider';
import { ProviderService } from './../@core/services/provider.service';

import { FilterPipe } from './../@core/pipes/filter.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ BookService, ProviderService, FilterPipe ]
})
export class HomeComponent implements OnInit {
  
  books: Book[];
  providers: Provider[];
  filter: String;

  constructor(private bookService: BookService, private providerService: ProviderService) {}

  ngOnInit() {
    this.getBooks();
    this.getProviders();
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
  
  getProviders = () => {
    console.log("?");
    this.providerService.getProviders().then(res => {
      console.log(res);
      if(res){
        this.providers = res;
      }
    });
  }

  selectFilter = (filter) => {
    this.filter = filter;
  }

}