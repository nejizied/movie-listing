import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieServiceService {
  constructor(private httpClient: HttpClient) {}

  getAllMovies(page: number, itemsPerPage: number, query: string): Promise<any> {
    return this.httpClient
      .get(
        `${environment.serverUrl}/movies?${page ? '_page=' + page : ''}${
          itemsPerPage ? '&_limit=' + itemsPerPage : ''
        }${query ? '&' + query : ''}`
      )
      .toPromise();
  }
  getSingleMovie(index: number) {
    return this.httpClient.get(`${environment.serverUrl}/movies/${index ?? 1}`).toPromise();
  }

  createAMovie(input: any) {
    return this.httpClient.post(`${environment.serverUrl}/movies`, input).toPromise();
  }

  updateMovie(index: number, input: any) {
    return this.httpClient.put(`${environment.serverUrl}/movies/${index}`, input).toPromise();
  }

  getAllActors(page: number, itemsPerPage: number, query: string): Promise<any> {
    return this.httpClient
      .get(
        `${environment.serverUrl}/actors?${page ? '_page=' + page : ''}${
          itemsPerPage ? '&_limit=' + itemsPerPage : ''
        }${query ? '&' + query : ''}`
      )
      .toPromise();
  }

  createActor(input: any) {
    return this.httpClient.post(`${environment.serverUrl}/actors`, input).toPromise();
  }

  updateActor(index: number, input: any) {
    return this.httpClient.put(`${environment.serverUrl}/actors/${index}`, input).toPromise();
  }

  getActorMovies(page: number, itemsPerPage: number, actorName: string): Promise<any> {
    return this.httpClient
      .get(
        `${environment.serverUrl}/movies?_page=${page ? '_page=' + page : ''}${
          itemsPerPage ? '&_limit=' + itemsPerPage : ''
        }`
      )
      .toPromise();
  }

  getAllGenre(page: number, itemsPerPage: number, query: string): Promise<any> {
    return this.httpClient
      .get(
        `${environment.serverUrl}/genres?${page ? '_page=' + page : ''}${
          itemsPerPage ? '&_limit=' + itemsPerPage : ''
        }${query ? '&' + query : ''}`
      )
      .toPromise();
  }
  addAGenre(query: any) {
    return this.httpClient.post(`${environment.serverUrl}/genres`, query).toPromise();
  }
  updateGenre(id: number, query: any) {
    return this.httpClient.post(`${environment.serverUrl}/genres/${id}`, query).toPromise();
  }
}
