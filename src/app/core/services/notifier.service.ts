import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn:"root"
})
export class NotifierService {
  private notify$ = new Subject<string>();
  constructor() {
    this.notify$.subscribe({
      next: text => {
        alert(text);
      }
    })
  }

  sendNotification(text: string){
    this.notify$.next(text);
  }
}
