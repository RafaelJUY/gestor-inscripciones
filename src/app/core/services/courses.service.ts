import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ICourse} from "../../features/dashboard/courses/model/ICourse";
import {Course} from "../../features/dashboard/courses/model/Course";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn:"root"
})
export class CoursesService {
  constructor(private httpClient: HttpClient) {
  }
  getCourses(): Observable<ICourse[]>{
    return this.httpClient.get<Course[]>(environment.apiUrl + "/courses");
  }

  getCourseById(idCourse: string): Observable<ICourse | undefined>{
    return this.httpClient.get<ICourse | undefined>(environment.apiUrl + "/courses/" + idCourse);
  }

  addCourses(course : ICourse): Observable<ICourse>{
    return this.httpClient.post<ICourse>(environment.apiUrl + "/courses", course);
  }

  editCourseById(idCourse:string, update: ICourse): Observable<ICourse>{
    return this.httpClient.patch<ICourse>(environment.apiUrl + "/courses/" + idCourse, update);
  }
  deleteCourseById(idCourse : string): Observable<ICourse>{
    return this.httpClient.delete<ICourse>(environment.apiUrl + "/courses/" + idCourse);
  }

}
