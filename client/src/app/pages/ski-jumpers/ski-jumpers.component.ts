import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-ski-jumpers',
  templateUrl: './ski-jumpers.component.html',
  styleUrls: ['./ski-jumpers.component.scss'],
})
export class SkiJumpersComponent implements OnInit {
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
