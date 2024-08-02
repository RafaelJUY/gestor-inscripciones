import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CoursesComponent} from "./courses.component";
import {CourseDetailComponent} from "./components/course-detail/course-detail.component";

const routes: Routes = [
  // Estoy en /dashboard/courses
  {
    path: "",
    component: CoursesComponent,
  },
  {
    // Estoy en /dashboard/courses/:id
    path: ":id", //Si necesito mas puedo concatenar "courses/:id/:name"
    component: CourseDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
