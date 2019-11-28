import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login_credentials;
  login_success = true;
  first = true;

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
        this.login_success = true;
        localStorage.setItem('token', response.token);
        this.router.navigate(['/'])
          .then(() => {
            window.location.reload();
          });
      },
      error => {
        this.login_success = false;
        console.log('error' + error)
      },
    );
  }


}
