import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { JobInfoComponent } from './job-info.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadService } from 'src/app/services/upload.service';

export const routes: Routes = [
  { path: '', redirectTo: 'index' },
  { path: 'index/:id', component: JobInfoComponent}
];

@NgModule({
  declarations: [ JobInfoComponent ],
  imports: [
    CommonModule,
    TabsModule,
    ModalModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  providers: [UploadService]
})
export class JobInfoModule { }
