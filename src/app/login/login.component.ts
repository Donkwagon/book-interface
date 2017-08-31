import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { User } from './../@core/classes/user';
import { UserService } from './../@core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ UserService ]
})

export class LoginComponent implements OnInit {

  user: User;
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  createAccount() {

    var user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.userService.createUser(user).then(res => {
      console.log(res);
    })
  }

  validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }

  loginAccount() {
    var user = {
      email: this.email,
      password: this.password
    }

    this.userService.loginUser(user).then(res => {
      console.log(res);
    })
  }

}
