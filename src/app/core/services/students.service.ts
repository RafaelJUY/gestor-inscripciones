import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {IStudent} from "../../features/dashboard/students/model/IStudent";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class StudentsService {
  private urlEndPoint = "";

  constructor(private httpClient:HttpClient) {
    this.urlEndPoint = environment.apiUrl + "/students/"
  }
  getStudents(): Observable<IStudent[]> {
    return this.httpClient.get<IStudent[]>(this.urlEndPoint)
  }

  getStudentById(idStudents: string): Observable<IStudent | undefined>{
    return this.httpClient.get<IStudent | undefined>(this.urlEndPoint + idStudents);
  }

  addStudents(student: IStudent): Observable<IStudent> {
    return this.httpClient.post<IStudent>(this.urlEndPoint, student);
  }

  editStudentById(idStudent: string, update: IStudent): Observable<IStudent> {
    return this.httpClient.patch<IStudent>(this.urlEndPoint + idStudent, update);
  }

  deleteStudentById(idStudent: string): Observable<IStudent> {
    return this.httpClient.delete<IStudent>(this.urlEndPoint + idStudent);
  }
}
