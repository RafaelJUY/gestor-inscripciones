import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {IStudent} from "./interfaces/IStudent";
import {StudentDialogComponent} from "./components/student-dialog/student-dialog.component";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', "actions"];
  dataSource: IStudent[] = [
    {
      id: 1,
      firstName: "Rafael",
      lastName: "Cortez",
      email: "rafa@gmail.com",
    },
    {
      id: 2,
      firstName: "Mauro",
      lastName: "Benitez",
      email: "mauro@gmail.com",
    },
    {
      id: 3,
      firstName: "Franco",
      lastName: "Cardozo",
      email: "fran@gmail.com",
    }
  ];

  constructor(private matDialog: MatDialog) {
  }

  private nextID():number{
    return this.dataSource[this.dataSource.length - 1].id + 1;
  }
  openDialog(): void {
    this.matDialog.open(StudentDialogComponent).afterClosed().subscribe({
      next: (value) => {
        if(value){ // para evitar que se inserte una fila vacia al dar click en cancelar
          value['id'] = this.nextID();
          this.dataSource = [...this.dataSource, value];
        }
      },
    });
  }

  editStudent(editingStudent: IStudent){
    this.matDialog.open(StudentDialogComponent, { data : editingStudent}).afterClosed().subscribe({
      next: (value) => {
        if(!!value){
          this.dataSource = this.dataSource.map(
            element => element.id === editingStudent.id ? {...value, id: editingStudent.id} : element
          );
        }
      }
    });
  }

  deleteStudentByID(id: number){
    if(confirm("Esta seguro de eliminar el estudiente?")){
      this.dataSource = this.dataSource.filter( element => element.id != id );
    }
  }
}
