import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.styl']
})
export class NavComponent implements OnInit {

  appTitle: string = 'ProjectPlanner';
  loggedIn: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
