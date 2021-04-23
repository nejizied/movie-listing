import { Actor } from '@app/models/Actor';
import { Genre } from '@app/models/Genre';

export interface Movie {
  id: number;
  title: string;
  year: string;
  genres: Genre[];
  rating: number;
  poster: string;
  contentRating: string;
  duration: string;
  releaseDate: string;
  averageRating: number;
  originalTitle: string;
  storyline: string;
  actors: Actor[];
  imdbRating: number;
  posterurl: string;
}

export class MovieClass implements Movie {
  id: number;
  actors: Actor[];
  averageRating: number;
  contentRating: string;
  duration: string;
  genres: Genre[];
  imdbRating: number;
  originalTitle: string;
  poster: string;
  posterurl: string;
  rating: number;
  releaseDate: string;
  storyline: string;
  title: string;
  year: string;
  constructor(movieObject: Movie) {
    Object.assign(this, movieObject);
  }
}
