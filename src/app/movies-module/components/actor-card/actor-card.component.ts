import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Actor } from '@app/models/Actor';

@Component({
  selector: 'app-actor-card',
  templateUrl: './actor-card.component.html',
  styleUrls: ['./actor-card.component.scss'],
})
export class ActorCardComponent implements OnInit {
  @Input() type = 'Actor';
  @Input() actor: Actor;
  @Input() showDeleteButton = false;
  @Output() onSearchActionClicked = new EventEmitter<any>();
  @Output() onDeleteButtonClicked = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}
}
