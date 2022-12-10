import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  faTrashCan,
  faEye,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ski-jumping-competition',
  templateUrl: './ski-jumping-competition.component.html',
  styleUrls: ['./ski-jumping-competition.component.scss'],
})
export class SkiJumpingCompetitionComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}
  user: any = false;
  dataLoaded: boolean = false;
  faTrashCan = faTrashCan;
  faEye = faEye;
  faArrowLeft = faArrowLeft;
  detailPage: boolean = false;
  addCompetitionForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
  });
  addJumperListForm = new FormGroup({
    skiJumperId: new FormControl('', [Validators.required]),
  });
  skiJumpingCompetition: any = [];
  skiJumpingCompetition2: any = [];
  skiJumpers: any = [];
  jumperList: any = [];
  ngOnInit() {
    this.authService.getUser().subscribe(
      (result) => {
        this.user = result.body;
        this.http
          .get('http://localhost:5000/ski/get/jumping-competition', {
            withCredentials: true,
          })
          .subscribe(
            (response) => {
              this.skiJumpingCompetition = response;
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
    const dataToSend = Object.assign(this.addCompetitionForm.value, {
      userId: this.user._id,
    });
    this.http
      .post('http://localhost:5000/ski/add/jumping-competition', dataToSend, {
        withCredentials: true,
      })
      .subscribe(
        (response) => {
          this.http
            .get('http://localhost:5000/ski/get/jumping-competition', {
              withCredentials: true,
            })
            .subscribe(
              (response) => {
                this.skiJumpingCompetition = response;
                this.addCompetitionForm.reset();
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

  deleteCompetition(id: any) {
    if (confirm('Are you sure you want delete this competition?')) {
      this.http
        .delete(`http://localhost:5000/ski/delete/jumping-competition/${id}`, {
          withCredentials: true,
        })
        .subscribe(
          (response) => {
            this.http
              .get('http://localhost:5000/ski/get/jumping-competition', {
                withCredentials: true,
              })
              .subscribe(
                (response) => {
                  this.skiJumpingCompetition = response;
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
  deleteCompetition2(id: any) {
    if (confirm('Are you sure you want delete this competition?')) {
      this.http
        .delete(`http://localhost:5000/ski/delete/jumping-competition/${id}`, {
          withCredentials: true,
        })
        .subscribe(
          (response) => {
            this.http
              .get('http://localhost:5000/ski/get/jumping-competition', {
                withCredentials: true,
              })
              .subscribe(
                (response) => {
                  this.detailPage = false;
                  this.skiJumpingCompetition = response;
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
  viewDetails(id: any) {
    this.http
      .get(`http://localhost:5000/ski/getById/jumping-competition/${id}`, {
        withCredentials: true,
      })
      .subscribe(
        (response) => {
          this.skiJumpingCompetition2 = response;
          console.log(response);
          this.http
            .get('http://localhost:5000/ski/get/jumpers', {
              withCredentials: true,
            })
            .subscribe(
              (response) => {
                this.skiJumpers = response;
                console.log(response);
                this.http
                  .get(`http://localhost:5000/ski/getById/jumper-list/${id}`, {
                    withCredentials: true,
                  })
                  .subscribe(
                    (response) => {
                      this.jumperList = response;
                      console.log(response);
                      this.detailPage = !this.detailPage;
                    },
                    (error) => {
                      console.log(error);
                    }
                  );
              },
              (error) => {
                console.log(error);
              }
            );
        },
        (error) => {
          console.log(error);
        }
      );
  }
  onSubmit2() {
    const dataToSend = Object.assign(
      this.addJumperListForm.value,
      {
        skiJumpingCompetitionId: this.skiJumpingCompetition2[0]._id,
      },
      {
        userId: this.user._id,
      }
    );
    this.http
      .post('http://localhost:5000/ski/add/jumper-list', dataToSend, {
        withCredentials: true,
      })
      .subscribe(
        (response) => {
          this.http
            .get(
              `http://localhost:5000/ski/getById/jumper-list/${this.skiJumpingCompetition2[0]._id}`,
              {
                withCredentials: true,
              }
            )
            .subscribe(
              (response) => {
                this.jumperList = response;
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
  deleteList(id: any) {
    if (confirm('Are you sure you want delete this jumper?')) {
      this.http
        .delete(`http://localhost:5000/ski/delete/jumper-list/${id}`, {
          withCredentials: true,
        })
        .subscribe(
          (response) => {
            this.http
              .get(
                `http://localhost:5000/ski/getById/jumper-list/${this.skiJumpingCompetition2[0]._id}`,
                {
                  withCredentials: true,
                }
              )
              .subscribe(
                (response) => {
                  this.jumperList = response;
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
