import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  register;

  constructor(private auth_service: AuthService, private router: Router) {
    this.auth_service = auth_service;
  }

  ngOnInit() {
    this.register = {
      username: '',
      password: '',
      email: ''
    }
  }

  registerUser() {
    this.auth_service.register(this.register).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/'])
          .then(() => {
            window.location.reload();
          });
      },
      error => {
        console.log('error' + error)
      },
    );
  }

}
