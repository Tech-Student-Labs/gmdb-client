import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login-form',
  templateUrl: './index.html',
  styleUrls: ['./styles.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string;

  constructor(private fb: FormBuilder, private router: Router,
              private authService: AuthService) { }

  /**
   * Initialize component
   * @desc sets initial state for component no load
   */
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

  /**
   * Authenticate
   * @event handler for user authentication.
   */
  authenticate() {
    if (this.loginForm.valid) {
      const isSuccessful = this.authService.login(this.loginForm.value).success;
      if (isSuccessful) {
        this.router.navigate([''])
          .catch(err => console.error('ERROR', 'Could not navigate to home.', err));
      } else {
        this.loginError = 'Login failed. Try again.';
      }
    } else {
      console.log('Login form is invalid.');
      this.loginForm.reset();
    }
  }
}
