export class Review {
  id: number;
  reviewerId: string;
  imdbId: string;
  movieId?: number;
  reviewTitle: string;
  reviewText: string;
  stars?: number;
  lastUpdated?: Date;
}
