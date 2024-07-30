import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {ICourse} from "../../features/dashboard/courses/model/ICourse";
import {Course} from "../../features/dashboard/courses/model/Course";

@Injectable({
  providedIn:"root"
})
export class CoursesService {
  private MY_DATABASE: ICourse[] = [
    new Course(1, "Angular", new Date(), new Date()),
    new Course(2, "JS", new Date(), new Date()),
    new Course(3, "TS", new Date(), new Date())
  ]
  getCourses(): Observable<ICourse[]>{
    return new Observable((observer) => {
      setTimeout(()=>{
        observer.next(this.MY_DATABASE);
        observer.complete();
      },700);
    })
  }

  getCourseById(id: number): Observable<ICourse | undefined>{
    return this.getCourses().pipe(
      map((allCourses) => allCourses.find( (course) => course.id === id))
    );
  }

  private nextId(): number{
    return Math.max(...this.MY_DATABASE.map(course => course.id)) + 1;
  }

  addCourses(course : ICourse): Observable<ICourse[]>{
    course.id = this.nextId();
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
