import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
const routes: Routes = [
  {
    path: "", redirectTo: "login", pathMatch: "full"
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      {
        path: "home/:id",
        component: HomeComponent,
      },
      {
        path: "user/:id",
        component: UserProfileComponent 
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
