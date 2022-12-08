import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faPersonSkiing, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() email: any;
  constructor(private http: HttpClient, private router: Router) {}
  dataLoaded: boolean = false;
  faPersonSkiing = faPersonSkiing;
  faUser = faUser;
  // user = 'janek@gmail.com';
  ngOnInit() {
    console.log(this.email);
  }
  logout() {
    this.http
      .post('http://localhost:5000/user/logout', {}, { withCredentials: true })
      .pipe(
        map((response: any) => {
          console.log(response);
          this.router.navigate(['/login']);
        }),
        catchError((err) => {
          throw err;
        })
      )
      .subscribe({
        error: (err) => console.log(err),
      });
  }
}
