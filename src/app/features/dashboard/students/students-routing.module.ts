import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StudentsComponent} from "./students.component";
import {StudentDetailComponent} from "./components/student-detail/student-detail.component";

const routes: Routes = [
  // Estoy en /dashboard/students
  {
    path: "",
    component: StudentsComponent,
  },
  {
    // Estoy en /dashboard/students/:id
    path: ":id",
    component: StudentDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
