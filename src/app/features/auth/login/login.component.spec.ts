import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {APP_CONFIG} from "../../../core/injection-tokens";
import {MatCardModule} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import {AuthRoutingModule} from "../auth-routing.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthService} from "../../../core/services/auth.service";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        CommonModule,
        AuthRoutingModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatButtonModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        provideAnimationsAsync(),
        { //se puede borrar
          provide: APP_CONFIG,
          useValue: {
            baseURL: "...",
            version: "2.0"
          },
        },
        { provide: AuthService, useValue: authServiceSpy }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it("El campo 'email' debe ser requerido", () => {
    const emailControl = component.loginForm.get("email");
    emailControl?.setValue("");

    expect(emailControl?.invalid).toBeTrue();
  })*/
  it('El campo "email" debe ser requerido', () => {
    const emailControl = component.loginForm.get("email");
    emailControl?.setValue("");
    expect(emailControl?.invalid).toBeTrue();
  });


  /*xit("El campo 'password' debe ser requerido", () => {
    const passwordControl = component.loginForm.get("password");
    passwordControl?.setValue("");

    expect(passwordControl?.invalid).toBeTrue();
  })*/

  it('El campo "password" debe ser requerido', () => {
    const passwordControl = component.loginForm.get("password");
    passwordControl?.setValue("");
    expect(passwordControl?.invalid).toBeTrue();
  });

  // xit("El campo 'role' debe ser requerido", () => {
  //   const roleControl = component.loginForm.get("role");
  //   roleControl?.setValue("");
  //
  //   expect(roleControl?.invalid).toBeTrue();
  // })

  /*xit("Al intentar iniciar sesión, si el formulario no es invalido, se debe mostrar un alert", () => {
    const loginForm = component.loginForm;
    loginForm.setValue({
      email: "",
      password: "",
      role: "",
    })

    const spyOnAlert = spyOn(window, "alert");
    component.onSubmit();
    expect(spyOnAlert).toBeTruthy();
  })*/

  it('Al intentar iniciar sesión, si el formulario no es válido, se debe mostrar un alert', () => {
    const loginForm = component.loginForm;
    loginForm.setValue({
      email: "",
      password: "",
    });

    const spyOnAlert = spyOn(window, "alert");
    component.onSubmit();
    expect(spyOnAlert).toHaveBeenCalledWith("El formulario no es valido!");
  });

  /*xit("Al intentar iniciar sesión, si el formulario es valido, se debe llamar a authServices.login", () => {
    const loginForm = component.loginForm;
    loginForm.setValue({
      email: "fake@email.com",
      password: "123456",
      role: "ADMIN",
    })

    const spyOnLogin = spyOn( (component as any).authServices, "login" );
    component.onSubmit();

    expect(spyOnLogin).toHaveBeenCalled();
  })*/

  it('Al intentar iniciar sesión, si el formulario es válido, se debe llamar a authServices.login', () => {
    const loginForm = component.loginForm;
    loginForm.setValue({
      email: "fake@email.com",
      password: "123456",
    });

    component.onSubmit();
    expect(authServiceSpy.login).toHaveBeenCalledWith({ email: "fake@email.com", password: "123456" });
  });

  /*xit('should create', () => {
    expect(component).toBeTruthy();
  });*/

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
