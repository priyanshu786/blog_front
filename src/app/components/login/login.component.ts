import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials={
    username:'',
    password:''
  }
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }
  resetForm(form: NgForm) {
    form.resetForm(); 
    this.credentials = { username: '', password: '' }; 
  }
  onSubmit(){
    console.log("form is submitted");
    if((this.credentials.username!='' && this.credentials.password!='')&&((this.credentials.username!=null && this.credentials.password!=null)))
    {
      this.loginService.generateToken(this.credentials).subscribe(
        (response:any)=>{
            console.log(response.jwt);
            this.loginService.LoginUser(response.jwt)
            window.location.href="/blog-list"
        },
        error=>{
          console.log(error);
        }

      )
        }
    else{console.log("empty credentials")}
  }
}

