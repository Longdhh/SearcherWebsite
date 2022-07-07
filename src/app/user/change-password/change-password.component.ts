import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm(): void {
    this.changePasswordForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required,Validators.minLength(6), Validators.maxLength(32)]),
      're-password': new FormControl('', Validators.required)
    })
  }
  onSubmit(): void {
    console.log('success')
  }
}
