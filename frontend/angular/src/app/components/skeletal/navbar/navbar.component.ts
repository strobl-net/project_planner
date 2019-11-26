import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {UserAuth} from "../../../services/auth/user.auth.model";
import {UserService} from "../../../services/auth/user.service";
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  app_title: string = 'ProjectPlanner';
  loggedIn: boolean = false;
  current_user: UserAuth;
  current_user_loading: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private user_service: UserService) {
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
