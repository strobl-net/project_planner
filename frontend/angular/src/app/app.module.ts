import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavComponent} from './components/skeletal/nav/nav.component';
import {HomeComponent} from './components/pages/home/home.component';
import {ProfileComponent} from './components/pages/profile/profile.component';
import {NotfoundComponent} from './components/pages/notfound/notfound.component';
import {ProjectsComponent} from './components/pages/projects/projects.component';
import {BillsComponent} from './components/pages/bills/bills.component';
import {ProjectComponent} from './components/objects/project/project.component';
import {LoginComponent} from './components/pages/login/login.component';
import {RegisterComponent} from './components/pages/register/register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ProjectDetailComponent} from './components/pages/project-detail/project-detail.component';
import {FormsModule} from "@angular/forms";
import {AuthInterceptor} from "./services/auth/auth.interceptor";
import { LogoutComponent } from './components/pages/logout/logout.component';
import { BillDetailComponent } from './components/pages/bill-detail/bill-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ProfileComponent,
    NotfoundComponent,
    ProjectsComponent,
    BillsComponent,
    ProjectComponent,
    LoginComponent,
    RegisterComponent,
    ProjectDetailComponent,
    LogoutComponent,
    BillDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
