export class RatedMovieEvent {
  constructor(
    public readonly userId: string,
    public readonly id: string,
    public readonly rating: number,
  ) {}
}
