import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faPersonSkiing, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() email: any;
  constructor(private authService: AuthService, private router: Router) {}
  dataLoaded: boolean = false;
  faPersonSkiing = faPersonSkiing;
  faUser = faUser;
  // user = 'janek@gmail.com';
  ngOnInit() {
    console.log(this.email);
  }
}
