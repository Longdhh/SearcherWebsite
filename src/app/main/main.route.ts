import { Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { MainComponent } from './main.component';
export const appRoutes: Routes = [
    {path: '', component: MainComponent, children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'account', loadChildren: () => import('../../app/user/account/account.module').then(x => x.AccountModule), canActivate:[AuthGuard] },
        { path: 'job', loadChildren: () => import('./job/job.module').then(x=>x.JobModule)},
        { path: 'company', loadChildren: ()=> import('./company/company.module').then(x=>x.CompanyModule)},
        { path: 'blog', loadChildren: ()=> import('./blog/blog.module').then(x=>x.BlogModule)},
        { path: 'registed-job', loadChildren:()=> import('../user/registed-job/registed-job.module').then(x=> x.RegistedJobModule), canActivate:[AuthGuard] },
        { path: 'tos', loadChildren:() => import('../website/term-of-service/term-of-service.module').then(x=>x.TermOfServiceModule)},
        { path: 'security', loadChildren:() => import('../website//security/security.module').then(x=>x.SecurityModule)},
        { path: 'contact', loadChildren:()=> import('../website/contact/contact.module').then(x=>x.ContactModule)},
        { path: 'home', loadChildren: () => import('../../app/main/home/home.module').then(x=>x.HomeModule)},
    ]}
]