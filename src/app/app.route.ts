import { Routes } from '@angular/router';
export const appRoutes: Routes = [
    //localhost:4200
    { path: '', redirectTo: 'main', pathMatch: 'full' },
    //localhost:4200/login
    { path: 'login', loadChildren: () => import('./user/login/login.module').then(x => x.LoginModule) },
    { path: 'register', loadChildren: () => import('./user/register/register.module').then(x => x.RegisterModule) },
    { path: 'main',  loadChildren: () => import('./main/main.module').then(x => x.MainModule)},

]