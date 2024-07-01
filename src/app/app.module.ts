import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CaloriesComponent } from './calories/calories.component';

import { WeightComponent } from './weight/weight.component';
import { AuthorizationService } from './shared/authorization-service.service';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfiledataService } from './profiledata.service';
import { FoodService } from './food.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CaloriesComponent,
    WeightComponent,
    LoginComponent,
    LogoutComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AuthorizationService, ProfiledataService, FoodService],
  bootstrap: [AppComponent]
})
export class AppModule { }