import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'review-form',
  templateUrl: './index.html',
  styleUrls: ['./styles.css']
})
export class ReviewFormComponent implements OnInit {
  commentForm: FormGroup;

  // TODO: Get user from User service
  currentUser = {};

  constructor(private fb: FormBuilder, private router: Router) { }

  /**
   * Initialize component
   * @desc sets initial state for component no load
   */
  ngOnInit() {
    this.commentForm = this.fb.group({
      userId: [''],
      body: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  /**
   * Save Review
   * @event handler for submitting a new comment to the Review Service.
   */
  save() {
    if (this.commentForm.valid) {
      // TODO: Connect to Review service
      console.log('Review success!');
      // TODO: User stays on movie view, new comment appears. Force refresh?
      this.router.navigate(['/home'])
        .catch(err => console.error('ERROR', 'Could not navigate to move detail.', err));
    } else {
      console.log('Review failed.');
    }
  }
}
