import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemConstants } from 'src/app/common/system.constants';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-blog-info',
  templateUrl: './blog-info.component.html',
  styleUrls: ['./blog-info.component.css']
})
export class BlogInfoComponent implements OnInit {
  blog: any;
  server = SystemConstants.BASE_SERVER;
  constructor(private service: SharedService, private router:Router, private route:ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(prM => { 
      const id = Number(prM.get('id'));
      this.getBlog(id)
    });
  }
  getBlog(id: number) {
    this.service.get('/blog/detail/' + id).subscribe((response:any) => {
      this.blog=response;
      this.blog.description = this.sanitizer.bypassSecurityTrustHtml(this.blog.description)
    })
  }
}
