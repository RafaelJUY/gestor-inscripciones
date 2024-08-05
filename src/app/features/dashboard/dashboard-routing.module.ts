import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CoursesComponent} from "./courses/courses.component";
import {CourseDetailComponent} from "./courses/components/course-detail/course-detail.component";
import {StudentsComponent} from "./students/students.component";
import {StudentDetailComponent} from "./students/components/student-detail/student-detail.component";
import {EnrollmentsComponent} from "./enrollments/enrollments.component";
import {adminGuard} from "../../core/guards/admin.guard";

const routes: Routes = [
  //Ya estamos en /dashboard
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then((reference) => reference.HomeModule),
    // component: HomeComponent,
  },
  {
    path: "courses",
    canActivate: [adminGuard],
    loadChildren: () => import("./courses/courses.module").then((reference) => reference.CoursesModule),
    // component: CoursesComponent,
  },
/*  {
    //Si necesito mas puedo concatenar "courses/:id/:name"
    path: "courses/:id",
    component: CourseDetailComponent,
  },*/
  {
    path: "students",
    loadChildren: () => import("./students/students.module").then((reference) => reference.StudentsModule),
    // component: StudentsComponent,
  },
/*  {
    path: "students/:id",
    component: StudentDetailComponent,
  },*/
  {
    path: "enrollments",
    loadChildren: () => import("./enrollments/enrollments.module").then((reference) => reference.EnrollmentsModule),
    // component: EnrollmentsComponent,
  },
  {
    path: "**",
    redirectTo: "/dashboard/home",
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
