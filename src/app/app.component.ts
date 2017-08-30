import { Component, OnInit } from '@angular/core';

import { ImportService } from './@core/services/import.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ ImportService ]
})

export class AppComponent implements OnInit {

  constructor(private importService: ImportService) {}

  ngOnInit() {
  }
  
  importLibrary = () => {
    this.importService.importLibrary().then(res => {
      console.log(res);
    });
  }
}
