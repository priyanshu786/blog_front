import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  blogs:any
  constructor(private blogService:BlogService) { }

  ngOnInit(): void {
  }
getBlogs(){
this.blogService.getBlogs().subscribe(
  blogs=>{
  this.blogs=blogs;
  },
  error=>{
    console.log(error);
  }
)
}
}
