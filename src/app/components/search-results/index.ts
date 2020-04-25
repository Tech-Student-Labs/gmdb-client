import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeInAnimation } from '../../animations/fade-in';
import { Movie } from '../../models/movie';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'search-results',
  templateUrl: './index.html',
  styleUrls: ['./styles.css'],
  animations: [fadeInAnimation]
})
export class SearchResultsComponent implements OnInit {
  // style for search-results button
  searchClass = 'dark';
  searchQuery: string;
  // TODO: Still not clear why the subscription doesn't keep this in sync with the service.
  // Input is currently forcing results to sync with the service
  @Input() results: Movie[];

  constructor(private searchService: SearchService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.getResults();
  }

  getResults() {
    // fetch url query params (eg. /search-results?q=data)
    this.route.queryParams
      .subscribe(params => this.searchQuery = params.q);
    // fetch search-results results
    this.searchService.getResults().subscribe(movies => this.results = movies);
  }
}
