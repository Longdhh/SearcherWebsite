import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { RouterModule, Routes } from '@angular/router';
import { RegistedJobComponent } from './registed-job.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
  { path: '', redirectTo: 'index' },
  { path: 'index', component: RegistedJobComponent}
];

@NgModule({
  declarations: [ RegistedJobComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    PaginationModule,
    FormsModule
  ]
})
export class RegistedJobModule { }
