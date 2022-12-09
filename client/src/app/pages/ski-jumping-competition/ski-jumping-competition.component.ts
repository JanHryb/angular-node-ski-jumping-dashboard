import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-ski-jumping-competition',
  templateUrl: './ski-jumping-competition.component.html',
  styleUrls: ['./ski-jumping-competition.component.scss'],
})
export class SkiJumpingCompetitionComponent implements OnInit {
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
        this.router.navigate(['/login']);
      }
    );
  }
}
