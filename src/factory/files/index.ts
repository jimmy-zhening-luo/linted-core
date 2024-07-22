export default class {
  public readonly files: readonly string[];

  constructor(
    base: string[],
    includes: string[],
  ) {
    this.files = [
      ...base,
      ...includes,
    ];
  }
}
