import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemConstants } from 'src/app/common/system.constants';
import { SharedService } from 'src/app/services/shared.service';
import * as moment from 'moment';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent implements OnInit {
  server = SystemConstants.BASE_SERVER;
  company: any;
  pageIndex: number = 1;
  pageSize: number = 5;
  pageDisplay: number = 5;
  totalRow: number;
  jobList: any=[];
  province: any;
  salaryList: any=[];
  constructor(private service: SharedService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(prM => { 
      const id = prM.get('id');
      this.getCompany(id)
    });
  }
  getCompany(id: string) {
    this.service.get('/company/detail/' + id).subscribe((response:any) => {
      this.company=response;
      this.service.get('/job/get-all-active-by-company-id/' + id + '?page=' + this.pageIndex + '&pageSize=' + this.pageSize)
      .subscribe((response: any) => {
        this.jobList = response.Items;
        for (var i in this.jobList) {
          this.jobList[i].job_end_date = moment(new Date(this.jobList[i].job_end_date)).format('DD/MM/YYYY');
          this.service.get('/salary-range/detail/' + this.jobList[i].salary_range_id).subscribe((response:any) => {
            this.salaryList.push(response)
          })
        }
        this.pageIndex = response.PageIndex;
        this.pageSize = response.PageSize;
        this.totalRow = response.TotalRows;
      })
      this.service.get('/province/detail/' + this.company.province_id).subscribe((response: any) => {
        this.province = response;
      })
    })
  }
  navigateToJob(id) {
    this.router.navigateByUrl('/main/job/job-info/' + id);
  }
}
