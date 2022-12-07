import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  constructor(private authService: AuthService, private router: Router) {}
  user: any = false;
  dataLoaded: boolean = false;
  ngOnInit() {
    this.authService.getUser().subscribe(
      (result) => {
        this.user = result.body;
        this.dataLoaded = true;
      },
      (error) => {
        this.dataLoaded = true;
      }
    );
  }
}
