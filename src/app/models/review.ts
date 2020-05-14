export class Review {
  reviewId: number;
  reviewerId: string;
  imdbId: string;
  movieId?: number;
  reviewTitle: string;
  reviewText: string;
  stars?: number;
  lastUpdated?: Date;
}
