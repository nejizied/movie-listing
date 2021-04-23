import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '@app/models/Movie';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieServiceService } from '@shared/movie-service.service';
import { Actor } from '@app/models/Actor';
import { MatDialog } from '@angular/material/dialog';
import { EditMovieModalComponent } from '@app/movies-module/modals/edit-movie-modal/edit-movie-modal.component';
import { Genre } from '@app/models/Genre';
import { AuthService } from '@shared/auth.service';

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.scss'],
})
export class SinglePageComponent implements OnInit {
  @Input() movie: Movie;
  movieIndex: number;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private movieService: MovieServiceService,
    private router: Router,
    private dialog: MatDialog,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.movieIndex = parseInt(this._activatedRoute.snapshot.paramMap.get('id'), 10);
    console.log(this.movieIndex);
    this.movieService.getSingleMovie(this.movieIndex).then((data) => {
      this.movie = data as Movie;
    });
  }

  getActorsNames(actors: Actor[]) {
    return actors?.map((e) => e.name).join(', ');
  }

  getGenreName(genres: Genre[]) {
    return genres?.map((e) => e.name).join(', ');
  }

  searchBuGenre(keyword: string | string[]) {
    if (!keyword || keyword?.length === 0) return;
    this.router.navigate(['movies'], { queryParams: { genre: keyword } });
  }
  searchByActorName(keyword: string | string[]) {
    if (!keyword || keyword?.length === 0) return;
    this.router.navigate(['movies/list'], { queryParams: { keyword } });
  }

  openEditModal() {
    const dialogRef = this.dialog.open(EditMovieModalComponent, {
      minWidth: '80vw',
      maxHeight: '900px',
      data: {
        form: this.movie,
        _id: this.movie.id,
      },
    });
  }
}
