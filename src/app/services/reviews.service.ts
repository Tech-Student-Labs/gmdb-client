import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ApiServices as api } from '../utils/api-services.enum';
import { environment as env } from '../../environments/environment';
import { Review } from '../models/review';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private reviews: Review[];
  private apiUrl = env.apiUrl + api.ReviewsApi;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.all().subscribe(reviews => this.reviews = this.updateStorage(reviews));
  }

  updateStorage(reviews) {
    localStorage.setItem('reviews', JSON.stringify(reviews));
    return JSON.parse(localStorage.getItem('reviews'));
  }

  all(): Observable<any> {
    return this.http.get<Review[]>(this.apiUrl, httpOptions);
  }

  create(reviewBody): Observable<any> {
    // TODO: Check the reviewerId is in the reviewBody
    const token = sessionStorage.getItem('currentUser');
    const headers = new HttpHeaders({Authorization: token, 'Content-Type': 'application/json'});
    const reviewData = { ...reviewBody, reviewerId: this.authService.getUser().guid };
    return this.http.post(this.apiUrl, reviewData, { headers });
  }

  get(id: number): Observable<any> {
    return this.http.get(this.apiUrl + id, httpOptions);
  }

  getReviews(): Review[] {
    return JSON.parse(localStorage.getItem('reviews')) || [];
  }

  getById(id: number): Review {
    const reviews = this.getReviews();
    return this.reviews.filter(review => review.id === id)[0];
  }

  getByMovieId(movieId: string): Observable<Review[]> {
    const reviews = this.getReviews();
    const results = reviews.filter(review => review.imdbId === movieId);
    return of(results);
  }

  getByUserId(userId: string): Observable<Review[]> {
    const reviews = this.getReviews();
    return of(reviews.filter(review => review.reviewerId === userId));
  }

  search(query: string) {
    const results = this.reviews.filter((review) => review.reviewTitle.toLowerCase().includes(query));
    return of(results);
  }
}
