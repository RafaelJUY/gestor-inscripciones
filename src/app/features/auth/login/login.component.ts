import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth.service";
import {APP_CONFIG} from "../../../core/injection-tokens";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    private authServices: AuthService,
    private fb: FormBuilder, @Inject(APP_CONFIG)
    private appConfig: any
  ) {
    console.log("app_config", appConfig); // se puede borrar junto con el @inject() appconfig.
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      // role: ["ADMIN", [Validators.required]],
    })
  }

  onSubmit(){
    if(this.loginForm.invalid){
      alert("El formulario no es valido!");
    }else{
      const data = {
        email: this.loginForm.get("email")?.value,
        password: this.loginForm.get("password")?.value,
      }
      this.authServices.login(data);
    }
  }
}
