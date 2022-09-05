import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageConstants } from 'src/app/common/message.constants';
import { SystemConstants } from 'src/app/common/system.constants';
import { NotificationService } from 'src/app/services/notification.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-registed-job',
  templateUrl: './registed-job.component.html',
  styleUrls: ['./registed-job.component.css']
})
export class RegistedJobComponent implements OnInit {
  jobList: any = [];
  filteredJobList: any=[];
  jobUserList: any = [];
  registedForm: FormGroup;
  pageIndex: number = 1;
  pageSize: number = 10;
  pageDisplay: number = 10;
  totalRow: number;
  id: string;
  server= SystemConstants.BASE_SERVER;
  constructor(private service: SharedService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER)).id
    this.loadData();
    this.initializeForm();
  }
  initializeForm() {
    this.registedForm = new FormGroup({
      name: new FormControl('')
    })
  }
  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadData();
  }
  loadData() {
    this.jobList = [];
    this.jobUserList = [];
    this.service.get('/job/get-all-registed-paging-by-user-id/' + this.id + '?page=' + this.pageIndex + '&pageSize=' + this.pageSize)
      .subscribe((response: any) => {
        this.jobUserList = response.Items;
        for(var i in this.jobUserList) {
          this.service.get('/job/detail/' + this.jobUserList[i].job_id).subscribe((response:any) => {
            this.jobList.push(response)
          })
        }
        this.pageIndex = response.PageIndex;
        this.pageSize = response.PageSize;
        this.totalRow = response.TotalRows;
      })
  }

  deleteItem(id: any) {
    this.notificationService.printConfirmationDialog(MessageConstants.CANCEL_JOB_MSG, ()=> {
      this.deleteItemConfirm(id);
    })
  }
  deleteItemConfirm(id: any) {
    this.service.delete('/job/unregister-job', 'id', id).subscribe((response: Response)=>{
      this.notificationService.printSuccessMessage(MessageConstants.CANCEL_JOB_OK_MSG);
      this.loadData();
    })
  }
}
