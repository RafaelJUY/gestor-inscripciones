import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CourseDialogComponent} from "./components/course-dialog/course-dialog.component";
import {Course} from "./interfaces/Course";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  nombreCurso : string = "";

  displayedColumns: string[] = ['id', 'name', 'startDate', 'endDate', "actions"];
  dataSource: Course[] = [
    {
      id: 1,
      name: "Angular",
      endDate: new Date(),
      startDate: new Date(),
    },
    {
      id: 2,
      name: "JS",
      endDate: new Date(),
      startDate: new Date(),
    },
    {
      id: 3,
      name: "TS",
      endDate: new Date(),
      startDate: new Date(),
    }
  ];
  constructor(private matDialog: MatDialog) {
  }

 openDialog(): void {
 // .afterClosed().subscribe para recibir el valor del dialogo curse-dialog.component
   this.matDialog.open(CourseDialogComponent).afterClosed().subscribe({
     next: (value) => {
       console.log("RECIBIMOS ESTE VALOR:", value);

       this.nombreCurso = value.name;
       // CREAR METODO PRIVADO PARA ASIGNAR ID DEL NUEVO ELEMENTO
       this.dataSource = [...this.dataSource, value];
     },
   });
 }

 editCourse(editingCourse: Course){
    this.matDialog.open(CourseDialogComponent, { data : editingCourse}).afterClosed().subscribe({
      next: (value) => {
        if(!!value){
          this.dataSource = this.dataSource.map(
            element => element.id === editingCourse.id ? {...value, id: editingCourse.id} : element
          );
        }
      }
    });
 }

 deleteCourseByID(id: number){
    if(confirm("Esta seguro de eliminar el curso?")){
      this.dataSource = this.dataSource.filter( element => element.id != id );
    }
 }
}
