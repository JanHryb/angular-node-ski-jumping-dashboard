import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}
  user: any = false;
  dataLoaded: boolean = false;
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    passwordRepeat: new FormControl('', [Validators.required]),
  });
  errorMessages = {
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
  };

  validateForm = () => {
    if (
      this.registerForm.value.username &&
      this.registerForm.value.email &&
      this.registerForm.value.password &&
      this.registerForm.value.passwordRepeat
    ) {
      let validForm = true;
      let errorMessages = {
        username: '',
        email: '',
        password: '',
        passwordRepeat: '',
      };
      if (this.registerForm.value.username.length < 3) {
        validForm = false;
        errorMessages.username = 'this field must be at least 3 characters';
      }
      if (this.registerForm.value.username.indexOf(' ') >= 0) {
        validForm = false;
        errorMessages.username = "username can't contain space";
      }
      if (this.registerForm.value.email.indexOf(' ') >= 0) {
        validForm = false;
        errorMessages.email = "email can't contain space";
      }
      if (this.registerForm.value.password.length < 6) {
        validForm = false;
        errorMessages.password = 'this field must be at least 6 characters';
      }
      if (
        this.registerForm.value.password !==
        this.registerForm.value.passwordRepeat
      ) {
        validForm = false;
        errorMessages.passwordRepeat = "passwords aren't equal";
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
        .post('http://localhost:5000/user/register', this.registerForm.value, {
          withCredentials: true,
        })
        .subscribe(
          (response) => {
            alert('your account has been created');
            this.router.navigate(['/login']);
          },
          (error) => {
            this.errorMessages = error.error;
            console.log(error);
          }
        );
    }
  }
  ngOnInit() {
    this.authService.getUser().subscribe(
      (result) => {
        this.user = result.body;
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.dataLoaded = true;
      }
    );
  }
}
