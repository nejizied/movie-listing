import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie, MovieClass } from '@app/models/Movie';
import { MovieServiceService } from '@shared/movie-service.service';
import { Actor, ActorClass } from '@app/models/Actor';
import { Genre, GenreClass } from '@app/models/Genre';
import { AuthService } from '@shared/auth.service';
@Component({
  selector: 'app-edit-movie-modal',
  templateUrl: './edit-movie-modal.component.html',
  styleUrls: ['./edit-movie-modal.component.scss'],
})
export class EditMovieModalComponent implements OnInit {
  @Output() onSubmitClicked = new EventEmitter<any>();
  movie: Movie;
  allActors: Actor[] = [];
  allGenres: Genre[] = [];
  constructor(
    public dialogRef: MatDialogRef<EditMovieModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private movieService: MovieServiceService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.movie = (this.data.form as Movie) ?? new MovieClass(null);
    this.getAllActors();
    this.getAllGenres();
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
  getNotUsedActors(actorList: Actor[]) {
    return (
      actorList.filter((e) => !this.movie?.actors?.map((gen) => gen.id).includes(e.id) ?? true) ?? this.movie.genres
    );
  }

  getAllGenres(): void {
    this.movieService.getAllGenre(null, null, null).then((data) => {
      const genres: Genre[] = data.map((e: any) => e as Genre[]);

      this.allGenres = genres.map((e) => {
        return new GenreClass(e);
      });
    });
  }
  getNotUsedGenres(genreList: Genre[]) {
    return genreList?.filter((e) => !this.movie?.genres?.map((gen) => gen.id).includes(e.id) ?? true) ?? this.allGenres;
  }

  addActorToMovie(id: string) {
    if (!id || id === '') return;
    if (this.movie.actors?.filter((e) => e.id === parseInt(id, 10)).length >= 1) return;
    const newActor = this.allActors.filter((e) => e.id === parseInt(id, 10))[0];
    if (!this.movie?.actors) {
      this.movie.actors = [newActor];
    } else {
      this.movie?.actors?.unshift(newActor);
    }
  }
  addGenreToMovie(id: string) {
    if (!id || id === '') return;
    if (this.movie?.genres?.filter((e) => e.id === parseInt(id, 10)).length >= 1) return;
    const newGenre = this.allGenres.filter((e) => e.id === parseInt(id, 10))[0];
    if (!this.movie?.genres) {
      this.movie.genres = [newGenre];
    } else {
      this.movie?.genres?.unshift(newGenre);
    }
  }

  deleteActorFromMovie(index: number) {
    if (index === undefined) return;
    this.movie.actors.splice(index, 1);
  }

  deleteGenreFromMovie(index: number) {
    if (index === undefined) return;
    this.movie.genres.splice(index, 1);
  }

  saveMovie() {
    if (this.movie?.id) {
      this.movieService.updateMovie(this.movie.id, this.movie).then((data) => {
        this.dialogRef.close(true);
      });
    } else {
      this.movieService.createAMovie(this.movie).then((data) => {
        this.dialogRef.close(true);
      });
    }
  }

  closeModal() {
    this.dialogRef.close(null);
  }
}
