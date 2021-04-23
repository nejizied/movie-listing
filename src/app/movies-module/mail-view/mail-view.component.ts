import { Component, OnInit } from '@angular/core';
import { Movie, MovieClass } from '../../models/Movie';
import { MovieServiceService } from '@shared/movie-service.service';
import { ActivatedRoute } from '@angular/router';
import { EditMovieModalComponent } from '@app/movies-module/modals/edit-movie-modal/edit-movie-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@shared/auth.service';
@Component({
  selector: 'app-mail-view',
  templateUrl: './mail-view.component.html',
  styleUrls: ['./mail-view.component.scss'],
})
export class MailViewComponent implements OnInit {
  movies: Movie[] = [];
  keyTitle = 'All Movies';
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
      this.getAllMovies();
    }
  }

  getAllMovies(): any {
    this.movieService.getAllMovies(null, null, null).then((data) => {
      const movies: Movie[] = data.map((e: any) => e as Movie[]);
      this.movies = movies.map((e: any) => {
        return new MovieClass(e);
      });
    });
  }

  searchForMovies(keyword: string): any {
    if (!keyword || keyword?.length === 0) return;
    this.movieService
      .getAllMovies(null, null, 'q=' + keyword)
      .then((data) => {
        const movies: Movie[] = data.map((e: any) => e as Movie[]);
        this.movies = movies.map((e) => {
          return new MovieClass(e);
        });
        this.keyTitle = `"${keyword}" - results`;
        this.searchQuery = keyword;
      })
      .finally(() => {});
  }

  deleteSearchQuery() {
    this.searchQuery = undefined;
    this.keyTitle = 'All Movies';
    this.getAllMovies();
  }

  openEditModal(movie: Movie) {
    const dialogRef = this.dialog.open(EditMovieModalComponent, {
      minWidth: '80vw',
      maxHeight: '800px',
      data: {
        form: movie,
        _id: movie?.id,
      },
    });
  }
}
