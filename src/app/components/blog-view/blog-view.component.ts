import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css']
})
export class BlogViewComponent implements OnInit {
  blog: any
  constructor(private route: ActivatedRoute, private blogservice: BlogService) { }

  ngOnInit(): void {
    console.log("inside blog view")
    this.route.paramMap.subscribe((params) => {
      const temp=params.get('id') 
    this.blog=this.blogservice.getBlogFromId(temp!)
  });


}
  }


