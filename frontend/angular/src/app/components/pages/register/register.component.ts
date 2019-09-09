import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {log} from "util";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.styl']
})
export class RegisterComponent implements OnInit {

  register;

  constructor(private auth_service: AuthService) {
    this.auth_service = auth_service;
  }

  ngOnInit() {
    this.register = {
      username: '',
      password: '',
      email: ''
    }
  }

  registerUser(){
    this.auth_service.register(this.register).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        console.log('User ' + this.register.username + ' has been created')
      },
      error => {
        console.log('error' + error)
      },
    );
  }

}
