import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesModuleRoutingModule } from './movies-module-routing.module';
import { MailViewComponent } from './mail-view/mail-view.component';
import { SinglePageComponent } from './single-page/single-page.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { NgbButtonsModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ActorCardComponent } from './components/actor-card/actor-card.component';
import { EditMovieModalComponent } from './modals/edit-movie-modal/edit-movie-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditActorModalComponent } from './modals/edit-actor-modal/edit-actor-modal.component';
import { ActorsListComponent } from './actors-list/actors-list.component';
import { GenreListComponent } from './genre-list/genre-list.component';
import { GenreCardComponent } from './components/genre-card/genre-card.component';
import { EditGenreModalComponent } from './modals/edit-genre-modal/edit-genre-modal.component';

@NgModule({
  declarations: [
    MailViewComponent,
    SinglePageComponent,
    MovieCardComponent,
    ActorCardComponent,
    EditMovieModalComponent,
    EditActorModalComponent,
    ActorsListComponent,
    GenreListComponent,
    GenreCardComponent,
    EditGenreModalComponent,
  ],
  imports: [
    CommonModule,
    MoviesModuleRoutingModule,
    NgbButtonsModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
  ],
})
export class MoviesModuleModule {}
