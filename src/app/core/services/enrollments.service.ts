import {Injectable} from '@angular/core';
import {delay, Observable, of} from "rxjs";
import {IEnrollments} from "../../features/dashboard/enrollments/model/IEnrollments";

@Injectable({
  providedIn: "root"
})
export class EnrollmentsService {
  private MY_DATABASE: IEnrollments[] = [
    {
      courseId: 1,
      studentId: 1,
    },
    {
      courseId: 1,
      studentId: 2,
    },
    {
      courseId: 1,
      studentId: 3,
    }
  ];
  getEnrollments(): Observable<IEnrollments[]>{
    return of<IEnrollments[]>(this.MY_DATABASE).pipe(delay(400));
  }

  addEnrollment(): Observable<IEnrollments[]>{
    this.MY_DATABASE.push({
      courseId: 1,
      studentId: 4,
    });

    return this.getEnrollments();
  }
}
