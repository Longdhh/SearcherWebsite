import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageConstants } from 'src/app/common/message.constants';
import { SystemConstants } from 'src/app/common/system.constants';
import { LoggedInUser } from 'src/app/domain/loggedin.user';
import { NotificationService } from 'src/app/services/notification.service';
import { SharedService } from 'src/app/services/shared.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.css']
})
export class JobInfoComponent implements OnInit {
  @ViewChild('modalRegister', {static: false}) public modalRegister: ModalDirective;
  @ViewChild('resume') resume
  job: any={};
  jobWelfares: any=[];
  jobCategories: any=[];
  welfareTypeList: any;
  categoryList: any=[];
  workingType: any;
  province: any;
  level: any;
  salaryRange:any;
  job_end_date: any;
  job_create_date: any;
  company: any={};
  server = SystemConstants.BASE_SERVER;
  registerForm: FormGroup;
  announcement: any;
  user: LoggedInUser;
  constructor(private service: SharedService, private route: ActivatedRoute, private uploadService: UploadService,
    private notificationService: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(prM => { 
      const id = +prM.get('id');
      this.getJob(id)
    });
    this.initializeRegisterForm();
  }
  getJob(id: number) {
    this.service.get('/welfare-type/get-all').subscribe((response: any) => {
      this.welfareTypeList=response;
      this.service.get('/job/get-welfares/' + id).subscribe((response: any) => {
        for(let item of response) {
          let welfareType = this.welfareTypeList.find(x=> x.welfare_type_id === item.welfare_type_id)
          this.jobWelfares.push({
            description: item.description,
            welfare_type: welfareType,
          })
        }
      })
    })
    
    this.service.get('/category/get-all').subscribe((response: any) => {
      this.categoryList=response;
      this.service.get('/job/get-categories/' + id).subscribe((response: any) => {
        for(let item of response) {
          this.jobCategories.push(this.categoryList.find(x=> x.category_id == item.category_id))
        }
      })
    })
    this.service.get('/job/detail/' + id).subscribe((response: any) => {
      this.job = response;
      this.service.get('/company/detail/' + this.job.Id).subscribe((response:any) => {
        this.company=response;
      })
      this.service.get('/salary-range/detail/' + this.job.salary_range_id).subscribe((response:any) => {
        this.salaryRange=response;
      })
      this.service.get('/province/detail/' + this.job.province_id).subscribe((response:any)  => {
        this.province=response;
      })
      this.service.get('/level/detail/' + this.job.level_id).subscribe((response:any)  => {
        this.level=response;
      })
      this.service.get('/working-type/detail/' + this.job.working_type_id).subscribe((response:any) => {
        this.workingType=response;
      })
      this.job_end_date = moment(new Date(this.job.job_end_date)).format('DD/MM/YYYY');
      this.job_create_date = moment(new Date(this.job.created_at)).format('DD/MM/YYYY');
      this.registerForm.patchValue({
        job_id: this.job.job_id
      })
    })
  }
  initializeRegisterForm() {
    this.registerForm = new FormGroup({
      job_id: new FormControl(this.job.job_id),
      Id: new FormControl(),
      name: new FormControl([Validators.required]),
      email: new FormControl([Validators.required]),
      phone_number: new FormControl([Validators.required]),
      resume: new FormControl('')
    });
  }

  async showAdd() {
    this.initializeRegisterForm();
    this.user = await JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER))
    if(this.user===null) {
      this.router.navigateByUrl('/login')
    }
    this.registerForm.patchValue({
      Id: this.user.id,
      name: this.user.name,
      email: this.user.email,
      phone_number: this.user.phone_number,
    })
    this.modalRegister.show();
  }
  saveData() {
    if(this.registerForm.valid) {
      this.announcement = this.registerForm.value;
      let fi = this.resume.nativeElement;
      if(fi.files.length > 0) {
        this.uploadService.postWithFile('/upload/save-resume', null, fi.files)
        .then((resume: string ) => {
          this.announcement.resume = resume;
        }).then(() => {
          this.saveChanges();
        })
      } else {
        this.notificationService.printErrorMessage(MessageConstants.NO_RESUME_MSG);
      }
    }
  } 
  private saveChanges() {
    this.service.post('/job/register-job', JSON.stringify(this.registerForm.value)).subscribe((response: any) => {
      this.modalRegister.hide();
      this.notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
    }, error => this.service.handleError(error))
  }
}
