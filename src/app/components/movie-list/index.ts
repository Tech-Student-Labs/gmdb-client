import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'movie-list',
  templateUrl: './index.html',
  styleUrls: ['./styles.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[];

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getMovies();
  }

  /**
   * Get movies from localStorage. If empty, send request to API.
   */
  getMovies() {
    if (this.movieService.movies === null) {
      this.movieService.all().subscribe(
        data => { this.movies = data; },
        err => console.error(err),
        () => console.log('Movies list refreshed!')
      );
    } else {
      console.log('Using recent movies ...');
      this.movies = this.movieService.movies;
    }
  }

}
