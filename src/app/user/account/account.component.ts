import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageConstants } from 'src/app/common/message.constants';
import { SystemConstants } from 'src/app/common/system.constants';
import { LoggedInUser } from 'src/app/domain/loggedin.user';
import { NotificationService } from 'src/app/services/notification.service';
import { SharedService } from 'src/app/services/shared.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  @ViewChild('avatar') avatar
  infoForm: FormGroup;
  passwordForm: FormGroup;
  provinceList:any=[];
  levelList:any=[];
  user: any;
  loggedUser: LoggedInUser;
  id: string;

  constructor(private service: SharedService, private notificationService: NotificationService, private uploadService: UploadService) { }

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER)).id
    this.initializeForm();
    this.getProvinceList();
    this.getLevelList();
    this.getUser();
  }

  initializeForm(): void {
    this.infoForm = new FormGroup({
      Id: new FormControl(),
      name: new FormControl('', Validators.required),
      UserName: new FormControl(''),
      roles: new FormControl([]),
      Email: new FormControl('', Validators.email),
      description: new FormControl(),
      avatar: new FormControl(),
      birthday: new FormControl('', Validators.required),
      PhoneNumber: new FormControl('',[Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})')]),
      gender: new FormControl(),
      province_id: new FormControl(),
      address: new FormControl(),
      level_id: new FormControl(),
      years_of_experience: new FormControl(''),
      last_company: new FormControl(''),
      status: new FormControl()
    })
    this.passwordForm = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      Password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
      rePassword: new FormControl('', Validators.required)
    });
  }
  getUser(): void {
    this.service.getUser('/account/detail/' + this.id).subscribe((response: any) => {
      this.user = response;
      this.infoForm.patchValue({
        Id: this.user.Id,
        name: this.user.name,
        UserName: this.user.UserName,
        roles: this.user.roles,
        gender: this.user.gender,
        birthday: new Date(this.user.birthday),
        Email: this.user.Email,
        description: this.user.description,
        province_id: this.user.province_id,
        level_id: this.user.level_id,
        avatar: this.user.avatar,
        years_of_experience: this.user.years_of_experience,
        PhoneNumber: this.user.PhoneNumber,
        last_company: this.user.last_company,
        address: this.user.address,
        status: this.user.status
      });
    })
  }
  getProvinceList() {
    this.service.get('/province/get-all').subscribe(data => {
      this.provinceList=data;
    })
  }

  getLevelList() {
    this.service.get('/level/get-all').subscribe(data => {
      this.levelList = data;
    })
  }
  saveData() {
    if(this.infoForm.valid) {
      this.user = this.infoForm.value;
      let fi = this.avatar.nativeElement;
      if(fi.files.length > 0) {
        this.uploadService.postWithFile('/upload/save-image?type=avatar', null, fi.files)
        .then((imageUrl: string ) => {
          this.user.avatar = imageUrl;
        }).then(() => {
          this.saveChanges();
        })
      } else {
        this.saveChanges()
      }
    }
  } 
  private saveChanges() {

    this.service.put('/account/update', JSON.stringify(this.infoForm.value)).subscribe((response: any) => {
      this.getUser();
      this.notificationService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
    }, error => this.service.handleError(error))
  }
}
