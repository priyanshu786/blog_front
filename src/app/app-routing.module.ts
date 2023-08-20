
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/auth.guard';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogViewComponent } from './components/blog-view/blog-view.component';

const routes: Routes = [
  {path: '', pathMatch:'full',redirectTo: 'home'},
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent},
  {path:'blog-list',component:BlogListComponent,canActivate:[AuthGuard]},
  {path:'blog-view/:id',component:BlogViewComponent,canActivate:[AuthGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
