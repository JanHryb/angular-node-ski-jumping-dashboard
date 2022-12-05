import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private http: HttpClient, private router: Router) {}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(false, [Validators.required]),
  });
  errorMessages = {
    email: '',
    password: '',
    server: '',
  };

  validateForm = () => {
    if (this.loginForm.value.email && this.loginForm.value.password) {
      let validForm = true;
      let errorMessages = {
        email: '',
        password: '',
        server: '',
      };
      if (this.loginForm.value.email.indexOf(' ') >= 0) {
        validForm = false;
        errorMessages.email = "email can't contain space";
      }
      if (validForm) {
        return true;
      } else {
        this.errorMessages = errorMessages;
        return false;
      }
    } else {
      return false;
    }
  };
  onSubmit() {
    if (this.validateForm()) {
      this.http
        .post('http://localhost:5000/user/login', this.loginForm.value, {
          withCredentials: true,
        })
        .subscribe(
          (response) => {
            console.log(response);
            this.router.navigate(['/dashboard']);
          },
          (error) => {
            this.errorMessages = {
              email: 'password or email incorrect',
              password: 'password or email incorrect',
              server: '',
            };
          }
        );
    }
  }
}
