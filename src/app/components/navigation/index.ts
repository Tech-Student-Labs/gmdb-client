import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './index.html',
  styleUrls: ['./styles.css']
})
export class NavigationComponent implements OnInit {
  loggedIn = false;
  searchClass = 'warning';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.loggedIn = !!sessionStorage.getItem('currentUser');
  }

  /**
   * Search form handler
   * @event
   * @param query, search form data
   */
  handleQuery(query) {
    this.router.navigate(['search'], { queryParams: { q:  query } });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

}
