import { Component } from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {Observable} from "rxjs";
import {IUser} from "../../core/model/IUsers";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showFiller = false;

  authUser$: Observable<IUser | null>;
  constructor(private authService: AuthService) {
    this.authUser$ = this.authService.authUser$;
  }

  logout(){
    this.authService.logout();
  }
}
