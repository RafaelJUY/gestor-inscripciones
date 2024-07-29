import {Injectable} from '@angular/core';
import {Lesson} from "../../features/dashboard/courses/model/Lesson";
import {map, Observable} from "rxjs";
import {ICourse} from "../../features/dashboard/courses/model/ICourse";

@Injectable({
  providedIn: "root"
})
export class LessonService {
  private MY_DATABASE: Lesson[] = [
    new Lesson(1, new Date, "Introducción", 10, 12),
  ]

  getAllLessons(): Observable<Lesson[]>{
    return new Observable((observer) => {
      setTimeout(()=>{
        observer.next(this.MY_DATABASE);
        observer.complete();
      },700);
    })
  }

  getLessonByCourseId(courseId: number): Observable<Lesson[]>{
    return this.getAllLessons().pipe(
      map((allLessons) => allLessons.filter( (lesson) => lesson.idCourse === courseId))
    );
  }

  addLesson(lesson : Lesson): Observable<Lesson[]>{
    this.MY_DATABASE.push(lesson);
    return this.getAllLessons();
  }

  deleteLesson(lesson: Lesson): Observable<Lesson[]> {
    this.MY_DATABASE = this.MY_DATABASE.filter(l =>
      l.idCourse !== lesson.idCourse ||
      l.date.getTime() !== lesson.date.getTime() ||
      l.topic !== lesson.topic ||
      l.startTime !== lesson.startTime ||
      l.endTime !== lesson.endTime
    );
    return this.getAllLessons();
  }

}
