import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ApiServices as api } from '../utils/api-services.enum';
import { environment as env } from '../../environments/environment';
import { Review } from '../models/review';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private reviews: Review[];
  private apiUrl = env.apiUrl + api.ReviewsApi;

  constructor(private http: HttpClient) {
    this.all().subscribe(reviews => this.reviews = reviews);
  }

  all(): Observable<any> {
    return this.http.get<Review[]>(this.apiUrl + '?search=', httpOptions);
  }

  create(reviewBody): Observable<any> {
    const reviewData = { ...reviewBody };
    return this.http.post(this.apiUrl, reviewData);
  }

  get(id: number): Observable<any> {
    return this.http.get(this.apiUrl + id, httpOptions);
  }

  getByMovieId(movieId: string) {
    const reviews = JSON.parse(localStorage.getItem('reviews'));
    const results = reviews.filter(review => review.movieId === movieId);
    return of(results);
  }

  getByUserId(userId: string) {
    const reviews = JSON.parse(localStorage.getItem('reviews'));
    return reviews.filter(review => review.userId === userId);
  }

  search(query: string) {
    const results = this.reviews.filter((review) => review.reviewTitle.toLowerCase().includes(query));
    return of(results);
  }
}
