import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/skeletal/nav/nav.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { NotfoundComponent } from './components/pages/notfound/notfound.component';
import { ProjectsComponent } from './components/pages/projects/projects.component';
import { BillsComponent } from './components/pages/bills/bills.component';
import { ProjectComponent } from './components/objects/project/project.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { HttpClientModule } from '@angular/common/http';

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
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
