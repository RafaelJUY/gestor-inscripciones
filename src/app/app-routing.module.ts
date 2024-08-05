import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./features/auth/login/login.component";
import {DashboardComponent} from "./features/dashboard/dashboard.component";
import {CoursesComponent} from "./features/dashboard/courses/courses.component";
import {EnrollmentsComponent} from "./features/dashboard/enrollments/enrollments.component";
import {StudentsComponent} from "./features/dashboard/students/students.component";
import {CourseDetailComponent} from "./features/dashboard/courses/components/course-detail/course-detail.component";
import {HomeComponent} from "./features/dashboard/home/home.component";
import {StudentDetailComponent} from "./features/dashboard/students/components/student-detail/student-detail.component";
import {authGuard} from "./core/guards/auth.guard";

const routes: Routes = [
  {
    path: "auth",
    // component: LoginComponent, //Se reemplaza
    loadChildren: () => import("./features/auth/auth.module").then((reference) => reference.AuthModule),
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [authGuard],
    loadChildren: () => import("./features/dashboard/dashboard.module").then((reference) => reference.DashboardModule),
    /*children: [
      {
        path: "home",
        component: HomeComponent,
      },
      {
        path: "courses",
        component: CoursesComponent,
      },
      {
        //Si necesito mas puedo concatenar "courses/:id/:name"
        path: "courses/:id",
        component: CourseDetailComponent,
      },
      {
        path: "students",
        component: StudentsComponent,
      },
      {
        path: "students/:id",
        component: StudentDetailComponent,
      },
      {
        path: "enrollments",
        component: EnrollmentsComponent,
      },
      {
        path: "**",
        redirectTo: "/dashboard/home",
      }
    ]*/
  },
  {
    path: "**", //cualquier ruta que no coincida con las otras
    redirectTo: "auth/login",
    // component: //podemos poder un componente de error 404
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
