import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public auth() {
    this.http
      .get('http://localhost:5000/user', { withCredentials: true })
      .subscribe(
        (response) => {
          const user = JSON.parse(JSON.stringify(response));
          console.log(user);
          return user;
        },
        (error) => {
          console.log(error);
          return null;
        }
      );
  }
}
