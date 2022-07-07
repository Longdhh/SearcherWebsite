import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { companyRoutes } from './company.route';
import { RouterModule } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CompanyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(companyRoutes),
    PaginationModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CompanyModule { }
