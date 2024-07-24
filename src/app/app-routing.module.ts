import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./features/auth/login/login.component";
import {DashboardComponent} from "./features/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: "auth",
    component: LoginComponent,
  },
  {
    path: "dashboard",
    component: DashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
