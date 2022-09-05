import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TermOfServiceComponent } from './term-of-service.component';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UtilityService } from 'src/app/services/utility.service';

export const routes: Routes = [
  { path: '', redirectTo: 'index' },
  { path: 'index', component: TermOfServiceComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [AuthService, SharedService, NotificationService, UtilityService]
})
export class TermOfServiceModule { }
