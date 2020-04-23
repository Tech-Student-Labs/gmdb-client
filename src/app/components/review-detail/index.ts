import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../../models/review';
import {MovieService} from '../../services/movie.service';

@Component({
  selector: 'review-detail',
  templateUrl: './index.html',
  styleUrls: ['./styles.css']
})
export class ReviewDetailComponent implements OnInit {
  @Input() review: Review;

  constructor() { }

  ngOnInit() {
  }

}
