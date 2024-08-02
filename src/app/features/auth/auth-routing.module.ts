import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  //dentro de /auth
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "**",
    redirectTo: "login",
  },
  // {
  //   path: "register",
  //   component: RegisterComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
