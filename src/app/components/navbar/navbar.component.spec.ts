import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';
import { AuthService } from './auth.service';
import { LoginService } from 'src/app/services/login.service';
import { of } from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let loginService: jasmine.SpyObj<LoginService>; 

  beforeEach(async () => {
    const loginServiceSpy = jasmine.createSpyObj('LoginService', ['IsLoggedIn', 'logout']);

    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: {} }, 
        { provide: LoginService, useValue: loginServiceSpy },
      ],
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>; 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize loggedIn based on LoginService', () => {
    loginService.IsLoggedIn.and.returnValue(true);

    component.ngOnInit();

    expect(component.loggedIn).toBeTrue();
  });

  // it('should call LoginService.logout() and reload on logoutUser()', () => {
  //   const reloadSpy = jasmine.createSpy('reload');
  //   const mockWindowLocation = { ...window.location, reload: reloadSpy };

  //   // Replace window.location with the mock object
  //   spyOnProperty(window, 'location').and.returnValue(mockWindowLocation);

  //   // Call logoutUser()
  //   component.logoutUser();

  //   // Expect LoginService.logout() to have been called
  //   expect(loginService.logout).toHaveBeenCalled();

  //   // Expect window.location.reload() to have been called
  //   expect(reloadSpy).toHaveBeenCalled();
  // });
});
