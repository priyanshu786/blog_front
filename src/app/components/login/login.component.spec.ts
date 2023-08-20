import { ComponentFixture, TestBed,waitForAsync  } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { LoginService } from 'src/app/services/login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router'; // Import Router

describe('LoginComponent', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: jasmine.SpyObj<LoginService>;
  let router: Router; // Declare Router variable


  beforeEach(waitForAsync(()  => {
    const loginServiceSpy = jasmine.createSpyObj('LoginService', ['generateToken', 'LoginUser']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [LoginComponent],
      providers: [{ provide: LoginService, useValue: loginServiceSpy }]
    })
    .compileComponents();
  }));
    beforeEach(() => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      loginService = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
      router = TestBed.inject(Router); 

    });
 

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call generateToken and LoginUser on form submission with valid credentials', () => {
    const mockResponse: { jwt: string } = { jwt: 'testtoken' };
        const credentials = { username: 'testuser', password: 'testpassword' };

    component.credentials = credentials;
    loginService.generateToken.and.returnValue(of(mockResponse));
    component.onSubmit();
    expect(loginService.generateToken).toHaveBeenCalledWith(credentials);
    expect(loginService.LoginUser).toHaveBeenCalledWith(mockResponse.jwt);	
    // const routerSpy = spyOn(router, 'navigateByUrl').and.callThrough();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
    // expect(routerSpy).toHaveBeenCalledWith('/blog-list');
  });
  });

  it('should not call generateToken and LoginUser on form submission with empty credentials', () => {

    component.onSubmit();

    expect(loginService.generateToken).not.toHaveBeenCalled();
    expect(loginService.LoginUser).not.toHaveBeenCalled();	 
    const routerSpy = spyOn(router, 'navigateByUrl').and.callThrough();

    fixture.detectChanges();   

    fixture.whenStable().then(() => {
    expect(routerSpy).not.toHaveBeenCalledWith('/blog-list');
  });

  });
});
