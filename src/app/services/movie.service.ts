import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ApiServices as api} from '../utils/api-services.enum';
import {environment as env} from '../../environments/environment';
import {Movie} from '../models/movie';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  public movies: Movie[];
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

  all(): Observable<any> {
    return this.http.get(this.apiUrl, httpOptions);
  }

  getById(id: string): Movie {
    return this.movies.filter(movie => movie.imdbid === id)[0];
  }

  get(id: string): Observable<any> {
    return this.http.get(this.apiUrl + `/imdb/${id}`, httpOptions);
  }

  search(query: string) {
    const results = this.movies.filter((movie) => movie.title.toLowerCase().includes(query));
    return of(results);
  }

  getRandom(quantity: number = 5): Observable<any> {
    return this.http.get(this.apiUrl + `/rand?quantity=${quantity}`, httpOptions);
  }
}
