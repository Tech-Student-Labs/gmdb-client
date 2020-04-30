import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchResultsComponent } from './components/search-results';
import { LoginComponent } from './components/login';
import { MovieListComponent } from './components/movie-list';
import { LandingPageComponent } from './components/landing-page';
import {MoviePageComponent} from './components/movie-page';
import {SearchPageComponent} from './components/search-page';

/**
 * ROUTING MODULE
 *
 * This module manages route configuration. The routes array below defines each
 * route. See the documentation to learn about all options available to you:
 * https://angular.io/guide/router#configuration
 */
const routes: Routes = [
  { component: LandingPageComponent, path: ''},
  { component: SearchPageComponent, path: 'search'},
  { component: LoginComponent, path: 'login'},
  { component: MovieListComponent, path: 'movies'},
  { component: MoviePageComponent, path: 'movies/:movieId'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
