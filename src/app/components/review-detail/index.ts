import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../../models/review';

@Component({
  selector: 'review-detail',
  templateUrl: './index.html',
  styleUrls: ['./styles.css']
})
export class ReviewDetailComponent implements OnInit {
  @Input() review: Review;
  stars: number[];

  constructor() {
    this.stars = [];
  }

  ngOnInit() {
    this.stars = Array.from(Array(this.review.stars)).map((x, i) => i ) || [];
  }

  updateReview() {
    // TODO: Users can update reviews they own.
  }

}
