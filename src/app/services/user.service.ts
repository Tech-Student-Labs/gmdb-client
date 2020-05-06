import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { ApiServices as api } from '../utils/api-services.enum';
import { AuthService, httpOptions } from './auth.service';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: {};
  public isAuthorized: boolean;
  private apiUrl: string = env.apiUrl + api.SignupApi;
  private headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) { }

  register(userData) {
    this.http.post(this.apiUrl, userData, {...httpOptions, observe: 'response', withCredentials: true}).subscribe(
      (response) => {
        console.log(response);
        // @ts-ignore
        this.authService.updateHeaders(response.headers.get('Authorization'));
      }
    );
  }

  getuser(): User {
    const payload = helper.decodeToken(sessionStorage.getItem('currentUser'));
    return payload;
  }
}
