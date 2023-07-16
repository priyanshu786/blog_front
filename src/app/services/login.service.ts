import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url="http://localhost:8081"
  constructor(private http:HttpClient) { }

  generateToken(credentials:any){
    return this.http.post(`${this.url}/user/authenticate`,credentials)
  }
  LoginUser(token: string){
    localStorage.setItem("token",token)
    return true;
  }
  IsLoggedIn(){
    let token=localStorage.getItem("token")
    if(token==undefined ||token===''||token==null)
    {return false;}
    else{
      return true;
    }
  }
  logout(){
    localStorage.removeItem('token')
    return true;
  }
  getToken(){
    return localStorage.getItem("token");
  }
}
