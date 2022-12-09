import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}
  user: any = false;
  dataLoaded: boolean = false;
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
  serverErrorMessage = '';

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
            this.serverErrorMessage = error.error.message;
          }
        );
    }
  }
  ngOnInit() {
    this.authService.getUser().subscribe(
      (result) => {
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.dataLoaded = true;
      }
    );
  }
}
