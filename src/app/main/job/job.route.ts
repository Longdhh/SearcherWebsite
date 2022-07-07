import { Routes } from '@angular/router';
import { JobComponent } from './job.component';
export const jobRoutes: Routes = [
    { path: '', redirectTo: 'index' },
    { path: 'index',  component: JobComponent},
    { path: 'job-info', loadChildren: () => import('./job-info/job-info.module').then(x => x.JobInfoModule)},
]