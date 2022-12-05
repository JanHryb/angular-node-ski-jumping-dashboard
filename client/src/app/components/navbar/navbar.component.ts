import { Component } from '@angular/core';
import { faPersonSkiing, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  faPersonSkiing = faPersonSkiing;
  faUser = faUser;
  // user = 'janek@gmail.com';
  user = false;
}
