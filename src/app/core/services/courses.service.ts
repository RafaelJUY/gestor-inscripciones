import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {ICourse} from "../../features/dashboard/courses/model/ICourse";
import {Course} from "../../features/dashboard/courses/model/Course";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn:"root"
})
export class CoursesService {
  /*private MY_DATABASE: ICourse[] = [
    new Course("1", "Angular", new Date(), new Date()),
    new Course("2", "JS", new Date(), new Date()),
    new Course("3", "TS", new Date(), new Date())
  ]*/

  constructor(private httpClient: HttpClient) {
  }
  getCourses(): Observable<ICourse[]>{
    /*return new Observable((observer) => {
      setTimeout(()=>{
        observer.next(this.MY_DATABASE);
        observer.complete();
      },700);
    })*/
    return this.httpClient.get<Course[]>(environment.apiUrl + "/courses");
  }

  getCourseById(id: string): Observable<ICourse | undefined>{
    /*return this.getCourses().pipe(
      map((allCourses) => allCourses.find( (course) => course.id === id))
    );*/
    return this.httpClient.get<ICourse | undefined>(environment.apiUrl + "/courses/" + id);
  }

  /*private nextId(): number{
    return Math.max(...this.MY_DATABASE.map(course => course.id)) + 1;
  }*/

  addCourses(course : ICourse): Observable<ICourse>{
    /*// course.id = this.nextId();
    this.MY_DATABASE.push(course);
    return this.getCourses();*/
    return this.httpClient.post<ICourse>(environment.apiUrl + "/courses", course);
  }

  editCourseById(id:string, update: ICourse): Observable<ICourse>{
    /*this.MY_DATABASE = this.MY_DATABASE.map(
      element => element.id === id ? {...update, id} : element
    );
    return this.getCourses();*/
    return this.httpClient.patch<ICourse>(environment.apiUrl + "/courses/" + id, update);
  }
  deleteCourseById(id : string): Observable<ICourse>{
    /*this.MY_DATABASE = this.MY_DATABASE.filter( element => element.id != id );
    return this.getCourses();*/
    return this.httpClient.delete<ICourse>(environment.apiUrl + "/courses/" + id);
  }

}
