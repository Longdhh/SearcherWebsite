import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UtilityService } from 'src/app/services/utility.service';
import { CarouselModule } from 'ngx-bootstrap/carousel';

export const routes: Routes = [
  { path: '', redirectTo: 'index' },
  { path: 'index', component: HomeComponent}
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CarouselModule
  ],
  providers: [ AuthService, SharedService, NotificationService, UtilityService]
})
export class HomeModule { }
