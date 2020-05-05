import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { Review } from '../../models/review';
import { ReviewsService } from '../../services/reviews.service';

@Component({
  selector: 'movie',
  templateUrl: './index.html',
  styleUrls: ['./styles.css']
})
export class MovieDetailComponent implements OnInit {
  /**
   * Movie Detail displays brief info about a movie: poster and title only
   */
  @Input() movie: Movie;
  reviews: Review[];
  posterPlaceHolder = 'https://via.placeholder.com/300x445/000/';

  constructor(private reviewService: ReviewsService) { }

  ngOnInit() {
    this.reviewService.getByMovieId(this.movie.imdbid)
      .subscribe(reviews => this.reviews = reviews);
  }

  verifyPoster(src) {
    // FIXME: Surely theres a more elegant solution?
    if (typeof src !== 'string') {
      src = '';
    } else if (src === 'N/A' || src.includes('media-imdb')) {
      return this.posterPlaceHolder;
    } else {
      return src;
    }
  }
}
