import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CourseDialogComponent} from "./components/course-dialog/course-dialog.component";
import {ICourse} from "./model/ICourse";
import {CoursesService} from "../../../core/services/courses.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  // nombreCurso: string = "";

  displayedColumns: string[] = ['id', 'name', 'startDate', 'endDate', "actions"];
  dataSource: ICourse[] = [];

  isLoading: boolean = false; // para mostrar animación de carga

  constructor(private matDialog: MatDialog, private coursesService: CoursesService) {
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.isLoading = true;
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.dataSource = courses;
      },
      complete: () => {
        this.isLoading = false;
      },
    })
  }

  openDialog(): void {
    this.matDialog.open(CourseDialogComponent).afterClosed().subscribe({
      next: (value) => {
        if(value){
          this.isLoading = true;

          this.coursesService.addCourses(value). subscribe({
            next: (courses) => {this.dataSource = [...courses]},
            complete: () => {this.isLoading= false}
          })
        }
      },
    });
  }

  editCourse(editingCourse: ICourse) {
    this.matDialog.open(CourseDialogComponent, {data: editingCourse}).afterClosed().subscribe({
      next: (value) => {
        if (!!value) {
          this.isLoading = true;
          this.coursesService.editCourseById(editingCourse.id, value).subscribe({
            next: (courses) => {
              this.dataSource = [...courses];
            },
            complete: () => {
              this.isLoading = false;
            },
          })
        }
      }
    });
  }

  deleteCourseByID(id: number) {
    if (confirm("Esta seguro de eliminar el curso?")) {
      this.isLoading = true;
      this.coursesService.deleteCourseById(id).subscribe({
        next: (courses) => {
          this.dataSource = [...courses];
        },
        complete: () => {
          this.isLoading = false;
        }
      })
    }
  }
}
