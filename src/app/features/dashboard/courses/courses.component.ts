import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CourseDialogComponent} from "./components/course-dialog/course-dialog.component";
import {ICourse} from "./interfaces/ICourse";
import {CoursesService} from "../../../core/services/courses.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  nombreCurso: string = "";

  displayedColumns: string[] = ['id', 'name', 'startDate', 'endDate', "actions"];
  dataSource: ICourse[] = [];

  isLoading: boolean = false;

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
    // .afterClosed().subscribe para recibir el valor del dialogo curse-dialog.component
    this.matDialog.open(CourseDialogComponent).afterClosed().subscribe({
      next: (value) => {
        console.log("RECIBIMOS ESTE VALOR:", value);

        this.nombreCurso = value.name;
        // CREAR METODO PRIVADO PARA ASIGNAR ID DEL NUEVO ELEMENTO

        this.isLoading = true;
        this.coursesService.addCourses(value).subscribe({
          next: (courses) => {
            this.dataSource = [...courses];
          },
          complete: () => {
            this.isLoading = false;
          }
        })
        // this.dataSource = [...this.dataSource, value];
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
          // this.dataSource = this.dataSource.map(
          //   element => element.id === editingCourse.id ? {...value, id: editingCourse.id} : element
          // );
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
