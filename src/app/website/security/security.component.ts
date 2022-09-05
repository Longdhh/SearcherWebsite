import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {
  title: 'Chính sách bảo mật';
  security: any;
  constructor(private titleService: Title, private service: SharedService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.loadData()
  }
  loadData() {
    this.service.get('/security/detail/1').subscribe(async data => {
      this.security=data;
      this.security.description = this.sanitizer.bypassSecurityTrustHtml(this.security.description)
    })
  }
}
