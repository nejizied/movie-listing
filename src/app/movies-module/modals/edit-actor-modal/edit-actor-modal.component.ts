import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Actor, ActorClass } from '@app/models/Actor';
import { Movie, MovieClass } from '@app/models/Movie';
import { Genre, GenreClass } from '@app/models/Genre';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MovieServiceService } from '@shared/movie-service.service';
import { AuthService } from '@shared/auth.service';

@Component({
  selector: 'app-edit-actor-modal',
  templateUrl: './edit-actor-modal.component.html',
  styleUrls: ['./edit-actor-modal.component.scss'],
})
export class EditActorModalComponent implements OnInit {
  @Output() onSubmitClicked = new EventEmitter<any>();
  actor: Actor;
  actorMovies: Movie[] = [];
  allGenres: Genre[] = [];
  allActors: Actor[] = [];
  constructor(
    public dialogRef: MatDialogRef<EditActorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private movieService: MovieServiceService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.actor = (this.data.form as Actor) ?? new ActorClass(null);
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
    if (this.actor.id) {
      this.movieService.getActorMovies(null, null, this.actor.name).then((data) => {
        const allMovies: Movie[] = data.map((e: any) => e as Movie[]);
        const actorMovies = allMovies.filter((e) => e.actors.map((act) => act.id).includes(this.actor.id));
        this.actorMovies = actorMovies.map((e) => {
          return new MovieClass(e);
        });
      });
    }
  }

  saveActor() {
    if (this.actor?.id) {
      this.movieService.updateActor(this.actor.id, this.actor).then((data) => {
        this.dialogRef.close(true);
      });
    } else {
      this.movieService.createActor(this.actor).then((data) => {
        this.dialogRef.close(true);
      });
    }
  }

  closeModal() {
    this.dialogRef.close(null);
  }
}
