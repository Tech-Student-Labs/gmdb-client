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
  // TODO: create a selection of popular movies for carousel?
  popularMovies: Movie[];

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getRandomMovies();
  }

  getRandomMovies() {
    this.movieService.getRandom().subscribe(
      data => { this.popularMovies = data; },
      err => console.error(err),
      () => console.log('Carousel loaded.')
    );
  }
}
