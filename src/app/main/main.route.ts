import { Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { MainComponent } from './main.component';
export const appRoutes: Routes = [
    {path: '', component: MainComponent, children: [
        { path: '', redirectTo: 'account', pathMatch: 'full' },
        { path: 'account', loadChildren: () => import('../../app/user/account/account.module').then(x => x.AccountModule), canActivate:[AuthGuard] },
        { path: 'job', loadChildren: () => import('./job/job.module').then(x=>x.JobModule)},
        { path: 'company', loadChildren: ()=> import('./company/company.module').then(x=>x.CompanyModule)},
        { path: 'registed-job', loadChildren:()=> import('../user/registed-job/registed-job.module').then(x=> x.RegistedJobModule), canActivate:[AuthGuard] }
    ]}
]