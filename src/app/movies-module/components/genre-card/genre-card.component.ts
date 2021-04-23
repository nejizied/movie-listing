import { Component, Input, OnInit } from '@angular/core';
import { Genre, GenreClass } from '@app/models/Genre';

@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['./genre-card.component.scss'],
})
export class GenreCardComponent implements OnInit {
  @Input() genre: GenreClass;
  constructor() {}

  ngOnInit(): void {}
}
