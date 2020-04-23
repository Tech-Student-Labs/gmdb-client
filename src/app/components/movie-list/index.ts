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

  getMovies() {
    this.movieService.all().subscribe(
      data => { this.movies = data; },
      err => console.error(err),
      () => console.log('movies loaded')
    );
  }

}
