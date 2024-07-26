import { Component } from '@angular/core';
import {CoursesService} from "../../../../../core/services/courses.service";
import {Observable} from "rxjs";
import {ICourse} from "../../interfaces/ICourse";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent {
  course$: Observable<ICourse | undefined>;
  constructor(
    private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute //para obtener acceso a la url y obtener el parametro
  ) {
    let id = Number(this.activatedRoute.snapshot.params["id"]);//Colocar el mismo parametro "id" que se definio en app-routing module
    this.course$ = this.coursesService.getCourseById(id);
  }
}
