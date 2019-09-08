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

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ProfileComponent,
    NotfoundComponent,
    ProjectsComponent,
    BillsComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
