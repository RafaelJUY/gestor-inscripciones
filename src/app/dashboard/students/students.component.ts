import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {IStudent} from "./model/IStudent";
import {StudentDialogComponent} from "./components/student-dialog/student-dialog.component";
import {StudentsService} from "../../core/services/students.service";
import {Student} from "./model/Student";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit{
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', "actions"];
  dataSource: IStudent[] = [];

  isLoading: boolean = false;
  constructor(private matDialog: MatDialog, private studentService: StudentsService) {
  }

  private nextID():number{
    return this.dataSource[this.dataSource.length - 1].id + 1;
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
          // value['id'] = this.nextID();
          this.studentService.addStudents(value).subscribe({
            next: (students) => {
              this.dataSource = [...students];
            },
            complete: () => {
              this.isLoading = false;
            }
          })
          // this.dataSource = [...this.dataSource, value];
        }

      },

      /*next: (value) => {
        if(value){ // para evitar que se inserte una fila vacia al dar click en cancelar
          value['id'] = this.nextID();
          this.dataSource = [...this.dataSource, value];
        }
      },*/
    });
  }

  editStudent(editingStudent: IStudent){
    this.matDialog.open(StudentDialogComponent, { data : editingStudent}).afterClosed().subscribe({
      next: (value) => {
        if(!!value){
          this.isLoading = true;
          this.studentService.editStudentById(editingStudent.id, value).subscribe({
            next: (students) => {
              this.dataSource = [...students];
            },
            complete: () => {
              this.isLoading = false;
            },
          })
          // this.dataSource = this.dataSource.map(
          //   element => element.id === editingStudent.id ? {...value, id: editingStudent.id} : element
          // );
        }
      }
    });
  }

  deleteStudentByID(id: number){
    if(confirm("Esta seguro de eliminar el estudiente?")){
      this.isLoading = true;
      this.studentService.deleteStudentById(id).subscribe({
        next: (students) => {
          this.dataSource = [...students];
        },
        complete: () => {
          this.isLoading = false;
        }
      })
    }
  }
}
