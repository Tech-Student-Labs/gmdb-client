import { Component, OnInit } from '@angular/core';
import { Review } from '../../models/review';
import {ReviewsService} from '../../services/reviews.service';

@Component({
  selector: 'reviews-list',
  templateUrl: './index.html',
  styleUrls: ['./styles.css']
})
export class ReviewsListComponent implements OnInit {
  reviews: Review[];

  constructor(private reviewsService: ReviewsService) { }

  ngOnInit() {
    this.reviewsService.all().subscribe(reviews => this.reviews = reviews);
  }

}
