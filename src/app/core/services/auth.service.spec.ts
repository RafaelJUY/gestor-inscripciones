import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { MockProvider } from 'ng-mocks';
import { environment } from '../../../environments/environment';
import {IUser} from "../model/IUsers";

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        MockProvider(Router)
      ]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Al llamar login() con un usuario valido se debe redireccionar al dashboard', () => {
    const spyOnNavigate = spyOn(router, 'navigate');
    let data = {
      email: 'fake@email.com',
      password: 'fake',
    };

    service.login(data);

    const req = httpTestingController
      .expectOne(`${environment.apiUrl}/users?email=${data.email}&password=${data.password}`);
    expect(req.request.method).toEqual('GET');

    const mockUser: IUser = {
      id: 'asda',
      firstName: 'Fake',
      lastName: 'Fake',
      email: data.email,
      password: data.password,
      token: 'valid-token',
      role: 'ADMIN',
    };

    req.flush([mockUser]);

    expect(spyOnNavigate).toHaveBeenCalledWith(['dashboard', 'home']);
    expect(localStorage.getItem('token')).toEqual('valid-token');
    service.authUser$.subscribe(user => {
      expect(user).toEqual(mockUser);
    });
  });
});
