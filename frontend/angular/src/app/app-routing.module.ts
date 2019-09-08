import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./components/pages/home/home.component";
import {ProfileComponent} from "./components/pages/profile/profile.component";
import {NotfoundComponent} from "./components/pages/notfound/notfound.component";
import {ProjectsComponent} from "./components/pages/projects/projects.component";
import {LoginComponent} from "./components/pages/login/login.component";
import {RegisterComponent} from "./components/pages/register/register.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
