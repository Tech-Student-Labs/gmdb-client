import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../animations/fade-in';
import {Movie} from '../../models/movie';
import {SearchService} from '../../services/search.service';

@Component({
  selector: 'search-page',
  templateUrl: './index.html',
  styleUrls: ['./styles.css'],
  animations: [fadeInAnimation]
})
export class SearchPageComponent implements OnInit {
  results: Movie[];

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.updateResults();
  }

  // Currently used to force update SearchResults component
  updateResults() {
    this.searchService.getResults().subscribe(movies => this.results = movies);
    return this.results;
  }
}
