import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaloriesComponent } from './calories/calories.component';
import { WeightComponent } from './weight/weight.component';
import { myGuard } from './my.guard';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'calories', component: CaloriesComponent, canActivate: [myGuard]},
  { path: 'weight', component: WeightComponent, canActivate: [myGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [myGuard]},
  { path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }