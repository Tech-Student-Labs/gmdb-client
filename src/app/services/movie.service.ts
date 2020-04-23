import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ApiServices as api } from '../utils/api-services.enum';
import { environment as env } from '../../environments/environment';
import { Movie } from '../models/movie';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private movies: Movie[];
  private apiUrl = env.apiUrl + api.MoviesApi;

  constructor(private http: HttpClient) {
    this.all().subscribe(data => {
      this.movies = this.updateStorage(data);
    });
  }

  updateStorage(movies) {
    localStorage.setItem('movies', JSON.stringify(movies));
    return JSON.parse(localStorage.getItem('movies'));
  }

  /**
   * GET /api/movies
   * @desc Get all movies from API
   */
  all(): Observable<any> {
    return this.http.get(this.apiUrl, httpOptions);
  }

  /**
   * GET /api/movie/imdb
   * @desc Get a movie from the API
   * @param id the IMDB movie id
   */
  get(id: string): Observable<any> {
    return this.http.get<Movie[]>(this.apiUrl + `/imdb/${id}`, httpOptions);
  }

  /**
   * @desc Get Movies from localStorage
   */
  getMovies() {
    return JSON.parse(localStorage.getItem('movies'));
  }

  getById(id: string): Observable<Movie> {
    this.movies = this.getMovies();
    return of(this.movies.filter(movie => movie.imdbid === id)[0]);
  }

  /**
   * Search by Movie Title
   * @returns an observable
   * @param query string
   */
  search(query: string): Observable<Movie[]> {
    const results = this.movies.filter((movie) => movie.title.toLowerCase().includes(query));
    return of(results);
  }

  getRandom(quantity: number = 5): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl + `/rand?quantity=${quantity}`, httpOptions);
  }
}
