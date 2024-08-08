import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {IUser} from "../model/IUsers";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /*private FAKE_USER: IUser = {
    email: 'fake@mail.com',
    password: '123456',
    role: 'ADMIN',
  };*/
  private VALID_TOKEN = 'lksfdjglfdkgjklfdkjgldfjisdhfjsdfsdk';

  private _authUser$ = new BehaviorSubject<IUser | null>(null);
  authUser$ = this._authUser$.asObservable();
  constructor(private httpClient: HttpClient, private router: Router) { }

  login(data : {email: string, password: string}) {
    /*this._authUser$.next(this.FAKE_USER);
    localStorage.setItem('token', this.VALID_TOKEN);
    this.router.navigate(['dashboard', 'home']);*/

    this.httpClient.get<IUser[]>(environment.apiUrl + "/users", {
      params: {
        email: data.email,
        password: data.password,
      }
    }).subscribe({
      next: (response) => {
        if(!response.length){
          alert("Email o Password invalido");
        }else {
          const authUser = response[0];
          localStorage.setItem("token", authUser.token);
          this._authUser$.next(authUser);
          this.router.navigate(['dashboard', 'home']);
        }
      },
      error: (error) => {
        alert("Error al conectar con el servidor");
      }
    })
  }

  logout() {
    localStorage.removeItem('token');
    this._authUser$.next(null);
    this.router.navigate(['auth', 'login']);
  }

  verifyToken(): Observable<boolean> {
    /*const token = localStorage.getItem('token');
    const isValid = this.VALID_TOKEN === token;
    if (isValid) {
      // this._authUser$.next(this.FAKE_USER);
    }

    return of(isValid);*/

    const token = localStorage.getItem('token');
    if(!token){
      return of(false);
    }

    return this.httpClient.get<IUser[]>(environment.apiUrl + "/users", {
      params: {
        token: token,
      },
    }).pipe(
      map( (response) => {
        if(!response.length){
          return false;
        }else {
          const authUser = response[0];
          localStorage.setItem("token", authUser.token);
          this._authUser$.next(authUser);
          return true;
        }
      } )
    );
  }
  verificarToken(){}

  obtenerUsuarioAutenticado(){}

  /*
  *
  * Ejercitacion promesas
  *
  * */

  obtenerUsuarioObservable() : Observable<any>{
    return new Observable((observer) => {
      setInterval(()=>{
        // observer.next() para enviar un valor a quien este observando.
        observer.next({
          name: "Name Fake",
          email: "fake@email.com",
        });

        // observer.error("Error desconocido");

        // observer.complete();
      }, 2000)
    });
  }

  obtenerUsuarioPromise():Promise<any>{
    return new Promise((resolve, reject) => {
      reject("Hubo un Error");
      setTimeout(() => {
        resolve({
          name: "Name Fake",
          email: "fake@email.com",
        });
      }, 2000);
    });
  }
}
