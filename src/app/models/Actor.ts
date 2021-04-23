export interface Actor {
  id: number;
  name: string;
  picture: string;
  movies: number;
}

export class ActorClass implements Actor {
  id: number;
  name: string;
  picture: string;
  movies: number;

  constructor(actorObject: Actor) {
    Object.assign(this, actorObject);
  }
}
