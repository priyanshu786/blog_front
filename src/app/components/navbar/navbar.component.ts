import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'Blogging-Application';
  public loggedIn=false;
 constructor(private loginService:LoginService){

 }

  ngOnInit(): void {
   this.loggedIn=this.loginService.IsLoggedIn()
  }
  logoutUser(){
    this.loginService.logout()
    location.reload()
  }

}
