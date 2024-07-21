import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {IStudent} from "../../dashboard/students/model/IStudent";

@Injectable({
  providedIn:"root"
})
export class StudentsService {
  private MY_DATABASE: IStudent[] = [
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
  getStudents(): Observable<IStudent[]>{
    return new Observable((observer) => {
      setTimeout(()=>{
        observer.next(this.MY_DATABASE);
        observer.complete();
      },700);
    })
  }

  addStudents(course : IStudent): Observable<IStudent[]>{
    this.MY_DATABASE.push(course);
    return this.getStudents();
  }

  editStudentById(id:number, update: IStudent): Observable<IStudent[]>{
    this.MY_DATABASE = this.MY_DATABASE.map(
      element => element.id === id ? {...update, id} : element
    );
    return this.getStudents();
  }
  deleteStudentById(id : number): Observable<IStudent[]>{
    this.MY_DATABASE = this.MY_DATABASE.filter( element => element.id != id );
    return this.getStudents();
  }
}
