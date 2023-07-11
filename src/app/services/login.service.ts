import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url="http://localhost:9595"
  constructor() { }
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
