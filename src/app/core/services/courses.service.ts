import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ICourse} from "../../features/dashboard/courses/interfaces/ICourse";

@Injectable({
  providedIn:"root"
})
export class CoursesService {

  private MY_DATABASE: ICourse[] = [
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
    },
  ];
  getCourses(): Observable<ICourse[]>{
    return new Observable((observer) => {
      setTimeout(()=>{
        observer.next(this.MY_DATABASE);
        observer.complete();
      },700);
    })
  }

  addCourses(course : ICourse): Observable<ICourse[]>{
    this.MY_DATABASE.push(course);
    return this.getCourses();
  }

  editCourseById(id:number, update: ICourse): Observable<ICourse[]>{
    this.MY_DATABASE = this.MY_DATABASE.map(
      element => element.id === id ? {...update, id} : element
    );
    return this.getCourses();
  }
  deleteCourseById(id : number): Observable<ICourse[]>{
    this.MY_DATABASE = this.MY_DATABASE.filter( element => element.id != id );
    return this.getCourses();
  }


}
