export class RatedMovieEvent {
  constructor(
    public readonly userId: string,
    public readonly id: string,
    public readonly title: string,
    public readonly rating: number,
  ) {}
}
