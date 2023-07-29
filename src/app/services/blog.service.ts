import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
url='http://localhost:8082'
  constructor(private http:HttpClient) { }
  getAllBlogs()
  {
    return this.http.get(`${this.url}/blogs`) 
   }
  filterByCategoryandDate(filterParam:any){
      return this.http.get(`${this.url}/blogs/get/${filterParam.category}/${filterParam.DateFrom}/${filterParam.DateTo}`)
    }
    filterByCategory(category:any){
      return this.http.get(`${this.url}/blogs/info/${category}`)

    }
    filterByDate(filterParam:any){
      return this.http.get(`${this.url}/blogs/date/${filterParam.DateFrom}/${filterParam.DateTo}`)

    }
}
