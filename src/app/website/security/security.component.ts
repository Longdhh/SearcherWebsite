import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {
  title: 'Chính sách bảo mật';
  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

}
