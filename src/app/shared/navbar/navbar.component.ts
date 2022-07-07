import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemConstants } from 'src/app/common/system.constants';
import { LoggedInUser } from 'src/app/domain/loggedin.user';
import { SharedService } from 'src/app/services/shared.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private service: SharedService, private utilityService: UtilityService, private router:Router) {

   }

  ngOnInit(): void {
  }
  
}
