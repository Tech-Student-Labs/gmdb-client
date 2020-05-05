import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../../models/review';
import { ReviewsService } from '../../services/reviews.service';

@Component({
  selector: 'reviews-list',
  templateUrl: './index.html',
  styleUrls: ['./styles.css']
})
export class ReviewsListComponent implements OnInit {
  // The id of the object to query reviews by, such as reviewer id or movie id
  @Input() searchKey: string;
  // Search category: movie or reviewer
  @Input() searchCategory: string;
  reviews: Review[];

  constructor(private reviewsService: ReviewsService) { }

  ngOnInit() {
    if (this.searchCategory === 'reviewer') {
      this.reviewsService.getByUserId(this.searchKey).subscribe(reviews => this.reviews = reviews);
    } else if (this.searchCategory === 'movie') {
      this.reviewsService.getByMovieId(this.searchKey).subscribe(reviews => this.reviews = reviews);
    }
  }

}
