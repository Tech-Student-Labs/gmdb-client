import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import {
  SearchResultsComponent, SearchFormComponent, LoginComponent, LoginFormComponent,
  MoviePageComponent, MovieListComponent, MovieDetailComponent,
  ReviewDetailComponent, ReviewFormComponent, ReviewsListComponent,
  BreadcrumbsComponent, LandingPageComponent, NavigationComponent,
  SearchPageComponent
} from './components';

const tokenGetter = () => sessionStorage.getItem('currentUser');

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SearchResultsComponent,
    SearchFormComponent,
    LoginFormComponent,
    LoginComponent,
    MovieListComponent,
    MovieDetailComponent,
    ReviewFormComponent,
    ReviewsListComponent,
    ReviewDetailComponent,
    LandingPageComponent,
    MoviePageComponent,
    BreadcrumbsComponent,
    SearchPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['gmdb-dev.robwing.com:8000']
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
