import { Component } from '@angular/core';
import {EnrollmentsService} from "../../core/services/enrollments.service";
import {IEnrollments} from "./model/IEnrollments";
import {Subject} from "rxjs";
import {NotifierService} from "../../core/services/notifier.service";

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.scss'
})
export class EnrollmentsComponent {
  // enrollments$: Observable<IEnrollments[]>;
  enrollments: IEnrollments[] = [];
  isLoading = true;

  // mySubject$ = new Subject();

  constructor(private enrollmentService: EnrollmentsService, private notifierService: NotifierService) {
    // this.mySubject$.next(1)

    // this.enrollments$ = this.enrollmentService.getEnrollments();

    this.enrollmentService.getEnrollments().subscribe({
      next:value => (this.enrollments = value),
      complete: () => (this.isLoading = false),
    })
  }

  addEnrollment():void{
    this.enrollmentService.addEnrollment().subscribe({
      next:value => {this.enrollments = value},
    });
    // this.enrollmentService.addEnrollment();

    this.notifierService.sendNotification("Se agrego una inscripción!");
  }
}
