import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public getUser(): Observable<any> {
    return this.http
      .get('http://localhost:5000/user', {
        withCredentials: true,
        observe: 'response',
      })
      .pipe(
        map((response: any) => {
          console.log(response);

          return response;
        })
      );
  }
}
