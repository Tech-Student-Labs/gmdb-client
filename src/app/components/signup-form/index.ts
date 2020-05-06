import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './index.html',
  styleUrls: ['./styles.css']
})
export class SignupFormComponent implements OnInit {
  signupForm: FormGroup;
  signupMsg: string;

  constructor(private fb: FormBuilder, private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConf: ['', Validators.required]
    });
  }

  register() {
    if (this.signupForm.valid) {
      console.log('signup-form.register', 'Form valid.');
      this.signupForm.removeControl('passwordConf');
      this.authService.register(this.signupForm.value);
      this.router.navigate([''])
        .catch(err => console.error('signup-form.register', 'Could not navigate to home.', err));
    } else {
      this.signupMsg = 'There was a problem with your registration. Try again';
      console.error('signup-form.register()', 'Form invalid.');
    }
  }

}
