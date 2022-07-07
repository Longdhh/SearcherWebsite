import { Routes } from '@angular/router';
import { CompanyComponent } from './company.component';
export const companyRoutes: Routes = [
    { path: '', redirectTo: 'index' },
    { path: 'index',  component: CompanyComponent},
    { path: 'company-info', loadChildren: () => import('./company-info/company-info.module').then(x => x.CompanyInfoModule)},
]