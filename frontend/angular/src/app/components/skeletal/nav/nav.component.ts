import {Component, OnInit} from '@angular/core';
import {UserAuth} from "../../../services/auth/user.auth.model";
import {UserService} from "../../../services/auth/user.service";
import set = Reflect.set;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  appTitle: string = 'ProjectPlanner';
  loggedIn: boolean = false;
  current_user: UserAuth;
  current_user_loading: boolean = false;

  constructor(private user_service: UserService) {
    this.user_service = user_service;
  }

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser = () => {
    this.current_user_loading = true;
    this.user_service.getAll().subscribe(
      data => {
        this.current_user = data;
        this.loggedIn = true;
        this.current_user_loading = false;
      },
      error => {
        this.loggedIn = false;
        this.current_user_loading = false
      }
    );
  }

}
