import {Component, OnInit} from '@angular/core';
import {User} from "../../../services/auth/user.model";
import {UserService} from "../../../services/auth/user.service";
import set = Reflect.set;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.styl']
})
export class NavComponent implements OnInit {

  appTitle: string = 'ProjectPlanner';
  loggedIn: boolean = false;
  current_user: User;
  current_user_loading: boolean = false;

  constructor(private user_service: UserService) {
    this.user_service = user_service;
  }

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser = () => {
    this.current_user_loading = true;
    this.user_service.getUser().subscribe(
      data => {
        this.current_user = data;
        this.current_user_loading = false;
        this.loggedIn = true;
      },
      error => {
        console.log('could not get user data')
      }
    );
  }

}
