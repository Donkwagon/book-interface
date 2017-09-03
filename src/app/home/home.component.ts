import { Component, OnInit } from '@angular/core';

import { Book } from './../@core/classes/book';
import { BookService } from './../@core/services/book.service';

import { Provider } from './../@core/classes/provider';
import { ProviderService } from './../@core/services/provider.service';

import { Tag } from './../@core/classes/tag';
import { TagService } from './../@core/services/tag.service';

import { FilterPipe } from './../@core/pipes/filter.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ BookService, ProviderService, TagService, FilterPipe ]
})
export class HomeComponent implements OnInit {
  
  books: Book[];
  providers: Provider[];
  tags: Tag[];
  filter: String;

  sidePanel: String;

  constructor(
    private bookService: BookService,
    private providerService: ProviderService,
    private tagService: TagService
  ) {
    this.sidePanel = "providers";
  }

  ngOnInit() {
    this.getBooks();
    this.getProviders();
    this.getTags();
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

  getTags = () => {
    console.log("?");
    this.tagService.getTags().then(res => {
      console.log(res);
      if(res){
        this.tags = res;
      }
    });
  }

  selectFilter = (filter) => {
    this.filter = filter;
  }

}