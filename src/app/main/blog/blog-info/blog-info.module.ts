import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BlogInfoComponent } from './blog-info.component';

export const routes: Routes = [
  { path: '', redirectTo: 'index' },
  { path: 'index/:id', component: BlogInfoComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class BlogInfoModule { }
