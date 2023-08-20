import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';
import { LoginService } from './login.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot ,Router } from '@angular/router';



describe('AuthGuard', () => {
  let guard: AuthGuard;
  let loginService: jasmine.SpyObj<LoginService>;
  let router: any;
  beforeEach(() => {
    const loginServiceSpy = jasmine.createSpyObj('LoginService', ['IsLoggedIn']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: LoginService, useValue: loginServiceSpy }
      ]
    });
    guard = TestBed.inject(AuthGuard);
    loginService = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    router = TestBed.inject(Router)

  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('should allow access to the route if user is logged in', () => {
    // Set up the mock value for IsLoggedIn() to return true (user is logged in)
    loginService.IsLoggedIn.and.returnValue(true);

    // Create dummy ActivatedRouteSnapshot and RouterStateSnapshot objects
    const activatedRouteSnapshot: ActivatedRouteSnapshot = {} as any;
    const routerStateSnapshot: RouterStateSnapshot = {} as any;

    const canActivateResult = guard.canActivate(activatedRouteSnapshot, routerStateSnapshot);

    expect(canActivateResult).toBeTrue();
  });

  it('should navigate to home route and disallow access if user is not logged in', () => {
    // Set up the mock value for IsLoggedIn() to return false (user is not logged in)
    loginService.IsLoggedIn.and.returnValue(false);

    // Create dummy ActivatedRouteSnapshot and RouterStateSnapshot objects
    const activatedRouteSnapshot: ActivatedRouteSnapshot = {} as any;
    const routerStateSnapshot: RouterStateSnapshot = {} as any;

    // Create a spy on the router navigate method to track calls

    const routerNavigateSpy = spyOn(router, 'navigate');
    const canActivateResult = guard.canActivate(activatedRouteSnapshot, routerStateSnapshot);

    expect(canActivateResult).toBeFalse();
    expect(routerNavigateSpy).toHaveBeenCalledWith(['home']);
  });
});
