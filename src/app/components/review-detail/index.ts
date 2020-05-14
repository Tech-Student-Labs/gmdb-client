import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../../models/review';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReviewsService } from '../../services/reviews.service';

@Component({
  selector: 'review-detail',
  templateUrl: './index.html',
  styleUrls: ['./styles.css']
})
export class ReviewDetailComponent implements OnInit {
  @Input() review: Review;
  reviewUpdateForm: FormGroup;
  stars: number[];
  isAuthorized: boolean;
  showForm: boolean;
  reviewMsg: string;

  constructor(private authService: AuthService,
              private reviewService: ReviewsService,
              private fb: FormBuilder) {
    this.stars = [];
    this.showForm = false;
  }

  ngOnInit() {
    this.stars = Array.from(Array(this.review.stars)).map((x, i) => i ) || [];
    this.authService.isAuthorized.subscribe(isAuthed => this.isAuthorized = isAuthed);
    this.reviewUpdateForm = this.fb.group({
      reviewId: [this.review.reviewId],
      reviewTitle: [this.review.reviewTitle],
      reviewText: [this.review.reviewText]
    });
  }

  updateReview() {
    if (this.reviewUpdateForm.valid) {
      this.reviewService.patch(this.reviewUpdateForm.value);
      this.showForm = false;
      this.reviewMsg = 'Successfully updated!';
      this.reviewUpdateForm.reset();
      console.log('ReviewDetail.updateReview', 'success');
    } else {
      this.reviewMsg = 'Hmmm ...that didnt work. Try again?';
      console.error('ReviewDetail.updateReview', 'there was a problem');
    }
  }

  isCurrentUser() {
    const user = this.authService.getUser();
    return user.guid === this.review.reviewerId;
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

}
