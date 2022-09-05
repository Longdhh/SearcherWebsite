import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SystemConstants } from 'src/app/common/system.constants';
import { LoggedInUser } from 'src/app/domain/loggedin.user';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  companyList: any = [];
  companyDisplayList: any = [];
  jobCompanyList: any= [];
  jobList: any=[];
  categoryList: any=[];
  bannerList: any=[];
  blogList: any=[];
  user: LoggedInUser;
  imgUrl = SystemConstants.BASE_SERVER;
  
  constructor(private service: SharedService, private titleService: Title) {
    this.titleService.setTitle("Tìm việc làm nhanh chóng với JobOfferer")
  }

  ngOnInit(): void {
    this.getData();
  }
  ngAfterViewInit(): void {
    this.getBannerList();
    this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER))
  }
  getBannerList() {
    this.service.get('/home-slide/get-all').subscribe((response: any) => {
      this.bannerList = response;
    })
  }
  getData() {
    this.service.get('/company/get-all-active/').subscribe((response:any) => {
      this.companyList = response
      this.companyDisplayList = response.slice(0, 6)
      this.service.get('/job/get-all-active/').subscribe((response:any) => {
        this.jobList = response;
        if(this.jobList.length > 9) {
          this.jobList = this.jobList.slice(0, 9)
        }
        this.jobCompanyList = this.jobList.map(
          company => this.companyList.find(c => c.Id === company.Id)
        )
      })
    })
    this.service.get('/blog/get-all-active?keyword=').subscribe((response: any) => {
      this.blogList = response
    })
  }
}
