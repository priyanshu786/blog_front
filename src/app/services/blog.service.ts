import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  blogs : any
  categories:any=["science","english","hindi"]

url='http://localhost:8082'
  constructor(private http:HttpClient) { }
  getAllBlogs():Observable<any>{
    return this.blogs= this.http.get(`${this.url}/blogs`)
   }
  filterByCategoryandDate(filterParam:any){
    this.blogs=  this.http.get(`${this.url}/blogs/get/${filterParam.category}/${filterParam.DateFrom}/${filterParam.DateTo}`)
    return this.blogs;
  }
    filterByCategory(category:any){
      this.blogs=  this.http.get(`${this.url}/blogs/info/${category}`)
      return this.blogs;
    }
    filterByDate(filterParam:any){
      this.blogs=  this.http.get(`${this.url}/blogs/date/${filterParam.DateFrom}/${filterParam.DateTo}`)
      return this.blogs;
    }
    getCategories():Observable<any>{
      return this.http.get(`${this.url}/blogs/categories`)
    }
    getBlogFromId(id:String){
      return  this.blogs.find((b:any)=>b.id==id);
    }
}
