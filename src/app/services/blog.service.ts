import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
url='http://localhost:8082'
  constructor(private http:HttpClient) { }
  getBlogs(){
    return this.http.get(`${this.url}/blogs`)  }
}
