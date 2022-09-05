import { Component, OnInit} from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-term-of-service',
  templateUrl: './term-of-service.component.html',
  styleUrls: ['./term-of-service.component.css'],
})
export class TermOfServiceComponent implements OnInit {
  title = 'Điều khoản dịch vụ';
  tos: any;
  constructor(private titleService: Title, private service: SharedService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title)
    this.loadData()
  }
  loadData() {
    this.service.get('/tos/detail/2').subscribe(async data => {
      this.tos=data;
      this.tos.description = this.sanitizer.bypassSecurityTrustHtml(this.tos.description)
    })
  }
}
