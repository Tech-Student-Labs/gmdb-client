import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ApiServices as api } from '../utils/api-services.enum';
import { environment as env } from '../../environments/environment';

// Cannot set any additional options directly here. Use the spreader in context to add options.
// https://github.com/angular/angular/issues/18586
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtToken: string;
  private apiUrl: string = env.apiUrl + api.UsersApi;
  private authUrl: string = env.apiUrl + api.AuthApi + '/';
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.jwtToken
    });
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
    this.jwtToken = sessionStorage.getItem('currentUser');
  }

  /**
   * Add user to session
   */
  login(userData) {
    this.authenticate(userData);
    if (this.jwtToken) {
      sessionStorage.setItem('currentUser', this.jwtToken);
      return {success: true};
    }
    // FIXME: Waiting for server to return auth headers to remove next line!
    return {success: true};
  }

  /**
   * Remove user from session
   */
  logout() {
    this.headers = this.headers.delete('Authorization');
    sessionStorage.removeItem('currentUser');
  }

  /**
   * Authenticate using API
   * @param userData data
   */
  authenticate(userData) {
    console.log('Sending login request...');
    this.http.post(this.authUrl, userData, { ...httpOptions, observe: 'response', withCredentials: true})
      .subscribe(
        response => {
          console.log('Authentication successful', response);
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
