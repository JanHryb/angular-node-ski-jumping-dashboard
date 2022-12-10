import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import {
  faPenToSquare,
  faCheck,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}
  faPenToSquare = faPenToSquare;
  faCheck = faCheck;
  faXmark = faXmark;
  user: any = false;
  dataLoaded: boolean = false;
  usernameInput: boolean = false;
  passwordInput: boolean = false;

  ngOnInit() {
    this.authService.getUser().subscribe(
      (result) => {
        this.user = result.body;
        this.dataLoaded = true;
      },
      (error) => {
        this.router.navigate(['/login']);
      }
    );
  }

  updateData(inputName: any, inputValue: string) {
    if (inputName == 'username') {
      console.log('workin');
      this.http
        .post(
          'http://localhost:5000/user/update',
          {
            userId: this.user._id,
            username: inputValue,
            password: false,
          },
          { withCredentials: true }
        )
        .subscribe(
          (response) => {
            console.log(response);
            window.location.reload();
          },
          (error) => {
            console.log(error);
            window.location.reload();
          }
        );
    }
    if (inputName == 'password') {
      this.http
        .post(
          'http://localhost:5000/user/update',
          {
            userId: this.user._id,
            username: false,
            password: inputValue,
          },
          { withCredentials: true }
        )
        .subscribe(
          (response) => {
            console.log(response);
            window.location.reload();
          },
          (error) => {
            console.log(error);
            window.location.reload();
          }
        );
    }
  }

  switchEditInput(inputName: string) {
    if (inputName == 'username') {
      this.usernameInput = !this.usernameInput;
    }
    if (inputName == 'password') {
      this.passwordInput = !this.passwordInput;
    }
  }
}
