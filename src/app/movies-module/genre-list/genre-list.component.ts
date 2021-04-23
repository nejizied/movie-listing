import { Component, OnInit } from '@angular/core';
import { MovieServiceService } from '@shared/movie-service.service';
import { Genre, GenreClass } from '@app/models/Genre';
import { Movie, MovieClass } from '@app/models/Movie';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Actor, ActorClass } from '@app/models/Actor';
import { EditActorModalComponent } from '@app/movies-module/modals/edit-actor-modal/edit-actor-modal.component';
import { EditGenreModalComponent } from '@app/movies-module/modals/edit-genre-modal/edit-genre-modal.component';
import { AuthService } from '@shared/auth.service';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss'],
})
export class GenreListComponent implements OnInit {
  genres: Genre[] = [];
  actors: Actor[] = [];
  moviesPerGenre = {};
  keyTitle = 'All Genres';
  searchQuery: any;
  constructor(private moviesService: MovieServiceService, private dialog: MatDialog, public authService: AuthService) {}

  ngOnInit(): void {
    this.getAllGenres();
  }

  getAllGenres() {
    this.moviesService.getAllGenre(null, null, null).then(async (data) => {
      let genres: GenreClass[] = data.map((e: any) => e as Genre);
      genres = genres.map((e) => new GenreClass(e));
      const allMovies = await this.moviesService.getAllMovies(null, null, null).then((mvs) => mvs as Movie[]);
      // counting the movies per genre
      const moviesPerGenres = allMovies.reduce((prev, curr) => {
        const temp = {
          ...prev,
        };
        curr.genres.forEach((gen) => {
          temp[gen.id] = {
            movies: [...(temp[gen.id]?.movies ?? []), curr],
            count: (temp[gen.id]?.count ?? 0) + 1,
          };
        });
        return temp;
      }, {});
      this.moviesPerGenre = moviesPerGenres;
      genres.forEach((gen) => {
        gen.moviesNumber = moviesPerGenres[gen.id]?.count;
      });
      this.genres = genres;
    });
  }

  getAllMovies(): any {
    this.moviesService.getAllActors(null, null, null).then((data) => {
      const movies: Actor[] = data.map((e: any) => e as Actor[]);
      this.actors = movies.map((e: any) => {
        return new ActorClass(e);
      });
    });
  }

  searchForMovies(keyword: string): any {
    if (!keyword || keyword?.length === 0) return;
    this.moviesService
      .getAllGenre(null, null, 'q=' + keyword)
      .then((data) => {
        const actors: Genre[] = data.map((e: any) => e as Genre);
        this.genres = actors.map((e) => {
          return new GenreClass(e);
        });
        this.keyTitle = `"${keyword}" - results`;
        this.searchQuery = keyword;
      })
      .finally(() => {});
  }

  deleteSearchQuery() {
    this.searchQuery = undefined;
    this.keyTitle = 'All Genres';
    this.getAllMovies();
  }

  openEditModal(genre: Genre) {
    const dialogRef = this.dialog.open(EditGenreModalComponent, {
      minWidth: '80vw',
      maxHeight: '800px',
      data: {
        form: genre,
        _id: genre?.id,
      },
    });
  }
}
