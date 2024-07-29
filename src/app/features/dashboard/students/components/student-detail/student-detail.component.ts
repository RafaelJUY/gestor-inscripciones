import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {IStudent} from "../../model/IStudent";
import {StudentsService} from "../../../../../core/services/students.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent {
  student$: Observable<IStudent | undefined>;

  constructor(
    private studentService: StudentsService,
    private activatedRoute: ActivatedRoute
  ) {
    let id: number = Number(this.activatedRoute.snapshot.params["id"]);
    this.student$ = this.studentService.getCourseById(id);
  }
}
