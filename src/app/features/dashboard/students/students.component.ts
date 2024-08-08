import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {IStudent} from "./model/IStudent";
import {StudentDialogComponent} from "./components/student-dialog/student-dialog.component";
import {StudentsService} from "../../../core/services/students.service";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit{
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', "actions"];
  dataSource: IStudent[] = [];

  isLoading: boolean = false; // para mostrar animación de carga
  constructor(private matDialog: MatDialog, private studentService: StudentsService) {
  }

  ngOnInit(): void {
    this.loadStudents();
  }
  loadStudents(){
    this.isLoading = true;
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.dataSource = students;
      },
      complete: ()=>{
        this.isLoading = false;
      },
    })
  }
  openDialog(): void {
    this.matDialog.open(StudentDialogComponent).afterClosed().subscribe({
      next: (value) => {
        if(value){
          this.isLoading = true;
          this.studentService.addStudents(value).subscribe({
            next: (student) => {
              this.dataSource = [...this.dataSource, student];
            },
            complete: () => {
              this.isLoading = false;
            }
          })
        }

      },
    });
  }

  editStudent(editingStudent: IStudent){
    this.matDialog.open(StudentDialogComponent, { data : editingStudent}).afterClosed().subscribe({
      next: (value) => {
        if(!!value){
          this.isLoading = true;
          this.studentService.editStudentById(editingStudent.id, value).subscribe({
            next: (modifiedStudent) => {
              // En el array dataSourse actualizo el estudiante modificado.
              let index = this.dataSource.findIndex(student => student.id === editingStudent.id);
              this.dataSource[index] = modifiedStudent;

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

  deleteStudentByID(id: string){
    if(confirm("Esta seguro de eliminar el estudiente?")){
      this.isLoading = true;
      this.studentService.deleteStudentById(id).subscribe({
        next: (studentsDeleted) => {
          this.dataSource = [...this.dataSource.filter(student => student.id !== studentsDeleted.id)];
        },
        complete: () => {
          this.isLoading = false;
        }
      })
    }
  }
}
