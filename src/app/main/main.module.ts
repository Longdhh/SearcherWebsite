import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './main.route';
import { NotificationService } from '../services/notification.service';
import { AuthService } from '../services/auth.service';
import { UtilityService } from '../services/utility.service';
import { SharedService } from '../services/shared.service';

@NgModule({
  declarations: [
    MainComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(appRoutes)
  ],
  providers:[
    UtilityService, AuthService, NotificationService, SharedService
  ]
})
export class MainModule { }
