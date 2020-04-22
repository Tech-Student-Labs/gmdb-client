import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { fadeInAnimation } from '../../animations/fade-in';
import {MovieService} from '../../services/movie.service';

@Component({
  selector: 'landing-page',
  templateUrl: './index.html',
  styleUrls: ['./styles.css'],
  animations: [fadeInAnimation]
})
export class LandingPageComponent implements OnInit {
  popularMovies: Movie[];

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getRandomMovies();
  }

  getRandomMovies() {
    // FIXME: Movies can have missing posters! Code against that or set defaults.
    this.movieService.getRandom().subscribe(
      data => { this.popularMovies = data; },
      err => console.error(err),
      () => console.log('Carousel loaded.')
    );
  }
}
