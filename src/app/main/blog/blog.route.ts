import { Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
export const blogRoutes: Routes = [
    { path: '', redirectTo: 'index' },
    { path: 'index',  component: BlogComponent},
    { path: 'blog-info', loadChildren: () => import('./blog-info/blog-info.module').then(x => x.BlogInfoModule)},
]