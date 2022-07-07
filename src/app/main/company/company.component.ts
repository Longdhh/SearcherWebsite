import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SystemConstants } from 'src/app/common/system.constants';
import { LoggedInUser } from 'src/app/domain/loggedin.user';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  companyList: any=[];
  pageIndex: number = 1;
  pageSize: number = 10;
  pageDisplay: number = 10;
  totalRow: number;
  companyForm: FormGroup;
  imageRoute = SystemConstants.BASE_SERVER;
  provinceList: any=[];
  user: LoggedInUser;
  constructor(private service: SharedService, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getCompanies();
    this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER))
  }
  initializeForm() {
    this.companyForm = new FormGroup({
      name: new FormControl('')
    });
  }
  getCompanies() {
    this.service.get('/company/get-all-active-paging?keyword=' + this.companyForm.get('name').value + '&page=' + this.pageIndex + '&pageSize=' + this.pageSize)
      .subscribe((response: any) => {
        this.companyList = response.Items;
        for (var i in this.companyList) {
          this.service.get('/province/detail/' + this.companyList[i].province_id).subscribe((response:any) => {
            this.provinceList.push(response)
          })
        }
        this.pageIndex = response.PageIndex;
        this.pageSize = response.PageSize;
        this.totalRow = response.TotalRows;
        for(let province of this.companyList) {
          province.push()
        }
      })
  }
  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.getCompanies();
  }
  logout() {
    localStorage.removeItem(SystemConstants.CURRENT_USER);
    this.router.navigateByUrl('/home')
  }
} 
