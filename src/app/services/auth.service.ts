import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ApiServices as api } from '../utils/api-services.enum';
import { environment as env } from '../../environments/environment';
import { of } from 'rxjs';

// Cannot set any additional options directly here. Use the spreader in context to add options.
// https://github.com/angular/angular/issues/18586
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthorized: boolean;
  private currentUser: string;
  private apiUrl: string = env.apiUrl + api.UsersApi;
  private authUrl: string = env.apiUrl + api.AuthApi + '/';
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.isAuthorized = false;
  }

  signup(userData) {
    return this.http.post(this.apiUrl, userData, {...httpOptions, observe: 'response', withCredentials: true})
      .subscribe(response => {
        console.log(response);
        // @ts-ignore
        this.updateHeaders(response.headers.get('Authorization'));
      });
  }

  updateHeaders(token) {
    sessionStorage.setItem('currentUser', token);
    this.headers = this.headers.set('Authorization', token);
    httpOptions.headers = this.headers;
    this.currentUser = sessionStorage.getItem('currentUser');
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
    this.isAuthorized = false;
  }

  /**
   * Send user credentials to the API for a token
   * @param userData data
   */
  authenticate(userData) {
    console.log('Sending login request...');
    this.http.post(this.authUrl, userData, { ...httpOptions, observe: 'response', withCredentials: true})
      .subscribe(
        response => {
          console.log('AuthService.authenticate', 'Success');
          this.isAuthorized = true;
          // @ts-ignore
          const token = response.headers.get('Authorization');
          this.updateHeaders(token);
        },
        err => this.handleErrors(err)
    );
  }

  handleErrors(err: HttpErrorResponse) {
    console.log('authentication() error occurred. This is not a request error.', err.error);
    throw err.error;
  }
}
