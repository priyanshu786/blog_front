import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService]
    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should generate a token', () => {
    const credentials = { username: 'testuser', password: 'testpassword' };
    const mockTokenResponse = { token: 'testtoken' };

    service.generateToken(credentials).subscribe((response: any) => {
      expect(response).toEqual(mockTokenResponse);
    });

    const req = httpMock.expectOne('http://localhost:8081/user/authenticate');
    expect(req.request.method).toBe('POST');
    req.flush(mockTokenResponse);
  });

  it('should log in the user', () => {
    const mockToken = 'testtoken';

    expect(service.LoginUser(mockToken)).toBeTrue();
    expect(localStorage.getItem('token')).toBe(mockToken);
  });

  it('should return true when user is logged in', () => {
    localStorage.setItem('token', 'testtoken');
    expect(service.IsLoggedIn()).toBeTrue();
  });

  it('should return false when user is not logged in', () => {
    localStorage.removeItem('token');
    expect(service.IsLoggedIn()).toBeFalse();
  });

  it('should log out the user', () => {
    localStorage.setItem('token', 'testtoken');
    expect(service.logout()).toBeTrue();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('should get the token from local storage', () => {
    const mockToken = 'testtoken';
    localStorage.setItem('token', mockToken);
    expect(service.getToken()).toBe(mockToken);
  });
});
