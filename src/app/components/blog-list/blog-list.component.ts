import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDateRangeInput, MatDatepickerInput, MatStartDate } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
onTileClick(blog:any) {
  console.log(blog.id);
  this.router.navigate(['blog-view',{ id: blog.id}]);
}
  blogs:any
  categories:any
  filterParam={
    category:"",
    DateFrom: "",
    DateTo: ""
  }
  constructor(private blogService:BlogService,private router:Router) { }

  ngOnInit(): void {
    this.getCategories()
  }
  getCategories(){
    this.blogService.getCategories().subscribe(
      (categories:any)=>{
        this.categories=categories;
        },
      
        (error:any)=>{
          console.log(error);
        }
      )
  }
filterBlogs(){

  if(this.filterParam.category!=''&&this.filterParam.DateFrom!=""&&this.filterParam.DateTo!="")
{
  this.filterParam.DateFrom=moment(this.filterParam.DateFrom).format("YYYY-MM-DD")
  this.filterParam.DateTo=moment(this.filterParam.DateTo).format("YYYY-MM-DD")
  this.blogService.filterByCategoryandDate(this.filterParam).subscribe(
    (blogs:any)=>{
    this.blogs=blogs;
    },
  
    (error:any)=>{
      console.log(error);
    }
  )
}
else if (this.filterParam.category!=''&&this.filterParam.DateFrom==""&&this.filterParam.DateTo=="")
{
  this.blogService.filterByCategory(this.filterParam.category).subscribe(
    (blogs:any)=>{
    this.blogs=blogs;
    },
  
    (error:any)=>{
      console.log(error);
    }
  )
}
else if(this.filterParam.category==''&&this.filterParam.DateFrom!=""&&this.filterParam.DateTo!="")
{  this.filterParam.DateFrom=moment(this.filterParam.DateFrom).format("YYYY-MM-DD")
this.filterParam.DateTo=moment(this.filterParam.DateTo).format("YYYY-MM-DD")
  this.blogService.filterByDate(this.filterParam).subscribe(
    (blogs:any)=>{
    this.blogs=blogs;
    },
  
    (error:any)=>{
      console.log(error);
    }
  )
}
else if(this.filterParam.category==''&&this.filterParam.DateFrom==""&&this.filterParam.DateTo=="")
{
 this.blogService.getAllBlogs().subscribe(
  (blogs:any)=>{
  this.blogs=blogs;
  },

  (error:any)=>{
    console.log(error);
  }
)
}

}
}
