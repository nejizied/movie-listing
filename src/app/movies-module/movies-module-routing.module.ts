import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MailViewComponent } from '@app/movies-module/mail-view/mail-view.component';
import { SinglePageComponent } from '@app/movies-module/single-page/single-page.component';
import { Shell } from '@app/shell/shell.service';
import { ActorsListComponent } from '@app/movies-module/actors-list/actors-list.component';
import { GenreListComponent } from '@app/movies-module/genre-list/genre-list.component';
import { AuthenticationGuard } from '@app/auth';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full'
    },
    {
      path: 'movies',
      canActivate: [AuthenticationGuard],
      children: [
        {
          path: 'list',
          component: MailViewComponent,
        },
        {
          path: 'movie/:id',
          component: SinglePageComponent,
        },
        {
          path: 'actors',
          component: ActorsListComponent,
        },
        {
          path: 'genres',
          component: GenreListComponent,
        },
      ],
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesModuleRoutingModule {}
