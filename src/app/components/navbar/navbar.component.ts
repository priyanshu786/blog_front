import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { LoginService } from 'src/app/services/login.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'Blogging-Application';
  currentUrl: string='';
  routeEnding: string='';
  public loggedIn=false;
 constructor(private loginService:LoginService,private router:Router){
}

  ngOnInit(): void {
   this.loggedIn=this.loginService.IsLoggedIn()
   this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      console.log("nav-bar-onit")
      this.currentUrl = this.router.url;
      this.routeEnding = this.extractRouteEnding();
      console.log(this.routeEnding)
    }
  });
  }
  extractRouteEnding() {
    const segments = this.currentUrl.split('/');
    return segments[segments.length - 1];
  }
  logoutUser(){
    this.loginService.logout()
    location.reload()
  }

}
