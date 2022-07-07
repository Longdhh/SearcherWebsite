import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { SystemConstants } from 'src/app/common/system.constants';
import { LoggedInUser } from 'src/app/domain/loggedin.user';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements AfterViewInit {
  welfareTypeList: any=[];
  workingTypeList: any=[];
  companyList: any=[];
  categoryList:any=[];
  levelList: any=[];
  salaryList:any=[];
  provinceList: any=[];
  jobSalaryList: any=[];
  jobProvinceList: any=[];
  jobCompanyList: any=[];
  filterForm: FormGroup;
  jobForm: FormGroup;
  jobList: any=[];
  keyword='';
  pageIndex: number = 1;
  pageSize: number = 10;
  pageDisplay: number = 10;
  totalRow: number;
  user: LoggedInUser;
  workingTypeId: any;
  levelId: any;
  salaryId: any;
  categoryId: any;
  welfareTypeId: any;
  name: any;
  imgUrl = SystemConstants.BASE_SERVER;
  constructor(private service: SharedService, private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeForm();
    this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER))
  }
  ngAfterViewInit(): void {
    this.getWelfareTypeList();
    this.getWorkingTypeList();
    this.getLevelList();
    this.getCategoryList();
    this.activatedRoute.paramMap.subscribe(params => {
      this.workingTypeId = params.get('workingTypeId')
    })
    this.getJobList();
  }
  initializeForm() {
    this.jobForm = new FormGroup({
      name: new FormControl('')
    });
  }
  getWelfareTypeList(){
    this.service.get('/welfare-type/get-all').subscribe(async data => {
      this.welfareTypeList= await data;
    })
  }

  getWorkingTypeList(){
    this.service.get('/working-type/get-all').subscribe(async data => {
      this.workingTypeList=await data;
    })
  }
  getCategoryList(){
    this.service.get('/category/get-all').subscribe(async data => {
      this.categoryList=await data;
    })
  }

  getLevelList(){
    this.service.get('/level/get-all').subscribe(async data => {
      this.levelList=await data;
    })
  }
  getJobList() {
    this.service.get('/job/get-all-active-paging?keyword=' + this.jobForm.get('name').value + '&page=' + this.pageIndex + '&pageSize=' + this.pageSize)
      .subscribe(async (response: any) => {
        this.jobList = await response.Items;
        this.service.get('/company/get-all-active/').subscribe(async (response:any) => {
          this.companyList = await response
          this.jobCompanyList = this.jobList.map(
            job => this.companyList.find(c => c.Id === job.Id)
          )
        })
        this.service.get('/salary-range/get-all').subscribe(async data => {
          this.salaryList= await data;
          this.jobSalaryList = this.jobList.map(
            job => this.salaryList.find(s => s.salary_range_id === job.salary_range_id)
          )
        })
        this.service.get('/province/get-all').subscribe(async data => {
          this.provinceList= await data;
          this.jobProvinceList = this.jobList.map(
            job => this.provinceList.find(p=> p.province_id === job.province_id)
          )
        })

        this.pageIndex = response.PageIndex;
        this.pageSize = response.PageSize;
        this.totalRow = response.TotalRows;
      })
  }
  // filterJobByWorkingTypeList() {
  //   this.jobList = this.jobList.filter(function(id) {
  //     return id == this.workingTypeId;
  //   })

  // }
  navigateToJob(id) {
    this.router.navigateByUrl('/main/job/job-info/' + id);
  }
  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.getJobList();
  }
  
  logout() {
    localStorage.removeItem(SystemConstants.CURRENT_USER);
    this.router.navigateByUrl('/home')
  }
}
