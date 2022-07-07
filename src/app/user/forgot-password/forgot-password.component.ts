import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm : FormGroup;
  title: "Quên mật khẩu";
  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.initialize();
    this.titleService.setTitle(this.title);
  }

  initialize(): void {
    this.forgotPasswordForm = new FormGroup({
      'email': new FormControl('', [Validators.email, Validators.required])
    })
  }

  onSubmit(): void {
    console.log('success');
  }
}
