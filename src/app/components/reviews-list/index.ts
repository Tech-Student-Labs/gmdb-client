import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../../models/review';
import { ReviewsService } from '../../services/reviews.service';

@Component({
  selector: 'reviews-list',
  templateUrl: './index.html',
  styleUrls: ['./styles.css']
})
export class ReviewsListComponent implements OnInit {
  @Input() reviews: Review[];

  constructor() { }

  ngOnInit() { }

}
