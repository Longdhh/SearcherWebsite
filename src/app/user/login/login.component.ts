import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageConstants } from 'src/app/common/message.constants';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  title: "Đăng nhập";
  constructor(private titleService: Title, private authService: AuthService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit() {
    this.initializeForm();
    this.titleService.setTitle(this.title);
  }

  initializeForm() {
    this.loginForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", [Validators.required])
    })
  }
  login() {
    this.authService.login(this.loginForm.get('username').value, this.loginForm.get('password').value)
      .then(data => {
        this.router.navigateByUrl('/main/job')
      })
      .catch(error => {
        this.notificationService.printErrorMessage(MessageConstants.LOGIN_ERROR);
        this.loginForm.patchValue({
          password: ''
        })
      })
  }
}
