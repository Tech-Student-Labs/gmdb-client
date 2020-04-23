export class Review {
  id: number;
  reviewerId?: number;
  movieId: number;
  reviewTitle: string;
  reviewText: string;
  lastUpdated: Date;
}
