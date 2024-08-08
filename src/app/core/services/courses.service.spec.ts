import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {Router} from "@angular/router";
import {MockProvider} from "ng-mocks";
import {CoursesService} from "./courses.service";
import {HttpClientTestingModule, HttpTestingController, provideHttpClientTesting} from "@angular/common/http/testing";
import {environment} from "../../../environments/environment";
import {ICourse} from "../../features/dashboard/courses/model/ICourse";

describe('CoursesService', () => {
  let service: CoursesService;
  let router: Router;

  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MockProvider(Router),
        // provideHttpClientTesting()
      ],
    });
    httpController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CoursesService);
    router = TestBed.inject(Router);
  });

  it("Al llamar getCourses() se debe ejecutar una petición http a /courses", () =>{
    const mockedResponse: ICourse[] = [
      {
        id: "d83e",
        name: "Angular",
        startDate: new Date(),
        endDate: new Date()
      }
    ]

    service.getCourses().subscribe({
      next: (response) => {
        // Verificamos la respuesta de la solicitud
        expect(response).toEqual(mockedResponse);
      }
    });

    const req = httpController.expectOne({
      url: `${environment.apiUrl}/courses`,
      method: "GET",
    });

    // Verificar que la solicitud sea una GET
    expect(req.request.method).toEqual('GET');

    req.flush(mockedResponse);

  })

  it("Al llamar getCourseById() se debe ejecutar una petición http a /courses/{id} y obtener un unico objeto Course", () =>{
    let idCourse = "a13j";
    const mockedResponse: ICourse = {
        id: "a13j",
        name: "Java",
        startDate: new Date(),
        endDate: new Date()
    }

    service.getCourseById(idCourse).subscribe({
      next: (response) => {
        // Verificamos la respuesta de la solicitud
        expect(response).toEqual(mockedResponse);
      }
    });

    const req = httpController.expectOne({
      url: `${environment.apiUrl}/courses/${idCourse}`,
      method: "GET",
    })

    // Verificar que la solicitud sea una GET
    expect(req.request.method).toEqual('GET');

    req.flush(mockedResponse);
  })

  it("Al llamar addCourses() se debe ejecutar una petición HTTP POST a /courses y devolver el curso nuevo", () => {
    const newCourse: ICourse = {
      id: "d83f",
      name: "React",
      startDate: new Date(),
      endDate: new Date()
    };

    service.addCourses(newCourse).subscribe({
      next: (response) => {
        // Verificamos la respuesta de la solicitud
        expect(response).toEqual(newCourse);
      }
    });

    const req = httpController.expectOne({
      url: `${environment.apiUrl}/courses`,
      method: "POST",
    });

    // Verificar que la solicitud sea una POST
    expect(req.request.method).toEqual('POST');
    // Verificar que el cuerpo de la solicitud sea el curso añadido
    expect(req.request.body).toEqual(newCourse);

    req.flush(newCourse);
  });

  it("Al llamar editCourseById() se debe ejecutar una petición HTTP PATCH a /courses/{id} y devolver el curso actualizado", () => {
    const idCourse = "a13j";
    const update: ICourse = {
      id: "a13j",
      name: "Java Avanzado",
      startDate: new Date(),
      endDate: new Date()
    };

    service.editCourseById(idCourse, update).subscribe({
      next: (response) => {
        // Verificamos la respuesta de la solicitud
        expect(response).toEqual(update);
      }
    });

    const req = httpController.expectOne({
      url: `${environment.apiUrl}/courses/${idCourse}`,
      method: "PATCH",
    });

    // Verificar que la solicitud sea una PATCH
    expect(req.request.method).toEqual('PATCH');
    // Verificar que el cuerpo de la solicitud sea el curso a actualizar
    expect(req.request.body).toEqual(update);

    req.flush(update);
  });

  it("Al llamar deleteCourseById() se debe ejecutar una petición HTTP DELETE a /courses/{id} y devolver el curso eliminado", () => {
    const idCourse = "a13j";
    const mockedResponse: ICourse = {
      id: "a13j",
      name: "Java",
      startDate: new Date(),
      endDate: new Date()
    };

    service.deleteCourseById(idCourse).subscribe({
      next: (response) => {
        // Verificamos la respuesta de la solicitud
        expect(response).toEqual(mockedResponse);
      }
    });

    const req = httpController.expectOne({
      url: `${environment.apiUrl}/courses/${idCourse}`,
      method: "DELETE",
    });

    // Verificar que la solicitud sea una DELETE
    expect(req.request.method).toEqual('DELETE');

    req.flush(mockedResponse);
  });

});
