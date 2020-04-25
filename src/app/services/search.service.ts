import { Injectable } from '@angular/core';
import { MovieService } from './movie.service';
import { Movie } from '../models/movie';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private results: Movie[];

  constructor(private movieService: MovieService) { }

  search(query) {
    this.movieService.search(query).subscribe(movies => this.results = movies);
  }

  getResults() {
    return of(this.results);
  }
}
