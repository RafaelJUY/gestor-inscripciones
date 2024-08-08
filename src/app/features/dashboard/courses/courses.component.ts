import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CourseDialogComponent} from "./components/course-dialog/course-dialog.component";
import {ICourse} from "./model/ICourse";
import {CoursesService} from "../../../core/services/courses.service";
import {delay} from "rxjs";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
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
    this.coursesService.getCourses().pipe(delay(700)).subscribe({
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

          this.coursesService.addCourses(value).pipe(delay(700)).subscribe({
            next: (course) => {this.dataSource = [...this.dataSource, course]},
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
          this.coursesService.editCourseById(editingCourse.id, value).pipe(delay(700)).subscribe({
            next: (modifiedCourse) => {
              // En el array dataSourse actualizo el curso modificado.
              let index = this.dataSource.findIndex(course => course.id === editingCourse.id);
              this.dataSource[index] = modifiedCourse;

              //Para actualizar la tabla en la vista.
              this.dataSource = [...this.dataSource];
            },
            complete: () => {
              this.isLoading = false;
            },
          })
        }
      }
    });
  }

  deleteCourseByID(id: string) {
    if (confirm("Esta seguro de eliminar el curso?")) {
      this.isLoading = true;
      this.coursesService.deleteCourseById(id).pipe(delay(700)).subscribe({
        next: (courseDeleted) => {
          // Elimino el courso del dataSource
          this.dataSource = this.dataSource.filter(course => course.id !== courseDeleted.id);
          this.dataSource = [...this.dataSource];
        },
        complete: () => {
          this.isLoading = false;
        }
      })
    }
  }
}
