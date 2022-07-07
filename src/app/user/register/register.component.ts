import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageConstants } from 'src/app/common/message.constants';
import { NotificationService } from 'src/app/services/notification.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title = "Đăng ký";
  registerForm: FormGroup;
  postUser: any;
  constructor(private titleService: Title, private service: SharedService, private notificationService: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.initializeForm()
  }

  initializeForm(): void {
    this.registerForm = new FormGroup({
      Id: new FormControl(),
      name: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      UserName: new FormControl('', [Validators.required]),
      PhoneNumber: new FormControl(''),
      address: new FormControl(''),
      province_id: new FormControl(),
      description: new FormControl(''),
      Password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      re_password: new FormControl('', [Validators.required]),
      avatar: new FormControl(''),
      roles: new FormControl(["JobFinder"]),
      status: new FormControl(true),
    })
  }
  register(): void {
    this.service.post('/account/add', JSON.stringify(this.registerForm.value)).subscribe((response: any) => {
      this.notificationService.printSuccessMessage(MessageConstants.CREATED_ACCOUNT_OK_MSG);
      this.router.navigateByUrl('/main/job')
    }, error => this.service.handleError(error))
  }
}
