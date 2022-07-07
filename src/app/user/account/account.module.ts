import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './account.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService } from 'src/app/services/auth.service';
import { UploadService } from 'src/app/services/upload.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
export const routes: Routes = [
  { path: '', component: AccountComponent }
];

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    RouterModule.forChild(routes),
  ],
  providers: [SharedService, AuthService, UploadService]
})
export class AccountModule { }
