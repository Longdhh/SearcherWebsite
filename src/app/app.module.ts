import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TermOfServiceComponent } from './website/term-of-service/term-of-service.component';
import { SecurityComponent } from './website/security/security.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './user/register/register.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule, BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { InfoComponent } from './user/info/info.component';
import { appRoutes } from './app.route';
import { AuthGuard } from './guard/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    TermOfServiceComponent,
    SecurityComponent,
    RegisterComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    InfoComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [ AuthGuard, HttpClientModule, Title,{ provide: BsDropdownConfig, useValue: { autoClose: true } } ],
  bootstrap: [AppComponent],
})
export class AppModule { }
