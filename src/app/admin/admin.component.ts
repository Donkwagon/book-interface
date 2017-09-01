import { Component, OnInit } from '@angular/core';

import { ImportService } from './../@core/services/import.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [ ImportService ]
})
export class AdminComponent implements OnInit {

  constructor(private importService: ImportService) { }

  ngOnInit() {
  }
  
  importLibrary = () => {
    this.importService.importLibrary().then(res => {
      console.log(res);
    });
  }
  
  importBook = () => {
    this.importService.importBook().then(res => {
      console.log(res);
    });
  }

  rakeData = () => {
    this.importService.rakeData().then(res => {
      console.log(res);
    });
  }

}
