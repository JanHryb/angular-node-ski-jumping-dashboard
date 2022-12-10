import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ski-jumpers',
  templateUrl: './ski-jumpers.component.html',
  styleUrls: ['./ski-jumpers.component.scss'],
})
export class SkiJumpersComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}
  user: any = false;
  dataLoaded: boolean = false;
  faTrashCan = faTrashCan;
  addSkiJumperForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    personalId: new FormControl('', [Validators.required]),
  });
  skiJumpers: any = [];
  ngOnInit() {
    this.authService.getUser().subscribe(
      (result) => {
        this.user = result.body;
        this.http
          .get('http://localhost:5000/ski/get/jumpers', {
            withCredentials: true,
          })
          .subscribe(
            (response) => {
              this.skiJumpers = response;
              this.dataLoaded = true;
              console.log(response);
            },
            (error) => {
              console.log(error);
            }
          );
      },
      (error) => {
        this.router.navigate(['/login']);
      }
    );
  }
  onSubmit() {
    const dataToSend = Object.assign(this.addSkiJumperForm.value, {
      userId: this.user._id,
    });
    this.http
      .post('http://localhost:5000/ski/add/jumper', dataToSend, {
        withCredentials: true,
      })
      .subscribe(
        (response) => {
          this.http
            .get('http://localhost:5000/ski/get/jumpers', {
              withCredentials: true,
            })
            .subscribe(
              (response) => {
                this.skiJumpers = response;
                this.addSkiJumperForm.reset();
                console.log(response);
              },
              (error) => {
                console.log(error);
              }
            );
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  deleteSkiJumper(skiJumperId: any) {
    if (confirm('Are you sure you want delete this jumper?')) {
      this.http
        .delete(`http://localhost:5000/ski/delete/jumper/${skiJumperId}`, {
          withCredentials: true,
        })
        .subscribe(
          (response) => {
            this.http
              .get('http://localhost:5000/ski/get/jumpers', {
                withCredentials: true,
              })
              .subscribe(
                (response) => {
                  this.skiJumpers = response;
                  console.log(response);
                },
                (error) => {
                  console.log(error);
                }
              );
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
}
