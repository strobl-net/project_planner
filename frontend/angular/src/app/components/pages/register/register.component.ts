import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
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
