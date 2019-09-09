import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {

  login_credentials: any;

  constructor(private auth_service: AuthService) {
    this.auth_service = auth_service;
  }

  ngOnInit() {
    this.login_credentials = {
      username: '',
      password: '',
    }
  }

  loginUser() {
    this.auth_service.login(this.login_credentials).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        console.log("Logged in as User: " + this.login_credentials.username)
      },
      error => {
        console.log('error' + error)
      },
    );
  }

}
