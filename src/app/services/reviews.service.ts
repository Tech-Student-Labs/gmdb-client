import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
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
  private reviews: BehaviorSubject<Review[]>;
  private apiUrl = env.apiUrl + api.ReviewsApi;

  constructor(private http: HttpClient, private authService: AuthService) {
    localStorage.removeItem('reviews');
    this.reviews = new BehaviorSubject([]);
  }

  updateStorage(reviews) {
    localStorage.setItem('reviews', JSON.stringify(reviews));
    this.reviews.next(reviews);
  }

  create(reviewBody) {
    const token = sessionStorage.getItem('currentUser');
    const headers = new HttpHeaders({Authorization: token, 'Content-Type': 'application/json'});
    const reviewData = { ...reviewBody,  reviewerId: this.authService.getUser().guid };
    this.http.post(this.apiUrl, reviewData, { headers, observe: 'response', withCredentials: true })
      .subscribe(
        (response) => {
          // @ts-ignore
          const review: Review = response.body;
          const reviews = this.getReviews();
          reviews.push(review);
          this.updateStorage(reviews);
        },
        (err) => console.error('ReviewService.create', err)
      );
  }

  patch(reviewBody) {
    const token = sessionStorage.getItem('currentUser');
    const headers = new HttpHeaders({Authorization: token, 'Content-Type': 'application/json'});
    const reviewData = { ...reviewBody,  reviewerId: this.authService.getUser().guid };
    this.http.patch(this.apiUrl, reviewData, { headers, observe: 'response', withCredentials: true })
      .subscribe(
        (response) => {
          console.log('ReviewService.patch', response);
        },
        (err) => console.error('ReviewService.patch', err)
      );
  }

  /**
   * Get a review from the API
   * @param id review id
   */
  get(id: number): Observable<any> {
    return this.http.get(this.apiUrl + id, httpOptions);
  }

  /**
   * Reviews from localStorage for demo
   */
  getReviews(): Review[] {
    return JSON.parse(localStorage.getItem('reviews')) || [];
  }

  getById(id: number): Review {
    const reviews = this.getReviews();
    return reviews.filter(review => review.id === id)[0];
  }

  getByMovieId(movieId: string): Observable<Review[]> {
    const token = sessionStorage.getItem('currentUser');
    const headers = new HttpHeaders({Authorization: token, 'Content-Type': 'application/json'});
    this.http.get<Review[]>(this.apiUrl + `?imdbid=${movieId}`, { headers, observe: 'response', withCredentials: true })
      .subscribe(
        (response) => {
          this.reviews.next(response.body);
        },
        err => console.error('ReviewService.getByMovieId', err)
      );
    return this.reviews;
  }

  getByUserId(userId: string): Observable<Review[]> {
    const token = sessionStorage.getItem('currentUser');
    const headers = new HttpHeaders({Authorization: token, 'Content-Type': 'application/json'});
    this.http.get<Review[]>(this.apiUrl + `?imdbid=${userId}`, { headers, observe: 'response', withCredentials: true })
      .subscribe(
        (response) => {
          this.reviews.next(response.body);
        },
        err => console.error('ReviewService.getByMovieId', err)
      );
    return this.reviews;
  }

  search(query: string) {
    // this.refresh();
    const reviews = this.getReviews();
    const results = reviews.filter((review) => review.reviewTitle.toLowerCase().includes(query));
    return of(results);
  }

  all(): Observable<any> {
    return this.http.get<Review[]>(this.apiUrl, httpOptions);
  }

  refresh() {
    this.all().subscribe(reviews => this.updateStorage(reviews));
  }
}
