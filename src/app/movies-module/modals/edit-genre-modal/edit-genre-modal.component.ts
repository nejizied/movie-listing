import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Actor, ActorClass } from '@app/models/Actor';
import { Movie, MovieClass } from '@app/models/Movie';
import { Genre, GenreClass } from '@app/models/Genre';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MovieServiceService } from '@shared/movie-service.service';
import { AuthService } from '@shared/auth.service';

@Component({
  selector: 'app-edit-genre-modal',
  templateUrl: './edit-genre-modal.component.html',
  styleUrls: ['./edit-genre-modal.component.scss'],
})
export class EditGenreModalComponent implements OnInit {
  @Output() onSubmitClicked = new EventEmitter<any>();
  genre: Genre;
  genreMovies: Movie[] = [];
  allGenres: Genre[] = [];
  allActors: Actor[] = [];
  constructor(
    public dialogRef: MatDialogRef<EditGenreModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private movieService: MovieServiceService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.genre = (this.data.form as Genre) ?? new GenreClass(null);
    this.getAllActors();
    this.getActorMovies();
  }

  getAllActors(): void {
    this.movieService.getAllActors(null, null, null).then((data) => {
      const actors: Actor[] = data.map((e: any) => e as Movie[]);
      this.allActors = actors
        .map((e) => {
          return new ActorClass(e);
        })
        .sort((a, b) => (a.name > b.name ? 1 : -1));
    });
  }

  getActorMovies(): void {
    if (this.genre.id) {
      this.movieService.getAllMovies(null, null, this.genre.name).then((data) => {
        const allMovies: Movie[] = data.map((e: any) => e as Movie[]);
        const actorMovies = allMovies.filter((e) => e.genres.map((gen) => gen.id).includes(this.genre.id));
        this.genreMovies = actorMovies.map((e) => {
          return new MovieClass(e);
        });
      });
    }
  }

  saveGenre() {
    if (this.genre?.id) {
      this.movieService.updateGenre(this.genre.id, this.genre).then((data) => {
        this.dialogRef.close(true);
      });
    } else {
      this.movieService.addAGenre(this.genre).then((data) => {
        this.dialogRef.close(true);
      });
    }
  }

  closeModal() {
    this.dialogRef.close(null);
  }
}
