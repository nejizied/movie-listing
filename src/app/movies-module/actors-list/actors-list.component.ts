import { Component, OnInit } from '@angular/core';
import { Movie, MovieClass } from '@app/models/Movie';
import { MovieServiceService } from '@shared/movie-service.service';
import { ActivatedRoute } from '@angular/router';
import { Actor, ActorClass } from '@app/models/Actor';
import { EditMovieModalComponent } from '@app/movies-module/modals/edit-movie-modal/edit-movie-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { EditActorModalComponent } from '@app/movies-module/modals/edit-actor-modal/edit-actor-modal.component';
import { AuthService } from '@shared/auth.service';

@Component({
  selector: 'app-actors-list',
  templateUrl: './actors-list.component.html',
  styleUrls: ['./actors-list.component.scss'],
})
export class ActorsListComponent implements OnInit {
  actors: Actor[] = [];
  keyTitle = 'All Actors';
  searchQuery: any;
  constructor(
    private movieService: MovieServiceService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    public authService: AuthService
  ) {}
  ngOnInit(): void {
    const actor = this.activatedRoute.snapshot.queryParamMap.get('keyword');
    if (actor) {
      this.searchForMovies(actor);
    } else {
      this.getAllActors();
    }
  }

  getAllActors(): any {
    this.movieService.getAllActors(null, null, null).then((data) => {
      const actors: Actor[] = data.map((e: any) => e as Actor[]);
      this.actors = actors
        .map((e: any) => {
          return new ActorClass(e);
        })
        .sort((a, b) => (a.name?.toLowerCase() > b.name?.toLowerCase() ? 1 : -1));
    });
  }

  searchForMovies(keyword: string): any {
    if (!keyword || keyword?.length === 0) return;
    this.movieService
      .getAllActors(null, null, 'q=' + keyword)
      .then((data) => {
        const actors: Actor[] = data.map((e: any) => e as Actor[]);
        this.actors = actors.map((e) => {
          return new ActorClass(e);
        });
        this.keyTitle = `"${keyword}" - results`;
        this.searchQuery = keyword;
      })
      .finally(() => {});
  }

  deleteSearchQuery() {
    this.searchQuery = undefined;
    this.keyTitle = 'All Movies';
    this.getAllActors();
  }

  openEditModal(actor: Actor) {
    const dialogRef = this.dialog.open(EditActorModalComponent, {
      minWidth: '80vw',
      maxHeight: '800px',
      data: {
        form: actor,
        _id: actor?.id,
      },
    });
  }
}
