import { Component } from '@angular/core';
import {StudentsService} from "../../../core/services/students.service";
import {CoursesService} from "../../../core/services/courses.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  courseQuantity: number = 0;
  studentQuantity: number = 0;

  constructor(private studentsService: StudentsService, private courseService: CoursesService) {
    this.courseService.getCourses().subscribe({
      next: courses => {this.courseQuantity = courses.length},
    })

    this.studentsService.getStudents().subscribe({
      next: students => {this.studentQuantity = students.length},
    })
  }
}
