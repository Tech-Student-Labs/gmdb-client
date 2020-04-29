import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'breadcrumbs',
  templateUrl: './index.html',
  styleUrls: ['./styles.css']
})
export class BreadcrumbsComponent implements OnInit {

  constructor(private location: Location, private router: Router) { }

  ngOnInit() {
  }

  gotoPrevious() {
    this.location.back();
  }

  gotoHome() {
    this.router.navigate(['']);
  }
}
