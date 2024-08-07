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
  private MY_DATABASE: Lesson[] = [];

  private urlEndpoint: string = "";

  constructor(private httpClient: HttpClient) {
    this.urlEndpoint = environment.apiUrl + "/lessons/";
  }

  getAllLessons(): Observable<ILesson[]>{
    /*return new Observable((observer) => {
      setTimeout(()=>{
        observer.next(this.MY_DATABASE);
        observer.complete();
      },700);
    })*/
    return this.httpClient.get<ILesson[]>(this.urlEndpoint);
  }

  /*getLessonByCourseId(courseId: string): Observable<Lesson[]>{
    return this.getAllLessons().pipe(
      map((allLessons) => allLessons.filter( (lesson) => lesson.idCourse === courseId))
    );
  }*/
  getLessonByCourseId(courseId: string): Observable<ILesson[]>{
    return this.httpClient.get<ILesson[]>(this.urlEndpoint, {
      params: {
        idCourse: courseId
      }
    });
  }

  /*addLesson(lesson : Lesson): Observable<Lesson[]>{
    this.MY_DATABASE.push(lesson);
    // return this.getAllLessons();
    return this.getLessonByCourseId(lesson.idCourse);
  }*/

  addLesson(lesson : ILesson): Observable<ILesson>{
    return this.httpClient.post<ILesson>(this.urlEndpoint, lesson);
  }

  deleteLesson(lesson: ILesson): Observable<ILesson[]> {
    this.MY_DATABASE = this.MY_DATABASE.filter(l =>
      l.idCourse !== lesson.idCourse ||
      l.date.getTime() !== lesson.date.getTime() ||
      l.topic !== lesson.topic ||
      l.startTime !== lesson.startTime ||
      l.endTime !== lesson.endTime
    );
    return this.getAllLessons();
  }
  deleteLessonbyId(idLesson: string): Observable<ILesson> {
    return this.httpClient.delete<ILesson>(this.urlEndpoint + idLesson);
  }

}
