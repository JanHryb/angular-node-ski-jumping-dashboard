import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SkiJumpersComponent } from './pages/ski-jumpers/ski-jumpers.component';
import { SkiJumpingCompetitionComponent } from './pages/ski-jumping-competition/ski-jumping-competition.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'dashboard/profile',
    component: ProfileComponent,
  },
  {
    path: 'dashboard/ski-jumpers',
    component: SkiJumpersComponent,
  },
  {
    path: 'dashboard/ski-jumping-competition',
    component: SkiJumpingCompetitionComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
