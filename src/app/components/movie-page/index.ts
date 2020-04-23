import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { fadeInAnimation } from '../../animations/fade-in';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'movie-page',
  templateUrl: './index.html',
  styleUrls: ['./styles.css'],
  animations: [fadeInAnimation]
})
export class MoviePageComponent implements OnInit {
  /**
   * Movie Page displays all details and comments for a movie.
   */
  movie: Movie;
  private movieId: string;

  constructor(private movieService: MovieService, private router: ActivatedRoute) { }

  ngOnInit() {
    // state comes from routerLink parameters on the template
    // this.movie = window.history.state;
    this.router.paramMap.subscribe(params => this.movieId = params.get('id'));
    this.movie = this.movieService.getById(this.movieId);
    if (this.movie === null){
      this.movieService.get(this.movieId).subscribe(movie => this.movie = movie);
    }
  }
}
