import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { ApiServices as api } from '../utils/api-services.enum';
import { environment as env } from '../../environments/environment';
import { BehaviorSubject, of } from 'rxjs';

// Cannot set any additional options directly here. Use the spreader in context to add options.
// https://github.com/angular/angular/issues/18586
export const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthorized: BehaviorSubject<boolean>;
  private currentUser: string;
  private apiUrl: string = env.apiUrl + api.UsersApi;
  private authUrl: string = env.apiUrl + api.AuthApi;
  private registerUrl: string = env.apiUrl + api.SignupApi;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.isAuthorized = new BehaviorSubject(false);
  }

  updateHeaders(token) {
    sessionStorage.setItem('currentUser', token);
    this.headers = this.headers.set('Authorization', token);
    httpOptions.headers = this.headers;
    this.currentUser = sessionStorage.getItem('currentUser');
  }

  register(userData) {
    return this.http.post(this.registerUrl, userData, {...httpOptions, observe: 'response', withCredentials: true})
      .subscribe(
        response => {
          console.log('AuthService.register', 'Success!');
          this.isAuthorized.next(true);
          // @ts-ignore
          this.updateHeaders(response.headers.get('Authorization'));
        },
        err => console.error(err)
      );
  }

  /**
   * Add user to session
   */
  login(userData) {
    this.authenticate(userData);
    if (this.isAuthorized) {
      console.log('AuthService.login', 'authorization successful.');
      sessionStorage.setItem('currentUser', this.currentUser);
    }
    return of(this.isAuthorized);
  }

  /**
   * Remove user from session
   */
  logout() {
    this.headers = this.headers.delete('Authorization');
    sessionStorage.removeItem('currentUser');
    this.isAuthorized.next(false);
  }

  /**
   * Send user credentials to the API for a token
   * @param userData data
   */
  authenticate(userData) {
    console.log('AuthService.authenticate', 'Sending login request...');
    this.http.post(this.authUrl, userData, { ...httpOptions, observe: 'response', withCredentials: true})
      .subscribe(
        response => {
          console.log('AuthService.authenticate', 'Login success!');
          this.isAuthorized.next(true);
          // @ts-ignore
          this.updateHeaders(response.headers.get('Authorization'));
        },
        err => this.handleErrors(err)
    );
  }

  getUser() {
    return helper.decodeToken(sessionStorage.getItem('currentUser'));
  }

  handleErrors(err: HttpErrorResponse) {
    console.error('AuthService.authentication', 'This is not a request error.', err.error);
    throw err.error;
  }
}
