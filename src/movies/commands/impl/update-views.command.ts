export class UpdateViewsCommand {
  constructor(
    public readonly userId: string,
    public readonly id: string,
    public readonly title: string,
  ) {}
}
