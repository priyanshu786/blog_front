import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'Blogging-Application';
  userFlag : boolean =false;
  constructor(private authservice:AuthService) { }

  ngOnInit(): void {
    this.authservice.isLoggedIn$.subscribe(isLoggedIn=>{this.userFlag=isLoggedIn})
  }

}
