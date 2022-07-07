import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyInfoComponent } from './company-info.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

export const routes: Routes = [
  { path: '', redirectTo: 'index' },
  { path: 'index/:id', component: CompanyInfoComponent}
];

@NgModule({
  declarations: [CompanyInfoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [SharedService]
})
export class CompanyInfoModule { }
