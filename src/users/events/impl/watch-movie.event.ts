export class WatchMovieEvent {
  constructor(
    public readonly userId: string,
    public readonly id: string,
    public readonly title: string,
  ) {}
}
