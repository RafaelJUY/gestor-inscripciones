import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(){};

/*  async login(){
    // console.log("Ejecutando login real");
    console.log("START");
    await this.obtenerUsuarioPromise()
      // then para cuando la promesa se resuleve satisfactoriamente
      .then((usuario) => {
        console.log("USUARIO", usuario)
      })
      // cath para atrapar el error de la promesa
      .catch((err) => {
        console.log(err);
      })
      .finally(()=> {});
    console.log("END");
  }*/
/*  async login(){
    this.obtenerUsuarioObservable().subscribe({
      // Se ejecuta cuando el observable emite un valor (sin errores). Es el equivalente del then en promesas.
      next: usuario => {
        console.log(usuario);
      },
      // Se ejecuta cuando el observable emite un error. Es equivalente al catch en promesas.
      error: err => {
        console.log("Ocurrio algo", err);
      },
      // Se ejecuta cuando el observable deja de emitir valores.
      complete: () => {
        console.log("El observable se completo, por ende no va a emitir mas valores.")
      }
    })
  }*/

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
