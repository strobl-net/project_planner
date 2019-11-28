import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.styl']
})
export class LogoutComponent implements OnInit {

  constructor(private auth_service: AuthService, private router: Router) {
    this.auth_service = auth_service;
  }

  ngOnInit() {
    this.logout();
  }

  logout = () => {
    this.auth_service.logout().subscribe(
      data => {
        this.router.navigate(['/'])
          .then(() => {
            window.location.reload();
          });
      },
      error => {
      }
    );
  }
}
