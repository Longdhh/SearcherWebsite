import { Component, OnInit } from '@angular/core';
import { SystemConstants } from 'src/app/common/system.constants';
import { LoggedInUser } from 'src/app/domain/loggedin.user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: LoggedInUser;
  constructor() {

   }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER))
  }
  
}
