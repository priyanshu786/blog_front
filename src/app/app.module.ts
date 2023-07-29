import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { HomeComponent } from './components/home/home.component';
import {MatFormFieldModule} from "@angular/material/form-field"
import {FormsModule} from "@angular/forms"
import {MatInputModule} from "@angular/material/input"
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BlogListComponent } from './components/blog-list/blog-list.component'
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

import { LoginService } from './services/login.service';
import { AuthGuard } from './services/auth.guard';
import { AuthInterceptor } from './services/auth.interceptor';
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatNativeDateModule} from '@angular/material/core'
// import {
//   DateAdapter,
//   MAT_DATE_FORMATS,
//   MAT_DATE_LOCALE,
// } from '@angular/material/core';
// import { MomentDateAdapter } from '@angular/material-moment-adapter';

// const MY_DATE_FORMAT = {
//   parse: {
//     dateInput: 'DD.MM.YYYY', // this is how your date will be parsed from Input
//   },
//   display: {
//     dateInput: 'DD.MM.YYYY', // this is how your date will get displayed on the Input
//     monthYearLabel: 'MMMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// }
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    BlogListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    MatCardModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [LoginService,AuthGuard,
  //   {
  //   provide: DateAdapter,
  //   useClass: MomentDateAdapter,
  //   deps: [MAT_DATE_LOCALE],
  // },
  // { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
  [{provide:HTTP_INTERCEPTORS,useClass: AuthInterceptor,multi:true}]],
  bootstrap: [AppComponent]
})
export class AppModule { }
