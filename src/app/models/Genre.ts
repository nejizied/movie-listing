export interface Genre {
  id: number;
  name: string;
  picture: string;
}

export class GenreClass implements Genre {
  id: number;
  name: string;
  picture: string;
  moviesNumber: number;

  constructor(object: Genre) {
    Object.assign(this, object);
  }
}
