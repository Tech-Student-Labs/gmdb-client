import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ReviewsService } from '../../services/reviews.service';

@Component({
  selector: 'review-form',
  templateUrl: './index.html',
  styleUrls: ['./styles.css']
})
export class ReviewFormComponent implements OnInit {
  reviewForm: FormGroup;
  isAuthorized: boolean;
  imdbId: string;
  reviewError: string;
  // TODO: Temp hack so users can't submit more than 1 review.
  formSubmitted: boolean;

  constructor(private fb: FormBuilder, private router: Router,
              private authService: AuthService,
              private reviewsService: ReviewsService,
              private route: ActivatedRoute) {
    this.formSubmitted = false;
  }

  /**
   * Initialize component
   * @desc sets initial state for component no load
   */
  ngOnInit() {
    this.reviewForm = this.fb.group({
      imdbId: [ this.imdbId, Validators.required ],
      stars: [''],
      // reviewerId: [ '', Validators.required ],
      reviewTitle: [ '', Validators.required ],
      reviewText: ['', [Validators.required, Validators.minLength(10)]],
    });
    this.authService.isAuthorized.subscribe(isAuthorized => this.isAuthorized = isAuthorized);
    this.route.paramMap.subscribe(params => this.imdbId = params.get('movieId'));
  }

  /**
   * Save Review
   * @event handler for submitting a new comment to the Review Service.
   */
  create() {
    this.reviewForm.patchValue({ imdbId: this.imdbId });
    if (this.reviewForm.valid) {
      this.reviewsService.create(this.reviewForm.value);
    } else {
      this.reviewError = 'There was a problem submitting your review, try again.';
      console.log('Review failed.');
    }
    this.formSubmitted = true;
    this.reviewForm.reset();
  }
}
