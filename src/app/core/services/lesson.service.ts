import {Injectable} from '@angular/core';
import {Lesson} from "../../features/dashboard/courses/model/Lesson";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ILesson} from "../../features/dashboard/courses/model/ILesson";

@Injectable({
  providedIn: "root"
})
export class LessonService {
  private urlEndPoint: string = "";
  constructor(private httpClient: HttpClient) {
    this.urlEndPoint = environment.apiUrl + "/lessons/";
  }

  getAllLessons(): Observable<ILesson[]>{
    return this.httpClient.get<ILesson[]>(this.urlEndPoint);
  }

  getAllLessonByCourseId(courseId: string): Observable<ILesson[]>{
    return this.httpClient.get<ILesson[]>(this.urlEndPoint, {
      params: {
        idCourse: courseId
      }
    });
  }

  addLesson(lesson : ILesson): Observable<ILesson>{
    return this.httpClient.post<ILesson>(this.urlEndPoint, lesson);
  }

  deleteLessonbyId(idLesson: string): Observable<ILesson> {
    return this.httpClient.delete<ILesson>(this.urlEndPoint + idLesson);
  }

}
