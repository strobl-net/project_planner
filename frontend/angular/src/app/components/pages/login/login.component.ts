import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {

  login_credentials;

  constructor(private auth_service: AuthService, private router: Router) {
    this.auth_service = auth_service;
  }

  ngOnInit() {
    this.login_credentials = {
      username: '',
      password: '',
    }
  }

  loginUser() {
    console.log(this.login_credentials);
    this.auth_service.login(this.login_credentials).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        window.location.reload();
        this.router.navigateByUrl('');
      },
      error => {
        console.log('error' + error)
      },
    );
  }

}
