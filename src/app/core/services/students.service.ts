import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {IStudent} from "../../dashboard/students/model/IStudent";
import {Student} from "../../dashboard/students/model/Student";

@Injectable({
  providedIn: "root"
})
export class StudentsService {
  private MY_DATABASE: IStudent[] = [
    new Student(1, "Rafael", "Cortez", "rafa@gmail.com"),
    new Student(2, "Mauro", "Benitez", "mauro@gmail.com"),
    new Student(3, "Franco", "Cardozo", "fran@gmail.com")
  ];
  getStudents(): Observable<IStudent[]> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.MY_DATABASE);
        observer.complete();
      }, 700);
    })
  }

  private nextId(): number {
    return Math.max(...this.MY_DATABASE.map(student => student.id)) + 1;
  }

  addStudents(student: IStudent): Observable<IStudent[]> {
    student.id = this.nextId();
    this.MY_DATABASE.push(student);
    return this.getStudents();
  }

  editStudentById(id: number, update: IStudent): Observable<IStudent[]> {
    this.MY_DATABASE = this.MY_DATABASE.map(
      element => element.id === id ? {...update, id} : element
    );
    return this.getStudents();
  }

  deleteStudentById(id: number): Observable<IStudent[]> {
    this.MY_DATABASE = this.MY_DATABASE.filter(element => element.id != id);
    return this.getStudents();
  }
}
