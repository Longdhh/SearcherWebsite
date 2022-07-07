import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-term-of-service',
  templateUrl: './term-of-service.component.html',
  styleUrls: ['./term-of-service.component.css']
})
export class TermOfServiceComponent implements OnInit {
  title = 'Điều khoản dịch vụ';
  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title)
  }

}
