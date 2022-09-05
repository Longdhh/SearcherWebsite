import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { blogRoutes } from './blog.route';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(blogRoutes)
  ]
})
export class BlogModule { }
